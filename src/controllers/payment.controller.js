import { createPaymentIntent } from "../services/payment.service.js";


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

export {createPayment};