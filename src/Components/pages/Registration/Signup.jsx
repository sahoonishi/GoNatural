
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      <div className="login_Form bg-green-50 w-72 lg:w-fit px-1 lg:px-8 py-6 border border-green-100 rounded-tl-3xl rounded-br-3xl rounded- shadow-md">
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
            className="bg-gray-100 border w-60  border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-green-200"
          />
        </div>

        {/* Input Two  */}
        <div className="m-5">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-gray-100 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-green-200"
          />
        </div>

        {/* Input Three  */}
        <div className="mb-5 m-5">
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-100 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-green-200"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5 m-5">
          <button
            type="button"
            className="bg-green-500 w-60 p-2 hover:bg-green-400 lg:w-full text-white text-center font-bold rounded-md "
          >
            Signup
          </button>
        </div>

        <div>
          <h2 className="text-black m-5">
            Have an account ?  {} {                       }
            <Link className=" text-green-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
