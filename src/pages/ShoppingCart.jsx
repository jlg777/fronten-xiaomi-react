import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";

const ShoppingCart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);
  const total = cart.reduce((acc, prod) => acc + prod.price * prod.qty, 0);

  return (
    <>
      <Navbar />
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Imagen</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No hay productos disponibles.
              </td>
            </tr>
          ) : (
            cart.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>
                  <img
                    src={prod.image}
                    alt={`Imagen de ${prod.name}`}
                    style={{
                      width: "10rem",
                      height: "8rem",
                      objectFit: "cover",
                    }}
                    className="rounded"
                  />
                </td>
                <td>{prod.price}</td>
                <td>{prod.description}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2"
                    onClick={() => increaseQty(prod._id)}
                  >
                    <i className="bi bi-plus-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    disabled={prod.qty === 1}
                    onClick={() => decreaseQty(prod._id)}
                  >
                    <i className="bi bi-dash-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(prod._id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
                <td>{prod.qty}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
        <Form.Label className="mb-0 fw-bold">Total:</Form.Label>
        <Form.Control
          type="text"
          value={total.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
          readOnly
          style={{ width: "150px" }}
        />
      </div>
      <NavLink to="/checkout" className="btn btn-primary me-2">
        Ir a Checkout
      </NavLink>
      <Footer />
    </>
  );
};

export default ShoppingCart;
