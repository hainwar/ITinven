import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      

      {/* Red Container Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PEMINJAMAN?</Text>
        <Text style={styles.infoText}>
          isi sesuai data yang di minta, klik proses
          jika sudah sesuai 
        </Text>
      </View>

      {/* Main Menu */}
      <ScrollView>
      <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="credit-card" size={24} color="brown" />
          <Text style={styles.menuText}>NAMA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="credit-card" size={24} color="brown" />
          <Text style={styles.menuText}>TANGGAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="payment" size={24} color="brown" />
          <Text style={styles.menuText}>AMBIL PHOTO</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.bottomNav}>
          <FontAwesome name="credit-card" size={24} color="brown" />
          <Text style={styles.menuText}>AJUKAN</Text>
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
    marginTop:50,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});