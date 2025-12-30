import api from "../../api/axios";

export const fetchMyOrdersAPI = () => api.get("/orders/my");
export const fetchOrderByIdAPI = (id) => api.get(`/orders/${id}`);
