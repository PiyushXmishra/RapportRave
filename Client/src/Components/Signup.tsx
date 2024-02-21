import { Link } from "react-router-dom";
import background from "./5172658.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: ""
  });

  useEffect(() => {
    // if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {

    // }
  }, []);

  const handleChange = (event: any) => {
    setValues(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };
  const handleValidation = () => {
    if (values.password !== values.confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (values.firstName.length < 1) {
      toast.error(
        " firstName should be greater than 1 characters.",
        toastOptions
      );
      return false;
    } else if (values.lastName.length < 1) {
      toast.error(
        " lastName should be greater than 1 characters.",
        toastOptions
      );
      return false;
    } else if (values.password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (values.email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
  // const handleValidation = () => {
  //   switch (true) {
  //     case values.password !== values.confirmPassword:
  //       toast.error("Password and confirm password should be same.", toastOptions);
  //       return false;
  //     case values.firstName.length < 1:
  //       toast.error("firstName should be greater than 1 characters.", toastOptions);
  //       return false;
  //     case values.lastName.length < 1:
  //       toast.error("lastName should be greater than 1 characters.", toastOptions);
  //       return false;
  //     case values.password.length < 8:
  //       toast.error("Password should be equal or greater than 8 characters.", toastOptions);
  //       return false;
  //     case values.email === "":
  //       toast.error("Email is required.", toastOptions);
  //       return false;
  //     default:
  //       return true;
  //   }
  // };
  
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation!")
      const response  = await axios.post(`${import.meta.env.VITE_EXPRESS_URL}/user/signup`, {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
      })
      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem('userId',userId);
      localStorage.setItem('jwtToken', token);
      console.log('Signin successful:', response.data);
      setTimeout(() => {
        navigate('/');
      }, 100);
    }
    else{
      toast.error("error in signup",toastOptions);
      return false;
    }
  }

  const myStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
  <div style={myStyle} className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="max-w-lg w-full p-8  bg-opacity-80 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl xl:text-4xl font-extrabold text-white tracking-wide">RapportRave</h1>
        </div>
        <div className="border-2 border-black rounded-2xl px-10 mt-10 shadow-2xl bg-white/30 backdrop-blur-sm">
        <div className="w-full py-5 flex-1 mt-5">
  <form action="" onSubmit={handleSubmit}>
    <div className="mx-auto max-w-md flex flex-col gap-4"> {/* Increased max-w-xs to max-w-md for a wider form */}
      <input
        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="email"
        placeholder="Enter your email"
        name="email"
        onChange={handleChange}
      />
      <input
        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="text"
        name="firstName"
        placeholder="Enter your First Name"
        onChange={handleChange}
      />
      <input
        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="text"
        name="lastName"
        placeholder="Enter your Last Name"
        onChange={handleChange}
      />
      <input
        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
      >
        <svg
          className="w-6 h-6 -ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M20 8v6M23 11h-6" />
        </svg>
        Sign Up
      </button>
      <p className="mt-6 text-xs text-white text-center">
        Already have an account?{" "}
        <Link to="/Signin" className="text-blue-900 font-semibold">Sign in</Link>
      </p>
    </div>
  </form>
</div>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default Signup