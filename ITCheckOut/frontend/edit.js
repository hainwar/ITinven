import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Edit({ route, navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    alat: '',
    date: '',
    petugas: '',
    photo: '',
  });

  const [errors, setErrors] = useState({}); // State untuk validasi input

  const { dataToEdit, index } = route.params || {};

  useEffect(() => {
    if (dataToEdit) {
      setFormData(dataToEdit); // Mengisi form dengan data yang akan diedit
    }
  }, [dataToEdit]);

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama peminjam harus diisi';
    if (!formData.alat.trim()) newErrors.alat = 'Nama alat harus diisi';
    if (!formData.date.trim()) newErrors.date = 'Tanggal harus diisi';
    if (!formData.petugas.trim()) newErrors.petugas = 'Nama petugas harus diisi';
    if (!formData.photo.trim()) newErrors.photo = 'URL foto harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true jika tidak ada error
  };

  const handleSave = async () => {
    if (!validateInputs()) {
      Alert.alert('Error', 'Mohon lengkapi semua data');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('historyData');
      const history = storedData ? JSON.parse(storedData) : [];

      if (index !== undefined) {
        // Mode edit: update data pada indeks tertentu
        history[index] = formData;
      } else {
        // Mode tambah data baru
        history.push({ ...formData, status: 'Belum Dikembalikan' });
      }

      await AsyncStorage.setItem('historyData', JSON.stringify(history));
      Alert.alert('Berhasil', 'Data berhasil disimpan');
      navigation.goBack(); // Kembali ke layar sebelumnya
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama Peminjam</Text>
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Nama Peminjam"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Nama Alat</Text>
      <View style={[styles.inputContainer, errors.alat && styles.errorInput]}>
        <Entypo name="tools" size={24} color="brown" style={styles.icon} />
        <TextInput
          style={[styles.input, styles.alatInput]}
          placeholder="Nama Alat"
          value={formData.alat}
          onChangeText={(text) => setFormData({ ...formData, alat: text })}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      {errors.alat && <Text style={styles.errorText}>{errors.alat}</Text>}

      <Text style={styles.label}>Tanggal Peminjaman</Text>
      <TextInput
        style={[styles.input, errors.date && styles.errorInput]}
        placeholder="Tanggal Peminjaman"
        value={formData.date}
        onChangeText={(text) => setFormData({ ...formData, date: text })}
      />
      {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

      <Text style={styles.label}>Nama Petugas</Text>
      <TextInput
        style={[styles.input, errors.petugas && styles.errorInput]}
        placeholder="Nama Petugas"
        value={formData.petugas}
        onChangeText={(text) => setFormData({ ...formData, petugas: text })}
      />
      {errors.petugas && <Text style={styles.errorText}>{errors.petugas}</Text>}

      <Text style={styles.label}>Foto (URL)</Text>
      <TextInput
        style={[styles.input, errors.photo && styles.errorInput]}
        placeholder="URL Foto"
        value={formData.photo}
        onChangeText={(text) => setFormData({ ...formData, photo: text })}
      />
      {errors.photo && <Text style={styles.errorText}>{errors.photo}</Text>}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#0070B8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  alatInput: {
    height: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
});
