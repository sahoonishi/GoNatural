import { useContext, useState } from "react";
import { UserContext } from "../../../Context/Mycontext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {fireDB } from "../../../Firebase/FirebaseConfig";
import Loader from "../../Loader/Loader";

const categoryList = [
  {
    name: "facesah",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];
const AddProduct = () => {
  const { loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  });

  const addproductfunction = async () => {
    if (
      product.title == "" ||
      product.price == "" ||
      product.image == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("all fields are required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB , "products");
      await addDoc(productRef, product);
      toast.success(`${product.title.slice(0,15) } Added Successfully`);
      setLoading(false);
      setProduct({
        title: "",
        price: "",
        image: "",
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
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        {loading && <Loader/>}

        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-2xl shadow-md">
          {/* Top Heading  */}

          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Add Product
            </h2>
          </div>

          {/* Input One  */}

          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
              placeholder="Product Title"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Two  */}

          <div className="mb-3">
            <input
              type="number"
              value={product.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
              placeholder="Product Price"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Three  */}

          <div className="mb-3">
            <input
              type="text"
              value={product.image}
              onChange={(e) => {
                setProduct({ ...product, image: e.target.value });
              }}
              placeholder="Product Image Url"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Four  */}

          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
              className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
            >
              <option disabled>Select Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:capitalize bg-transparent"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Five  */}

          <div className="mb-3">
            <textarea
              name="description"
              value={product.description}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
              placeholder="Product Description"
              rows="5"
              cols="5"
              className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
            ></textarea>
          </div>

          {/* Add Product Button  */}

          <div className="mb-3">
            <button
              type="button"
              onClick={addproductfunction}
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
