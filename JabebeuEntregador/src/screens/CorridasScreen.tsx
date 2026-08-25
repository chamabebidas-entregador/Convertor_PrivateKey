import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import { acceptRide, getAvailableRides, updateRideStatus } from '../api/driverApi';
import { Ride } from '../types';
import { useLocationTracking } from '../hooks/useLocationTracking';

const STATUS_FLOW = ['A_CAMINHO_ADEGA', 'NA_ADEGA', 'A_CAMINHO_CLIENTE', 'ENTREGUE'] as const;

export default function CorridasScreen() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  useLocationTracking(Boolean(activeRide));

  useEffect(() => {
    getAvailableRides().then(setRides).catch(() => Alert.alert('Erro', 'Não foi possível carregar corridas'));
  }, []);

  const onAcceptRide = async (rideId: string) => {
    const ride = await acceptRide(rideId);
    setActiveRide(ride);
    setRides(prev => prev.filter(r => r.id !== rideId));
  };

  const progressStatus = async () => {
    if (!activeRide) return;
    const currentIndex = STATUS_FLOW.findIndex(s => s === activeRide.status);
    const nextStatus = STATUS_FLOW[currentIndex + 1];

    if (!nextStatus) return;

    if (nextStatus === 'ENTREGUE' && !confirmationCode) {
      Alert.alert('Código obrigatório', 'Informe o código de confirmação do cliente.');
      return;
    }

    await updateRideStatus(activeRide.id, nextStatus, confirmationCode || undefined);
    setActiveRide({ ...activeRide, status: nextStatus });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {activeRide ? (
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: '700' }}>Corrida ativa: {activeRide.id}</Text>
          <Text>Status: {activeRide.status}</Text>
          <Text>Origem: {activeRide.pickupLabel}</Text>
          <Text>Destino: {activeRide.dropoffLabel}</Text>
          <TextInput
            placeholder="Código de confirmação"
            value={confirmationCode}
            onChangeText={setConfirmationCode}
            style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
          />
          <Button
            title="Avançar status"
            onPress={progressStatus}
            disabled={activeRide.status === 'ENTREGUE'}
          />
        </View>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <Text style={{ fontWeight: '600' }}>{item.pickupLabel} ➜ {item.dropoffLabel}</Text>
              <Text>R$ {item.price.toFixed(2)}</Text>
              <Button title="Aceitar corrida" onPress={() => onAcceptRide(item.id)} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
