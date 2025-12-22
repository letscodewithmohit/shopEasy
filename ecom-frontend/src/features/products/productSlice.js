import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById } from "./productAPI";

/* ------------------ THUNK ------------------ */

// fetching the product api for all products with filters 
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


// fetching the single product api for single product
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const res = await fetchProductById(id);
      console.log("API DATA:", res.data.singleproduct);

      return res.data.singleproduct;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);


/* ------------------ SLICE ------------------ */
const productSlice = createSlice({
  name: "products",
  initialState: {
  products: [],
  singleProduct : null,
  loading: false,
  error: null,


  page: 1,
  totalPages: 1,
  totalProducts: 0,
  },

  reducers: {},
    extraReducers: (builder) => {
    builder

    // this is for all products
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
      })

.addCase(getProductById.pending, (state) => {
  state.loading = true;
})

.addCase(getProductById.fulfilled, (state, action) => {
  state.loading = false;
  state.singleProduct = action.payload;
})

.addCase(getProductById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
  },
});

export default productSlice.reducer;
