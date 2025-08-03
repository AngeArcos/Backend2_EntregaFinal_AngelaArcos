// src/daos/user.dao.js
import UserModel from '../models/user.model.js';

export default class UserDAO {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async create(user) {
    return await UserModel.create(user);
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async updatePassword(id, newPassword) {
    return await UserModel.findByIdAndUpdate(id, { password: newPassword });
  }
}