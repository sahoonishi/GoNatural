import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Mycontext";
import Loader from "../Loader/Loader";


const HomepageProductcard = () => {
  const navigate = useNavigate();
  const {getAllProduct , loading}=useContext(UserContext);
  return (
    <div className="mt-10 font-DM">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-DM font-semibold">
          Bestselling Products
        </h1>
      </div>

      {/* main  */}
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
          {
            loading && <Loader/>
          }
            {getAllProduct.slice(0,4).map((item) => {
              const { image, title, price , id } = item;
              return (
                <div key={id} className="p-4 w-96 justify-center md:w-1/3 lg:w-1/4 ">
                  <div className="h-96 rounded-3xl overflow-hidden cursor-pointer hover:scale-110 transition-all outline-none" onClick={()=>navigate('/productinfo')}>
                    <img
                      
                      className="md:w-28 md:h-24 lg:h-40 lg:w-44  h-44 w-1/2  ml-9 mt-3 rounded-2xl"
                      src={image}
                      alt="blog"
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
                        <button className=" bg-green-400 hover:bg-green-500 w-full text-white py-[4px] rounded-lg font-bold">
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
  );
};

export default HomepageProductcard;
