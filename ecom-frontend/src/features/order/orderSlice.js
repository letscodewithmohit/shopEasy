import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMyOrdersAPI,
  fetchOrderByIdAPI,
} from "./orderApi";

export const fetchMyOrders = createAsyncThunk(
  "orders/my",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchMyOrdersAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/byId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchOrderByIdAPI(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    singleOrder: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    .addCase(fetchOrderById.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchOrderById.fulfilled, (state, action) => {
  state.loading = false;
  state.singleOrder = action.payload;
})
.addCase(fetchOrderById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export default orderSlice.reducer;
