import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { CloudCog, Trash } from "lucide-react";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../../redux/cartSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../../public/image/music/Animation - 1720790306666.json";

const CartPage = () => {
  const cartItems = useSelector((store) => store.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // DELETE FROM CART FUNCTION

  const deletecart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted");
  };

  // INCREMENT FUNCTION

  const increment = (id) => {
    //console.log(id)
    dispatch(incrementQuantity(id));
  };

  // DECREMENT FUNCTION

  const decrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // CART ITEM TOTAL

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const cartItemsTotal = cartItems.map((item) => item.quantity);
  const cartItemsTotall = cartItemsTotal.reduce(
    (acc, curVal) => acc + curVal,
    0
  );
  const cartTotalPrice = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);
  //console.log(cartItemsTotall);

  return (
    <Layout>
      {cartItems.length > 0 ? (
        <div className="container p-2 mx-auto max-w-7xl lg:px-0 font-DM ">
          <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
            <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:mx-52 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-2 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8 "
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => {
                    {
                      /* console.log(cartItems); */
                    }
                    const { id, title, price, quantity, image, category } =
                      item;

                    return (
                      <div key={index} className="">
                        <li className="flex py-6 sm:py-6 ">
                          <div className="flex-shrink-0">
                            <img
                              src={image}
                              alt="item"
                              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                              <div>
                                <div className="flex justify-between">
                                  <h3 className="text-sm">
                                    <div className="font-semibold text-black">
                                      {title}
                                    </div>
                                  </h3>
                                </div>
                                <div className="mt-1 flex text-sm">
                                  <p className="text-sm text-gray-500">
                                    {category}
                                  </p>
                                </div>
                                <div className="mt-1 flex items-end">
                                  <p className="text-xs font-medium text-gray-500">
                                    Rs. {price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <div className="mb-2 flex">
                          <div className="min-w-24 flex">
                            <button
                              onClick={() => decrement(id)}
                              type="button"
                              className="h-7 w-7"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="mx-1 h-7 w-9 rounded-md border text-center"
                              value={quantity}
                              readOnly
                            />
                            <button
                              onClick={() => increment(id)}
                              type="button"
                              className="flex h-7 w-7 items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-6 flex text-sm">
                            <button
                              onClick={() => deletecart(item)}
                              type="button"
                              className="flex items-center space-x-1 px-2 py-1 pl-0"
                            >
                              <Trash size={12} className="text-red-500" />
                              <span className="text-xs font-medium text-red-500">
                                Remove
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </section>
              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">
                        Price ({cartItemsTotall} item)
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        Rs.{cartTotalPrice}
                      </dd>
                    </div>
                    {/* <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm text-gray-800">
                      <span >Apply coupon</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">
                      {cartTotalPrice}
                    </dd>
                  </div> */}
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Shipping Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        Rs.99
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        Rs.{cartTotalPrice + 99}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    <div className="flex gap-4 mb-6">
                      <button className="w-full px-4 py-3 text-center text-gray-100 bg-green-500 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-white hover:bg-green-400 rounded-xl">
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
      ) : (
        <div className="container grid h-screen w-screen justify-center mx-auto">
          <div className="">
            {/* <img className="w-40" src="./image/man.png" alt="" /> */}
            <div className="">
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
          </div>

          <div className="mx-auto -mt-32">
            <button
              onClick={() => navigate("/")}
              type="button"
              className="bg-green-400 hover:bg-green-300 text-white text-2xl px-3 py-3 rounded-xl mx-auto font-DM"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
