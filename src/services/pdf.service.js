import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const generateCustomerInvoice=(invoice)=>{
    return new Promise((resolve,reject)=>{

        const filePath=path.join('documents','invoices',`${invoice.invoiceNumber}.pdf`);
        const doc= new PDFDocument();

        const stream= fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(24).text("ATLAS TECHNOLOGIES", {
                align: "center"
            });

        doc.moveDown();
        doc.fontSize(18).text('Customer Invoice');
        doc.moveDown();

         doc.fontSize(12)
            .text(`Invoice Number : ${invoice.invoiceNumber}`);

        doc.text(`Customer Name : ${invoice.customerName}`);

        doc.text(`Email : ${invoice.email}`);

        doc.text(`Date : ${new Date(invoice.createdAt).toLocaleString()}`);

        doc.moveDown();
         invoice.items.forEach((item) => {

            doc.fontSize(12)
                .text(
                    `${item.productName}   x${item.quantity}   ₹${item.price}`
                );
            })
            doc.moveDown();
            doc.text("Thank you for shopping with Atlas Tech");
            doc.end();

            stream.on('finish',()=>{
                resolve(filePath);
            })
            stream.on('error', reject);
    })
}

export { generateCustomerInvoice };