import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';
import { loginDriver } from '../api/driverApi';

type AuthContextType = {
  token: string | null;
  signIn: (phone: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('driver_token').then(saved => {
      if (saved) {
        setToken(saved);
        api.defaults.headers.common.Authorization = `Bearer ${saved}`;
      }
    });
  }, []);

  const signIn = async (phone: string, password: string) => {
    const data = await loginDriver(phone, password);
    setToken(data.token);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    await AsyncStorage.setItem('driver_token', data.token);
  };

  const signOut = async () => {
    setToken(null);
    delete api.defaults.headers.common.Authorization;
    await AsyncStorage.removeItem('driver_token');
  };

  return <AuthContext.Provider value={{ token, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
