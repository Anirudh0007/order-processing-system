import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const emailDLQ=new Queue("email-dlq",{
    connection:redisConnection,
})

export default emailDLQ;

