import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  console.log(isAuthenticated)
  if (loading) return <div>Cargando...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};
