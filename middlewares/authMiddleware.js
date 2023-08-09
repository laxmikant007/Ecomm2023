import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
    try {
        
        // console.log(process.env.JWT_SECRET)
        const token = req.headers.authorization;
        const decode = JWT.verify(
            token,
            process.env.JWT_SECRET 
            
            );
        req.user = decode;
        next();



    } catch (error) {
        console.log("Error while requireSignIn middleware---> " ,  error)
    }
}



export const isAdmin = async(req , res , next)=>{

    try {
            const user  = await userModel.findById(req.user._id);
            if(user.role !==1){
                return res.status(200).send({
                    success:false,
                    message:"Unauthorised Access!!"
                })
            }else{
                next();
            }

        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            
            message:"Error in admin middleware"
        })
    }

}