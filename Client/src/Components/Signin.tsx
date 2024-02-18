import { Link } from "react-router-dom";
import background from "./5172658.jpg"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signin = () => {
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
    password: ""
  });
 const handleChange = (event: any) => {
    setValues(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };
  const handleValidation = () => {
    if (values.password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (values.email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    console.log(values)
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation!")
      const response = await axios.post(`${import.meta.env.VITE_EXPRESS_URL}/user/signin`, {
        email: values.email,
        password: values.password,
      })
      const token = response.data.token;
      const userId = response.data.userId
      localStorage.setItem('userId',userId)
      localStorage.setItem('jwtToken', token);
      console.log('Signin successful:', response.data);
      setTimeout(() => {
        navigate('/');
      }, 100);
    }
  }


 

  const myStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={myStyle} className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat ">
    <div className="max-w-md w-full p-8 bg-white/30 backdrop-blur-sm bg-opacity-80 rounded-xl shadow-lg " style={{scale:"0.9"}}>
      <div className="text-center mb-8">
        <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
          RapportRave
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-900 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-xs text-gray-800 text-center">
        Don't have an account?{" "}
        <Link to="/Signup" className="text-blue-900 font-semibold">
          Sign up
        </Link>
      </p>
    </div>
    <ToastContainer />
  </div>
  )
}

export default Signin
