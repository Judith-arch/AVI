import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ===== AUTH =====
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getCurrentUser: () => api.get("/auth/me"),
  logout: () => {
    localStorage.removeItem("token");
  }
};

// ===== PRODUCTS =====
export const productAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (categoryId) => api.get(`/products?category=${categoryId}`),
  getBySupermarket: (supermarketId) => api.get(`/products?supermarket=${supermarketId}`),
  search: (query) => api.get(`/products?search=${query}`),
  getCategories: () => api.get("/products/categories")
};

// ===== SHOPPING LISTS =====
export const shoppingListAPI = {
  getMyLists: () => api.get("/shopping-lists"),
  getListById: (listId) => api.get(`/shopping-lists/${listId}`),
  create: (name) => api.post("/shopping-lists", { name }),
  addProduct: (listId, productId, quantity = 1) =>
    api.post(`/shopping-lists/${listId}/items`, { product_id: productId, quantity }),
  toggleItem: (listId, itemId) =>
    api.patch(`/shopping-lists/${listId}/items/${itemId}/toggle`),
  updateQuantity: (listId, itemId, quantity) =>
    api.patch(`/shopping-lists/${listId}/items/${itemId}/quantity`, { quantity }),
  removeItem: (listId, itemId) =>
    api.delete(`/shopping-lists/${listId}/items/${itemId}`),
  deleteList: (listId) => api.delete(`/shopping-lists/${listId}`)
};

// ===== SUPERMARKETS =====
export const supermarketAPI = {
  getAll: () => api.get("/supermarkets"),
  getById: (id) => api.get(`/supermarkets/${id}`)
};

export default api;