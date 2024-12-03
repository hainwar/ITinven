import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './frontend/Login';
import Register from './frontend/Register';
import Home from './frontend/Home';
import Peminjaman from './frontend/Peminjaman';
import data from './frontend/history';
import Edit from './frontend/edit'; // Tambahkan ini
import ViewPhoto from './frontend/ViewPhoto'; // Tambahkan ini


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            headerShown: false,
          }} 
        />
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
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="data" 
          component={data} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="Edit" // Tambahkan layar Edit
          component={Edit} 
          options={{
            headerShown: true,
            title: 'Edit Data',
          }} 
        />
        <Stack.Screen 
          name="ViewPhoto" // Tambahkan layar ViewPhoto
          component={ViewPhoto} 
          options={{
            headerShown: true,
            title: 'Lihat Foto',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
