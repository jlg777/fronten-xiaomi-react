import axios from "axios";
import { useState } from "react";

export const ProductImage = ({ onImageChange, initialImage = "" }) => {
  const [imageUrl, setImageUrl] = useState(initialImage);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
if (!file) return;
    //console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "preset_xiaomi");
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/dogs9oddm/image/upload",
        formData
      );
      const url = result.data.secure_url;
      setImageUrl(url);
      onImageChange(url)
      //console.log(result.data.secure_url);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  return <input type="file" onChange={handleImageUpload} />;
};
export default ProductImage;
