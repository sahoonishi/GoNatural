import React, { useEffect, useState } from "react";
import Searchbar from "../SearchBar/Searchbar";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { deleteAll } from "../../redux/cartSlice";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  //const cartValue = JSON.parse(localStorage.getItem("cartItems"));
  const dispatch = useDispatch();
  // const [cartData, setCartData] = useState([cartValue]);
  // console.log(cartData, ",,,,,,,,,,,,,,,,,,,,,,");

  const navigate = useNavigate();

  const logout = () => {
    //localStorage.removeItem("cartItems");
    localStorage.removeItem("users");
    dispatch(deleteAll());
    // setCartData([]);
    navigate("/");
  };

  const Kart_value = useSelector((store) => store.cart);
  // console.log(Kart_value, ".................................");

  const navlist = (
    <ul className="flex justify-evenly font-DM md:gap-x-16 mb-3 md:mb-1 px-1 text-xs md:text-base text-white  li">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/allproduct"}>Products</Link>
      </li>

      {!user ? (
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}
      {/* Signup */}
      {!user ? (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      ) : (
        ""
      )}

      {/* User */}
      {user?.role === "user" && (
        <li>
          <Link to={"/Userdashboard"}>
            <FaUserCircle className=" sm:text-2xl hover:scale-150 hover:shadow-gray-200 transition-all text-lg" />
          </Link>
        </li>
      )}
      {/* Admin */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admindashboard"}>
            <FaUserCircle className=" sm:text-2xl hover:scale-150 hover:shadow-gray-200 transition-all text-lg" />
          </Link>
        </li>
      )}
      {user && (
        <li className="cursor-pointer" onClick={logout}>
          Logout
        </li>
      )}
      <li className="mt-1">
        <Link to={"/cart"} className="relative text-lg sm:text-xl ">
          <HiMiniShoppingCart />
          <span className="absolute -top-3 left-3 bg-green-400 rounded-full text-black text-xs w-5 text-center shadow-lg z-1 border-x-2 border-y-2 font-DM outline-none">
            {/* {data.length} */}
            {Kart_value && Kart_value.length}
          </span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-green-900 sticky top-0 z-50">
      {/* main */}
      <div className="main lg:flex lg:justify-between items-center py-3 lg:px-3">
        {/* left */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-center text-white text-xl lg:text-2xl font-DM hover:scale-90 transition-all text-text-decoration-line-through relative z-50">
              GoNatural
              <span className="absolute -top-2 lg:left-14 bg-green-600 rounded-tl-full rounded-br-full -rotate-12 w-4 h-4 hover:scale-90 transition-all border-s-4">
                {" "}
              </span>
            </h2>
          </Link>
        </div>
        {/* right */}

        {navlist}

        {/* Searchbar */}
        <Searchbar />
      </div>
    </nav>
  );
};

export default Navbar;
