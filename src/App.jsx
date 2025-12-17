import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { AdminRoute } from "./components/PrivateRoute/AdminRoute";
import User from "./pages/User";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* Ruta privada para usuarios */}
        <Route
          path="/user"
          element={
           <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />

        {/* Ruta Admin */}
        <Route
          path="/admin"
          element={
            //<AdminRoute>
              <Admin />
            //</AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
