import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Data() {
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();
  const { width } = Dimensions.get('window'); // Mendapatkan dimensi layar

  const fetchHistory = async () => {
    try {
      const storedData = await AsyncStorage.getItem('historyData');
      console.log('Stored Data:', storedData); // Debug log
      if (storedData) {
        setHistory(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchHistory);
    return unsubscribe;
  }, [navigation]);

  const handleReturn = async (index) => {
    try {
      let updatedHistory = [...history];
      const currentDate = new Date().toLocaleDateString();
      updatedHistory[index].status = 'Telah Dikembalikan';
      updatedHistory[index].returnDate = currentDate;
      await AsyncStorage.setItem('historyData', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error updating return status:', error);
    }
  };

  const handleViewPhoto = (photoUri) => {
    navigation.navigate('ViewPhoto', { photoUri });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Data Peminjaman</Text>
        <Text style={styles.subtitle}>
          Berikut adalah daftar peminjaman yang telah diajukan oleh peminjam.
        </Text>
      </View>

      {history.length > 0 ? (
        <View style={styles.tableWrapper}>
          <ScrollView horizontal>
            <View style={{ minWidth: width }}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Nama Peminjam</Text>
                <Text style={styles.tableHeaderText}>Nama Alat</Text>
                <Text style={styles.tableHeaderText}>Tanggal Peminjaman</Text>
                <Text style={styles.tableHeaderText}>Nama Petugas</Text>
                <Text style={styles.tableHeaderText}>Foto</Text>
                <Text style={styles.tableHeaderText}>Tanggal Pengembalian</Text>
                <Text style={styles.tableHeaderText}>Status</Text>
                <Text style={styles.tableHeaderText}>Aksi</Text>
              </View>
              <ScrollView style={styles.tableBody}>
                {history.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Text style={styles.tableCell}>{item.alat}</Text>
                    <Text style={styles.tableCell}>{item.date}</Text>
                    <Text style={styles.tableCell}>{item.petugas}</Text>
                    <View style={styles.tableCell}>
                      {item.photo ? (
                        <TouchableOpacity onPress={() => handleViewPhoto(item.photo)}>
                          <Image source={{ uri: item.photo }} style={styles.image} />
                        </TouchableOpacity>
                      ) : (
                        <Text>--</Text>
                      )}
                    </View>
                    <Text style={styles.tableCell}>
                      {item.status === 'Telah Dikembalikan' ? item.returnDate : '-'}
                    </Text>
                    <Text style={styles.tableCell}>{item.status || 'Belum Dikembalikan'}</Text>
                    <View style={styles.tableCell}>
                      <View style={styles.actionButtons}>
                        {item.status !== 'Telah Dikembalikan' && (
                          <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('Edit', { dataToEdit: item, index })}
                          >
                            <Text style={styles.editButtonText}>Edit</Text>
                          </TouchableOpacity>
                        )}
                        {item.status !== 'Telah Dikembalikan' && (
                          <TouchableOpacity
                            style={styles.returnButton}
                            onPress={() => handleReturn(index)}
                          >
                            <Text style={styles.returnButtonText}>Kembalikan</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.noDataText}>Belum ada data peminjaman.</Text>
      )}

      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>Kembali ke Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0070B8',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0070B8',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#001F3F',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
  },
  tableWrapper: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0070B8',
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  tableBody: {
    maxHeight: 400,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  noDataText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  backButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#001F3F',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  editButtonText: {
    color: '#fff',
  },
  returnButton: {
    backgroundColor: '#FF9800',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  returnButtonText: {
    color: '#fff',
  },
});
