import { useNavigate } from "react-router";
import Layout from "../../Layout/Layout";

// productData
const productData = [
  {
    id: 2,
    title: "best organic facewash",
    desc: "l",
    price: 299,
    trendingProductName: "Featured",
    quantity: 1,
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/face-wash/7/9/0/200-neem-tea-tree-face-wash-acne-control-aroma-magic-original-imaghexzapbye9fd.jpeg?q=70",
  },
  {
    id: 3,
    title: "best organic sunscreen",
    desc: "l",
    price: 199,
    trendingProductName: "Featured",
    quantity: 1,
    image:
      "https://rukminim2.flixcart.com/image/612/612/ki3gknk0pkrrdj-0/personal-care/z/j/v/100-aroma-038-aroma-magic-original-imafy3qvmhautgsj.jpeg?q=70",
  },
  {
    id: 4,
    title: "best organic cream",
    desc: "l",
    price: 299,
    trendingProductName: "Featured",
    quantity: 1,
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/body-skin-treatment/7/m/8/-original-imagwrzzkgrent6f.jpeg?q=70",
  },
  {
    id: 5,
    title: "best organic facewash",
    desc: "l",
    price: 299,
    trendingProductName: "Featured",
    quantity: 1,
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/hair-oil/a/2/y/-original-imagqwzzmphmnech.jpeg?q=70",
  },
  {
    id: 6,
    title: "best organic facewash",
    desc: "l",
    price: 299,
    trendingProductName: "Featured",
    quantity: 1,
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/soap/e/0/g/1-100-reetha-shampoo-bar-suitable-for-dry-hair-reetha-coconut-original-imagsp29xqgzhhhx.jpeg?q=70",
  },
  {
    id: 7,
    title: "best organic facewash",
    desc: "l",
    price: 299,
    trendingProductName: "Featured",
    quantity: 1,
    image:
      "https://rukminim2.flixcart.com/image/612/612/kvcpn680/soap/0/y/s/-original-imag89m4ywkqj6cs.jpeg?q=70",
  },

];

const AllProduct = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="py-8">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-DM">
            All Products
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font font-DM">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {productData.map((item, index) => {
                const { image, title, price } = item;
                return (
                  <div key={index} className="p-4 w-1/2 md:w-1/3 lg:w-1/4">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-110 transition-all" >
                      <img
                        onClick={() => navigate("/productinfo")}
                        className="lg:h-52  h-40 w-52 p-5"
                        src={image}
                        alt="blog"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          GoNatural
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {title.substring(0, 25)}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          ₹{price}
                        </h1>

                        <div className="flex justify-center ">
                          <button className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
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