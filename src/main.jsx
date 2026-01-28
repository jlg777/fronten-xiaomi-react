import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import CartProvider from "./context/CartProvider.jsx";
import OrderProvider from "./context/OrderProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
