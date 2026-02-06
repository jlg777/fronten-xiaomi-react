import { useEffect, useReducer } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemExists = state.find((item) => item._id === action.payload._id);

      if (itemExists) {
        return state.map((item) =>
          item._id === action.payload._id
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }

      return [...state, { ...action.payload, qty: 1 }];
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);

    case "INCREASE_QTY":
      return state.map((item) =>
        item._id === action.payload ? { ...item, qty: item.qty + 1 } : item,
      );

    case "DECREASE_QTY":
      return state
        .map((item) =>
          item._id === action.payload ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} agregado al carrito`);
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    toast.error("Producto eliminado del carrito");
  };

  const increaseQty = (id) => {
    dispatch({ type: "INCREASE_QTY", payload: id });
  };

  const decreaseQty = (id) => {
    dispatch({ type: "DECREASE_QTY", payload: id });
  };

  const clearCart = () => {
  dispatch({ type: "CLEAR_CART" });
  toast.success("Carrito vaciado");
};

  useEffect(() => {
    console.log("🛒 Estado actual del carrito:", cart);
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error guardando el carrito", error);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
