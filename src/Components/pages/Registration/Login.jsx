import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/Mycontext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, fireDB } from "../../../Firebase/FirebaseConfig";
import Loader from "../../Loader/Loader";

const Login = () => {
  const context = useContext(UserContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // USER LOGIN FUNCTION
  const userLoginfunction = async () => {
    if (userLogin.email === "" || userLogin.password == "") {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

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
          toast.success("Login successful");
          setLoading(false);

          if (user.role === "user") {
            navigate("/Userdashboard");
          } else {
            navigate("/admindashboard");
          }
        });

        return () => data;
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } catch (error) {
     
      setLoading(false);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      {loading === "true" ? (
        <Loader />
      ) : (
        <div className="login_Form bg-gray-50 px-1 w-72 lg:w-fit lg:px-8 py-6 border border-green-100 rounded-tl-3xl rounded-br-3xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-green-500 ">
              Login
            </h2>
          </div>

          {/* Input Two  */}
          <div className="m-5">
            <input
              type="email"
              placeholder="Email Address"
              value={userLogin.email}
              onChange={(event) => {
                setUserLogin({ ...userLogin, email: event.target.value });
              }}
              className="bg-gray-50 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-green-200"
            />
          </div>

          {/* Input Three  */}
          <div className="m-5">
            <input
              type="password"
              placeholder="Password"
              value={userLogin.password}
              onChange={(event) => {
                setUserLogin({ ...userLogin, password: event.target.value });
              }}
              className="bg-gray-50 border border-green-200 px-2 py-2 w-60 lg:w-96 rounded-md outline-none placeholder-green-200"
            />
          </div>

          {/* Signup Button  */}
          <div className="m-5">
            <button
              type="button"
              onClick={userLoginfunction}
              className="bg-green-500 hover:bg-green-400 w-60 lg:w-96 text-white text-center py-2 font-bold rounded-md "
            >
              Login
            </button>
          </div>

          <div>
            <h2 className="text-black m-5">
              Don't Have an account ?{" "}
              <Link className=" text-green-500 font-bold" to={"/signup"}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
