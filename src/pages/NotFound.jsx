import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container text-center" style={{ minHeight: "60vh", paddingTop: "5rem" }}>
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-4">Página no encontrada</h2>
        <p>La página que buscas no existe o fue movida.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al inicio
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;