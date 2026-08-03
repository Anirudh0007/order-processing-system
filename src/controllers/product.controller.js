
import { createProduct, deleteProduct, getProductId, getProducts, updateProduct } from "../services/product.service.js";


const createProductController=async(req,res,next)=>{
    try{
        const product=await createProduct(req.body);
        
        return res.status(201).json({
            success:true,
            message:'Product created successfully',
            data: product
        })

    }
    catch(error)
    {
        next(error);
    }
}

const getProductController=async(req,res,next)=>{
    try {
        
        const page=Number(req.query.page)||1;
        const limit=Number(req.query.limit)||10;
        const category=req.query.category;
        const search=req.query.search|| "";
        const sort=req.query.sort || "createdAt";
        const order=req.query.order || "desc";
        const minPrice=Number(req.query.minPrice);
        const maxPrice=Number(req.query.maxPrice)

        const result=await getProducts({
             page,
            limit,
            category,
            search,
            sort,
            order, minPrice, maxPrice
        })

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
}

const getProductByIdController=async(req,res,next)=>{
    try{
    
        const product=await getProductId(req.params.id);

        return res.status(201).json({
            success:true,
            message: 'Product fetched successfully',
            data:product
        })

    }
    catch(error)
    {
        next(error);
    }
}

const updateProductController=async(req,res,next)=>{

    try {

        const product= await updateProduct(req.params.id, req.body);
        return res.status(200).json({
            success:true,
            message:"Product updated successfully",
            data: product
        })
        
    } catch (error) {
        next(error);
    }
}

const deleteProductController=async(req,res,next)=>{
    try {

        const product=await deleteProduct(req.params.id);

        return res.status(200).json({
            success:true,
            message: "Product deleted successfully",
            data: product
        })
        
    } catch (error) {
        next(error);
    }
}

export {createProductController, getProductController, getProductByIdController,deleteProductController, updateProductController};