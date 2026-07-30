import Product from "../models/product.model.js";

const reserveStock=async(items)=>{
    for(const item of items)
    {
        const product=await Product.findOneAndUpdate({
            name:item.productName,
            stock:{ $gte: item.quantity }
        },{
            $inc:{
                stock:-item.quantity
            }
        },{
            returnDocument:'after'
        })

        if(!product)
        {
            throw new Error(`Product ${item.productName} not found`);
        }
        
    }
    
}

export {reserveStock};