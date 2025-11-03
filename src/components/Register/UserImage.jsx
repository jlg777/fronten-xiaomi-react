import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
//import Spinner from 'react-bootstrap/Spinner';

export const UserImage = ({ onImageChange }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Usuario agregado",
        text: "Por favor selecciona un archivo de imagen (jpg, png, etc.)",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "preset_xiaomi");
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/dogs9oddm/image/upload",
        formData
      );
      const url = result.data.secure_url;
      setImageUrl(url);
      onImageChange(url);
      //console.log(result.data.secure_url);

      Swal.fire({
        icon: "success",
        title: "Imagen subida correctamente",
        text: "Tu avatar fue cargado con éxito.",
        timer: 1500,
        showConfirmButton: false,
      });
      return url;
    } catch (error) {
      console.error("Error inesperado:", error);
      Swal.fire({
        icon: "error",
        title: "Error al subir la imagen",
        text: "Ocurrió un problema al subir la imagen. Intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploading && <div className="spinner-border" role="status"></div>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Avatar"
          style={{ width: "100px", marginTop: "10px" }}
        />
      )}
    </div>
  );
};
export default UserImage;
