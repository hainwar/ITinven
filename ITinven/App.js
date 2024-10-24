import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './frontend /Login'; // Hapus spasi yang tidak diinginkan
import Register from './frontend /Register';
import Home from './frontend /Home';    // Pastikan nama dan jalur benar
import Peminjaman from './frontend /Peminjaman';
import Pengembalian from './frontend /Pengembalian';
import konfirmas_peminjaman from './frontend /konfirmas_peminjaman';
import konfirmas_pengembalian from './frontend /konfirmas_pengembalian';
import data from './frontend /data';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen 
          name="Register" 
          component={Register}
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />

        <Stack.Screen 
          name="Peminjaman" 
          component={Peminjaman} 
          options={{ 
            headerLeft: () => null,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="Pengembalian" 
          component={Pengembalian} 
          options={{ 
            headerLeft: () => null,
            gestureEnabled: false 
          }} 
        />

        <Stack.Screen 
          name="konfirmas_peminjaman" 
          component={konfirmas_peminjaman}
          options={{ 
            headerLeft: () => null,
            gestureEnabled: false 
          }} 
        />

        <Stack.Screen 
          name="konfirmas_pengembalian" 
          component={konfirmas_pengembalian}
          options={{ 
            headerLeft: () => null,
            gestureEnabled: false 
          }} 
        />
          <Stack.Screen 
          name="data" 
          component={data}
          options={{ 
            headerLeft: () => null,
            gestureEnabled: false 
          }} 
          />
          </Stack.Navigator>
    </NavigationContainer>
  );
}
