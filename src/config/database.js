import mongoose from "mongoose";
import config from "./env.js";

const connectDatabase=async()=>{
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log('MongoDB connected')
    }
    catch(error)
    {
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);

        process.exit(1);
    }
}

export default connectDatabase;