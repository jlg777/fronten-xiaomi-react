import { useEffect, useReducer } from "react";
import { CartContext } from "./CartContext";

const initialState = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemExists = state.find((item) => item._id === action.payload._id);

      if (itemExists) {
        return state.map((item) =>
          item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...state, { ...action.payload, qty: 1 }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {

  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  useEffect(() => {
  console.log("🛒 Estado actual del carrito:", cart);
}, [cart]);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};

export default CartProvider

// const useCart = () => useContext(CartContext);
