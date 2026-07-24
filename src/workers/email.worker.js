import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";

const emailWorker=new Worker(
    "email-queue", async(job)=>{
         console.log("📧 Processing Job");

        console.log(job.name);

        console.log(job.data);

        console.log("Email sent successfully.");

    },
    {
    connection: redisConnection,
    }

);

export default emailWorker;