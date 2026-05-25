import { useEffect } from 'react';
import * as Location from 'expo-location';
import { sendDriverLocation } from '../api/driverApi';

export function useLocationTracking(enabled: boolean) {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    async function start() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted' || !enabled) return;

      const pos = await Location.getCurrentPositionAsync({});
      await sendDriverLocation(pos.coords.latitude, pos.coords.longitude);

      timer = setInterval(async () => {
        const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        await sendDriverLocation(current.coords.latitude, current.coords.longitude);
      }, 10000);
    }

    start();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [enabled]);
}
