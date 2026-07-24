import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    customerName:{
        type:String,
        required: true,
        trim: true
    },
    email:{
         type: String,
            required: true,
            lowercase: true,
            trim: true,
    },
    items:[{
        productName:{
            type: String,
                    required: true
        },
        quantity:{
            type: Number,
                    required: true,
                    min: 1,
        },
        price:{
            type:Number,
            required:true,
            min:0
        }
    }],
    totalAmount:{
        type:Number,
        required: true,
        min:0
    },
    status:{
        type:String,
        enum:["PENDING_PAYMENT",
        "PAID",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "REFUNDED",],
        default:'PENDING_PAYMENT'
    },
},{
    timestamps:true
})

const Order=mongoose.model('Order', orderSchema);

export default Order;
