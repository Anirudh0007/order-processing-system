import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import { sendOrderConfirmationEmail } from "../services/email.service.js";

const emailWorker=new Worker(
    "email-queue", async(job)=>{
         console.log(`processing ${job.name}`);

        

        console.log(job.data);

        await sendOrderConfirmationEmail(job.data);

    },
    {
    connection: redisConnection,
    }

);

export default emailWorker;