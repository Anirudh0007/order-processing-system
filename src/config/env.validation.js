import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),

    MONGO_URI: z.string().min(1, "MONGO_URI is required"),

    REDIS_URL: z.string().min(1, "REDIS_URL is required"),

    EMAIL_USER: z.string().email("EMAIL_USER must be a valid email"),

    EMAIL_PASS: z.string().min(1, "EMAIL_PASS is required"),

    STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),

    STRIPE_PUBLISHABLE_KEY: z
        .string()
        .min(1, "STRIPE_PUBLISHABLE_KEY is required"),

    STRIPE_WEBHOOK_SECRET: z
        .string()
        .min(1, "STRIPE_WEBHOOK_SECRET is required")
});

export default envSchema;