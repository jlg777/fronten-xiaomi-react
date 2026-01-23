import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const useProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const apiUrl = import.meta.env.VITE_API_MONDO_PRODUCTS;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Verificar si la URL de la API está configurada
    if (!apiUrl) {
      const errorMsg = "La URL de la API no está configurada. Verifica el archivo .env";
      console.error(errorMsg);
      setError(new Error(errorMsg));
      Swal.fire({
        title: "Error de configuración",
        text: "La URL de la API de productos no está configurada. Verifica el archivo .env",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      setLoading(false);
      return;
    }

    try {
      let url = `${apiUrl}?limit=20&page=${currentPage}`;
      if (category && category !== "all") url += `&category=${category}`;
      const response = await axios.get(url);
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err);
      
      let errorMessage = "Ocurrió un problema al obtener los productos.";
      
      if (err.response?.status === 404) {
        errorMessage = `La API no está disponible en: ${apiUrl}\n\nVerifica que:\n- El servidor backend esté corriendo\n- La URL en el archivo .env sea correcta\n- El puerto y la ruta sean los correctos`;
      } else if (err.response?.status === 500) {
        errorMessage = "Error interno del servidor. Intenta más tarde.";
      } else if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
        errorMessage = `No se pudo conectar al servidor en: ${apiUrl}\n\nVerifica que el servidor backend esté corriendo.`;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      Swal.fire({
        title: "Error al cargar productos",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoading(false);
    }
  }, [apiUrl, currentPage, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default useProducts;
