import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Importação da navegação
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Tela Home
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Home</Text>
    </View>
  );
}

// Tela Outra
function TelaPerfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Perfil</Text>
    </View>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

// Função para a navegação Tab
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} />

      <Tab.Screen
        name="Perfil"
        component={TelaPerfil}
        options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

// Função para a navegação Drawer
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home" options={{ headerShown: false }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator} />
        
      <Drawer.Screen
        name="Perfil"
        component={TelaPerfil} />
    </Drawer.Navigator>
  );
}

// Componente principal da navegação
export default function App() {
  return (
    <DrawerNavigator />
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0C4DE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
