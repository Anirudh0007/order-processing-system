import { sendOTP } from "../services/otp.service.js";

const generateOTP=async(req,res, next)=>{
    try{

        const result=await sendOTP(req.body.phone);
        res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

export {generateOTP};