import mongoose from "mongoose";
import redisConnection from "../config/redis.js";

export const getHealth=async(req, res, next)=>{
    try{
        const mongoConnected=mongoose.connection.readyState===1;

        const redisConnected=(await redisConnection.ping())==="PONG";
        const healthy=mongoConnected && redisConnected;

        res.status(healthy?200:503).json({
            status: healthy ? "UP" :"DOWN",
            server: "Running",
            mongodb: mongoConnected ? "Connected" : "Disconnected",
            redis: redisConnected ?"Connected" : "Disconnected",
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });

    }
    catch(error)
    {
        next(error);
    }
}