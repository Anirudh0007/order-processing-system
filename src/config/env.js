import dotenv from 'dotenv';
import envSchema from './env.validation.js';

dotenv.config();

const result=envSchema.safeParse(process.env);

if(!result.success)
{
    console.error('Env validation failed');
    console.error(result.error.format());
    process.exit(1);
}


const config={
    PORT: result.data.PORT || 3000,
    MONGO_URI:result.data.MONGO_URI,
    REDIS_URL: result.data.REDIS_URL,
    EMAIL_USER: result.data.EMAIL_USER,
    EMAIL_PASS: result.data.EMAIL_PASS,
    STRIPE_SECRET_KEY:result.data.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY:result.data.STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET:result.data.STRIPE_WEBHOOK_SECRET,
    JWT_SECRET: result.data.JWT_SECRET
}

export default config;