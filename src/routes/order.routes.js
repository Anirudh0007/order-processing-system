import express from 'express';
import { cancelOrderController, createOrderController, getOrderByIdController, getOrderController, updateStatusController } from '../controllers/order.controller.js';
import authenticate from '../middleware/auth.middleware.js';
import authorize from '../middleware/authorize.middleware.js';

const router= express.Router();

router.get('/', authenticate, getOrderController);
router.post('/', authenticate, createOrderController);

router.get('/:id', authenticate, getOrderByIdController);
router.patch('/:id/status', authenticate, authorize, updateStatusController)
router.patch('/:id/cancel', authenticate, cancelOrderController);

export default router;