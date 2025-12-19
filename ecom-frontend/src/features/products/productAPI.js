import api from "../../api/axios";

export const fetchAllProducts = (params) => {
  return api.get("/products",{params}); // backend: GET /api/products
};

