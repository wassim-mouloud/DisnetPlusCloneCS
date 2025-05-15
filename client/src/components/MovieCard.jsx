import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

function MovieCard({
  movie,
  index,
  trailers,
  movie_genres,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  hoveredMovieId,
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get("/api/watchlist/movies");
        if (response.status === 200) {
          const watchlist = response.data;
          const isMovieInWatchlist = watchlist.some(
            (watchlistMovie) => watchlistMovie.movieId === movie.id
          );
          setIsInWatchlist(isMovieInWatchlist);
        } else {
          alert("Failed to fetch watchlist");
        }
      } catch (error) {
        console.error("Error fetching watchlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleAddToWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user information is still loading
    if (isLoading) {
      alert("Checking user status...");
      return;
    }

    // Ensure the user is logged in
    if (!user) {
      alert("Please log in to add movies to your watchlist.");
      return;
    }

    try {
      const response = await httpClient.post(
        "/api/watchlist/movies/add",
        {
          userID: user.id,
          movieId: movie.id,
          originalTitle: movie.original_title,
          overview: movie.overview,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          originalLanguage: movie.original_language,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          popularity: movie.popularity,
          genreIds: movie.genre_ids,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setIsInWatchlist(true);
        toast.success(`${movie.original_title} added to watchlist`);
      } else {
        alert(response.data.error || "Failed to add movie");
      }
    } catch (error) {
      console.error("Error adding movie:", error.response.data);
      alert(JSON.stringify(error.response.data));
    }
  };

  const handleRemoveFromWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await httpClient.post(
      "/api/watchlist/movies/remove",
      movie.id,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      setIsInWatchlist(false);
      toast.success(`${movie.original_title} removed from watchlist`);
    } else {
      alert(response.data.error || "Failed to remove movie");
    }
  };

  const toggleWatchlist = (e) => {
    if (isInWatchlist) {
      handleRemoveFromWatchlist(e);
    } else {
      handleAddToWatchlist(e);
    }
  };

  const watchlistLabel = isInWatchlist ? "-" : "+";

  return (
    <Link
      to={`/MovieDetail/${movie.id}`}
      key={index}
      onMouseEnter={() => handleMouseEnter(movie.id)}
      onMouseLeave={() => handleMouseLeave()}
      className={`group   ${
        hovered && movie.id === hoveredMovieId
          ? "lg:hover:scale-x-[2] lg:hover:scale-y-[1.4] xl:hover:scale-x-[1.8] xl:hover:scale-y-[1.4]"
          : ""
      }    bg-[#16181f] text-white  cursor-pointer lg:hover:z-[99] transition-transform duration-500 h-[170px] lg:h-[250px] lg:min-h-[250px] w-[110px] lg:w-[calc(100%/6-8px)] xl:w-[calc(100%/7-8px)] 2xl:w-[calc(100%/8-8px)] flex-shrink-0 rounded-[5px] ${
        index % 6 === 0 && window.innerWidth < 1280 ? "origin-left" : ""
      } ${
        index % 7 === 0 && window.innerWidth < 1536 ? "xl:origin-left" : ""
      } ${index % 8 === 0 ? "2xl:origin-left" : ""} ${
        index % 6 === 5 && index !== 0 && window.innerWidth < 1280
          ? "lg:origin-right"
          : ""
      } ${
        index % 7 === 6 && index !== 0 && window.innerWidth < 1536
          ? "xl:origin-right"
          : ""
      } ${index % 8 === 7 && index !== 0 ? "2xl:origin-right" : ""}`}
    >
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt=""
        className={`skeleton rounded-[5px] h-full w-full ${
          hovered && movie.id === hoveredMovieId ? "lg:hidden  " : ""
        }    `}
      />
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
        alt=""
        className={`skeleton w-full object-cover rounded-[5px] h-[40%] absolute top-0 opacity-0 ${
          hovered && movie.id === hoveredMovieId
            ? "lg:group-hover:opacity-100   lg:flex "
            : ""
        } `}
      />

      <div
        className={`lg:mt-[60%]  flex-col items-start justify-between h-[calc(60%-16px)] hidden w-full py-2 px-2 mt-1 ${
          hovered && movie.id === hoveredMovieId ? "lg:group-hover:flex" : ""
        }`}
      >
        <div className="flex gap-2 2xl:gap-5 w-[95%]">
          <div
            className="h-[30px] w-[135px]"
            href={`https://www.youtube.com/watch?v=${trailers[index]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(
                  `https://www.youtube.com/watch?v=${trailers[index]}`,
                  "_blank"
                );
              }}
              className="lg:hover:scale-105 transition-all duration-300 text-[8px] h-full w-full flex justify-center items-center gap-1 bg-[#d9d9da] rounded-[5px]"
            >
              <img
                src="/images/dark-blue-play.png"
                alt=""
                className="w-2 h-2"
              />
              <span className="font-medium text-[#16181f]">Watch Now</span>
            </button>
          </div>
          <button
            onClick={(e) => toggleWatchlist(e)}
            disabled={loading}
            className="lg:hover:scale-105 transition-all duration-300 text-[8px] h-[30px] w-[30px] flex justify-center items-center bg-[rgba(40,42,49,255)] rounded-[5px] text-white"
          >
            {watchlistLabel}
          </button>
        </div>
        <p className="font-semibold text-[10px] text-[#d9d9da] py-1 ">
          {movie.original_title}
        </p>

        <div className="w-[95%] flex flex-col gap-1">
          <div className="flex gap-1  items-center text-[8px] font-medium ">
            <span className="text-[#d9d9da] text-[8px] lg:text-[6px] xl:text-[8px]">
              {typeof movie.release_date === "string" &&
                movie.release_date.slice(0, 4)}
            </span>
            <span className="text-[#a2a3a5] text-[9px] lg:text-[6px] xl:text-[9px]">
              •
            </span>
            {movie.genre_ids.slice(0, 2).map((genre_id, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-1 text-[8px] lg:text-[6px] xl:text-[8px]"
                >
                  <span>{movie_genres[genre_id]}</span>
                  <span className="text-[#a2a3a5]">•</span>
                </div>
              );
            })}
            <div className="flex justify-center items-center text-[#d9d9da] gap-1">
              <img src="/images/star.png" alt="" className="w-2 h-2" />
              <span className="text-[8px] lg:text-[6px] xl:text-[8px]">
                {movie.vote_average}
              </span>
            </div>
          </div>
          <p className="text-[#7c849b] text-[7px] flex-grow-0 flex-shrink-0 w-full">
            {movie.overview.split(" ").slice(0, 22).join(" ")}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
