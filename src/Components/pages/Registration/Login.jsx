
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
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
            className="bg-gray-50 border w-60 border-green-200 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-green-200"
          />
        </div>

        {/* Input Three  */}
        <div className="m-5">
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-50 border border-green-200 px-2 py-2 w-60 lg:w-96 rounded-md outline-none placeholder-green-200"
          />
        </div>

        {/* Signup Button  */}
        <div className="m-5">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 w-60 lg:w-96 text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black m-5">
            Don't Have an account ? {" "}
            <Link className=" text-green-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
