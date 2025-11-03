import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_MONGO_USERS;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      const { userWithoutPassword, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      setUser(userWithoutPassword);
      setToken(token);

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error("❌ Error en login:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Error al iniciar sesión. Verifica tus credenciales.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
