import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useProducts from "../hooks/useProducts";

const Product = () => {
  const { products, loading, error } = useProducts();
  const { id } = useParams();

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar producto</p>;

  const product = products.find((p) => p._id === id);
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
      >
        <Card style={{ width: "15rem" }}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <p className="fw-bold">Precio: ${product.price}</p>
            <Button variant="primary">Comprar</Button>
          </Card.Body>
        </Card>
      </div>

      <Footer />
    </>
  );
};

export default Product;
