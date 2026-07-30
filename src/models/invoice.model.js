import mongoose from "mongoose";

const invoiceSchema=new mongoose.Schema({
    invoiceNumber:{
         type: String,
            required: true,
            unique: true
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required: true
    },
    customerName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    items:[
        {
           productName: String,
                quantity: Number,
                price: Number 
        }
    ],
     totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["generated", "emailed"],
            default: "generated"
        },
        customerPdfPath:{
            type:String
        },
        adminReportPath:{
            type:String
        }

},{
    timestamps:true
})

export default mongoose.model("Invoice", invoiceSchema);