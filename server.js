import app from "./app.js";
import dotenv from 'dotenv';
import connectDatabase from "./src/config/database.js";
import redisConnection from "./src/config/redis.js";
import config from "./src/config/env.js";

dotenv.config();

const PORT=process.env.PORT|| 3000;

const startServer=async()=>{
    try{

        await connectDatabase();
        await redisConnection.ping();
        console.log('Redis ready');

        app.listen(config.PORT,()=>{
             console.log(`🚀 Server running on port ${config.PORT}`);
        })

    }
    catch(error)
    {
        console.error("❌ Failed to start application");
        console.error(error.message);

        process.exit(1);
    }
}

startServer();