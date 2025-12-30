import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCartAPI,
  addToCartAPI,
  updateCartAPI,
  clearCartAPI
} from "../cart/cartApi";



export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCartAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await addToCartAPI(productId, quantity);
     
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, action, quantity }, { rejectWithValue }) => {
    try {
      const res = await updateCartAPI(productId, action, quantity);
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const res = await clearCartAPI();
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart.items;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
      })

      // add to cart
   .addCase(addToCart.fulfilled, (state) => {
  state.loading = false;
})

.addCase(updateCart.fulfilled, (state) => {
  state.loading = false;
})

      // clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
