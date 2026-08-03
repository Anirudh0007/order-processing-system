import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type: String,
            required: true,
            unique: true,
            trim: true
    },
    description:{

        type: String,
        required: true,
        trim: true

    },

    price:{
        type: Number,
            required: true,
            min: 0
    },
    category:{
        type: String,
        required: true,
        enum:[
            "Laptop", "Mobile", "Tablet", "Monitor", "Accessory"
        ]
    },
    brand:{
        type: String,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
            required: true,
            default: 0,
            min: 0
    },
    images:[
        {
            type: String,
            default:[]
        }
    ],
    isActive:{
        type: Boolean,
        default: true
    }
},{
    timestamps:true
})
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });

export default mongoose.model("Product", productSchema);
