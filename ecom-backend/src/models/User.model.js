import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    role: {
    type: String,
    enum: ["user", "admin"],
   default: "user"
},
 authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true },
 
);

const User = mongoose.model("User", userSchema);

export default User;
