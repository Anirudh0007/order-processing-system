import mongoose from "mongoose";

const paymentSchema=new mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    amount:{
        type: Number,
        required: true,
    },
    paymentProvider:{
        type:String,
        enum:['stripe'],
        default:"stripe"
    },
    transactionId:{
        type:String,
        unique:true
    },
    status:{
        type:String,
        enum:[
            "PAID","PENDING","FAILED","REFUNDED"
        ],
        default:"PENDING"
    }
},{
    timestamps:true
})

export default mongoose.model("Payment", paymentSchema);