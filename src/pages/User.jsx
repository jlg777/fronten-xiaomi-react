import React, { useContext } from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { AuthContext } from "../context/AuthContext";

const User = () => {
  const { user } = useContext(AuthContext);

  // Pedidos simulados
  const orders = [
    { id: 1, product: "Xiaomi Mi 12", date: "2025-10-20", status: "Enviado" },
    { id: 2, product: "Redmi Note 11", date: "2025-09-15", status: "Pendiente" },
    { id: 3, product: "Mi Band 6", date: "2025-08-30", status: "Entregado" },
  ];

  return (
    <>
      <Navbar />

      <main className="container my-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-3 text-center">
            <img
              src={user?.avatar || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'><path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z'/></svg>"} // Avatar por defecto
              alt="Avatar usuario"
              className="rounded-circle img-fluid border border-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-9">
            <h1>Bienvenido, {user?.name || "Usuario"}</h1>
            <p>Esta es tu página de usuario donde puedes ver tu información y tus pedidos.</p>
            <div className="card p-3 mt-3">
              <h5>Información de tu cuenta</h5>
              <ul className="list-unstyled mb-0">
                <li><strong>Nombre:</strong> {user?.name}</li>
                <li><strong>Email:</strong> {user?.email}</li>
                <li><strong>Rol:</strong> {user?.role || "Usuario"}</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="user-orders">
          <h3 className="mb-3">Tus pedidos recientes</h3>
          <div className="row">
            {orders.map((order) => (
              <div className="col-md-4 mb-3" key={order.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{order.product}</h5>
                    <p className="card-text">
                      <strong>Fecha:</strong> {order.date} <br />
                      <strong>Estado:</strong> {order.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default User;
