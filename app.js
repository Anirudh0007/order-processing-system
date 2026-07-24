import express from 'express';
import orderRoutes from './src/routes/order.routes.js';
import errorHandler from './src/middleware/error.middleware.js';
import paymentRoutes from './src/routes/payment.route.js'

const app=express();

app.use(express.json());
app.use('/api/v1/orders',orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use(errorHandler);

export default app;


