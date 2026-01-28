import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearError } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";
import GoogleLoginButton from "../components/common/GoogleLoginButton";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
const location = useLocation();
const from = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
     dispatch(clearError()); // 🔥 clears old errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
  toast.error("Please fill all fields");
  return;
}

    // dispatch(login(form)).unwrap().then((res)=>{
    //     if(res?.user?.role === 'admin'){
    //         navigate('/admin/dashboard');
    //     }else{
    //         navigate('/')
    //     }
    // })

    dispatch(login(form))
  .unwrap()
  .then(() => {
    navigate(from, { replace: true });
  });
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

        

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-gray-700">Don't have an Account? <Link to="/register" className="text-blue-600 hover:text-blue-800">Register Now</Link></p>

          <GoogleLoginButton />

        </form>
      </Box>
    </Box>
  );
};

export default Login;
