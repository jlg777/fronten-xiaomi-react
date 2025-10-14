import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = "https://68b7345773b3ec66cec413ee.mockapi.io/pages/products";

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      Swal.fire({
        title: "Error al cargar productos",
        text: "Ocurrió un problema al obtener los productos.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

export default useProducts;
