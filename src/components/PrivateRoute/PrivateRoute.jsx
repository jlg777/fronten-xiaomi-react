import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, loading , token } = useContext(AuthContext);
  if (loading) return <div>Cargando...</div>;

  if (!isAuthenticated || !token) return <Navigate to="/login" />;

  if (!isAuthenticated || user?.roleAdmin !== "user") {
    return <Navigate to="/" />;
  }

  return children;
};
