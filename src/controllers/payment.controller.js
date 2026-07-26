import { confirmPaymentIntent, createPaymentIntent, handleStripeWebHook  } from "../services/payment.service.js";


const createPayment=async(req,res, next)=>{
    try{
        const {orderId}=req.body;
        const result = await createPaymentIntent(orderId);
        return res.status(201).json({
            success:true,
            message:"Payment intent created successfully",
            data:result
        })
    }
    catch(error)
    {
        next(error);
    }
}

const stripeWebhook=async(req,res, next)=>{
    try{

        const signature=req.headers['stripe-signature'];
        await handleStripeWebHook(signature, req.body);
        return res.status(200).json({
            received:true
        })
    }
    catch(error)
    {
        next(error);
    }
}

const confirmPayment=async(req,res, next)=>{
    try{
        const {paymentIntentId}=req.body;
        const payment=await confirmPaymentIntent(paymentIntentId);
        return res.status(200).json({
            success:true,
            message:'Payment confirmed successfully',
            data:payment
        })
    }
    catch(error)
    {
        next(error);
    }
}
export {createPayment, stripeWebhook, confirmPayment};