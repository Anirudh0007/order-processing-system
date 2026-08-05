import BadRequestError from "../errors/BadRequestError.js";
import createReviewSchema from "../validation/review.validation.js"


const validateReview=(req,res,next)=>{
    const result=createReviewSchema.safeParse(req.body);

    if(!result.success)
    {
        throw new BadRequestError(
            result.error.issues[0].message
        )
    }
    req.body=result.data;

    next();
}

export default validateReview;