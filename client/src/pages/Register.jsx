import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const registerUser = async () => {
    if (!isValidEmail(email)) {
      console.error("Invalid email format");
      toast.error("Invalid email format. Please enter a correct email.");
      return;
    }

    try {
      const resp = await httpClient.post("/api/auth/register", {
        email,
        password,
        username,
      });
      window.location.href = "/";
      toast.success("Registration successful! Welcome aboard.");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            console.error("Registration failed: User already exists");
            toast.error("Registration failed: User already exists.");
            break;
          default:
            console.error("An unexpected error occurred:", error.response.data);
            toast.error(
              "An unexpected error occurred. Please try again later."
            );
        }
      } else {
        console.error("An unexpected error occurred:", error.message);
        toast.error(
          "Network error or no server response. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <div className="">
      <form className="h-[100vh] w-screen flex flex-col justify-center items-center gap-6">
        <Link to="/">
          <img
            src="/images/disney-plus-logo.png"
            alt=""
            className="w-[300px] md:w-[400px]"
          />
        </Link>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="bg-[#31333e] text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] sm:w-[380px] md:w-[450px] lg:w-[500px] p-5 text-white outline-gray-400 outline-[1px]"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-mail"
          className="bg-[#31333e] text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] sm:w-[380px] md:w-[450px] lg:w-[500px] p-5 text-white outline-gray-400 outline-[1px]"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="bg-[#31333e] text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] sm:w-[380px] md:w-[450px] lg:w-[500px]  p-5 text-white outline-gray-400 outline-[1px]"
        />
        <button
          type="button"
          onClick={() => registerUser()}
          className="flex justify-center items-center text-white text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] md:w-[450px] sm:w-[380px] lg:w-[500px]  p-5 bg-[#0072d2] font-normal"
        >
          Register
        </button>
        <div className="flex items-center gap-2">
          <p className="text-white">Already have an account ?</p>
          <Link to="/Login">
            <p className="text-[#0072d2] font-semibold hover:underline underline-offset-2">
              Login
            </p>
          </Link>
        </div>
        {/* <button onClick={googleLogin}  className='flex justify-center items-center gap-2 text-white text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] md:w-[400px] sm:w-[380px]  p-5 bg-[#0072d2] font-normal' >
                    <img src="/images/google.png" alt="" className='w-8 h-8' />
                    <p>Login with Google</p>
                </button> */}
      </form>
      <Toaster richColors />
    </div>
  );
}

export default Register;
