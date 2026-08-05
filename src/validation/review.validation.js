import {z} from 'zod';

const createReviewSchema=z.object({
    product: z.string().min(1,"Product ID is required"),
    rating: z.number().min(1,"Raing must be atleast 1").max(
        5,"Rating cannot exceed 5"
    ),

    comment: z.string().trim().min(
        5,"Comment must be at least 5 chars"
    ).max(500,"Comment cannot exceed 500 chars")
});

export default createReviewSchema;