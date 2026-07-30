import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import emailQueue from "../queues/email.queue.js";
import inventoryQueue from "../queues/inventory.queue.js";
import invoiceQueue from "../queues/invoice.queue.js";


const serverAdapter=new ExpressAdapter();

serverAdapter.setBasePath('/admin/queues');

createBullBoard({
    queues:[
        new BullMQAdapter(emailQueue),
        new BullMQAdapter(inventoryQueue),
        new BullMQAdapter(invoiceQueue)
    ],
    serverAdapter
});

export {serverAdapter};