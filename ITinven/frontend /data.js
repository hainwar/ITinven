import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image, Dimensions, Button } from 'react-native';
import axios from 'axios';

export default function PeminjamanList({ navigation }) {
  const [peminjamanList, setPeminjamanList] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.xxx:5000/api/peminjaman') // Ganti dengan alamat server kamu
      .then(response => {
        setPeminjamanList(response.data); 
      })
      .catch(error => {
        Alert.alert('Error', 'Gagal mengambil data peminjaman.');
        console.error(error);
      });
  }, []);

  const screenWidth = Dimensions.get('window').width;

  const renderTableRows = () => {
    return peminjamanList.map((peminjaman, index) => (
      <View key={peminjaman._id} style={styles.row}>
        <Text style={styles.cell}>{peminjaman.namaPeminjam}</Text>
        <Text style={styles.cell}>{peminjaman.alat}</Text>
        <Text style={styles.cell}>{new Date(peminjaman.tanggalPinjam).toLocaleDateString()}</Text>
        <Text style={styles.cell}>{peminjaman.namaPetugas}</Text>
        <Text style={styles.cell}>{new Date(peminjaman.tanggalPengembalian).toLocaleDateString()}</Text>
        <Image source={{ uri: peminjaman.foto }} style={styles.photo(screenWidth)} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Nama Peminjam</Text>
            <Text style={styles.headerCell}>Nama Alat</Text>
            <Text style={styles.headerCell}>Tanggal Peminjaman</Text>
            <Text style={styles.headerCell}>Nama Petugas</Text>
            <Text style={styles.headerCell}>Tanggal Pengembalian</Text>
            <Text style={styles.headerCell}>Photo</Text>
          </View>

          {renderTableRows()}
        </View>
      </ScrollView>

      {/* Tombol Kembali ke Home */}
      <View style={styles.backButtonContainer}>
        <Button
          title="Kembali ke Home"
          onPress={() => navigation.navigate('Home')} // Navigasi kembali ke halaman Home
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
    justifyContent: 'space-between', // Agar tabel dan tombol diposisikan di ujung bawah
  },
  backButtonContainer: {
    marginTop: 15, // Memberi jarak di atas tombol
    alignItems: 'center', // Memposisikan tombol di tengah bawah
  },
  tableContainer: {
    width: 1200, // Lebar tabel agar bisa di-scroll horizontal
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
    flexWrap: 'wrap',
    borderRightWidth: 1,
    borderRightColor: '#ccc', // Garis pemisah kolom di header
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
    flexWrap: 'wrap',
    borderRightWidth: 1, // Garis pemisah kolom di data
    borderRightColor: '#ccc', // Warna garis pemisah
  },
  photo: (screenWidth) => ({
    width: screenWidth > 600 ? 80 : screenWidth > 400 ? 60 : 50, // Ukuran foto responsif
    height: screenWidth > 600 ? 80 : screenWidth > 400 ? 60 : 50,
    marginTop: 5,
  }),
});
