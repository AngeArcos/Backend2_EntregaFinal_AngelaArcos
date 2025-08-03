import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import UserRepository from '../repositories/user.repository.js';
import UserDAO from '../daos/user.dao.js';

const userRepo = new UserRepository(new UserDAO());

export const generateResetToken = (email) => {
  return jwt.sign({ email }, config.jwtResetSecret, { expiresIn: '1h' });
};

export const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, config.jwtResetSecret);
  } catch (err) {
    return null;
  }
};

export const resetPassword = async (email, newPassword) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error('Usuario no encontrado');

  const isSame = await bcrypt.compare(newPassword, user.password);
  if (isSame) throw new Error('La nueva contraseña no puede ser igual a la anterior');

  const hashed = await bcrypt.hash(newPassword, 10);
  await userRepo.updatePassword(user._id, hashed);
};
