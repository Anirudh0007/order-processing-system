import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import { createProductController, deleteProductController, getProductByIdController, updateProductController } from '../controllers/product.controller.js';
import {getProductController} from '../controllers/product.controller.js'
import authorize from '../middleware/authorize.middleware.js';
import validateProduct from '../middleware/validateProduct.middleware.js';


const router=express.Router();

router.post('/',authenticate, validateProduct, createProductController);
router.get(
    "/",getProductController
);
router.get(
    "/:id",
    getProductByIdController
);

router.patch("/:id", authenticate, authorize, updateProductController)
router.delete("/:id", authenticate, authorize, deleteProductController)

export default router;