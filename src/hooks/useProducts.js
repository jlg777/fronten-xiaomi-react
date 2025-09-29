import axios from "axios";
import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const apiUrl = "https://68b7345773b3ec66cec413ee.mockapi.io/pages/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(apiUrl);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
