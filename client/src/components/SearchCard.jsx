import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { movie_genres, tv_genres } from "../utils/genres";
import httpClient from "../httpClient";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

function SearchCard({
  movie,
  index,
  hovered,
  setHovered,
  hoveredMovieId,
  setHoveredMovieId,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useAuth();
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const type = "release_date" in movie ? "movie" : "tv";
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${movie.id}/videos?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0",
            },
          }
        );
        const data = await response.json();
        const trailer = data.results.find(
          (v) =>
            v.site === "YouTube" && v.type === "Trailer" && (v.official || true)
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    };

    fetchTrailer();
  }, [movie]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);

        const [moviesResponse, seriesResponse] = await Promise.all([
          httpClient.get("/api/watchlist/movies"),
          httpClient.get("/api/watchlist/series"),
        ]);

        if (moviesResponse.status === 200 && seriesResponse.status === 200) {
          const moviesWatchlist = moviesResponse.data;
          const seriesWatchlist = seriesResponse.data;

          const isMovieInMoviesWatchlist = moviesWatchlist.some(
            (watchlistMovie) => watchlistMovie.movieId === movie.id
          );
          const isMovieInSeriesWatchlist = seriesWatchlist.some(
            (watchlistSeries) => watchlistSeries.SeriesId === movie.id
          );

          setIsInWatchlist(
            isMovieInMoviesWatchlist || isMovieInSeriesWatchlist
          );
        } else {
          alert("Failed to fetch watchlist");
        }
      } catch (error) {
        console.error("Error fetching watchlists", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [movie]);

  const handleAddMovieToWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) {
      alert("Checking user status…");
      return;
    }
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
        alert(response.data?.error || "Failed to add movie");
      }
    } catch (err) {
      console.error("Error adding movie:", err.response?.data || err);
      alert(JSON.stringify(err.response?.data || "Failed to add movie"));
    }
  };

  const handleAddSeriesToWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) {
      alert("Checking user status…");
      return;
    }
    if (!user) {
      alert("Please log in to add series to your watchlist.");
      return;
    }

    try {
      const response = await httpClient.post(
        "/api/watchlist/series/add",
        {
          userID: user.id,
          seriesId: movie.id,
          name: movie.name,
          overview: movie.overview,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          originalLanguage: movie.original_language,
          firstAirDate: movie.first_air_date,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          popularity: movie.popularity,
          genreIds: movie.genre_ids,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setIsInWatchlist(true);
        toast.success(`${movie.name} added to watchlist`);
      } else {
        alert(response.data?.error || "Failed to add series");
      }
    } catch (err) {
      console.error("Error adding series:", err.response?.data || err);
      alert(JSON.stringify(err.response?.data || "Failed to add series"));
    }
  };

  const handleRemoveMovieFromWatchlist = async (e) => {
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

  const handleRemoveSeriesFromWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await httpClient.post(
      "/api/watchlist/series/remove",
      movie.id,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      setIsInWatchlist(false);
      toast.success(`${movie.name} removed from watchlist`);
    } else {
      alert(response.data.error || "Failed to remove series");
    }
  };

  const toggleWatchlist = (e) => {
    if (isInWatchlist) {
      "release_date" in movie
        ? handleRemoveMovieFromWatchlist(e)
        : handleRemoveSeriesFromWatchlist(e);
    } else {
      "release_date" in movie
        ? handleAddMovieToWatchlist(e)
        : handleAddSeriesToWatchlist(e);
    }
  };

  const watchlistLabel = isInWatchlist ? "-" : "+";

  return (
    <Link
      to={`${
        "release_date" in movie
          ? `/MovieDetail/${movie.id}`
          : `/SeriesDetail/${movie.id}`
      }`}
      key={index}
      layout
      className={`group relative fade h-[220px] md:h-[220px] lg:h-[245px]  rounded-[7px] bg-[#16181f] cursor-pointer transition-transform duration-500 ${
        hovered && movie.id === hoveredMovieId
          ? "lg:hover:scale-x-[1.7] lg:hover:scale-y-[1.4] lg:hover:z-[99]"
          : ""
      } ${index % 6 == 0 ? "lg:origin-left" : ""} ${
        index % 6 === 5 && index !== 0 ? "lg:origin-right" : ""
      } `}
      onMouseEnter={() => handleMouseEnter(movie.id)}
      onMouseLeave={handleMouseLeave}
    >
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt=""
        className={`skeleton rounded-[5px] h-full w-full ${
          hovered && movie.id === hoveredMovieId ? "lg:hidden" : ""
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
        className={`lg:mt-[50%] flex-col items-start justify-between h-[calc(60%-16px)] hidden w-full py-2 px-2 mt-1 ${
          hovered && movie.id === hoveredMovieId ? "lg:group-hover:flex" : ""
        }`}
      >
        <div className="flex gap-2 w-[95%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(
                trailerUrl ||
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    movie.original_title || movie.name
                  )} trailer`,
                "_blank"
              );
            }}
            className="text-[8px] h-[30px] w-[135px] flex justify-center items-center gap-1 bg-[#d9d9da] rounded-[5px] lg:hover:scale-105 transition-all"
          >
            <img
              loading="lazy"
              src="/images/dark-blue-play.png"
              alt=""
              className="w-2 h-2"
            />
            <span className="font-medium text-[#16181f]">Watch Now</span>
          </button>
          <button
            onClick={(e) => toggleWatchlist(e)}
            className="text-[8px] h-[30px] w-[30px] flex justify-center items-center bg-[rgba(40,42,49,255)] rounded-[5px] text-white lg:hover:scale-105 transition-all "
          >
            {watchlistLabel}
          </button>
        </div>
        <p className="font-bold text-[10px] text-[#d9d9da] py-1">
          {"release_date" in movie ? movie.original_title : movie.name}
        </p>
        <div className="w-[95%] flex flex-col gap-1">
          <div className="flex gap-1  items-center text-[8px] font-medium ">
            <span className="text-[#d9d9da] text-[8px]">
              {"release_date" in movie
                ? typeof movie.release_date === "string"
                  ? movie.release_date.slice(0, 4)
                  : null
                : typeof movie?.first_air_date === "string"
                ? movie.first_air_date.slice(0, 4)
                : null}
            </span>
            <span className="text-[#a2a3a5] text-[9px]">•</span>
            {movie.genre_ids.slice(0, 2).map((genre_id) => {
              return (
                <div className="flex gap-1 text-[8px]">
                  <span className="text-[#d9d9da]">
                    {"release_date" in movie
                      ? movie_genres[genre_id]
                      : tv_genres[genre_id]}
                  </span>
                  <span className="text-[#a2a3a5]">•</span>
                </div>
              );
            })}
            <div className="flex justify-center items-center text-[#d9d9da] gap-1">
              <img
                loading="lazy"
                src="/images/star.png"
                alt=""
                className="w-2 h-2"
              />
              <span className="text-[8px]">
                {movie.vote_average &&
                  movie.vote_average.toString().slice(0, 3)}
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

export default SearchCard;
