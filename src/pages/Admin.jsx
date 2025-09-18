import ProductForm from "../components/Products/ProductForm";
import ProductSearch from "../components/Products/ProductSearch";
import ProductTable from "../components/Products/ProductTable";
import "../css/admin.css";
import "../css/layout.css";

const Admin = () => {
  return (
    <>
      <div className="layout">
        <main className="contenido container-xxxl">
          <h1 className="main-title text-center">ADMINISTRADOR DE PRODUCTOS</h1>
          <div className="row">
            <ProductForm />
            <div className="col-12 col-lg-10">
              <ProductSearch />
              <ProductTable />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
