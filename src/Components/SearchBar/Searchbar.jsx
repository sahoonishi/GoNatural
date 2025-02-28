import { useContext, useState } from "react";
import { UserContext } from "../../Context/Mycontext";
import { useNavigate } from "react-router-dom";

// Search Data

const SearchBar = () => {
  // Search State
  const [search, setSearch] = useState("");
 // const [empty, setEmpty] = useState(false);
  const { getAllProduct } = useContext(UserContext);
  const navigate = useNavigate();

  // Filter Search Data
  const filterSearchData = getAllProduct
    .filter(
      (obj) =>
        obj.title.toLowerCase().includes(search.toLowerCase()) ||
        obj.category.toLowerCase().includes(search.toLowerCase()) ||
        obj.description.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 8);
  const cleartext = () => {
    setSearch("");
  };
  return (
    <div className="">
      {/* search input  */}
      <div className="  input flex justify-center border border-textColor rounded-md w-60 sm:mx-auto mx-auto">
        <input
          type="text"
          value={search}
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-transparent placeholder-textColor text-left rounded-lg px-1 sm:px-2 py-2 sm:w-52 w-52 outline-none text-textColor"
        />
        {search && (
          <span
            className="text-textColor -translate-x-1 sm:-translate-x-1 pt-2 cursor-pointer"
            onClick={cleartext}
          >
            <span className="-mr-2 text-lg  material-symbols-outlined">
              cancel
            </span>
          </span>
        )}
      </div>

      {/* search drop-down  */}
      <div className=" flex justify-center">
        {search && (
          <div className=" block absolute bg-gray-200 w-60 z-50 my-1 rounded-lg px-2 py-2">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.slice(0,4).map((item, index) => {
                  return (
                    <div
                      onClick={() => navigate(`/productinfo/${item.id}`)}
                      key={index}
                      className="py-2 px-2 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <img className="w-10" src={item.image} alt="" />
                        {item.title}
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
