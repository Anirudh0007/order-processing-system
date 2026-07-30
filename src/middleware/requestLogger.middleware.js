import PinoHttp, { pinoHttp } from "pino-http";
import logger from "../config/logger.js";

const requestLogger=pinoHttp({
    logger,
    customerSuccessMessage(req,res){
        return `${req.method} ${req.url} completed with ${res.statusCode}`;
    },

    customErrorMessage(req, res, error) {
        return `${req.method} ${req.url} failed: ${error.message}`;
    },

    customProps(req,res){
        return {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip
        }
    }
})

export default requestLogger;