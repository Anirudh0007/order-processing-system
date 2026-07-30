import emailQueue from "../queues/email.queue.js"

const publishOrderConfirmation=async(invoice)=>{

    await emailQueue.add("send-order-confirmation",{
            invoiceNumber: invoice.invoiceNumber,
            customerName: invoice.customerName,
            email: invoice.email,
            totalAmount: invoice.totalAmount,
            customerPdfPath: invoice.customerPdfPath
    },{
         attempts: 3,
            backoff: {
                type: "exponential",
                delay: 2000
            },
            priority: 3,
            delay: 5000,
            removeOnComplete: 100,
            removeOnFail: 500
    })
}

export {publishOrderConfirmation}