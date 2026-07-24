import nodemailer from 'nodemailer';
import config from '../config/env.js';

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:
    {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
})

const sendOrderConfirmationEmail=async({
    customerName, email, orderId, totalAmount
})=>{
    await transporter.sendMail({
         from: config.EMAIL_USER,
        to: email,
        subject: "Order Confirmation",
         html: `
            <h2>Thank you for your order, ${customerName}!</h2>

            <p>Your order has been received successfully.</p>

            <p><strong>Order ID:</strong> ${orderId}</p>

            <p><strong>Total:</strong> ₹${totalAmount}</p>

            <br>

            <p>Thank you for shopping with us.</p>
        `,
    });

    console.log("Email sent successfully");
    
};

export {sendOrderConfirmationEmail};