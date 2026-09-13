import API from "./api.js";

// GET /api/cart
export const getCart = async () => {
  const res = await API.get("/carts");
  return res.data.data; // { id, user_id, items, total_price }
};

// POST /api/cart/items
export const addCartItem = async ({
  product_id,
  product_variant_id,
  quantity,
}) => {
  const res = await API.post("/carts/items", {
    product_id,
    product_variant_id,
    quantity,
  });
  return res.data.data;
};

// PATCH /api/cart/items/:id
export const updateCartItem = async (itemId, quantity) => {
  const res = await API.patch(`/carts/items/${itemId}`, {
    quantity,
  });
  return res.data.data;
};

// DELETE /api/cart/items/:id
export const removeCartItem = async (itemId) => {
  await API.delete(`/carts/items/${itemId}`);
};
