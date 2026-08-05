import express from 'express';
import orderRoutes from './src/routes/order.routes.js';
import errorHandler from './src/middleware/error.middleware.js';
import paymentRoutes from './src/routes/payment.route.js';
import otpRoutes from './src/routes/otp.routes.js';
import { serverAdapter } from './src/config/bullboard.js';
import healthRoutes from './src/routes/health.routes.js';
import requestLogger from './src/middleware/requestLogger.middleware.js';
import authRoutes from './src/routes/auth.routes.js';
import productRoutes from "./src/routes/product.route.js";
import cartRoutes from "./src/routes/cart.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
const app = express();

// 1. Logger
app.use(requestLogger);

// 2. Raw parser ONLY for payment webhook
app.use('/api/v1/payments/webhook', express.raw({
    type: 'application/json'
}));

// 3. Global JSON parser for all subsequent endpoints
app.use(express.json());

// 4. API Endpoints
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/admin/queues', serverAdapter.getRouter());
app.use('/health', healthRoutes);
app.use('/api/v1/products', productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/reviews", reviewRoutes);
// 5. Error Handler Middleware
app.use(errorHandler);

export default app;