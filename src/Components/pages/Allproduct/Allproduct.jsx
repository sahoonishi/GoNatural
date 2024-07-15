import { useNavigate } from "react-router";
import Layout from "../../Layout/Layout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context/Mycontext";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../../redux/cartSlice";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

// productData

const AllProduct = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users"));
  const { getAllProduct, loading } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

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

  const pageHandler=(selectedpage)=>{
    if(selectedpage>=1 && selectedpage<=getAllProduct.length/3 && selectedpage !==page)
    setPage(selectedpage);
  }

  return (
    <Layout>
      <div className="py-5">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center  text-2xl font-DM font-bold underline">
            All Products
          </h1>
        </div>

        {/* main  */}

        <section className="text-gray-600 body-font font-DM">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center top-8">
              {loading && <Loader />}
            </div>
            <div className="flex flex-wrap -m-4 justify-center sm:justify-start ">
              {getAllProduct
                .slice(page * 4 - 4, page * 4)
                .map((item, index) => {
                  const { image, title, price, id } = item;
                  return (
                    <div
                      key={index}
                      className="p-4  w-72 sm:w-1/2 md:w-1/3 lg:w-1/4"
                    >
                      <div className=" shadow-2xl rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-all outline-none w-full ">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          className="lg:h-52  h-40 w-full p-5 object-contain mx-auto"
                          src={image}
                          alt="blog"
                        />
                        <div className="p-6">
                          <h2 className=" tracking-widest text-xs title-font font-medium text-gray-400 mb-1 flex gap-2">
                            GoNatural{" "}
                            <div className="">
                              <img
                                className="w-9 sm:w-12 md:w-16 lg:w-16"
                                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                alt="image"
                              />
                            </div>
                          </h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-1">
                            {title.substring(0, 15)}
                          </h1>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-1">
                            Rs.{price}
                          </h1>

                          <div className="flex justify-center ">
                            {cartItems.some((p) => p.id === item.id) ? (
                              <button
                                onClick={() => deletecart(item)}
                                className=" bg-gradient-to-r from-red-900 to-red-300 w-full text-white py-[4px] rounded-3xl font-bold"
                              >
                                Delete from cart
                              </button>
                            ) : (
                              <button
                                onClick={() => addcart(item)}
                                className=" bg-gradient-to-r from-green-900 to-green-300 w-full text-white py-[4px] rounded-3xl font-bold"
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

              {getAllProduct.length > 0 && (
                <div className="flex justify-center items-center w-full mt-4 gap-6 text-xl">
                  <span onClick={()=>pageHandler(page-1)} className={page<getAllProduct.length/3?"bg-gray-300 text-black object-contain text-center rounded-lg cursor-pointer p-1":"opacity-0"}>Back</span>
                  {Array.from({length: getAllProduct.length / 3}).map((_, i) => (
                    <span onClick={()=>pageHandler(i+1)} key={i+1} className={page===i+1?"bg-gradient-to-t from-green-600 to-green-300 w-8 text-center rounded-full text-white transition-all cursor-pointer text-3xl":"cursor-pointer text-black text-base"}>{i + 1}</span>
                  ))}
                  <span onClick={()=>pageHandler(page+1)} className={page<getAllProduct.length/3?"bg-gray-300 text-black object-contain text-center rounded-lg cursor-pointer p-1":"opacity-0"}>Next</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
