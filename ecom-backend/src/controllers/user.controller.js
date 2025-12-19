import User from "../models/User.model.js";

export const getUserProfile = async (req , res) => {
    try{
        const user = await User.findById(req.user).select('-passwoord');

        res.status(200).json({
            meessage : "User profile fet6ched  successfully",
            user,
        });
    
    }catch(error){
        res.status(500).json({
            message : "Server Error",
            error,
        });
    }
};