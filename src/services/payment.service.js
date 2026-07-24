import stripe from "../config/stripe.js";
import Order from "../models/order.model.js"
import Payment from '../models/payment.model.js'

const createPaymentIntent=async(orderId)=>{
    const order=await Order.findById(orderId);
    if(!order)
    {
        throw new Error("Order not found");
    }
    if(order.status!=='PENDING_PAYMENT')
    {
        throw new Error("Payment cannot be created for the order");
    }

    const existingPayment=await Payment.findOne({
        order:orderId,
        status:"PENDING"
    })
    if(existingPayment)
    {
        return {
            payment:existingPayment,
            clientSecret:null,
            message: "Pending payment already exisis"
        }
    }

    const paymentIntent=await stripe.paymentIntents.create({
        amount: order.totalAmount*100,
        currency:'inr',
        metadata:{
            orderId: order._id.toString(),
        }
    });

    const payment=await Payment.create({
        order:order._id,
        amount:order.totalAmount,
        transactionId:paymentIntent.id,
        status:'PENDING'
    })
    return{ payment, clientSecret:paymentIntent.client_secret}
}

export {createPaymentIntent};