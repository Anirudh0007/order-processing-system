import invoiceQueue from "../queues/invoice.queue.js"


const generateInvoice=async(order)=>{

    await invoiceQueue.add(
        'generate-invoice',{
            orderId: order._id.toString(),
            customerName: order.customerName,
            email: order.email,
            items: order.items,
            totalAmount: order.totalAmount
        },
        {
        attempts:3,
        backoff:{
            type:'exponential',
            delay:2000

        },
    removeOnComplete:100,
    removeOnFail:500
    }
    );
}

export {generateInvoice};