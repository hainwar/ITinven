import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (note.trim()) {
      axios.post('http://localhost:5000/api/peminjaman', { note })
        .then(response => {
          Alert.alert('Sukses', response.data);
          setNote('');  // Clear input after success
        })
        .catch(error => {
          console.error('Error saving data: ', error);
          Alert.alert('Error', 'Gagal menyimpan data.');
        });
    } else {
      Alert.alert('Error', 'Catatan tidak boleh kosong.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PEMINJAMAN</Text>
      </View>

      <ScrollView>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Lampirkan Catatan:</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            onChangeText={setNote}
            value={note}
            placeholder="Masukkan catatan di sini..."
          />
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>LANJUTKAN</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
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
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  bottomNav: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#001F3F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
