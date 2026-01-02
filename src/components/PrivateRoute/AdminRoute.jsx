import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading, token } = useContext(AuthContext);
  //console.log(isAuthenticated)
  if (loading) return <div>Cargando...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (user?.roleAdmin !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};
