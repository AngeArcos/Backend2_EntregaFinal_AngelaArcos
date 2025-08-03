import { Router } from 'express';
import { authJWT, checkRole } from '../middlewares/auth.js';
import { PurchaseController } from '../controllers/purchase.controller.js';
import { PurchaseService } from '../services/purchase.service.js';
import { CartRepository } from '../repositories/cart.repository.js';
import { CartDAO } from '../daos/cart.dao.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { ProductDAO } from '../daos/product.dao.js';
import { TicketRepository } from '../repositories/ticket.repository.js';
import { TicketDAO } from '../daos/ticket.dao.js';

const router = Router();

const cartRepo = new CartRepository(new CartDAO());
const productRepo = new ProductRepository(new ProductDAO());
const ticketRepo = new TicketRepository(new TicketDAO());

const service = new PurchaseService(cartRepo, productRepo, ticketRepo);
const controller = new PurchaseController(service);

router.post('/:cid/purchase', authJWT, checkRole('user'), controller.processPurchase);



export default router;