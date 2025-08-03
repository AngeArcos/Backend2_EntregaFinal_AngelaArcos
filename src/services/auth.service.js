import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export default class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) throw new Error('El usuario ya existe');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return newUser;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Credenciales inválidas');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpires }
    );

    return token;
  }

  async getCurrent(userId) {
    const user = await this.userRepository.findById(userId);
    return user;
  }
}
