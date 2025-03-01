import { useContext, useState ,React } from "react";
import axios from "axios";
import { UserContext } from "../../../Context/Mycontext";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../../Firebase/FirebaseConfig";
import Loader from "../../Loader/Loader";
// const cloudName=process.env.cloudName;
// const cloudName = import.meta.env.cloudName;
// const preset = import.meta.env.preset;

const categoryList = [
  { name: "Facesah" }, { name: "Sunscreen" }, { name: "Cream" }, { name: "Hairoil" }, { name: "Shampoo" },
  { name: "Soap" }, { name: "Foods" }, { name: "Oral care" }, { name: "Deodrant" },
  { name: "Wooden products" }, { name: "Bodylotion" }
];

const AddProduct = () => {
  const { loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: null,
    // previewImage: "",
    description: "",
    category: "",
    quantity: 1,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  });

  // ✅ Upload Image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`); // Replace with your Cloudinary preset
    formData.append("cloud_name", `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`); // Replace with your Cloudinary cloud name

    try {
      // console.log(cloudName);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // ✅ Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Only image files are allowed!");
    }

    setProduct((prev) => ({ ...prev, image: file }));

    // // Preview Image
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setProduct((prev) => ({ ...prev, previewImage: reader.result }));
    // };
    // reader.readAsDataURL(file);
  };

  // ✅ Add Product to Firebase
  const addProductFunction = async () => {
    if (!product.title || !product.price || !product.image || !product.category || !product.description) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(product.image);
      console.log(imageUrl);
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, { ...product, image: imageUrl });

      toast.success(`${product.title.slice(0, 15)} Added Successfully`);
      setLoading(false);
      setProduct({
        title: "",
        price: "",
        image: null,
        // previewImage: "",
        description: "",
        category: "",
        quantity: 1,
      });
      navigate("/admindashboard");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="px-8 py-6 w-72 sm:w-96 rounded-2xl shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-green-500">Add Product</h2>

        <input type="text" value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="Product Title" className="bg-green-50 text-pink-300 border px-2 py-2 w-full rounded-md outline-none" />

        <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Product Price" className="bg-green-50 text-pink-300 border px-2 py-2 w-full rounded-md outline-none mt-3" />

        <input type="file" accept="image/*" onChange={handleImageChange} className="bg-green-50 text-pink-300 border px-2 py-2 w-full rounded-md outline-none mt-3" />

        {/* {product.previewImage && <img src={product.previewImage} alt="Preview" className="w-full h-16 mt-3 rounded-md" />} */}

        <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="w-full px-2 py-2 text-pink-300 bg-green-50 border rounded-md outline-none mt-3">
          <option disabled>Select Category</option>
          {categoryList.map((value, index) => (
            <option key={index} value={value.name}>{value.name}</option>
          ))}
        </select>

        <textarea value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })}
          placeholder="Product Description" rows="3" className="w-full px-2 py-1 text-pink-300 bg-green-50 border rounded-md outline-none mt-3"></textarea>

        <button onClick={addProductFunction} className="bg-gradient-to-r from-green-900 to-green-400 w-full text-white text-center py-2 font-bold rounded-md mt-3">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
