import {z} from 'zod';

const createNotificationSchema=z.object({
    title: z.string().trim().min(3,"Title must be atleast 3 chars").max(
        100, "Title cannot exceed 500 chars"
    ),
    message:z.string().trim().min(5,"Message cannot exceed 5 chars").max(
        500,"Message cannot exceed 500 chars"
    ),

    type:z.enum([
        "ORDER",
        "PAYMENT",
        "SHIPPING",
        "DELIVERY",
        "SYSTEM"
    ]).optional()
    
})

export default createNotificationSchema;