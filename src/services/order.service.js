import Order from "../models/order.model.js";
import emailQueue from "../queues/email.queue.js";

const createOrder=async(orderData)=>{
    const order= await Order.create(orderData);

    await emailQueue.add("send-order-confirmation",
        {
            orderId:order._id.toString(),
            customerName: order.customerName,
            email: order.email,
            totalAmount: order.totalAmount
        }
    )

    return order;
}

export {createOrder};