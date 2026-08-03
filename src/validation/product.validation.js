import {z} from 'zod';


const createProductSchema=z.object({
    name: z.string().trim().min(3).max(100),

    description: z.string().trim().min(10).max(1000),
    price: z.number().nonnegative(),
    category: z.enum([
        "Laptop",
        "Mobile",
        "Tablet",
        "Monitor",
        "Accessory"
    ]),
    brand:z.string().trim().min(2).max(50),
    stock: z.number().int().nonnegative(),

    images: z.array(z.string()).default([]),

    isActive: z.boolean().optional()
})

export default createProductSchema;