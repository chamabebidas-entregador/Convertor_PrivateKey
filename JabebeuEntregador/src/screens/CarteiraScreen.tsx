import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { walletSummary } from '../api/driverApi';

export default function CarteiraScreen() {
  const [wallet, setWallet] = useState<{ balance: number; pending: number } | null>(null);

  useEffect(() => {
    walletSummary().then(setWallet).catch(() => setWallet({ balance: 0, pending: 0 }));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Carteira</Text>
      <Text>Saldo disponível: R$ {wallet?.balance?.toFixed(2) ?? '0.00'}</Text>
      <Text>Saldo pendente: R$ {wallet?.pending?.toFixed(2) ?? '0.00'}</Text>
    </SafeAreaView>
  );
}
