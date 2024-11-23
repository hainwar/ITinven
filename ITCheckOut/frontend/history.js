import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image, Dimensions, Button } from 'react-native';
import axios from 'axios';

export default function HistoryList({ navigation }) {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.xxx:5000/api/history/USER_ID') // Ganti dengan alamat backend dan USER_ID
      .then(response => {
        setHistoryList(response.data.data);
      })
      .catch(error => {
        Alert.alert('Error', 'Gagal mengambil data riwayat.');
      });
  }, []);

  const screenWidth = Dimensions.get('window').width;

  const renderTableRows = () => {
    return historyList.map((history, index) => (
      <View key={history._id} style={styles.row}>
        <Text style={styles.cell}>{history.user.name}</Text>
        <Text style={styles.cell}>{history.item}</Text>
        <Text style={styles.cell}>{new Date(history.borrowedAt).toLocaleDateString()}</Text>
        <Text style={styles.cell}>{history.isReturned ? 'Dikembalikan' : 'Belum Dikembalikan'}</Text>
        <Text style={styles.cell}>
          {history.isReturned
            ? new Date(history.returnedAt).toLocaleDateString()
            : '-'}
        </Text>
        <Text style={styles.cell}>{history.petugas}</Text>
        <Image source={{ uri: history.photo || 'https://via.placeholder.com/80' }} style={styles.photo(screenWidth)} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          {/* Header Tabel */}
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Nama Peminjam</Text>
            <Text style={styles.headerCell}>Barang</Text>
            <Text style={styles.headerCell}>Tanggal Peminjaman</Text>
            <Text style={styles.headerCell}>Status Pengembalian</Text>
            <Text style={styles.headerCell}>Tanggal Pengembalian</Text>
            <Text style={styles.headerCell}>Petugas</Text>
            <Text style={styles.headerCell}>Foto</Text>
          </View>
          {/* Data Tabel */}
          {renderTableRows()}
        </View>
      </ScrollView>
      {/* Tombol Kembali */}
      <View style={styles.backButtonContainer}>
        <Button
          title="Kembali ke Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  tableContainer: {
    width: 1300, // Lebar tabel untuk mendukung scroll horizontal
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    fontWeight: 'bold',
    padding: 10,
    width: 200,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    padding: 10,
    width: 200,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  photo: (screenWidth) => ({
    width: screenWidth > 600 ? 80 : screenWidth > 400 ? 60 : 50,
    height: screenWidth > 600 ? 80 : screenWidth > 400 ? 60 : 50,
    marginTop: 5,
  }),
});
