import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";

const emailDLQWorker=new Worker(
    "email-dlq", async(job)=>{
        console.log("========== DLQ ==========");
        console.log(job.data);

        // Future:
        // Save to DB
        // Send Slack alert
        // Send PagerDuty alert
        // Notify admin
    }
    ,
    {
        connection:redisConnection
    }
)

emailDLQWorker.on('completed',(job)=>{
    console.log(`DLQ Job ${job.id} processed.`);
})
emailDLQWorker.on('failed', (job,err)=>{
    console.log(`DLQ JOB ${job?.id} failed : ${err.message}`);
    
})



export default emailDLQWorker;