import API from "./api.js";

// GET /api/addresses
export const getAddresses = async () => {
  const res = await API.get("/addresses");
  return res.data.payload;
};

// POST /api/addresses — body: { label, phone, street_address, city, country, postal_code }
export const createAddress = async (payload) => {
  const res = await API.post("/addresses", payload);
  return res.data.payload;
};

// PATCH /api/addresses/:id
export const updateAddress = async (id, payload) => {
  const res = await API.patch(`/addresses/${id}`, payload);
  return res.data.payload;
};

// DELETE /api/addresses/:id
export const deleteAddress = async (id) => {
  await API.delete(`/addresses/${id}`);
};
