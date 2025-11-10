import { useContext, useEffect, useState } from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { AuthContext } from "../context/AuthContext";
import UserImage from "../components/Register/UserImage";
import Swal from "sweetalert2";
import api from "../api/api";

const User = () => {
  const { user, setUser, token } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState({
    avatar: user?.avatar || "",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  // Pedidos simulados
  const orders = [
    { id: 1, product: "Xiaomi Mi 12", date: "2025-10-20", status: "Enviado" },
    {
      id: 2,
      product: "Redmi Note 11",
      date: "2025-09-15",
      status: "Pendiente",
    },
    { id: 3, product: "Mi Band 6", date: "2025-08-30", status: "Entregado" },
  ];
  //console.log(user.name)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user"); // authMiddleware valida token
        setUser(res.data.user);
      } catch (err) {
        console.error("Token inválido o expirado", err);
      }
    };
    fetchUser();
    // Configurar intervalo para chequear cada 5 minutos (300000 ms)
    const interval = setInterval(() => {
      const continuar = window.confirm("✔ Sesión válida. ¿Deseas continuar?");
      if (!continuar) {
        fetchUser();
      }
    }, 300000);
    
    // Limpiar intervalo al desmontar
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (avatarUrl) {
      setUserData((prev) => ({ ...prev, avatar: avatarUrl }));
    }
  }, [avatarUrl]);

  const closeModal = () => {
    setShowModal(false);

    setAvatarUrl("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    //console.log(user._id);
    try {
      await api.put(`/${user._id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Tu información fue actualizada correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
      setUser((prev) => ({ ...prev, ...userData }));
      localStorage.setItem("user", JSON.stringify({ ...user, ...userData }));
      closeModal();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error.response?.data?.error || "Ocurrió un error inesperado",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container my-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-3 text-center position-relative">
            <div className="position-relative d-inline-block">
              <img
                src={
                  user?.avatar ||
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'><path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z'/></svg>"
                }
                alt="Avatar usuario"
                className="rounded-circle img-fluid border border-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />

              {/* Botón editar flotante */}
              <button
                className="btn btn-sm btn-primary position-absolute"
                style={{
                  bottom: "10px",
                  right: "10px",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Editar avatar"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h1>Bienvenido, {user?.name || "Usuario"}</h1>
            <p>
              Esta es tu página de usuario donde puedes ver tu información y tus
              pedidos.
            </p>
            <div className="card p-3 mt-3 position-relative">
              <h5>Información de tu cuenta</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <strong>Nombre:</strong> {user?.name}
                </li>
                <li>
                  <strong>Email:</strong> {user?.email}
                </li>
                <li>
                  <strong>Rol:</strong> {user?.role || "Usuario"}
                </li>
              </ul>

              <button
                className="btn btn-outline-primary btn-sm mt-3"
                onClick={() => {
                  setUserData({
                    avatar: user?.avatar || "",
                    name: user?.name || "",
                    email: user?.email || "",
                    password: "",
                  });
                  setShowModal(true);
                }}
              >
                <i className="bi bi-pencil-square me-2"></i>Editar perfil
              </button>
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

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Editar perfil</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => closeModal()}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 text-center">
                    <img
                      src={
                        userData.avatar ||
                        user?.avatar ||
                        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'><path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z'/></svg>"
                      }
                      alt="Avatar preview"
                      className="rounded-circle border mb-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <UserImage onImageChange={setAvatarUrl} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={userData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Nueva contraseña"
                      value={userData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => closeModal()}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={uploading}
                  >
                    {uploading ? "Guardando..." : "Guardar cambios"}
                  </button>
                  {uploading && (
                    <div className="spinner-border" role="status"></div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default User;
