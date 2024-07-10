import { useNavigate } from "react-router";
import Layout from "../../Layout/Layout";
import { useContext } from "react";
import { UserContext } from "../../../Context/Mycontext";
import Loader from "../../Loader/Loader";

// productData


const AllProduct = () => {
  const navigate = useNavigate();
  const { getAllProduct, loading } = useContext(UserContext);
  return (
    <Layout>
      <div className="py-8">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-DM font-bold">
            All Products
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font font-DM">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center top-8">
              {loading && <Loader />}
            </div>
            <div className="flex flex-wrap -m-4">
              {getAllProduct.map((item,index) => {
                const { image, title, price, id } = item;
                return (
                  
                    <div key={index} className="p-4 w-1/2 md:w-1/3 lg:w-1/4">
                      <div className="h-96 border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-110 transition-all">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          className="lg:h-52  h-40 w-52 p-5"
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
                            ₹{price}
                          </h1>

                          <div className="flex justify-center ">
                            <button className=" bg-green-500 hover:bg-green-600 w-full text-white py-[4px] rounded-lg font-bold">
                              Add To Cart
                            </button>
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
    </Layout>
  );
};

export default AllProduct;
