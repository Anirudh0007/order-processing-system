import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';
import Product from '../models/product.model.js'
import Cart from '../models/cart.model.js'
import { createOrder } from './order.service.js';
import { createPaymentIntent } from './payment.service.js';
import User from '../models/user.model.js';

const addToCart=async(userId, productId, quantity)=>{
    const product=await Product.findById(productId);

    if(!product || !product.isActive)
    {
        throw new NotFoundError("Product not found");
    }

    if(quantity> product.stock)
    {
        throw new BadRequestError("Insufficient stock");
    }

    let cart=await Cart.findOne({
        user: userId
    })

    if(!cart)
    {
        cart=await Cart.create({
            user: userId,
            items:[
                {
                    product: productId,
                    quantity
                }
            ]
        })
        return cart;
    }

    const existingItem=cart.items.find(
        item=>item.product.toString()===productId
    )
    if(existingItem)
    {
        existingItem.quantity+=quantity;
    }
    else
    {
      cart.items.push({
        product: productId, quantity
      })   
    }

    await cart.save();
    return cart;
}

const getCart=async(userId)=>{
    const cart=await Cart.findOne({
        user: userId
    }).populate("items.product", "name price brand stock images");

    if(!cart)
    {
        return { items:[]};
    }
    return cart;
}

const updateCartQuantity=async(userId, productId, quantity)=>{

    const cart=await Cart.findOne({
        user:userId
    })
    if(!cart)
    {
        throw new NotFoundError("Cart not found");
    }
    const item=cart.items.find(
        item=>item.product.toString()===productId
    )
    if(!item)
    {
        throw new NotFoundError("Product not found in cart");
    }

    item.quantity=quantity;
    await cart.save();
    return cart.populate(
        "items.product",
        "name price brand stock images"
    );

}

const increaseQuantity=async(userId, productId)=>{
    const cart=await Cart.findOneAndUpdate({
        user: userId,
        "items.product":productId
    },{
        $inc:{
            "items.$.quantity":1
        }
    },{
        new:true
    }).populate("items.product", "name price brand stock images");
    if(!cart)
    {
        throw new NotFoundError("Cart items not found");
    }
    return cart;
}

const decreaseQuantity=async(userId, productId)=>{
    const cart=await Cart.findOne({
        user:userId
    });
    if(!cart)
    {
        throw new NotFoundError("Cart not found");
    }
    const item=cart.items.find(
        item=>item.product.toString()===productId
    )
    if(!item)
    {
        throw new NotFoundError("Product not found in cart")
    }
    if(item.quantity<=1)
    {
        throw new BadRequestError("Quantity cannot be less than one")
    }
    const updatedCart=await Cart.findOneAndUpdate({
        user:userId,
        "items.product":productId
    },{
        $inc:{
            "items.$.quantity":-1
        }},
        {
            new:true
        }).populate("items.product","name price brand stock images")
    
    return updatedCart;
}

const removeFromCart=async(userId, productId)=>{

    const cart=await Cart.findOneAndUpdate({
        user:userId,
    },{
        $pull: {
            items: {
                product: productId
            }
        }
    }, {
        new:true
    }).populate("items.product",
        "name price brand stock images")
         if (!cart) {
        throw new NotFoundError("Cart not found");
         }
         return cart;


}

const checkout=async(user)=>{
    const dbUser=await User.findById(user.id);
    if(!dbUser)
    {
        throw new NotFoundError("User not found");
    }
    const cart=await Cart.findOne({
        user: user.id
    }).populate("items.product");


    if (!cart || cart.items.length === 0) {
        throw new BadRequestError("Cart is empty");
    }

    for(const item of cart.items)
    {
        if(!item.product.isActive)
        {
            throw new BadRequestError(`${item.product.name} is unavailable`)
        }
    
    if (item.quantity > item.product.stock) {
            throw new BadRequestError(
                `${item.product.name} has only ${item.product.stock} item(s) left`
            );
        }
    }
     const totalAmount = cart.items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const orderData={
        customerName: dbUser.name,
        email: dbUser.email,
        user: user.id,

        items: cart.items.map(item=>({
            productName: item.product.name,
            quantity: item.quantity,
            price: item.product.price
        })), totalAmount
    }

    const order= await createOrder(orderData);
    const payment=await createPaymentIntent(order._id);

    return {order, payment}

}

const clearCart=async(userId)=>{
    const cart=await Cart.findOneAndUpdate({
        user: userId
    }, {
        $set: {items:[]}
    }, {new:true});

    if (!cart) {
        throw new NotFoundError("Cart not found");
    }
    return cart;
}

export {addToCart, getCart,checkout, clearCart, updateCartQuantity, increaseQuantity, decreaseQuantity, removeFromCart};