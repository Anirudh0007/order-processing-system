
import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const invoiceQueue=new Queue("invoice-queue",{
    connection:redisConnection
});

export default invoiceQueue;

