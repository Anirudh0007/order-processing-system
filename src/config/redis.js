import Redis from "ioredis";
import config from "./env.js";

const redisConnection=new Redis(config.REDIS_URL,{
    maxRetriesPerRequest:null
});

redisConnection.on('connect',()=>{
    console.log('✅ Redis Connected');
    
})

redisConnection.on('error',(error)=>{
    console.error("❌ Redis Connection Error");
    console.error(error.message);
})

export default redisConnection;