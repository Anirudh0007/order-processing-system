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
    console.log("Saved order:", order);
console.log("Is new:", order.isNew);
const count = await Order.countDocuments();
console.log("Count:", count);
console.log("Collection name:", Order.collection.name);
    return order;
}

export {createOrder};