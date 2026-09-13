import API from "./api.js";

// POST /api/orders  — body: { address_id, shipping_cost }
export const createOrder = async (payload) => {
  const res = await API.post("/orders", payload);
  return res.data.data;
};

// GET /api/orders
export const getOrderHistory = async () => {
  const res = await API.get("/orders");
  return res.data.data;
};

// GET /api/orders/:id
export const getOrderDetail = async (orderId) => {
  const res = await API.get(`/orders/${orderId}`);
  return res.data.data;
};

// PATCH /api/orders/:id/cancel
export const cancelOrder = async (orderId) => {
  const res = await API.patch(`/orders/${orderId}/cancel`);
  return res.data.data;
};
