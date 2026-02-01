import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getMenu = () => api.get("/menu");
export const searchMenu = (q) => api.get(`/menu/search?q=${q}`);
export const toggleAvailability = (id) =>
  api.patch(`/menu/${id}/availability`);

export const createMenuItem = (data) =>
  api.post("/menu", data);

// Orders APIs
export const getOrders = () => {
  return api.get("/orders");
};

export const updateOrderStatus = (id, status) => {
  return api.patch(`/orders/${id}/status`, { status });
};

export default api;


//import axios from "axios";

//const api = axios.create({
 // baseURL: process.env.REACT_APP_API_URL
//});

//export default api;//
