import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Mycontext";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomepageProductcard = () => {
  const navigate = useNavigate();
  const { getAllProduct, loading } = useContext(UserContext);

  const cartItems = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem("users"));

  const dispatch = useDispatch();

  const addCart = (item) => {
    // console.log(item)
    if (user) {
      dispatch(addToCart(item));
      toast.success("Added to cart");
    } else {
      toast.error("please login");
    }
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  // STORE CART VALUE IN LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const x = Math.floor(Math.random()*10);
  // const x=0;
  const y = x+4;

  return (
    <div className="mt-10 font-DM">
      {/* Heading  */}
      <div className="">
        <h1 className="underline text-center mb-5 text-2xl font-DM font-semibold">
          Shop by trending products
        </h1>
      </div>

      {/* main  */}
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {loading && <Loader />}
            {getAllProduct.slice(x,y).map((item) => {
              const { image, title, price, id } = item;

              return (
                <div
                  key={id}
                  className="p-4 w-72 justify-center md:w-1/3 lg:w-1/4 font-DM "
                >
                  <div className=" shadow-2xl rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-all outline-none ">
                    {/* OBJECT-CONTAIN FOR FIT AN IMAGE */}

                    <img
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="md:w-28 md:h-24 lg:h-32 lg:w-32 object-contain  h-32  w-32  mx-auto mt-4 rounded-2xl"
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

                      <h1 className="title-font text-lg font-medium font-DM text-gray-900 mb-1">
                        Rs.{price}
                      </h1>

                      <div className="flex justify-center ">
                        {cartItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className=" bg-gradient-to-r from-red-900 to-red-300 w-full text-white py-[4px] rounded-3xl font-bold"
                          >
                            Delete from cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="font-DM bg-gradient-to-r from-green-900 to-green-300 hover:text-gray-300 w-full text-white py-[4px] rounded-3xl font-bold"
                          >
                            Add to cart
                          </button>
                        )}

                        {/* <button className=" bg-green-400 hover:bg-green-500 w-full text-white py-[4px] rounded-lg font-bold">
                          Add To Cart
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomepageProductcard;
