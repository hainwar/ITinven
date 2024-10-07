import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function App() {
  const [note, setNote] = useState('');

  return (
    <View style={styles.container}>
      
      {/* Red Container Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PEMINJAMAN</Text>
      </View>
      
      {/* Main Menu */}
      <ScrollView>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>lampirkan Catatan:</Text>
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
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.button}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#001F3F',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#ddd',
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
  infoText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
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
    marginTop: 50,
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