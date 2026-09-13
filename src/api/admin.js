import API from "./api.js";

// === PRODUCT (admin) ===
// POST /api/product  — multipart/form-data
export const adminCreateProduct = async (formData) => {
  const res = await API.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.payload;
};

// PATCH /api/product/:id  — multipart/form-data
export const adminUpdateProduct = async (id, formData) => {
  const res = await API.patch(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.payload;
};

// DELETE /api/product/:id
export const adminDeleteProduct = async (id) => {
  await API.delete(`/products/${id}`);
};

// === SHIPPING (admin) ===
// PATCH /api/shippings/order/:orderId  — body: { courier, tracking_number, shipping_status }
export const adminUpdateShipping = async (
  orderId,
  payload,
) => {
  const res = await API.patch(
    `/shippings/order/${orderId}`,
    payload,
  );
  return res.data.data;
};

// === USER (admin) — no dedicated admin user endpoint yet, use /api/user/me as base ===
export const getUserProfile = async () => {
  const res = await API.get("/users/me");
  return res.data.payload;
};

// PATCH /api/user/me
export const updateUserProfile = async (payload) => {
  const res = await API.patch("/users/me", payload);
  return res.data.payload;
};

// PUT /api/user/me/change-password
export const changePassword = async (payload) => {
  const res = await API.put(
    "/users/me/change-password",
    payload,
  );
  return res.data;
};

// === SHIPPING COST (public) ===
// POST /api/shippings/calculate
export const calculateShippingCost = async (payload) => {
  const res = await API.post(
    "/shippings/calculate",
    payload,
  );
  return res.data.data;
};

// GET /api/shippings/order/:orderId
export const getShippingDetail = async (orderId) => {
  const res = await API.get(`/shippings/order/${orderId}`);
  return res.data.data;
};

// PATCH /api/shippings/order/:orderId/complete
export const confirmOrderReceived = async (orderId) => {
  const res = await API.patch(
    `/shippings/order/${orderId}/complete`,
  );
  return res.data.data;
};
