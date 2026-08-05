import { createReview, deleteReview, getProductReview, getReviewStats, updateReview } from "../services/review.service.js";


const createReviewController=async(req, res, next)=>{
    try {

        const review=await createReview(req.user, req.body);

        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review
        });
        
    } catch (error) {
        next(error);
    }
}
const getProductReviewsController = async (req, res, next) => {

    try {

        const reviews = await getProductReview(
            req.params.productId
        );

        return res.status(200).json({

            success: true,

            message: "Reviews fetched successfully",

            data: reviews

        });

    } catch (error) {

        next(error);

    }

};

const updateReviewController=async(req,res,next)=>{
    try {
        const review=updateReview(req.params.reviewId, req.user, req.body);
        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review
        })
        
    } catch (error) {
        next(error);
    }
}

const deleteReviewController = async (req, res, next) => {

    try {

        await deleteReview(
            req.params.reviewId,
            req.user
        );

        return res.status(200).json({

            success: true,
            message: "Review deleted successfully"

        });

    } catch (error) {

        next(error);

    }

};
const getReviewStatsController = async (req, res, next) => {

    try {

        const stats = await getReviewStats(
            req.params.productId
        );

        return res.status(200).json({

            success: true,

            message: "Review statistics fetched successfully",

            data: stats

        });

    }
    catch (error) {

        next(error);

    }

}


export {getReviewStatsController,createReviewController, getProductReviewsController, updateReviewController, deleteReviewController};