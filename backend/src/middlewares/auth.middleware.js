import jwt from 'jsonwebtoken';

export const authGuard = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token ausente' });
  const token = header.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};
