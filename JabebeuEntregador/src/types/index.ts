export type Driver = {
  id: string;
  name: string;
  phone: string;
};

export type RideStatus =
  | 'DISPONIVEL'
  | 'ACEITA'
  | 'A_CAMINHO_ADEGA'
  | 'NA_ADEGA'
  | 'A_CAMINHO_CLIENTE'
  | 'ENTREGUE';

export type Ride = {
  id: string;
  pickupLabel: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLabel: string;
  dropoffLat: number;
  dropoffLng: number;
  price: number;
  code?: string;
  status: RideStatus;
};
