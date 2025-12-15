import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_MONGO_USERS_PROD,
});

// Interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token expirado o no autorizado");
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirige al login
    } else if (error.response?.status === 403) {
      console.error("🚫 Token inválido o expirado");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

//ver refresh token/
