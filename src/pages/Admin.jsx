import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";
import ProductForm from "../components/Products/ProductForm";
import ProductSearch from "../components/Products/ProductSearch";
import ProductTable from "../components/Products/ProductTable";
import "../css/admin.css";
import "../css/layout.css";
import useProducts from "../hooks/useProducts";

const Admin = () => {
  const { products, loading, error, refetch, totalPages, currentPage, setCurrentPage } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    if (Array.isArray(products)) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleSearch = (searchTerm, category) => {
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = products;

    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (searchTerm && searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <main className="contenido container-xxxl">
          <h1 className="main-title text-center">ADMINISTRADOR DE PRODUCTOS</h1>
          <div className="row">
            <ProductForm
              refetch={refetch}
              productToEdit={productToEdit}
              setProductToEdit={setProductToEdit}
            />
            <div className="col-12 col-lg-10">
              <ProductSearch onSearch={handleSearch} />
              <ProductTable
                products={filteredProducts}
                loading={loading}
                error={error}
                refetch={refetch}
                onEdit={setProductToEdit}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
