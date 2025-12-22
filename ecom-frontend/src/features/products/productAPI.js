import api from "../../api/axios";

// all product with params filters 
export const fetchAllProducts = (params) => {
  return api.get("/products",{params}); // backend: GET /api/products
};


// single product 
export const fetchProductById = (id) => {
  return api.patch(`/products/single-product/${id}`);
};
