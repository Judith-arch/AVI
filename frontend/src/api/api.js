import axios from "axios";

// Crear instancia de axios
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor para agregar token automáticamente
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

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró, redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ===== SERVICIOS DE AUTENTICACIÓN =====
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getCurrentUser: () => api.get("/auth/me"),
  logout: () => {
    localStorage.removeItem("token");
  }
};

// ===== SERVICIOS DE SUPERMERCADOS =====
export const supermarketAPI = {
  getAll: () => api.get("/supermarkets"),
  getById: (id) => api.get(`/supermarkets/${id}`),
  create: (data) => api.post("/supermarkets", data),
  searchByCity: (city) => api.get(`/supermarkets?city=${city}`)
};

export default api;