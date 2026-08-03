import { success } from "zod";
import { cancelOrder, createOrder, getOrder, getOrderById, updateOrderStatus } from "../services/order.service.js";

const createOrderController=async(req,res, next)=>{
    try{
        const order=await createOrder({
            ...req.body,
            user: req.user.id
        });

        return res.status(201).json({
            success:true,
            message:'Order created successfully',
            data:order
        })

    }
    catch(error)
    {
        next(error);
    }
}

const getOrderController=async(req, res, next)=>{

    try{
        const page=Number(req.query.page)||1;
        const limit= Number(req.query.limit)||10;
        const status=req.query.status;
        const sort=req.query.sort || 'createdAt';
        const order=req.query.order|| 'desc';
        const search=req.query.search || '';
        const result= await getOrder({user:req.user, page, limit, status, sort, order, search});
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result
        })

    }
    catch(error)
    {
        next(error);
    }
}

const getOrderByIdController=async(req,res,next)=>{
    try {
        const order=await getOrderById(
            req.params.id,
            req.user
        )

        return res.status(200).json({
            success:true,
            message: "Order fetched successfully",
            data: order
        })
        
    } catch (error) {
        next(error);
    }
}

const updateStatusController=async(req,res,next)=>{
    try{

        const order=await updateOrderStatus(req.params.id, req.body.status);
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        })


    }
    catch(error)
    {
        next(error);
    }
}

const cancelOrderController=async(req,res,next)=>{
    try{

        const order=await cancelOrder(
            req.params.id, req.user
        )
        return res.status(200).json({
            success:true,
            message: "Order cancelled successfully",
            data: order
        })

    }
    catch(error)
    {
        next(error);
    }
}


export {createOrderController, getOrderController, getOrderByIdController,cancelOrderController, updateStatusController};