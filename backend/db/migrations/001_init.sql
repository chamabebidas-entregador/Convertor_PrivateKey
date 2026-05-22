-- Estrutura inicial simplificada
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('CLIENT','STORE','COURIER','ADMIN')),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES users(id),
  status TEXT NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) NOT NULL,
  store_amount NUMERIC(10,2) NOT NULL,
  platform_amount NUMERIC(10,2) NOT NULL,
  courier_amount NUMERIC(10,2) NOT NULL,
  pickup_code CHAR(5) NOT NULL,
  delivery_code CHAR(5) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
