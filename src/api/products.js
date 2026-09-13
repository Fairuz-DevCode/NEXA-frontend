import API from "./api.js";

// GET /api/product?page=1&limit=10
export const getProducts = async (page = 1, limit = 10) => {
  const res = await API.get(
    `/products?page=${page}&limit=${limit}`,
  );
  return res.data.payload; // { products, totalItems }
};

// GET /api/product/:id  (numeric id)
export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data.payload;
};

// GET /api/product/*slugPath  (category/product slug)
export const getBySlugPath = async (slugPath) => {
  const res = await API.get(`/products/${slugPath}`);
  return res.data.payload; // { type: 'category'|'product', ... }
};
