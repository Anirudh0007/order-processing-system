import mongoose from "mongoose";
import redisConnection from "./redis.js";

const registerGracefulShutdown=(server)=>{

    const shutdown=async()=>{
        console.log("Gracefully shutting down");
        server.close(async()=>{
            await mongoose.connection.close();
            await redisConnection.quit();

            console.log("MongoDB and Redis connection closed");
            process.exit(0);
            
        })
        
    }
    process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

}


export default registerGracefulShutdown;