import { api } from './client';
import { Ride } from '../types';

export async function loginDriver(phone: string, password: string) {
  const { data } = await api.post('/api/drivers/login', { phone, password });
  return data;
}

export async function getAvailableRides() {
  const { data } = await api.get<Ride[]>('/api/rides/available');
  return data;
}

export async function acceptRide(rideId: string) {
  const { data } = await api.post(`/api/rides/${rideId}/accept`);
  return data as Ride;
}

export async function updateRideStatus(rideId: string, status: string, code?: string) {
  const { data } = await api.post(`/api/rides/${rideId}/status`, { status, code });
  return data;
}

export async function sendDriverLocation(lat: number, lng: number) {
  return api.post('/api/drivers/location', { latitude: lat, longitude: lng, at: new Date().toISOString() });
}

export async function walletSummary() {
  const { data } = await api.get('/api/drivers/wallet');
  return data;
}

export async function deliveryHistory() {
  const { data } = await api.get('/api/drivers/history');
  return data;
}
