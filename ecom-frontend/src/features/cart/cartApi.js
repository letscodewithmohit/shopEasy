import api from "../../api/axios"; // your axios instance with token

export const fetchCartAPI = () => api.get("/cart");

export const addToCartAPI = (productId, quantity = 1) =>
  api.post("/cart/add", { productId, quantity });

export const updateCartAPI = (productId, action, quantity) =>
  api.patch("/cart/update", { productId, action, quantity });

export const clearCartAPI = () => api.delete("/cart/clear");
