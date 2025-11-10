import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading, token } = useContext(AuthContext);
  //console.log(isAuthenticated)
  if (loading) return <div>Cargando...</div>;

  

  if (!isAuthenticated || !token) return <Navigate to="/login" />;

  // Verificar expiración del token
  try {
    const decoded = jwt_decode.default(token); // decodifica el JWT
    const now = Date.now() / 1000; // tiempo actual en segundos
    if (decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    // Token inválido
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  if (!isAuthenticated || user?.roleAdmin !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};
