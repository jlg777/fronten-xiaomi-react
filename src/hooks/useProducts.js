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
    if (!apiUrl) {
      const errorMsg =
        "La URL de la API no está configurada. Verifica el archivo .env";

      console.error(errorMsg);
      setError(new Error(errorMsg));
      setLoading(false);

      Swal.fire({
        title: "Error de configuración",
        text: errorMsg,
        icon: "error",
        confirmButtonText: "Entendido",
      });

      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url = `${apiUrl}/ruta-que-no-existe`;
      if (category && category !== "all") url += `&category=${category}`;
      const response = await axios.get(url);
      setProducts(
        Array.isArray(response.data.products) ? response.data.products : [],
      );
      setTotalPages(response.data.totalPages || 0);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err);

      let errorMessage = "Ocurrió un problema al obtener los productos.";

      if (err.response?.status === 404) {
        errorMessage = `La API no está disponible en:\n${apiUrl}\n\nVerifica que:\n- El backend esté corriendo\n- La URL sea correcta\n- El puerto coincida`;
      } else if (err.response?.status === 500) {
        errorMessage = "Error interno del servidor. Intenta más tarde.";
      } else if (
        err.code === "ERR_NETWORK" ||
        err.message === "Network Error"
      ) {
        errorMessage = `No se pudo conectar al servidor en:\n${apiUrl}\n\nVerifica que el backend esté activo.`;
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

/*

Si querés, el próximo paso lógico sería:

extraer SweetAlert fuera del hook

o crear un useApiError

o mejorar la paginación con useMemo

Vos decís 😄

Si querés, el próximo paso natural sería:

limpiar el componente ProductCard

evitar JSX duplicado

o hacer un usePagination

Decime qué seguimos y le damos 🚀
*/