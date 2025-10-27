import { useState } from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const apiUrl = import.meta.env.VITE_API_MONGO_USERS;

  const oneSubmit = async (data) => {
    //console.log(data);
    try {
      const response = await axios.post(`${apiUrl}/login`, data);
      const { userWithoutPassword,  token } = response.data;
      console.log(userWithoutPassword.roleAdmin)
       localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      alert(
        `¡Bienvenido, ${userWithoutPassword.roleAdmin === "admin" ? "Administrador" : "Usuario"}!`
      );

      if (userWithoutPassword.roleAdmin === "admin") {
        navigate("/admin");
      } else if (userWithoutPassword.roleAdmin === "user") {
        navigate("/user");
      } else {
        navigate("/"); 
      }
    } catch (error) {
       console.error(error);
         setError(
        error.response?.data?.message ||
          "Error al iniciar sesión. Verifica tus credenciales."
      );
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
        <h2 className="mb-4 text-center">Iniciar sesión</h2>
        <form
          onSubmit={handleSubmit(oneSubmit)}
          className="mx-auto"
          style={{ maxWidth: 400 }}
          role="form"
        >
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
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
          <div className="text-center mt-3">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="link-primary">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
