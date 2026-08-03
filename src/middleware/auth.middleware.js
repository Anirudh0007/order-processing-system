import { config } from "dotenv";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { verifyToken } from "../utils/jwt.utils.js";


const authenticate=async(req, res, next) =>{
    try{

        const authHeader=req.headers.authorization;
        if(!authHeader)
        {
            throw new UnauthorizedError("Authorization header is missing")
        }
        if(!authHeader.startsWith("Bearer "))
        {
            throw new UnauthorizedError("Invalid authorization")
        }

        const token=authHeader.split(" ")[1];
        const decoded=verifyToken(token);

        req.user=decoded;
        next();
    }
    catch(error)
    {
        throw new UnauthorizedError("Invalid or expired token");
    }
}

export default authenticate;