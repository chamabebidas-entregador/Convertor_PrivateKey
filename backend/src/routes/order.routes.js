import { Router } from 'express';
import { createOrder, listOrders } from '../controllers/order.controller.js';
import { authGuard } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(authGuard);
router.post('/', createOrder);
router.get('/', listOrders);

export default router;
