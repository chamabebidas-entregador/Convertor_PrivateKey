import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const users = [];
const refreshTokens = new Set();

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['CLIENT', 'STORE', 'COURIER', 'ADMIN'])
});

export const register = async (req, res) => {
  const data = schema.parse(req.body);
  if (users.find(u => u.email === data.email)) return res.status(409).json({ error: 'E-mail já cadastrado' });
  const hash = await bcrypt.hash(data.password, 10);
  const user = { id: users.length + 1, ...data, password: hash };
  users.push(user);
  res.status(201).json({ id: user.id, email: user.email, role: user.role });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Credenciais inválidas' });
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET || 'dev_refresh', { expiresIn: '7d' });
  refreshTokens.add(refreshToken);
  res.json({ accessToken, refreshToken });
};

export const refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshTokens.has(refreshToken)) return res.status(401).json({ error: 'Refresh inválido' });
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'dev_refresh');
  const user = users.find(u => u.id === payload.sub);
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '15m' });
  res.json({ accessToken });
};
