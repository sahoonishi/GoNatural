import { useState } from "react";

// Search Data
const searchData = [
  {
    name: "Facewash",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/face-wash/7/9/0/200-neem-tea-tree-face-wash-acne-control-aroma-magic-original-imaghexzapbye9fd.jpeg?q=70",
  },
  {
    name: "Sunscreen",
    image:
      "https://rukminim2.flixcart.com/image/612/612/ki3gknk0pkrrdj-0/personal-care/z/j/v/100-aroma-038-aroma-magic-original-imafy3qvmhautgsj.jpeg?q=70",
  },
  {
    name: "cream",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/body-skin-treatment/7/m/8/-original-imagwrzzkgrent6f.jpeg?q=70",
  },
  {
    name: "hairoil",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/ayurvedic/1/k/i/mahabhringraj-tail-1-baidyanath-original-imagp7yfdtwykzfh.jpeg?q=70",
  },
  {
    name: "shampoo",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/soap/e/0/g/1-100-reetha-shampoo-bar-suitable-for-dry-hair-reetha-coconut-original-imagsp29xqgzhhhx.jpeg?q=70",
  },
  {
    name: "soap",
    image:
      "https://rukminim2.flixcart.com/image/612/612/kvcpn680/soap/0/y/s/-original-imag89m4ywkqj6cs.jpeg?q=70",
  },
];

const SearchBar = () => {
  // Search State
  const [search, setSearch] = useState("");
  const [empty, setEmpty] = useState(false);

  // Filter Search Data
  const filterSearchData = searchData
    .filter((obj) => obj.name.toLowerCase().includes(search))
    .slice(0, 8);
  const cleartext = () => {
    setSearch("");
  };
  return (
    <div className="">
      {/* search input  */}
      <div className="input flex justify-center border rounded-md w-52 sm:mx-auto mx-auto">
        <input
          type="text"
          value={search}
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-transparent placeholder-white rounded-lg px-12 sm:px-9 py-2 sm:w-52 w-52 outline-none text-white "
        />
        {search && (
          <span
            className="text-white -translate-x-9 sm:-translate-x-13 pt-2 cursor-pointer"
            onClick={cleartext}
          >
            <span className="-mr-2 text-lg  material-symbols-outlined">cancel</span>
          </span>
        )}
      </div>

      {/* search drop-down  */}
      <div className=" flex justify-center">
        {search && (
          <div className=" block absolute bg-gray-200 w-52 md:w-70 lg:w-70 z-50 my-1 rounded-lg px-2 py-2">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => {
                  return (
                    <div key={index} className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <img className="w-10" src={item.image} alt="" />
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <p className="text-gray-500 text-center font-DM">
                    Sorry , nothing to show
                  </p>
                  <img
                    className=" w-20"
                    src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                    alt="img"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
