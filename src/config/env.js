import dotenv from 'dotenv';

dotenv.config();

const config={
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
}

export default config;