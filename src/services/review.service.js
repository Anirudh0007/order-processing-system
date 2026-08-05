import NotFoundError from '../errors/NotFoundError.js';
import Product from '../models/product.model.js'
import Review from '../models/review.model.js'
import BadRequestError from '../errors/BadRequestError.js';
import ForbiddenError from '../errors/ForbiddenError.js';
import mongoose from 'mongoose';

const createReview=async(user,reviewData)=>{
    const product=await Product.findById(
        reviewData.product
    );

    if(!product || !product.isActive)
    {
        throw new NotFoundError("Product not found");
    }

    const existingReview=await Review.findOne({
        product: reviewData.product,
        user: user.id
    })

    if(existingReview)
    {
        throw new BadRequestError("You have already reviewed this product")
    }
    
    const review=await Review.create({
        ...reviewData,
        user: user.id
    });
    return review;

}

const getProductReview=async(productId)=>{

    const product=await Product.findById(productId);
    if(!product || !product.isActive)
    {
        throw new NotFoundError("Product not found")
    }
    const reviews=await Review.find({
        product: productId
    }).populate("user", "name").sort({createdAt:-1});
    return reviews;

}

const updateReview=async(reviewId, user, reviewData)=>{
    const review=await Review.findById(reviewId);
    if (!review) {
        throw new NotFoundError("Review not found");
    }
    if(user.role!=='admin' && review.user.toString() !== user.id)
    {
        throw new ForbiddenError("You are not authorized to update this review");
    }
    review.rating=reviewData.rating;
    review.comment=reviewData.comment;

    await review.save();

    return review;
}

const deleteReview=async(reviewId, user)=>{
    const review=await Review.findById(reviewId);
    if(!review)
    {
        throw new NotFoundError("Review not found");
    }

    if(user.role!=='admin' && review.user.toString()!==user.id)
    {
        throw new ForbiddenError("You are not authorised to delete this review")
    }
    await review.deleteOne();
    return;
    }

const getReviewStats=async(productId)=>{
    const stats=await Review.aggregate([{
        $match:{
            product: new mongoose.Types.ObjectId(productId)
        }
    },{
        $group:{
            _id:"$product",
            averageRating:{
                $avg: "$rating"
            }
        ,
        totalReviews:{
            $sum:1
        }}
    }])
    return stats[0] || {
    averageRating: 0,
    totalReviews: 0
};

}

export {createReview,getProductReview, updateReview, deleteReview, getReviewStats};