import { motion } from "framer-motion";
import React from "react";
import { fadeIn } from "../../variants";
import Searchbar from "../SearchBar/Searchbar";
import { Link } from "react-router-dom";
import Switcher from "../../Switcher";
import Toggle from "../../Toggle";
const Navbar = () => {
  const navlist = (
    <ul className="flex justify-center font-DM lg:gap-x-12 mb-3 lg:mb-1 px-5 text-sm lg:text-base text-white gap-x-4 li">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/allproducts"}>Products</Link>
      </li>
      <li>
        <Link to={"/signup"}>SignUp</Link>
      </li>
      <li>
        <Link to={'/Userdashboard'}>User</Link>
      </li>
      <li>
        <Link to={'/admindashboard'}>Admin</Link>
      </li>
      <li>
        <Link to={"/cart"}>Cart</Link>
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
            <h2

              className="font-bold text-center text-white text-3xl lg:text-2xl font-DM hover:scale-90 transition-all text-text-decoration-line-through "
            >
              GoNatural
            </h2>
          </Link>
        </div>
        {/* right */}

          <p>{navlist}</p>
          <Switcher/>
          
        
        {/* Searchbar */}
        <Searchbar />
      </div>
    </nav>
  );
};

export default Navbar;
