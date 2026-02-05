import axios from "axios";
import { useEffect, useState } from "react";

export const ProductImage = ({ onImageChange, initialImage = "" }) => {
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setImageUrl(initialImage);
  }, [initialImage]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    //console.log(file);
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "preset_xiaomi");
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/dogs9oddm/image/upload",
        formData,
      );
      const url = result.data.secure_url;
      setImageUrl(url);
      onImageChange(url);
      //console.log(result.data.secure_url);
      return url;
    } catch (error) {
      console.error("Error inesperado:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="custom-file-upload">
        Seleccionar imagen
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p>Subiendo imagen...</p>}
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Vista previa del producto"
              style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
            />
          </div>
        )}
      </label>
    </div>
  );
};
export default ProductImage;
