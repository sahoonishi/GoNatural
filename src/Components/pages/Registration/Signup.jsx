import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/Mycontext";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, sendEmailVerification,fetchSignInMethodsForEmail, deleteUser } from "firebase/auth";
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
  
      // Check if the user has already initiated the signup process and if they are unverified
      const previousUserSignupStatus = sessionStorage.getItem("userSignupStarted");
      if (previousUserSignupStatus) {
        // Check if the user already exists in Firebase auth and hasn't verified their email
        const user = auth.currentUser;
  
        if (user && !user.emailVerified) {
          // User exists, but email is unverified
          const deleteTimer = setTimeout(async () => {
            await deleteUser(user); // Delete the unverified user
            clearTimeout(deleteTimer); // Clear the timeout
            sessionStorage.removeItem("userSignupStarted");
            toast.error("Verification time expired. Please sign up again.");
            setDisable(false);
            setLoading(false);
            navigate("/signup");
          }, 600); // 1 minute timeout (you can adjust as needed)
  
          return; // Exit early, since the user has already initiated the signup process
        }
        // toast.error("This email is already registered. Please log in.");
        // setLoading(false);
        // return;
      }
  
      // ✅ Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
      const currentUser = userCredential.user;
  
      // ✅ Send verification email
      await sendEmailVerification(currentUser);
      toast.success("Verification email sent! Please check your inbox.");
  
      // Store the flag to track the signup status
      sessionStorage.setItem('userSignupStarted', true);
  
      // ✅ Wait for email verification before adding to Firestore
      const checkVerification = setInterval(async () => {
        setDisable(true);
        await currentUser.reload(); // Refresh user data
  
        if (currentUser.emailVerified) {
          clearInterval(checkVerification);
          clearTimeout(deleteTimer); // Prevent deletion if verified
  
          // ✅ Add user to Firestore
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
      }, 3000);
  
      // ❌ Delete unverified user after 1 minute if not verified
      const deleteTimer = setTimeout(async () => {
        await deleteUser(currentUser); // Delete the unverified user
        clearInterval(checkVerification); // Clear the interval to stop checking for verification
        toast.error("Verification time expired. Please sign up again.");
        setDisable(false);
      }, 1 * 60 * 1000); // 1 minute timeout
  
      setLoading(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please log in.");
      } else {
        console.log(error);
        toast.error(error.message);
      }
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
