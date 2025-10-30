import { useState } from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const apiUrl = import.meta.env.VITE_API_MONGO_USERS;

  const oneSubmit = async (data) => {
    //const { email, password } = data;
    try {
      const formData = new FormData();

      // Agregar los campos de texto
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      // Agregar archivo (si lo hay)
      if (data.avatar && data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
      }

      const response = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        icon: "success",
        title: "Usuario agregado",
        text: "El Usuario fue agregado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.details || error.response?.data?.error) {
        const { error: title, details } = error.response.data;
        setError(`${title}: ${details}`);
      } else {
        setError("Error en el registro. Intenta nuevamente.");
      }
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
                  value: /^[a-zA-Z0-9_]+$/,
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
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="form-control"
              {...register("avatar")}
            />
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
          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;

/*
BACK
TODO: Mostrar una previsualización del avatar
TODO: // Filtro opcional para limitar tipos de archivos (solo imágenes)
(Opcional) Validar tipos y tamaños de archivo

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const tipos = /jpeg|jpg|png|gif/;
    const mime = tipos.test(file.mimetype);
    const ext = tipos.test(path.extname(file.originalname).toLowerCase());

    if (mime && ext) return cb(null, true);
    cb(new Error('Solo se permiten imágenes'));
  },
});


*/