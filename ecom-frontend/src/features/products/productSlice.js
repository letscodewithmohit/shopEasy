import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./productAPI";

/* ------------------ THUNK ------------------ */
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (params,thunkAPI) => {
    try {
      const res = await fetchAllProducts(params);
      return res.data; 

    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

/* ------------------ SLICE ------------------ */
const productSlice = createSlice({
  name: "products",
  initialState: {
  products: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  totalProducts: 0,
  },

  reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.CursorPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.paginatedProducts;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
