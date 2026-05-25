import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import CorridasScreen from './src/screens/CorridasScreen';
import MapaScreen from './src/screens/MapaScreen';
import CarteiraScreen from './src/screens/CarteiraScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Corridas" component={CorridasScreen} />
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Carteira" component={CarteiraScreen} />
      <Tab.Screen name="Histórico" component={HistoricoScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { token } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
