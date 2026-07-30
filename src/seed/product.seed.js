import mongoose from "mongoose";
import Product from '../models/product.model.js';
import config from "../config/env.js";
import connectDatabase from "../config/database.js";

const seedProducts=async()=>{

    try{
        await connectDatabase();
        await Product.deleteMany({});

        await Product.insertMany([
            {
                name:'Laptop',
                price:25000,
                stock:10
            },
            {
                name:"Phone",
                price: 18000,
                stock:20
            },
            {
                name: "Keyboard",
                price: 1500,
                stock: 50
            }
        ])
         console.log("✅ Products Seeded");
        process.exit(0);
    }
    catch(error)
    {
        console.error(error);
        process.exit(1);
    }


}

seedProducts();