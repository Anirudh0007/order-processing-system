
import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import { reserveStock } from "../services/inventory.service.js";

const inventoryWorker=new Worker(
    "inventory-queue",
    async(job)=>{

        console.log("==========================");
          console.log(`Job ID      : ${job.id}`);
        console.log(`Job Name    : ${job.name}`);
        console.log(`Attempt     : ${job.attemptsMade + 1}`);

        switch(job.name)
        {
            case 'reserve-stock':
                console.log('Reserving Inventory');
                await reserveStock(job.data.items);
                break;                
            default:
                throw new Error(`Unknown Job Type : ${job.name}`)
        }
        
        
    },{connection:redisConnection}
);
inventoryWorker.on("failed", (job, err) => {

    console.log("==========================");
    console.log("❌ Inventory Job Failed");
    console.log("Job ID:", job?.id);
    console.log("Attempt:", job?.attemptsMade);
    console.log("Reason:", err.message);
    console.log(err.stack);

});
inventoryWorker.on("completed", (job) => {
    console.log(`Inventory Job ${job.id} completed.`);
});
export default inventoryWorker;