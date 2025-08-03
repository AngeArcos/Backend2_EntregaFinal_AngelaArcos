// middlewares/auth.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido o expirado' });
    req.user = decoded;
    next();
  });
};

export const checkRole = role => {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: `Acceso restringido al rol: ${role}` });
    next();
  };
};
