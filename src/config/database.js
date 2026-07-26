import mongoose from "mongoose";
import config from "./env.js";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
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
mongoose.connection.once("open", () => {
    console.log("Connected Host:", mongoose.connection.host);
    console.log("Connected database:", mongoose.connection.name);
});

export default connectDatabase;