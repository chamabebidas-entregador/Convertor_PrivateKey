# Plataforma Delivery de Bebidas (Mobile + Backend)

## Visão geral
Projeto base com arquitetura profissional para app mobile de delivery de adegas com 4 perfis (Cliente, Adega, Entregador, Admin).

## Estrutura
- `mobile/` app React Native/Expo (Android e iOS)
- `backend/` API Node.js/Express
- `backend/db/migrations` migrations PostgreSQL

## Funcionalidades já implementadas (base funcional backend)
- Auth com cadastro/login/refresh token JWT
- Proteção de rotas
- Criação e listagem de pedidos
- Regras financeiras fixas:
  - Adega 90% do subtotal
  - Plataforma 10%
  - Entregador 100% da taxa de entrega
- Geração de código de retirada (5 dígitos) e entrega (5 dígitos)

## Rodar backend
```bash
cd backend
npm install
npm run dev
```

## Endpoints
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/orders` (Bearer token)
- `GET /api/v1/orders` (Bearer token)

## Próximos módulos (já previstos na arquitetura)
- WebSocket de rastreio em tempo real
- Integração Asaas (Pix/cartão)
- Upload S3/R2
- FCM push por perfil
- Antifraude com GPS/IP/device
- Chat interno com mídia
- Carteira com saque mínimo e limite 1/dia
- Observabilidade, backup e dashboard premium
