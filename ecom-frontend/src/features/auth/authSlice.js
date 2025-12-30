import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAPI";
import toast from "react-hot-toast";

// Load token if exists
 const token = localStorage.getItem("token");

export const login = createAsyncThunk('auth/login',
    async (data,thunkAPI)  => {
       try{
        const res = await loginUser(data);
        toast.success("Welcome back!");
        return res.data;
       }
       catch(err){
        const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
       }
    }
);

export const register = createAsyncThunk("auth/register", async (data,thunkAPI) => {
    try{
     const res = await registerUser(data);
     toast.success("Registration successful! Please login.");
     return res.data;
    }catch(err){
    const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        token : token || null,
        loading : false,
        error : null,
    },

    reducers : {
        logout : (state) => {
            state.user = null,
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
    state.error = null;
  },
    },

    extraReducers : (builder) => {
        builder.
        addCase(login.pending, (state) => {
            state.loading = true;
        })

        .addCase(login.fulfilled,(state,action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("token",action.payload.token);
        })

        .addCase(login.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const {logout,clearError} = authSlice.actions;
export default authSlice.reducer;


