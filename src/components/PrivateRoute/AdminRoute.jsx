import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading, token } = useContext(AuthContext);
  //console.log(isAuthenticated)
  if (loading) return <div>Cargando...</div>;

  if (!isAuthenticated || !token) return <Navigate to="/login" />;

  try {
    const decoded = jwt_decode.default(token); 
    const now = Date.now() / 1000; 
    if (decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Error decodificando token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  if (!isAuthenticated || user?.roleAdmin !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};
