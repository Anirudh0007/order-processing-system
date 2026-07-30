import Order from "../models/order.model.js";
import { publishOrderConfirmation } from "./email.producer.js";
import { reserveInventory } from "./inventory.producer.js";
import { generateInvoice } from "./invoice.producer.js";

const createOrder=async(orderData)=>{
    const order= await Order.create(orderData);

   
    return order;
}

export {createOrder};