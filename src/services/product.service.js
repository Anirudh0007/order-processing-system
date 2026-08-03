import ConflictError from "../errors/ConflictError.js"
import NotFoundError from "../errors/NotFoundError.js";
import Product from "../models/product.model.js"

const createProduct=async(productData)=>{
    const existingProduct=await Product.findOne({
        name: productData.name
    })

    if(existingProduct)
        {
            throw new ConflictError("Product already exists");
        }
    const product=await Product.create(productData);
    return product;
}

const getProducts=async({
    page, limit, category, search, sort, order, minPrice, maxPrice
})=>{
    const query={isActive:true};
    const skip=(page-1)*limit;
    const sortOptions={};
    sortOptions[sort]=order==='asc'?1:-1;

    if(category)
    {
        query.category=category;
    }
    if(minPrice || maxPrice)
    {
        

        query.price={};
        if(minPrice)
        {
            query.price.$gte=minPrice;
        }
        if(maxPrice)
        {
            query.price.$lte=maxPrice;
        }
    }

    if (search) {
        query.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                brand: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    const products=await Product.find(query).sort(sortOptions).skip(skip).limit(limit).lean();

    const totalProducts=await Product.countDocuments();

    return {
        products,
        pagination:{
            page, limit, totalProducts, totalPages:Math.ceil(totalProducts/limit)
        }
    }


}


const getProductId=async(productId)=>{
    const product=await Product.findById(productId).lean();

    if(!product)
    {
        throw new NotFoundError("Product Not found");
    }
    return product;
}


const updateProduct=async(productId, updateData)=>{

    const product=await Product.findByIdAndDelete(productId);
    if(!product)
    {
        throw new NotFoundError("Product not found");
    }

    Object.assign(product, updateData);
    await product.save();
    return product;

}

const deleteProduct=async(productId)=>{

    const product=await Product.findById(productId);
    if(!product)
    {
        throw new NotFoundError('Product not found');

        product.isActive=false;

        await product.save();
        return product;
    }
}


export {createProduct, getProducts, getProductId, updateProduct, deleteProduct};

