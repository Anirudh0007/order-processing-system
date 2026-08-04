
import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import { addToCartController, checkoutController, clearCartController, decreaseQuantityController, getCartController, increaseQuantityController, removeFromCartController, updateCartQuantityController } from '../controllers/cart.controller.js';

const router=express.Router();

router.post("/", authenticate, addToCartController);
router.get(
    "/",
    authenticate,
    getCartController
);
router.patch(
    "/:productId",
    authenticate,
    updateCartQuantityController
);

router.patch("/:productId/increase", authenticate, increaseQuantityController);
router.patch("/:productId/decrease", authenticate, decreaseQuantityController)
router.delete(
    "/:productId",
    authenticate,
    removeFromCartController
);
router.delete(
    "/",
    authenticate,
    clearCartController
);
router.post(
    "/checkout",
    authenticate,
    checkoutController
);

export default router;