import { addToCart, checkout, clearCart, decreaseQuantity, getCart, increaseQuantity, removeFromCart, updateCartQuantity } from "../services/cart.service.js";


const addToCartController=async(req, res , next)=>{
    try {

        const {productId, quantity}= req.body;

        const cart= await addToCart(req.user.id, productId, quantity);

        return res.status(200).json({
            success:true,
            message:"Product added to cart successfully",
            data: cart
        })
        
    } catch (error) {
        
        next(error);
    }
}

const getCartController=async(req, res, next)=>{
    try {
        const cart=await getCart(req.user.id);
        return res.status(200).json({

            success: true,

            message: "Cart fetched successfully",

            data: cart

        });
        
    } catch (error) {
        next(error);
    }
}

const updateCartQuantityController=async(req,res,next)=>{
    try {
        const cart=await updateCartQuantity(
            req.user.id, req.params.productId, req.body.quantity
        )
        return res.status(200).json({

            success: true,

            message: "Cart updated successfully",

            data: cart

        });
        
    } catch (error) {
        next(error)
    }
}

const increaseQuantityController=async(req,res,next)=>{
    try {
        const cart=await increaseQuantity(req.user.id, req.params.productId);
        return res.status(200).json({
            success:true,
            message:"Product quantity incremented successfully in cart",
            data: cart
        })
        
    } catch (error) {
        next(error)
    }
    
}

const decreaseQuantityController=async(req,res,next)=>{
    try {
        const cart=await decreaseQuantity(req.user.id, req.params.productId);
        return res.status(200).json({
            success:true,
            message:"Product quantity decremented successfully in cart",
            data:cart
        })
        
    } catch (error) {
        next(error)
    }
}

const removeFromCartController = async (req, res, next) => {

    try {

        const cart = await removeFromCart(
            req.user.id,
            req.params.productId
        );

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            data: cart
        });

    }
    catch (error) {
        next(error);
    }

};

const clearCartController = async (req, res, next) => {

    try {

        const cart = await clearCart(
            req.user.id
        );

        return res.status(200).json({

            success: true,

            message: "Cart cleared successfully",

            data: cart

        });

    }
    catch (error) {
        next(error);
    }

};

const checkoutController = async (req, res, next) => {

    try {

        const result = await checkout(req.user);

        return res.status(200).json({

            success: true,

            message: "Checkout initiated successfully",

            data: result

        });

    }
    catch(error){
        next(error);
    }

};

export {addToCartController, getCartController, updateCartQuantityController,clearCartController, increaseQuantityController,removeFromCartController, decreaseQuantityController, checkoutController};