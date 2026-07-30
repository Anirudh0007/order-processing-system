import inventoryQueue from "../queues/inventory.queue.js"

const reserveInventory=async(order)=>{
    await inventoryQueue.add('reserve-stock',{
        orderId:order._id,
        items: order.items
    },{
        attempts:5,
        backoff:{
            type:"exponential",
            delay:2000
        },
        removeOnComplete:100,
        removeOnFail:500
    })
}

export {reserveInventory}