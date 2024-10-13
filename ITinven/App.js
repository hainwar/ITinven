import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'; // Sesuaikan path jika diperlukan
import Register from './Register'; // Sesuaikan path jika diperlukan
import Home from './Home';
import Peminjaman from './Peminjaman'; 
import konfirmas_peminjaman from './konfirmas_peminjaman';
import Pengembalian from './Pengembalian';
import konfirmas_pengembalian from './konfirmas_pengembalian';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login dan Register tidak memerlukan perubahan */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* Menghilangkan header di Home */}
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ 
            headerShown: false,    // Menyembunyikan header
            gestureEnabled: false  // Menonaktifkan gesture swipe untuk kembali
          }} 
        />

        {/* Menghilangkan tombol kembali di semua screen */}
        <Stack.Screen 
          name="Peminjaman" 
          component={Peminjaman} 
          options={{ 
            headerLeft: () => null,  // Menghilangkan tombol kembali
            gestureEnabled: false    // Nonaktifkan gesture swipe-back
          }} 
        />

        <Stack.Screen 
          name="konfirmas_peminjaman" 
          component={konfirmas_peminjaman}
          options={{ 
            headerLeft: () => null,  // Menghilangkan tombol kembali
            gestureEnabled: false    // Nonaktifkan gesture swipe-back
          }} 
        />

        <Stack.Screen 
          name="Pengembalian" 
          component={Pengembalian}
          options={{ 
            headerLeft: () => null,  // Menghilangkan tombol kembali
            gestureEnabled: false    // Nonaktifkan gesture swipe-back
          }} 
        />

        <Stack.Screen 
          name="konfirmas_pengembalian" 
          component={konfirmas_pengembalian}
          options={{ 
            headerLeft: () => null,  // Menghilangkan tombol kembali
            gestureEnabled: false    // Nonaktifkan gesture swipe-back
          }} 
        />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}
