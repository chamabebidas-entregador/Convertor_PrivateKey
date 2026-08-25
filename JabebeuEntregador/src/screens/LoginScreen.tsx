import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      await signIn(phone, password);
    } catch {
      Alert.alert('Erro', 'Não foi possível entrar.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Jabebeu Entregador</Text>
      <TextInput placeholder="Telefone" value={phone} onChangeText={setPhone} style={{ borderWidth: 1, borderRadius: 8, padding: 12 }} />
      <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, borderRadius: 8, padding: 12 }} />
      <View>
        <Button title="Entrar" onPress={onSubmit} />
      </View>
    </SafeAreaView>
  );
}
