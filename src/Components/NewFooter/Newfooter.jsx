import React, { useState,useRef ,useEffect } from 'react'
import { MdHome   } from 'react-icons/md'
import { AiOutlineProduct } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaOpencart  } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { HiMiniShoppingCart } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { RiUserLine } from "react-icons/ri";
import { PiUserCircleLight } from "react-icons/pi";

const Newfooter = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const [show , setShow]=useState(false);
    console.log(show)
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShow(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  return (
                  <div className="sticky md:hidden w-full bottom-0 flex py-4 px-6 justify-between drop-shadow-lg min-w-screen h-auto bg-[#FFFFFF]">
                <Link
                    href={"/"}
                    className="flex flex-col gap-0.5 items-center justify-center ">
                    {/* <img
                        // className="dark:invert"
                        src="/footer/home (1).svg"
                        alt="home"

                        className="h-6 w-6 fill-none"

                    /> */}
                    <MdHome   className='size-6 fill-primaryLight'/> 
                    <div className="text-textColor font-[500] text-[0.75rem] ">
                        Home
                    </div>
                </Link>
                <Link href={'/highlights'} className="flex flex-col gap-0.5 items-center justify-center">
                    <AiOutlineProduct className='size-6 fill-primaryLight'/>
                    <div className="text-textColor font-[500] text-[0.75rem] ">
                       All Products
                    </div>
                </Link>
                <Link href={'/search'} className="flex flex-col gap-0.5 items-center justify-center">
                    {/* <img
                        // className="dark:invert"
                        src="/footer/Search_Magnifying_Glass.svg"
                        alt="home"

                        className="h-6 w-6"

                    /> */}
                    <AiOutlineShoppingCart className="fill-primaryLight size-6 transition-all" />
                    <div className="text-textColor font-[500] text-[0.75rem] ">
                        Your Cart
                    </div>
                </Link>
                <div className="relative">
      {/* User Icon Clickable */}
      <div
        onClick={() => setShow(!show) }
        className="flex flex-col gap-0.5 items-center justify-center cursor-pointer"
      >
        {user?.role === "admin" && (
          <PiUserCircleLight className="fill-primaryLight size-6 transition-all" />
        )}
        <div className="text-textColor font-[500] text-[0.75rem]">
          Your Profile
        </div>
      </div>

      {/* Dropdown Menu */}
      {show && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute bg-white shadow-lg p-3 py-4 rounded-lg right-0 mt-2 w-40"
        >
          <Link to="/admindashboard" className="block px-4 py-2 hover:bg-gray-100">
            Dashboard
          </Link>
          <button
            onClick={() => {
              console.log("Logout Clicked"); // Add logout logic here
              setShow(false);
            }}
            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
          >
            Logout
          </button>
        </motion.div>
      )}
    </div>
            </div>
  )
}

export default Newfooter
