import Invoice from "../models/invoice.model.js";

const count=await Invoice.countDocuments();

const invoiceNumber= `ATL -$ {String(count+1).padStart(10,"0)}`;