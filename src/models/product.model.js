import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: { type: String, unique: true },
  price: Number,
  stock: Number,
  category: String,
  status: { type: Boolean, default: true }
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', productSchema);
