import UserDAO from '../daos/user.dao.js';
import UserRepository from '../repositories/user.repository.js';
import AuthService from '../services/auth.service.js';
import UserDTO from '../dtos/user.dto.js';

const authService = new AuthService(new UserRepository(new UserDAO()));

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ status: 'success', message: 'Usuario registrado', user: new UserDTO(user) });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ status: 'success', token });
  } catch (err) {
    res.status(401).json({ status: 'error', message: err.message });
  }
};

export const current = async (req, res) => {
  try {
    const user = await authService.getCurrent(req.user.userId);
    res.json({ status: 'success', user: new UserDTO(user) });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};