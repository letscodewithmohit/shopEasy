import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
try{
    const { name, email, password } = req.body;
   
       // 1️⃣ Required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // 2️⃣ Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  // 3️⃣ Optional: gmail only
  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json({
      message: "Only @gmail.com emails are allowed",
    });
  }

  // 4️⃣ Password length
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message : "User Already Exists"});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
        name , email, password : hashedPassword
    })

    res.status(201).json({ message : "User Registered Successfully",newUser});
} catch (error) {
    res.status(500).json({ message : "Server Error",error});
}
};
    
// Login User

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // Generate JWT
        const token = jwt.sign(
            {userId: user._id, role : user.role },
            process.env.JWT_SECRET,
            {expiresIn: "7d" }
        );
        res.status(200).json({ message: "Login Successful", token, role: user.role});
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }


};  


