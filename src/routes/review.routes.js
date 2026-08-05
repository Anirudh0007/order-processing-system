import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import validateReview from '../middleware/validateReview.middleware.js';
import { createReviewController, deleteReviewController, getProductReviewsController, getReviewStatsController, updateReviewController } from '../controllers/review.controller.js';

const router=express.Router();

router.post('/', authenticate, validateReview, createReviewController);
router.get(
    "/product/:productId",
    getProductReviewsController
);
router.patch(
    "/:reviewId",
    authenticate,
    validateReview,
    updateReviewController
);
router.delete(
    "/:reviewId",
    authenticate,
    deleteReviewController
);
router.get(
    "/product/:productId/stats",
    getReviewStatsController
);
export default router;