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
import ShoppingCart from "./pages/ShoppingCart";
import Product from "./pages/Product";
import { Toaster } from "react-hot-toast";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/product/:id" element={<Product />} />
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

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        {/* Ruta Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/adminorders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
