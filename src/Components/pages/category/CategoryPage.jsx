import React, { useContext, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Context/Mycontext";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const { loading, setLoading, getAllProduct } = useContext(UserContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('users'));

  const cartItems = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  // ADD TO CART FUNCTION

  const addcart = (item) => {
    if (user) {
      dispatch(addToCart(item));
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Please login");
    }
  };
  const deletecart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Product removed from cart successfully!");
  };

  // STORE IN LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // FILTER PRODUCT ON THE BASIS OF CATEGORY
  console.log(getAllProduct);

  const filterProduct = getAllProduct.filter((item) =>
    item?.category?.includes(categoryname)
  );
  return (
    <Layout>
      <div className="mt-10">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold ">
            {categoryname}
          </h1>
        </div>
        {loading ? (
          <>
            <div className="flex justify-center mt-40">
              <Loader />
            </div>
          </>
        ) : (
          <section className="text-gray-600 body-font ">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap justify-center -m-4">
                {/* {loading && <Loader />} */}
                {filterProduct.map((item) => {
                  const { image, title, price, id } = item;
                  return (
                    <div
                      key={id}
                      className="p-4 w-96 justify-center md:w-1/3 lg:w-1/4 "
                    >
                      <div className="h-96 rounded-3xl overflow-hidden cursor-pointer hover:scale-110 transition-all outline-none">
                        <img
                          className=" object-contain md:w-28 md:h-24 lg:h-40 lg:w-44  h-44 w-1/2  ml-9 mt-3 rounded-2xl"
                          src={image}
                          alt="blog"
                          onClick={() => navigate(`/productinfo/${id}`)}
                        />
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            GoNatural
                          </h2>

                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {title.substring(0, 15)}
                          </h1>

                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            ₹{price}
                          </h1>

                          <div className="flex justify-center ">
                            {cartItems.some((p) => p.id === item.id) ? (
                              <button
                                onClick={() => deletecart(item)}
                                className=" bg-red-500 hover:bg-red-600 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Delete from cart
                              </button>
                            ) : (
                              <button
                                onClick={() => addcart(item)}
                                className=" bg-green-500 hover:bg-green-600 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
