import { ProductModel } from '../models/product.model.js';

export class ProductDAO {
  async getAll() {
    return ProductModel.find();
  }

  async getById(id) {
    return ProductModel.findById(id);
  }

  async create(product) {
    return ProductModel.create(product);
  }

  async update(id, updates) {
    return ProductModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}
