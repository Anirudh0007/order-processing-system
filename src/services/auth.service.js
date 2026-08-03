import config from "../config/env.js";
import BadRequestError from "../errors/BadRequestError.js";
import ConflictError from "../errors/ConflictError.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { generateToken } from "../utils/jwt.utils.js";

const registerUser=async(userData)=>{

    const {name, email, password}=userData;

    const existingUser=await User.findOne({
        email
    })

    if(existingUser)
    {
        throw new ConflictError("User already exists");
    }

    const hashedPassword=await bcrypt.hash(
        password,config.BCRYPT_SALT_ROUNDS
    )

    const user=await User.create({
        ...userData,
        password: hashedPassword
    })

    const createdUser=user.toObject();
    delete createdUser.password;
    return createdUser;
}



const loginUser=async(userData)=>{
    const {email, password}=userData;

    const user=await User.findOne({email});

    if(!user)
    {
        throw new BadRequestError("Invalid Email or Password");
    }

    const isPasswordValid=await bcrypt.compare(
        password, user.password
    );

    if(!isPasswordValid)
    {
        throw new BadRequestError("Invalid email or password");
    }

    const token=generateToken({
        id:user._id,
        role:user.role
    })

    const loggedInUser= user.toObject();
    delete loggedInUser.password;

    return {
        user: loggedInUser,
        token
    }

}

export { registerUser, loginUser };



