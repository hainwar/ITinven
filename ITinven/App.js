import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'; // Sesuaikan path jika diperlukan
import Register from './Register'; // Sesuaikan path jika diperlukan
import Home from './Home';
import peminjaman from './peminjaman';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="peminjaman" component={peminjaman} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
