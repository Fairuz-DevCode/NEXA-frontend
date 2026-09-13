import API from "./api.js";

// POST /api/payments  — body: { order_id, payment_type }
export const createPayment = async ({ order_id, payment_type }) => {
  const res = await API.post("/payments", { order_id, payment_type });
  return res.data.data;
};

// GET /api/payments/order/:orderId
export const getPaymentByOrder = async (orderId) => {
  const res = await API.get(`/payments/order/${orderId}`);
  return res.data.data;
};
