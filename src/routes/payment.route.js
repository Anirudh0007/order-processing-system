import express from "express";
import {
    confirmPayment,
  createPayment,
  stripeWebhook,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-intent", createPayment);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

router.post('/confirm', confirmPayment)

export default router;