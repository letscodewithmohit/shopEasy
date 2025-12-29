import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfileApi } from "./userApi";
import api from "../../api/axios";

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const res = await fetchUserProfile();
      return res.data.user; // ✅ ONLY user
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await updateUserProfileApi(data);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
.addCase(updateUserProfile.pending, (state) => {
  state.loading = true;
})
.addCase(updateUserProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.profile = action.payload; // update UI instantly
})
.addCase(updateUserProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export default userSlice.reducer;
