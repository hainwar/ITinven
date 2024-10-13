import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('./assets/TVRI_SULSEL_2023.svg.png')} style={styles.logo} />
        <View>
          <Text style={styles.title}>IT Inventori TVRI Sulawesi Selatan</Text>
          <Text style={styles.subtitle}>TVRI Sulsel In Your Hand...</Text>
        </View>
      </View>

      {/* Red Container Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PEMINJAMAN, PENGEMBALIAN, CEK STATUS BARANG?</Text>
        <Text style={styles.infoText}>
          Gampang kok sisa buka menu, isi sesuai, klik proses
          jika data berhasil didaftarkan...
        </Text>
      </View>

      {/* Main Menu */}
      <ScrollView>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('Peminjaman')} // Navigasi ke Peminjaman saat di klik
        >
          <FontAwesome name="book" size={24} color="brown" /> {/* Ganti ikon Peminjaman */}
          <Text style={styles.menuText}>PEMINJAMAN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}
        onPress={() => navigation.navigate('Pengembalian')}>
          <FontAwesome name="undo" size={24} color="brown" /> {/* Ganti ikon Pengembalian */}
          <Text style={styles.menuText}>PENGEMBALIAN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="list-alt" size={24} color="brown" /> {/* Ganti ikon Daftar Barang */}
          <Text style={styles.menuText}>DAFTAR BARANG</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <FontAwesome name="home" size={24} color="black" />
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
    padding: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});
