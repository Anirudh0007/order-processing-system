import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import { createInvoice } from "../services/invoice.service.js";
import { generateCustomerInvoice } from "../services/pdf.service.js";
import { publishOrderConfirmation } from "../services/email.producer.js";

const invoiceWorker=new Worker('invoice-queue',
    async(job)=>{
         console.log("==========================");
        console.log(`Job ID      : ${job.id}`);
        console.log(`Job Name    : ${job.name}`);
        console.log(`Attempt     : ${job.attemptsMade + 1}`);

        switch(job.name)
        {
            case 'generate-invoice':
                 console.log("🧾 Generating Invoice");
                 const invoice=await createInvoice(job.data);
                 const pdfPath=await generateCustomerInvoice(invoice);
                 invoice.customerPdfPath=pdfPath;
                 await invoice.save();
                 await publishOrderConfirmation(invoice);
                 console.log( `Invoice ${invoice.invoiceNumber} generated successfully`);
                 

                break;

            default:
                throw new Error(`Unknown Job: ${job.name}`);
        }
    },{
        connection:redisConnection
    }
)

invoiceWorker.on('completed',(job)=>{
    console.log(`Invoice Job ${job.id} completed.`);
})

invoiceWorker.on('failed',(job,err)=>{
    console.log(`Invoice Jpn ${job.id} failed :${err.message}`);
    
});

export default invoiceWorker;