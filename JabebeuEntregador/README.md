# Jabebeu Entregador (Expo)

Aplicativo React Native com Expo para motoboys do Jabebeu.

## Funcionalidades
- Login de entregador.
- Corridas disponíveis e aceitar corrida.
- Rastreamento GPS e envio periódico para `/api/drivers/location`.
- Mapa com localização atual.
- Abertura de navegação externa (Google Maps, Waze, TomTom GO).
- Fluxo de status: adega -> cliente -> entregue com código de confirmação.
- Carteira e histórico.

## Configuração
1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure a URL da API em `app.json` via `expo.extra.apiBaseUrl` se necessário.
3. Rode:
   ```bash
   npm run start
   ```
