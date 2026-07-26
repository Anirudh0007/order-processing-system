import stripe from "../config/stripe.js";
import Order from "../models/order.model.js"
import Payment from '../models/payment.model.js'
import config from "../config/env.js";

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
        automatic_payment_methods:{
            enabled:true,
            allow_redirects:'never'

        },

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

const handleStripeWebHook=async(signature, payload)=>{
    const event= stripe.webhooks.constructEvent(
        payload,
        signature,
        config.STRIPE_WEBHOOK_SECRET
    )
     console.log("Webhook verified:", event.type);
    switch(event.type)
    {
        case "payment_intent.succeeded":
            const paymentIntent=event.data.object;
            console.log(paymentIntent.id);
            const payment=await Payment.findOne({
                transactionId:paymentIntent.id
            })
                        if(!payment)
            {
                throw new Error("Payment not found");
            }
            if(payment.status==='PAID') return;

         payment.status='PAID';
         await payment.save();
         const order=await Order.findById(payment.order);
         if(!order) {
            throw new Error('Order not found');
         }
         order.status='PAID';
         await order.save();
         return;
        
        default:
            console.log(`Unhandled event :${event.type}`);

    }
   
}

const confirmPaymentIntent=async(paymentIntentId)=>{
    const paymentIntent=await stripe.paymentIntents.confirm(
        paymentIntentId,
        {
            payment_method:"pm_card_visa"
        }
    )
    return paymentIntent;
}

export {createPaymentIntent, handleStripeWebHook, confirmPaymentIntent};