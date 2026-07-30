import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import { sendOrderConfirmationEmail } from "../services/email.service.js";
import emailDLQ from "../queues/emailDLQ.queue.js";

const emailWorker=new Worker(
    "email-queue", async(job)=>{
          console.log("================================");
        console.log(`Job ID       : ${job.id}`);
        console.log(`Job Name     : ${job.name}`);
        console.log(`Attempt      : ${job.attemptsMade + 1}`);
        console.log(`Processing...`);
        console.log(job.data);
    
        
       switch(job.name)
       {
        case "send-order-confirmation":

            await sendOrderConfirmationEmail(job.data);
            console.log(job.data);
            break;

        case "send-otp":
            console.log('Processing OTP');
            console.log(job.data);
            break;
            
        default:
            throw new Error(`Unknown Job Type: ${job.name}`);
       }

    }, 
    {
    connection: redisConnection,
    }

);

emailWorker.on('failed',async(job,err)=>{
    console.log("--------------------------------");
    console.log(`Job ${job.id} failed`);
    console.log(`Attempt : ${job.attemptsMade}`);
    console.log(err.message);
    console.log("--------------------------------");
    if(job.attemptsMade>= job.opts.attempts)
    {
        console.log('Moving to DLQ...');
        await emailDLQ.add("failed-email",{
            originalJobId: job.id,
                originalQueue: job.queueName,
                payload: job.data,
                error: err.message,
                failedAt: new Date().toISOString()
        })
        console.log('Job moved to DLQ');
        
    }
})

emailWorker.on('completed',(job)=>{
      console.log(`Job ${job.id} marked as completed.`);
})
emailWorker.on("error", (err) => {
    console.error("WORKER ERROR:", err);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});
export default emailWorker;