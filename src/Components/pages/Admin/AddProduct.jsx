import { useContext, useState } from "react";
import { UserContext } from "../../../Context/Mycontext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {fireDB } from "../../../Firebase/FirebaseConfig";
import Loader from "../../Loader/Loader";

const categoryList = [
  {
    name: "Facesah",
  },
  {
    name: "Sunscreen",
  },
  {
    name: "Cream",
  },
  {
    name: "Hairoil",
  },
  {
    name: "Shampoo",
  },
  {
    name: "Soap",
  },
  {
    name: "Foods",
  },
  {
    name: "Oral care",
  },
  {
    name: "Deodrant",
  },

  {
    name: "Wooden products",
  },
  {
    name: "Bodylotion",
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
    // time: Timestamp.now(),
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

        <div className=" px-8 py-6 w-72 sm:w-96 rounded-2xl shadow-2xl">
          {/* Top Heading  */}

          <div className="mb-5 mx-auto">
            <h2 className="text-center text-2xl font-bold text-green-500 ">
              Add Product
            </h2>
          </div>

          {/* Input One  */}

          <div className="mb-3 flex justify-center">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
              placeholder="Product Title"
              className="bg-green-50 text-pink-300 border border-pink-200 px-2 py-2 w-60 sm:w-72 rounded-md outline-none placeholder-green-300  "
            />
          </div>

          {/* Input Two  */}

          <div className="mb-3 flex justify-center">
            <input
              type="number"
              value={product.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
              placeholder="Product Price"
              className="bg-green-50 text-pink-300 border border-pink-200 px-2 py-2 w-60 sm:w-72 rounded-md outline-none placeholder-green-300"
            />
          </div>

          {/* Input Three  */}

          <div className="mb-3 flex justify-center">
            <input
              type="text"
              value={product.image}
              onChange={(e) => {
                setProduct({ ...product, image: e.target.value });
              }}
              placeholder="Product Image Url"
              className="bg-green-50 text-pink-300 border border-pink-200 px-2 py-2 sm:w-72 w-60 rounded-md outline-none placeholder-green-300"
            />
          </div>

          {/* Input Four  */}

          <div className="mb-3 flex justify-center">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
              className="w-60 px-1 py-2 text-pink-300 sm:w-72 bg-green-50 border border-pink-200 rounded-md outline-none  "
            >
              <option disabled>Select Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase bg-transparent"
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

          <div className="mb-3 flex justify-center">
            <textarea
              name="description"
              value={product.description}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
              placeholder="Product Description"
              rows="5"
              cols="5"
              className=" w-60 px-2 py-1 text-pink-300 sm:w-72 bg-green-50 border border-pink-200 rounded-md outline-none placeholder-green-300 "
            ></textarea>
          </div>

          {/* Add Product Button  */}

          <div className="mb-3">
            <button
              type="button"
              onClick={addproductfunction}
              className="bg-gradient-to-r from-green-900 to-green-400 w-full text-white text-center py-2 font-bold rounded-md "
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
