
import {loginUser, registerUser} from "../services/auth.service.js"

const registerController=async(req, res, next)=>{
    try{
    const user=await registerUser(req.body);

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        data:user
    })
}
catch(error)
{
    next(error)
}
}


const loginController=async(req, res, next)=>{
    try{
        const data=await loginUser(req.body);
        return res.status(200).json({
            success:true,
            message: 'User logged in successfully',
            data
        })
    }
    catch(error)
    {
        next(error);
    }
}



export {registerController, loginController};