import {Queue} from 'bullmq';
import redisConnection from '../config/redis.js';

const inventoryQueue=new Queue("inventory-queue",{
    connection:redisConnection,
})

export default inventoryQueue;

