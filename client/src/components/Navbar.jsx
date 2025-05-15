import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import httpClient from "../httpClient";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { pathname } = useLocation();
  const { user, isLoading } = useAuth();

  const logoutUser = async () => {
    await httpClient.post("/api/auth/logout");
    window.location.href = "/";
  };

  const links = ["Home", "Search", "Movies", "Series"];
  if (user) {
    links.push("Watchlist");
    links.push("Logout");
  } else {
    links.push("Login");
  }
  return (
    <div
      className="group w-screen lg:hover:w-[200px] lg:w-[80px] h-[85px] lg:h-screen fixed bottom-0 lg:top-0 lg:left-0 z-[99] bg-[#0f1013] lg:bg-transparent transition-[width] duration-500"
      style={{
        backgroundImage: `linear-gradient(to right, #0f1013 , transparent)`,
      }}
    >
      <div className="w-full h-[0.5px] lg:hidden bg-[#94a3b8]" />
      <div className="flex items-center justify-center w-screen h-full gap-10 p-4 text-white lg:w-full lg:flex-col lg:items-start lg:gap-6">
        {links.map((item, i) => (
          <Link
            key={i}
            to={item !== "Home" ? `/${item}` : "/"}
            onClick={item === "Logout" ? logoutUser : null}
            className={` ${
              item === "Movies" || item === "Series"
                ? "hidden absolute sm:flex sm:static"
                : ""
            }`}
          >
            <div
              className={`${
                (item !== "Home" && pathname === `/${item}`) ||
                (item === "Home" && pathname === "/")
                  ? "text-white"
                  : "text-[#C3C3C3]"
              } hover:text-white lg:hover:scale-[1.15] transition-transform duration-300 lg:ml-[10px] cursor-pointer h-[50px] flex flex-col gap-3 lg:flex-row items-center flex-shrink-0`}
            >
              <img
                src={`/images/${
                  (item !== "Home" && pathname === `/${item}`) ||
                  (item === "Home" && pathname === "/")
                    ? "white_" + item.toLowerCase() + ".png"
                    : "gray_" + item.toLowerCase() + ".png"
                }`}
                alt=""
                className={`h-[20px] min-w-[20px] w-[20px] flex-shrink-0 object-cover`}
              />
              <span
                className={`lg:-translate-x-[70%] lg:opacity-0 flex-shrink-0 lg:group-hover:translate-x-3 lg:group-hover:opacity-100 transition-transform duration-500 text-[12px] lg:text-[18px]`}
              >
                {item}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
