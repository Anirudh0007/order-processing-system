import connectDatabase from "./src/config/database.js";

const startWorkers = async () => {
    await connectDatabase();

    await import("./src/workers/email.worker.js");
    await import("./src/workers/emailDLQ.worker.js");
    await import("./src/workers/inventory.worker.js");
    await import("./src/workers/invoice.worker.js");

    console.log("All workers started...");
};

startWorkers();