import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
    logger.error(err, err.message);

    // Handle invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID."
        });
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;