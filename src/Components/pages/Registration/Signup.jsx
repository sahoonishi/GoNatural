import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/Mycontext";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification } from "firebase/auth";
import { auth, fireDB } from "../../../Firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Loader from "../../Loader/Loader";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Signup = () => {
  const context = useContext(UserContext);
  const { loading, setLoading } = context;
  const [disable,setDisable]=useState(false);
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignupfunc = async () => {
    try {
      setLoading(true);

      if (!userSignup.name || !userSignup.email || !userSignup.password) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
      const currentUser = userCredential.user;

      // ✅ Send verification email
      await sendEmailVerification(userCredential.user);
      toast.success("Verification email sent! Please check your inbox.");

      // ✅ Wait for email verification before adding to Firestore
      const checkVerification = setInterval(async () => {
        setDisable(true);
        await currentUser.reload(); // Refresh user data
      
        if (currentUser.emailVerified) {
          clearInterval(checkVerification); // Stop checking
          clearTimeout(deleteTimer); // Prevent user deletion
      
          // ✅ Now add user details to Firestore
          const user = {
            name: userSignup.name,
            email: currentUser.email,
            uid: currentUser.uid,
            role: userSignup.role,
            date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          };
      
          await addDoc(collection(fireDB, "user"), user);
          toast.success("Signup successful! You can now log in.");
          setDisable(false);
          navigate("/login");
        }
      }, 3000); // Check email verification status every 3 seconds
      
      // ❌ Delete the user from Firebase Auth if they don’t verify within 10 minutes
      const deleteTimer = setTimeout(async () => {
        await currentUser.delete(); // Remove unverified user from Firebase Auth
        clearInterval(checkVerification); // Stop checking
        toast.error("Verification time expired. Please sign up again.");
        setDisable(false);
      }, 1 * 60 * 1000); // 10 minutes
      

      setLoading(false);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      {loading ? (
        <Loader />
      ) : (
        <div className={`${disable ? "opacity-50":""} login_Form w-72 relative lg:w-fit px-1 lg:px-8 py-6 rounded-3xl overflow-hidden shadow-2xl font-DM`}>
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-green-500 ">Signup</h2>
          </div>

          <div className="m-5">
            <input
              type="text"
              placeholder="Full Name"
              value={userSignup.name}
              onChange={(event) => setUserSignup({ ...userSignup, name: event.target.value })}
              className="bg-gray-100 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md shadow-2xl outline-none placeholder-gray-600"
            />
          </div>

          <div className="m-5">
            <input
              type="email"
              placeholder="Email Address"
              value={userSignup.email}
              onChange={(event) => setUserSignup({ ...userSignup, email: event.target.value })}
              className="bg-gray-100 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-gray-600"
            />
          </div>

          <div className="mb-5 m-5">
            <input
              type="password"
              placeholder="Password"
              value={userSignup.password}
              onChange={(event) => setUserSignup({ ...userSignup, password: event.target.value })}
              className="bg-gray-100 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-gray-600"
            />
          </div>

          <div className="mb-5 m-5 relative">
            <button
              type="button"
              disabled={disable}
              onClick={userSignupfunc}
              className={`${disable ? " cursor-not-allowed opacity-45 ":""} bg-gradient-to-r from-green-900 to-green-300 w-60 p-2 hover:bg-green-400 lg:w-full text-white text-center font-bold rounded-md `}
            >
              Signup
              
            </button>
            
          </div>

          <div>
            <h2 className="text-black m-5">
              Have an account?{" "}
              <Link className="text-green-500 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>

          <div className="ml-4 -mt-2">
            <Link className="text-3xl " to={"/"}>
              <IoArrowBackCircleOutline className="hover:scale-125 transition-all" />
            </Link>
          </div>
          {disable && (
  <div className="absolute inset-0 flex items-center justify-center">
    <Loader />
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default Signup;
