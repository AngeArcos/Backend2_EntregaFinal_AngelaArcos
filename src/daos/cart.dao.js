import { CartModel } from '../models/cart.model.js';

export class CartDAO {
  async getCart(cartId) {
    return CartModel.findById(cartId).populate('products.product');
  }

  async createCart() {
    return CartModel.create({ products: [] });
  }

  async addToCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    const item = cart.products.find(p => p.product.toString() === productId);

    if (item) {
      item.quantity++;
    } else {
      cart.products.push({ product: productId });
    }

    await cart.save();
    return cart;
  }
 
  async update(cartId, data) {
  return CartModel.findByIdAndUpdate(cartId, data, { new: true });
}

}