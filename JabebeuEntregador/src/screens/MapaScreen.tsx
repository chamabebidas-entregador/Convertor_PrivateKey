import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { openExternalNavigation } from '../utils/navigation';

export default function MapaScreen() {
  const [coords, setCoords] = useState({ latitude: -23.5505, longitude: -46.6333 });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        region={{ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
      >
        <Marker coordinate={coords} title="Você" />
      </MapView>
      <View style={{ padding: 16 }}>
        <Button title="Navegar externamente" onPress={() => openExternalNavigation(coords.latitude, coords.longitude)} />
      </View>
    </SafeAreaView>
  );
}
