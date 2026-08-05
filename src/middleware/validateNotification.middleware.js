import BadRequestError from "../errors/BadRequestError.js";
import createNotificationSchema from "../validation/notification.validation.js"


const validateNotification=(req,res,next)=>{
    const result=createNotificationSchema.safeParse(req.body);

    if(!result.success)
    {
        throw new BadRequestError(result.error.issues[0].message);
    }
    req.body=result.data;
    next();
}

export default validateNotification;