import { Router } from 'express';
import { requestPasswordReset, performPasswordReset } from '../controllers/password.controller.js';

const router = Router();

router.post('/forgot', requestPasswordReset);
router.post('/reset/:token', performPasswordReset);

export default router;
