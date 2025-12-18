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

    try {
      let url = `${apiUrl}?limit=20&page=${currentPage}`;
      if (category && category !== "all") url += `&category=${category}`;
      const response = await axios.get(url);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
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
