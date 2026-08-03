import BadRequestError from "../errors/BadRequestError.js";
import createProductSchema from "../validation/product.validation.js";


const validateProduct=(req, res, next)=>{

    const result=createProductSchema.safeParse(req.body);

    if(!result.success)
    {
        throw new BadRequestError(result.error.issues[0].message);
    }
    req.body=result.data;
    next();
}

export default validateProduct;