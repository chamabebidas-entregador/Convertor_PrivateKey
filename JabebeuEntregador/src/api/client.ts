import axios from 'axios';
import Constants from 'expo-constants';

const baseURL = Constants.expoConfig?.extra?.apiBaseUrl ?? 'https://api.jabebeu.com';

export const api = axios.create({
  baseURL,
  timeout: 15000
});
