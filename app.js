import express from 'express';
import orderRoutes from './src/routes/order.routes.js';
import errorHandler from './src/middleware/error.middleware.js';
import paymentRoutes from './src/routes/payment.route.js';
import otpRoutes from './src/routes/otp.routes.js'
import { serverAdapter } from './src/config/bullboard.js';
import healthRoutes from './src/routes/health.routes.js'
import requestLogger from './src/middleware/requestLogger.middleware.js';

const app=express();

app.use(requestLogger);
app.use("/api/orders", orderRoutes);

app.use('/api/v1/payments/webhook', express.raw({
    type:'application/json'
}));
app.use(express.json());
app.use('/api/v1/orders',orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/otp', otpRoutes)
app.use("/admin/queues", serverAdapter.getRouter());
app.use('/health', healthRoutes);
app.use(errorHandler);

export default app;


