import ForbiddenError from "../errors/ForbiddenError.js"


const authorize=async (req,res, next)=>{

    try{
        if(req.user.role!=='admin')
        {
            throw new ForbiddenError("Access denied");
        }
        next();
    }
    catch(error)
    {
        next(error)
    }
    
}

export default authorize;