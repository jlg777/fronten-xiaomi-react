import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useOrders } from "../hooks/useOrders";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const { createOrder, loading } = useOrders();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
    notes: "",
  });

  const total = cart.reduce((acc, prod) => acc + prod.price * prod.qty, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      items: cart.map((prod) => ({
        product: prod._id,
        quantity: prod.qty,
        priceAtPurchase: prod.price,
      })),
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        zip: formData.postalCode,
        country: "Argentina",
      },
      paymentMethod: formData.paymentMethod,
      total,
    };

    /*const result = await createOrder(orderData);
    if (result) {
      navigate("/user");
    }*/
   console.log(orderData)
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="text-center py-5">
          <h3>No hay productos en el carrito</h3>
          <Button href="/products" className="mt-3">
            Continuar comprando
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">Checkout</h2>

        <div className="row">
          {/* Resumen del carrito */}
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Resumen del pedido</h4>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cant.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((prod) => (
                      <tr key={prod._id}>
                        <td>{prod.name}</td>
                        <td>{prod.qty}</td>
                        <td>
                          ${(prod.price * prod.qty).toLocaleString("es-AR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span>
                    ${total.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de envío */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Información de envío</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Método de pago</Form.Label>
                    <Form.Select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="card">Tarjeta de crédito/débito</option>
                      <option value="paypal">PayPal</option>
                      <option value="transfer">Transferencia bancaria</option>
                      <option value="cash">Efectivo</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Notas adicionales</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Ej: Dejar en portería, tocar timbre, etc."
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      variant="success"
                      size="lg"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Procesando...
                        </>
                      ) : (
                        "Confirmar compra"
                      )}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => navigate("/cart")}
                    >
                      Volver al carrito
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
