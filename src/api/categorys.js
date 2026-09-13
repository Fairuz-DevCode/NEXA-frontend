import API from "./api.js";

// GET /api/categories
export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data.payload;
};

// POST /api/categories  (admin only)
export const createCategory = async (payload) => {
  const res = await API.post("/categories", payload);
  return res.data.payload;
};

// DELETE /api/categories/:id  (admin only)
export const deleteCategory = async (id) => {
  await API.delete(`/categories/${id}`);
};
