import User from "../models/User.model.js";

export const getUserProfile = async (req , res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');

        res.status(200).json({
            message : "User profile fetched successfully",
            user,
        });
    
    }catch(error){
        res.status(500).json({
            message : "Server Error",
            error,
        });
    }
};
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
