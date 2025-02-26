/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { signInWithEmailAndPassword,sendPasswordResetEmail, deleteUser } from "firebase/auth";
import { auth, fireDB } from "../../../Firebase/FirebaseConfig";

import { collection, onSnapshot, query, where ,getDocs } from "firebase/firestore";
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
  const handleForgotPassword = async () => {
    if (!userLogin.email) {
      toast.error("Please enter your email first.");
      return;
    }
  
    setLoading(true);
    try {
      // Check if email exists in Firestore "user" collection
      const q = query(collection(fireDB, "user"), where("email", "==", userLogin.email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        toast.error("No account found with this email.");
        setLoading(false);
        return;
      }
  
      // Send password reset email
      await sendPasswordResetEmail(auth, userLogin.email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error("Error sending reset email. Try again.");
      console.log(error);
    }
    setLoading(false);
  };
  
  

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
      const currentUserMain = users.user;
      console.log(currentUserMain.emailVerified);
      if (currentUserMain && !currentUserMain.emailVerified) {
        console.log("hi")
        await deleteUser(currentUserMain); 
        console.log("hell") // Delete unverified user
        toast.error("Email not been verified. You can sign up again.");
        setLoading(false);
        navigate("/signup");
        
      } else {
        try {
          const users = await signInWithEmailAndPassword(
            auth,
            userLogin.email,
            userLogin.password
          );
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
            navigate("/");
            // if (user.role === "user") {
            //   navigate("/user-dashboard");
            // } else {
            //   navigate("/admin-dashboard");
            // }
          });
          return () => data;
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
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
      <div className="login_Form border-black rounded-xl shadow-2xl w-72 lg:w-fit px-1 lg:px-8 py-6">
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
            className="bg-gradient-to-r from-green-900 to-green-300   w-60  border-green-200 px-2 lg:w-96 text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black m-5">
            Don't Have an account ? {}
            <Link className=" text-green-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
        <div className="ml-4 -mt-2">
          <Link className=" text-3xl " to={"/signup"}>
            <IoArrowBackCircleOutline className="hover:scale-125 transition-all" />
          </Link>
        </div>
        <div className="text-center mb-4">
         <button
            onClick={handleForgotPassword}
            className="text-green-500 hover:underline"
          >
            Forgot Password?
         </button>
        </div>

        
      </div>
    </div>
  );
};

export default Login;
