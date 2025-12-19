import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form)).unwrap().then((res)=>{
        if(res?.user?.role === 'admin'){
            navigate('/admin/dashboard');
        }else{
            navigate('/')
        }
    })
  };

  return (
    <Box className="flex justify-center items-center h-screen">
      <Box className="w-96 p-6 shadow-lg rounded-xl border border-gray-200">
        <Typography variant="h5" className="text-center  ">
          Login
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4  mt-2 flex flex-col gap-3">
          <TextField
            label="Email"
            name="email"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            onChange={handleChange}
          />

          {error && (
            <Typography color="error">{error}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
