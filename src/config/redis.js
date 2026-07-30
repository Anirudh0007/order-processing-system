import Redis from "ioredis";
import config from "./env.js";
import logger from "./logger.js";

const redisConnection=new Redis(config.REDIS_URL,{
    maxRetriesPerRequest:null
});

redisConnection.on('connect',()=>{
    logger.info('Redis connected');
    
})

redisConnection.on('error',(error)=>{
    logger.fatal(error,'Redis connection failed');
})

export default redisConnection;