import BadRequestError from "../errors/BadRequestError.js";
import ForbiddenError from "../errors/ForbiddenError.js";
import NotFoundError from "../errors/NotFoundError.js";
import Order from "../models/order.model.js";

const createOrder=async(orderData)=>{
    const order= await Order.create(orderData);

   
    return order;
}

const getOrder=async({user, page, limit, status, sort, order, search})=>{

    const skip=(page-1)*limit;
    const query={};
    const sortOption={};
    sortOption[sort]=order==='asc'?1:-1;
    let orders;
    
    let totalOrders;
    

    if(user.role!=='admin')
    {
        query.user=user.id;
    }

    if(status)
    {
        query.status=status;
    }
    if (search) {
    query.$or = [
        {
            customerName: {
                $regex: search,
                $options: "i"
            }
        },
        {
            email: {
                $regex: search,
                $options: "i"
            }
        }
    ];
}

    orders=await Order.find(query).sort(sortOption).skip(skip).limit(limit);
    totalOrders=await Order.countDocuments(query);
    
    
    return {
        orders, pagination:{
            page, limit, totalOrders, totalPages: Math.ceil(totalOrders/limit)
        }
    }
}



const getOrderById=async(orderId, user)=>{

    const order=await Order.findById(orderId).populate('user',"name email role");

    if(!order)
    {
        throw new NotFoundError("Order not found");
    }

    if(user.role==='admin')
    {
        return order;
    }

    if(order.user._id.toString()!==user.id)
    {
        throw new ForbiddenError(
            "You are not authorized to access this order"
        )
    }
    return order;

}

const updateOrderStatus=async(orderId, status)=>{

    const order=await Order.findById(orderId);
    if(!order)
    {
        throw new NotFoundError("Order not found");
    }
    const allowedStatuses = [
    "PENDING_PAYMENT",
    "PAID",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED",
];

if (!allowedStatuses.includes(status)) {
    throw new BadRequestError("Invalid order status");
}
    order.status=status;
    await order.save();
    return order;


}


const cancelOrder=async(orderId, user)=>{
    const order=await Order.findById(orderId);
    if(!order)
    {
        throw new NotFoundError('Order not found');
    }

    if(user.role!=='admin' && order.user.toString()!==user.id)
    {
        throw new ForbiddenError("You are not authorised to cancel this order");
    }
    if(order.status==='SHIPPED' || order.status==='DELIVERED')
    {
        throw new BadRequestError("Order can no longer be cancelled");
    }
    order.status='CANCELLED';
    await order.save();
    return order;

}

export {createOrder, getOrder, getOrderById, updateOrderStatus, cancelOrder};