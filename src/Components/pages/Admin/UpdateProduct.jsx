import { useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../../Firebase/FirebaseConfig";
import { UserContext } from "../../../Context/Mycontext";
import toast from "react-hot-toast";

const categoryList = [
  {
    name: "Facewash",
  },
  {
    name: "Cream",
  },
  {
    name: "Sunscreen",
  },
  {
    name: "Wooden products",
  },
  {
    name: "Hair oil",
  },
  {
    name: "Shampoo",
  },
  {
    name: "BodyLotion",
  },
  {
    name: "Oral care",
  },
  {
    name: "Foods",
  },
  {
    name: "Deodrant",
  },
  {
    name: "Soap",
  },
];

const UpdateProduct = () => {
  const context = useContext(UserContext);
  const { loading, setLoading, getAllProductFunction } = context;
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
    
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  });

  // ===========================FUNCTON TO GET existing product data============================

  const getsingle = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const singleproduct = productTemp.data();
      //console.log(singleproduct);
      setProduct({
        title: singleproduct.title,
        price: singleproduct.price,
        image: singleproduct.image,
        category: singleproduct.category,
        description: singleproduct.description,
        quantity: singleproduct.quantity,
        date: singleproduct.date,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // FUNCTION TO UPDATE THE PRODUCT

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success(`${product.title} Updated Successfully`);
      getAllProductFunction();
      setLoading(false);
      navigate("/admindashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getsingle();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        <div className="login_Form  px-8 py-6 w-72 sm:w-96 rounded-2xl shadow-2xl">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-gray-500 ">
              Update Product
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              value={product.title}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
              name="title"
              placeholder="Product Title"
              className="bg-gray-50 border text-green-300 border-green-200 px-2 py-2 rounded-md outline-none placeholder-gray-600 w-60 sm:w-72"
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
              placeholder="Product Price"
              className="bg-gray-50 border text-green-300 border-green-200 px-2 py-2 rounded-md outline-none placeholder-gray-600 w-60 sm:w-72"
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
              name="image"
              placeholder="Image Url"
              className="bg-gray-50 border text-green-300 border-green-200 px-2 py-2 rounded-md outline-none placeholder-gray-600 w-60 sm:w-72"
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
              className=" px-1 py-2 text-green-300 bg-gray-50 border border-green-200 rounded-md outline-none w-60 sm:w-72 "
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
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
              className=" px-2 py-1 text-green-300 bg-gray-50 border border-green-200 rounded-md outline-none placeholder-gray-600 w-60 sm:w-72 "
            ></textarea>
          </div>

          {/* Update Product Button  */}
          <div className="mb-3">
            <button
              type="button"
              onClick={updateProduct}
              className="bg-gradient-to-r from-green-900 to-green-400 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
