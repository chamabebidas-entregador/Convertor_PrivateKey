import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { deliveryHistory } from '../api/driverApi';

export default function HistoricoScreen() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    deliveryHistory().then(setHistory).catch(() => setHistory([]));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={history}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ borderBottomWidth: 1, paddingVertical: 8 }}>
            <Text style={{ fontWeight: '600' }}>{item.pickupLabel} ➜ {item.dropoffLabel}</Text>
            <Text>Valor: R$ {Number(item.price).toFixed(2)}</Text>
            <Text>Data: {item.finishedAt}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
