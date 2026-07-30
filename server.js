import app from "./app.js";
import dotenv from 'dotenv';
import connectDatabase from "./src/config/database.js";
import redisConnection from "./src/config/redis.js";
import config from "./src/config/env.js";
import registerGracefulShutdown from "./src/config/gracefulShutdonw.js";
import logger from "./src/config/logger.js";


dotenv.config();

const PORT=process.env.PORT|| 3000;

const startServer=async()=>{
    try{

        await connectDatabase();
        await redisConnection.ping();
        logger.info("Redis connection established");

        const server=app.listen(config.PORT,()=>{
             logger.info(`🚀 Server running on port ${config.PORT}`);
        })
        registerGracefulShutdown(server);
    }
    catch(error)
    {
        logger.fatal(error,"❌ Failed to start application");
        

        process.exit(1);
    }
}

startServer();