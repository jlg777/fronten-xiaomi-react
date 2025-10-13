import React, { useState } from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const oneSubmit = (data) => {
    const { email, password } = data;

     const users = [
      { email: "admin@demo.com", password: "123456", role: "admin" },
      { email: "user@demo.com", password: "123456", role: "user" },
    ];

     const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

   if (foundUser) {
      setError("");
      alert(`¡Bienvenido, ${foundUser.role === "admin" ? "Administrador" : "Usuario"}!`);

      // Redirigir según el rol
      if (foundUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      setError("Usuario o contraseña incorrectos");
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
