import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <TextField label="Email" name="email" fullWidth onChange={handleChange} />
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
        </form>
      </Box>
    </Box>
  );
};

export default Register;
