/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../../Firebase/FirebaseConfig";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { UserContext } from "../../../Context/Mycontext";
import Loader from "../../Loader/Loader";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Login = () => {
  const context = useContext(UserContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  /**========================================================================
   *                          User Login Function
   *========================================================================**/

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      // console.log(users.user)

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/");
          } else {
            navigate("/");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      {/* Login Form  */}
      <div className="login_Form bg-green-50 border border-black rounded-xl shadow-md w-72 lg:w-fit px-1 lg:px-8 py-6">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-green-500 ">
            Login
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3 flex justify-center">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              });
            }}
            className="bg-gray-50 border   w-60  border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-gray-600"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-5 m-5  flex justify-center">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            className="bg-gray-50 border   w-60  border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-gray-600"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5 flex justify-center m-5">
          <button
            type="button"
            onClick={userLoginFunction}
            className="bg-green-500 hover:bg-green-600  w-60  border-green-200 px-2 lg:w-96 text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black m-5">
            Don't Have an account ? { }
            <Link className=" text-green-500 font-bold" to={"/signup"}>
               Signup
            </Link>
          </h2>
        </div>
        <div className="ml-4 -mt-2">
              <Link className=" text-3xl " to={"/signup"}>
              <IoArrowBackCircleOutline className="hover:scale-125 transition-all"/>
              
              </Link>
            </div>
        
      </div>
    </div>
  );
};

export default Login;
