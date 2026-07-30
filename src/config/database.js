import mongoose from "mongoose";
import config from "./env.js";
import dns from "dns";
import logger from "./logger.js";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const connectDatabase=async()=>{
    try{
        await mongoose.connect(config.MONGO_URI);
        logger.info('MongoDB connected');
    }
    catch(error)
    {
        logger.fatal(error, "Failed to connect to MongoDb")
        process.exit(1);
    }
}
mongoose.connection.once("open", () => {
    console.log("Connected Host:", mongoose.connection.host);
    console.log("Connected database:", mongoose.connection.name);
});

export default connectDatabase;