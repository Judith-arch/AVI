// frontend/src/api.js
import axios from "axios";

// Configuramos la baseURL apuntando a nuestro backend
const api = axios.create({
  baseURL: "http://http://localhost:5173/api", // Ajusta si cambias el puerto del backend
});

export default api;

