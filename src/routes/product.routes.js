import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { ProductService } from '../services/product.service.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { ProductDAO } from '../daos/product.dao.js';
import { authJWT, checkRole } from '../middlewares/auth.js';

const router = Router();

const dao = new ProductDAO();
const repository = new ProductRepository(dao);
const service = new ProductService(repository);
const controller = new ProductController(service);

router.get('/', controller.getAll);
router.get('/:pid', controller.getById);
router.post('/', authJWT, checkRole('admin'), controller.create);
router.put('/:pid', authJWT, checkRole('admin'), controller.update);
router.delete('/:pid', authJWT, checkRole('admin'), controller.delete);

export default router;