import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function App() {
  const [itemCode, setItemCode] = useState('');
  const [note, setNote] = useState('');

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>CEK STATUS BARANG</Text>
      </View>
      
      {/* Main Content */}
      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Kode Barang:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setItemCode}
            value={itemCode}
            placeholder="Masukkan kode barang..."
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Catatan Tambahan:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            onChangeText={setNote}
            value={note}
            placeholder="Masukkan catatan tambahan di sini..."
          />
        </View>
      </ScrollView>
      
      {/* Bottom Button */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CEK STATUS</Text>
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
  header: {
    backgroundColor: '#001F3F',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  bottomNav: {
    backgroundColor: '#0070B8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#001F3F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});