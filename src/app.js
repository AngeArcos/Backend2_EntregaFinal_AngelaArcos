import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import passport from 'passport';
import './config/passport.config.js';

import sessionRoutes from './routes/session.routes.js';
import passwordRoutes from './routes/password.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); 

app.use('/api/sessions', sessionRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/carts', purchaseRoutes); 

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB correctamente');
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
  });
})
.catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});
