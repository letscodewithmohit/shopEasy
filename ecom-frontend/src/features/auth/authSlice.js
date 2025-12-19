import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAPI";

// Load token if exists
 const token = localStorage.getItem("token");

export const login = createAsyncThunk('auth/login',
    async (data,thunkAPI)  => {
       try{
        const res = await loginUser(data);
        return res.data;
       }
       catch(err){
        return thunkAPI.rejectWithValue(err.response.data.message);
       }
    }
);

export const register = createAsyncThunk("auth/register", async (data,thunkAPI) => {
    try{
     const res = await registerUser(data);
     return res.data;
    }catch(err){
     return thunkAPI.rejectWithValue(err.response.data.message)
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
            localStorage.removeItem("token");
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

export const {logout} = authSlice.actions;
export default authSlice.reducer;


