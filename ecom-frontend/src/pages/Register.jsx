import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import {  Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearError } from "../features/auth/authSlice";


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
     dispatch(clearError()); // 🔥 clears old errors
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
// 🔹 Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // 🔹 Optional: allow only gmail
  if (!form.email.endsWith("@gmail.com")) {
    toast.error("Only @gmail.com emails are allowed");
    return;
  }

  // 🔹 Password validation
  if (form.password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

    dispatch(register(form)).unwrap().then(()=>{
        navigate("/login");
    })
  };

  return (
    <Box className="flex justify-center items-center h-screen">
      <Box className="w-96 p-6 shadow-lg rounded-xl">
        <Typography variant="h5" className="mb-4 text-center">
          Register
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4  mt-2 flex flex-col gap-3">
          <TextField label="Name" name="name" fullWidth onChange={handleChange} />
          <TextField label="Email" name="email"  error={!!error} fullWidth onChange={handleChange} />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            onChange={handleChange}
          />

       
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
            <p className="text-gray-700">Already have an Account? <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link></p>
        </form>

      </Box>
    </Box>
  );
};

export default Register;
