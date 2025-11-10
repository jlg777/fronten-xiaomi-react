import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_MONGO;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err);
      Swal.fire({
        title: "Error al cargar productos",
        text:
          err.response?.data?.message ||
          "Ocurrió un problema al obtener los productos.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};

export default useProducts;
