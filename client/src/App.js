import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import SeriesDetail from "./pages/SeriesDetail";
import Login from "./pages/Login";
import Watchlist from "./pages/Watchlist";
import Register from "./pages/Register";
import useAuth from "./hooks/useAuth";
function App() {
  const [hovered, setHovered] = useState(false);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleMouseEnter = async (id) => {
    setHoveredMovieId(id);
    await sleep(500);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
    setHovered(false);
  };

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      console.log("Authenticated user:", user);
    }
  }, [isLoading, user]);

  return (
    <div className="relative">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              hovered={hovered}
              hoveredMovieId={hoveredMovieId}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          }
        ></Route>
        <Route
          path="/Movies"
          element={
            <Movies
              hovered={hovered}
              hoveredMovieId={hoveredMovieId}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          }
        ></Route>
        <Route path="/Series" element={<Series />}></Route>
        <Route
          path="/Search"
          element={
            <Search
              hovered={hovered}
              hoveredMovieId={hoveredMovieId}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          }
        ></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route
          path="MovieDetail/:id"
          element={
            <MovieDetail
              hovered={hovered}
              hoveredMovieId={hoveredMovieId}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          }
        ></Route>
        <Route path="SeriesDetail/:id" element={<SeriesDetail />}></Route>
        <Route
          path="/Watchlist"
          element={
            <Watchlist
              hovered={hovered}
              hoveredMovieId={hoveredMovieId}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
