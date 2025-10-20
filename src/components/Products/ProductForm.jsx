import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ProductForm = ({ refetch, productToEdit, setProductToEdit }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const apiUrl = import.meta.env.VITE_API_MONGO;

  useEffect(() => {
    if (productToEdit) {
      console.log(productToEdit._id)
      reset(productToEdit);
    }
  }, [productToEdit, reset]);

  const onSubmit = async (data) => {
  console.log(data)
    setLoading(true);
    try {
      if (productToEdit) {
        const result = await Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción editara el producto de forma permanente.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, editar",
          cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
          await axios.put(`${apiUrl}/${productToEdit._id}`, data);
          Swal.fire({
            icon: "success",
            title: "Editado",
            text: "El producto fue actualizado",
            timer: 2000,
            showConfirmButton: false,
          });
        }
        setProductToEdit(null);

        reset({
          name: "",
          image: "",
          price: "",
          category: "",
          description: "",
        });
      } else {
        await axios.post(apiUrl, data);
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: "El producto fue agregado correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      reset();
      await refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el producto, intenta nuevamente",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Formulario de ingreso */}
      <div className="col-12 col-lg-2">
        <form
          id="xiaomiForm"
          className="xiaomiForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Nombre del Producto
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Producto Xiaomi"
              spellCheck={true}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-danger">El nombre es obligatorio</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Imagen del Producto
            </label>
            <input
              type="url"
              className="form-control"
              id="productImage"
              placeholder="Link de la imagen"
              {...register("image", {
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                  message: "Debe ser una URL de imagen válida",
                } 
              })}
            />
            {errors.image && (
              <p className="text-danger">{errors.image.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Precio del Producto
            </label>
            <input
              type="number"
              className="form-control"
              id="productPrice"
              placeholder="$"
              step="0.01"
              {...register("price", {
                valueAsNumber: true,
                required: "El precio es obligatorio",
                min: {
                  value: 0.01,
                  message: "El precio debe ser mayor a 0",
                },
                max: {
                  value: 9999999,
                  message: "El precio es demasiado alto",
                },
              })}
            />
            {errors.price && (
              <p className="text-danger">{errors.price.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Categoría
            </label>
            <select
              className="form-select"
              id="productCategory"
              defaultValue=""
              {...register("category", { required: true })}
            >
              <option disabled value="">
                Elija una categoría
              </option>
              <option value="Smartphones">Celulares</option>
              <option value="Wearables">Relojes Inteligentes</option>
              <option value="Accessories">Accesorios</option>
              <option value="Home Appliances">Artículos del hogar</option>
              <option value="Electronics">Electronica</option>
            </select>
            {errors.category && (
              <p className="text-danger">La categoría es obligatoria</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="productDescription"
              rows="3"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <p className="text-danger">La descripción es obligatoria</p>
            )}
          </div>
          <div
            title={
              !isValid
                ? "Completa todos los campos correctamente para enviar"
                : ""
            }
          >
            <button
              type="submit"
              className={
                isValid && !loading
                  ? "btn btn-primary"
                  : "btn btn-outline-secondary"
              }
              disabled={!isValid || loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Enviando...
                </>
              ) : productToEdit ? (
                "Editar producto"
              ) : (
                "Agregar producto"
              )}
            </button>
            {productToEdit && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  reset({
                    name: "",
                    image: "",
                    price: "",
                    category: "",
                    description: "",
                  });
                  setProductToEdit(null);
                }}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
