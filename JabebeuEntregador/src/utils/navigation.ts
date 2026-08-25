import { Alert, Linking } from 'react-native';

export async function openExternalNavigation(lat: number, lng: number) {
  const destinations = [
    { name: 'Google Maps', url: `google.navigation:q=${lat},${lng}` },
    { name: 'Waze', url: `waze://?ll=${lat},${lng}&navigate=yes` },
    { name: 'TomTom GO', url: `tomtomgo://x-callback-url/navigate?lat=${lat}&long=${lng}` }
  ];

  for (const app of destinations) {
    const supported = await Linking.canOpenURL(app.url);
    if (supported) {
      await Linking.openURL(app.url);
      return;
    }
  }

  Alert.alert('Sem app de navegação', 'Nenhum app suportado foi encontrado.');
}
