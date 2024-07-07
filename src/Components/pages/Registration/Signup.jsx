import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/Mycontext";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, fireDB } from "../../../Firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../Loader/Loader";

const Signup = () => {
  const { loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  // // User Google Sign in

  // const handleGoogle = async () => {
  //   const provider = new GoogleAuthProvider();
  //   setLoading(true);
  //   try {
  //     const users = await signInWithPopup(auth, provider);
  //     const user = {
  //       name: userSignup.name,
  //       email: users.user.email,
  //       uid: users.user.uid,
  //       role: userSignup.role,
  //       time: Timestamp.now(),
  //       date: new Date().toLocaleString("en-US", {
  //         month: "short",
  //         day: "2-digit",
  //         year: "numeric",
  //         hour: "numeric",
  //         minute: "numeric",
  //         second: "numeric",
  //       }),
  //     };

  //     const userReference = collection(fireDB, "user"); // HERE "user" IS COLLECTION NAME
  //     addDoc(userReference, user);

  //     setUserSignup({
  //       name: "",
  //       email: "",
  //       password: "",
  //     });
  //     setLoading(false);
  //     toast.success("User signed in successfully");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // user signup state

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  //   *****************************  USER SIGNUP FUNCTION    ********************************

  const userSignupfunc = async () => {
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      return toast.error(" Kindly Fill all details");
    }
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user"); // HERE "user" IS COLLECTION NAME
      addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      {/* Login Form  */}
      {loading ? (
        <Loader />
      ) : (

        <>

        {/* <div className=""><img className=" w-full sm:w-96 hidden sm:block " src="public/image/svg-image-32.svg" alt=""  /></div> */}

        <div className="login_Form bg-green-50 w-72 lg:w-fit px-1 lg:px-8 py-6  rounded-tl-3xl rounded-br-3xl shadow-md font-DM">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-green-500 ">
              Signup
            </h2>
          </div>

          {/* Input One  */}
          <div className="m-5">
            <input
              type="text"
              placeholder="Full Name"
              value={userSignup.name}
              onChange={(event) => {
                setUserSignup({ ...userSignup, name: event.target.value });
              }}
              className="bg-gray-100 border w-60  border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-green-200"
            />
          </div>

          {/* Input Two  */}
          <div className="m-5">
            <input
              type="email"
              placeholder="Email Address"
              value={userSignup.email}
              onChange={(event) => {
                setUserSignup({ ...userSignup, email: event.target.value });
              }}
              className="bg-gray-100 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-green-200"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-5 m-5">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={userSignup.password}
              onChange={(event) => {
                setUserSignup({ ...userSignup, password: event.target.value });
              }}
              className="bg-gray-100 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-green-200"
            />
          </div>

          {/* Signup Button  */}
          <div className="mb-5 m-5">
            <button
              type="button"
              onClick={userSignupfunc}
              className="bg-green-500 w-60 p-2 hover:bg-green-400 lg:w-full text-white text-center font-bold rounded-md "
            >
              Signup
            </button>
          </div>

          <div className="mb-5 m-5">
            <button
              type="button"
              
              className="bg-white w-60 p-2 hover:bg-green-400 lg:w-full text-black text-center font-bold rounded-md "
            >
              Sign in with Google
            </button>
          </div>

          <div>
            <h2 className="text-black m-5">
              Have an account ? {} {}
              <Link className=" text-green-500 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
        </>


      )}
    </div>
  );
};

export default Signup;
