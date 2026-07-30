import Invoice from "../models/invoice.model.js";

const createInvoice=async(data)=>{
     
        
    const count = await Invoice.countDocuments();

const invoiceNumber = `ATL-${String(count + 1).padStart(10, "0")}`;
    const invoice=await Invoice.create({
        invoiceNumber,
        orderId: data.orderId,
        customerName: data.customerName,
        email: data.email,
        items: data.items,
        totalAmount: data.totalAmount
    })
    console.log("🧾 Invoice Generated");
    console.log(invoice.invoiceNumber);

    return invoice;
}

export {createInvoice};