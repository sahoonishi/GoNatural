import React from "react";
import Searchbar from "../SearchBar/Searchbar";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  const navlist = (
    <ul className="flex justify-evenly font-DM md:gap-x-12 mb-3 md:mb-1 px-1 text-xs md:text-base text-white gap-x-1 li">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/allproducts"}>Products</Link>
      </li>
      <li>
        <Link to={"/cart"}>Cart</Link>
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
    </ul>
  );

  return (
    <nav className="bg-green-900 sticky top-0 z-50">
      {/* main */}
      <div className="main lg:flex lg:justify-between items-center py-3 lg:px-3">
        {/* left */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-center text-white text-xl lg:text-2xl font-DM hover:scale-90 transition-all text-text-decoration-line-through ">
              GoNatural
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
