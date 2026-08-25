import { useEffect } from 'react';
import * as Location from 'expo-location';
import { sendDriverLocation } from '../api/driverApi';

export function useLocationTracking(enabled: boolean) {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let cancelled = false;

    async function start() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (cancelled || status !== 'granted' || !enabled) return;

      const pos = await Location.getCurrentPositionAsync({});
      if (cancelled) return;
      await sendDriverLocation(pos.coords.latitude, pos.coords.longitude);
      if (cancelled) return;

      timer = setInterval(async () => {
        const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        if (cancelled) return;
        await sendDriverLocation(current.coords.latitude, current.coords.longitude);
      }, 10000);
    }

    start();

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [enabled]);
}
