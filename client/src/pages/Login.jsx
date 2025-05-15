import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";
import { Toaster, toast } from "sonner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const resp = await httpClient.post("/api/auth/login", {
        email,
        password,
      });
      console.log(resp.data);
      window.location.href = "/";
      toast.success("Login successful!");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 403:
            console.error("Login failed: Invalid credentials");
            toast.error("Invalid credentials. Please try again.");
            break;
          case 404:
            console.error("Login failed: User not found");
            toast.error(
              "User not found. Please check your details and try again."
            );
            break;
          default:
            console.error("An unexpected error occurred:", error.response.data);
            toast.error(
              "An unexpected error occurred. Please try again later."
            );
        }
      } else {
        console.error("Network error or no response:", error);
        toast.error(
          "Network error or no server response. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 h-[100vh] w-screen">
      <form className="flex flex-col items-center justify-center gap-6 ">
        <Link to="/">
          <img
            src="/images/disney-plus-logo.png"
            alt=""
            className="w-[300px] md:w-[400px]"
          />
        </Link>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
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
          onClick={() => loginUser()}
          className="flex justify-center items-center text-white text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] md:w-[450px] sm:w-[380px] lg:w-[500px]  p-5 bg-[#0072d2] font-normal"
        >
          Login
        </button>
        {/* <button onClick={googleLogin}  className='flex justify-center items-center gap-2 text-white text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] md:w-[400px] sm:w-[380px]  p-5 bg-[#0072d2] font-normal' >
                    <img src="/images/google.png" alt="" className='w-8 h-8' />
                    <p>Login with Google</p>
                </button> */}
      </form>
      <div className="flex items-center gap-2">
        <p className="text-white">Don't have an account ?</p>
        <Link to="/Register">
          <p className="text-[#0072d2] font-semibold hover:underline underline-offset-2">
            Sign up
          </p>
        </Link>
      </div>
      <Toaster richColors />
    </div>
  );
}

export default Login;
