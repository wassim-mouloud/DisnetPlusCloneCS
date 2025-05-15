import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WatchlistCard from "../components/WatchlistCard";
import httpClient from "../httpClient";
import { Toaster } from "sonner";

function Watchlist({
  hovered,
  hoveredMovieId,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const [watchlistSeries, setWatchlistSeries] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeriesWatchlist = async () => {
    try {
      const response = await httpClient.get("/api/watchlist/series");
      if (response.status === 200) {
        setWatchlistSeries(response.data);
      } else {
        alert("Failed to fetch series watchlist");
      }
    } catch (error) {
      console.error("Error fetching series watchlist", error);
    }
  };

  const fetchMoviesWatchlist = async () => {
    try {
      const response = await httpClient.get("/api/watchlist/movies");

      if (response.status === 200) {
        setWatchlistMovies(response.data);
      } else {
        alert("Failed to fetch movies watchlist");
      }
    } catch (error) {
      console.error("Error fetching movies watchlist", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchSeriesWatchlist();
      await fetchMoviesWatchlist();
      setLoading(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log("Watchlist component mounted", watchlistSeries);
  }, [watchlistSeries]);

  return (
    <div className="lg:pb-14">
      <Navbar />
      <p className="text-white  text-[20px] lg:text-[42px] text-center font-bold p-6 lg:p-8 lg:pl-[100px]">
        My watchlist
      </p>
      <p className="text-white  text-[20px] font-semibold pl-6 lg:pl-[100px]">
        Series
      </p>
      <div className="w-screen lg:w-[calc(100vw-100px)] xl:w-[calc(100vw-140px)] grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2  mb-[120px] lg:mb-0 p-6 lg:p-8 lg:pl-[100px]">
        {watchlistSeries.map((movie, index) => {
          return (
            <WatchlistCard
              movie={movie}
              index={index}
              hovered={hovered}
              hoveredMovieId={hoveredMovieId}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              setWatchlistSeries={setWatchlistSeries}
              setWatchlistMovies={setWatchlistMovies}
            />
          );
        })}
      </div>
      <p className="text-white  text-[20px] font-semibold pl-6  lg:pl-[100px]">
        Movies
      </p>
      <div className="w-screen lg:w-[calc(100vw-100px)] xl:w-[calc(100vw-140px)] grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2  mb-[120px] lg:mb-0 p-6 lg:p-8 lg:pl-[100px]">
        {watchlistMovies.map((movie, index) => {
          return (
            <WatchlistCard
              movie={movie}
              index={index}
              hovered={hovered}
              hoveredMovieId={hoveredMovieId}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              setWatchlistSeries={setWatchlistSeries}
              setWatchlistMovies={setWatchlistMovies}
            />
          );
        })}
      </div>
      <Toaster richColors />
    </div>
  );
}

export default Watchlist;
