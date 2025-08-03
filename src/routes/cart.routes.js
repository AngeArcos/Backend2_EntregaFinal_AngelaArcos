import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';
import { CartService } from '../services/cart.service.js';
import { CartRepository } from '../repositories/cart.repository.js';
import { CartDAO } from '../daos/cart.dao.js';
import { authJWT, checkRole } from '../middlewares/auth.js';

const router = Router();

const dao = new CartDAO();
const repository = new CartRepository(dao);
const service = new CartService(repository);
const controller = new CartController(service);

router.post('/', controller.createCart); 
router.get('/:cid', authJWT, controller.getCart);
router.post('/:cid/product/:pid', authJWT, checkRole('user'), controller.addToCart);

export default router;
