import { useState } from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserImage from "../components/Register/UserImage";
import api from "../api/api";

const Register = () => {
  const [error, setError] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [loading, setLoading] = useState(false);

  const oneSubmit = async (data) => {
    try {
      setLoading(true)
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: avatarUrl || null,
      };
      await api.post("/user", payload);
      Swal.fire({
        icon: "success",
        title: "Usuario agregado",
        text: "El Usuario fue agregado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
console.error(error?.response?.data);
 const backendError = error.response?.data;
    let errorMessage = "Error en el registro. Intenta nuevamente.";

    if (backendError) {
      if (backendError.error) {
        errorMessage = backendError.error;
      } else if (backendError.errors) {
        errorMessage = backendError.errors.join(", ");
      }
    }

    setError(errorMessage);
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ minHeight: "60vh", paddingTop: "5rem" }}
        role="main"
      >
        <h2 className="mb-4 text-center">Registro</h2>
        <form
          onSubmit={handleSubmit(oneSubmit)}
          className="mx-auto"
          style={{ maxWidth: 400 }}
          role="form"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name", {
                required: "El nombre es obligatorio",
                pattern: {
                  value: /^[a-zA-Z]+(\s[a-zA-Z]+)+$/,
                  message: "Nombre no válido",
                },
              })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <UserImage onImageChange={setAvatarUrl} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Ingresando...
              </>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
