import React, { useReducer, useCallback } from "react";
import { OrderContext } from "./OrderContext";
import api from "../api/api";
import toast from "react-hot-toast";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "GET_ORDERS_SUCCESS":
      return { ...state, orders: action.payload, loading: false };

    case "GET_ORDER_BY_ID_SUCCESS":
      return { ...state, currentOrder: action.payload, loading: false };

    case "CREATE_ORDER_SUCCESS":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        currentOrder: action.payload,
        loading: false,
      };

    case "ERROR":
      return { ...state, error: action.payload, loading: false };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};

const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Crear orden
  const createOrder = useCallback(async (orderData) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await api.post("/orders", orderData);
      dispatch({ type: "CREATE_ORDER_SUCCESS", payload: response.data });
      toast.success("Orden creada exitosamente");
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error al crear la orden";
      dispatch({ type: "ERROR", payload: errorMsg });
      toast.error(errorMsg);
    }
  }, []);

  // Obtener todas las órdenes
  const getOrders = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await api.get("/orders");
      dispatch({ type: "GET_ORDERS_SUCCESS", payload: response.data });
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error al obtener órdenes";
      dispatch({ type: "ERROR", payload: errorMsg });
      toast.error(errorMsg);
    }
  }, []);

  // Obtener orden por ID
  const getOrderById = useCallback(async (id) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await api.get(`/orders/${id}`);
      dispatch({ type: "GET_ORDER_BY_ID_SUCCESS", payload: response.data });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error al obtener la orden";
      dispatch({ type: "ERROR", payload: errorMsg });
      toast.error(errorMsg);
    }
  }, []);

  // Limpiar errores
  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const value = {
    ...state,
    createOrder,
    getOrders,
    getOrderById,
    clearError,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
