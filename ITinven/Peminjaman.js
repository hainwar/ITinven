import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function Peminjaman() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState(null);

  // Fungsi untuk membuka kamera secara langsung
  const takePhoto = async () => {
    // Meminta izin untuk mengakses kamera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Izin Kamera Ditolak", "Aplikasi memerlukan akses ke kamera untuk mengambil foto.");
      return;
    }

    // Membuka kamera untuk mengambil foto
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3], // Atur rasio foto
      quality: 0.5, // Mengatur kualitas gambar untuk penghematan ruang
    });

    if (!result.canceled) {
      // Menyimpan URI foto yang diambil
      setPhoto(result.assets[0].uri);
    }
  };

  // Fungsi untuk menghapus foto
  const deletePhoto = () => {
    setPhoto(null); // Menghapus foto yang sudah diambil
  };

  return (
    <View style={styles.container}>
      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PEMINJAMAN</Text>
        <Text style={styles.infoText}>
          Isi sesuai data yang diminta, lalu klik proses jika sudah sesuai.
        </Text>
      </View>

      {/* Main Form */}
      <ScrollView>
        {/* Nama Field */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>

        {/* Tanggal Field */}
        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Tanggal"
            value={date}
            onChangeText={text => setDate(text)}
          />
        </View>

        {/* Ambil Photo */}
        <TouchableOpacity style={styles.menuItem} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={24} color="brown" />
          <Text style={styles.menuText}>AMBIL PHOTO</Text>
        </TouchableOpacity>

        {/* Tampilkan Foto */}
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.image} />

            {/* Tombol Hapus */}
            <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
              <MaterialIcons name="delete" size={24} color="red" />
              <Text style={styles.deleteButtonText}>HAPUS PHOTO</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Ajukan Button */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.submitButton}>
          <FontAwesome name="check" size={24} color="white" />
          <Text style={styles.submitButtonText}>AJUKAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0070B8',
  },
  infoContainer: {
    backgroundColor: '#001F3F',
    padding: 16,
    borderRadius: 10,
    margin: 16,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  bottomNav: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001F3F',
    paddingVertical: 10,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: 200, // Perkecil ukuran gambar
    height: 150,
    margin: 16,
    borderRadius: 10,
  },
  photoContainer: {
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffdddd',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  deleteButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'red',
  },
});
