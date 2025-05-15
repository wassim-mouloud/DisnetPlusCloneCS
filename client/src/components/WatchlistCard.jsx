import { Link } from "react-router-dom";
import { movie_genres, tv_genres } from "../utils/genres";
import httpClient from "../httpClient";
import { toast } from "sonner";

const WatchlistCard = ({
  movie,
  index,
  hovered,
  hoveredMovieId,
  handleMouseEnter,
  handleMouseLeave,
  setWatchlistSeries,
  setWatchlistMovies,
}) => {
  const isMovie = "releaseDate" in movie;

  const handleRemoveMovieFromWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await httpClient.post(
        "/api/watchlist/movies/remove",
        movie.movieId,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        setWatchlistMovies((prev) =>
          prev.filter((m) => m.movieId !== movie.movieId)
        );
        toast.success(`${movie.originalTitle} removed from watchlist`);
      } else {
        console.error("Failed to remove movie:", response.data.error);
      }
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  const handleRemoveSeriesFromWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await httpClient.post(
        "/api/watchlist/series/remove",
        movie.seriesId,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        setWatchlistSeries((prev) =>
          prev.filter((s) => s.seriesId !== movie.seriesId)
        );
        toast.success(`${movie.name} removed from watchlist`);
      } else {
        console.error("Failed to remove series:", response.data.error);
      }
    } catch (error) {
      console.error("Error removing series:", error);
    }
  };

  const handleRemove = (e) =>
    isMovie
      ? handleRemoveMovieFromWatchlist(e)
      : handleRemoveSeriesFromWatchlist(e);

  const tmdbId = isMovie ? movie.movieId : movie.seriesId;
  const title = isMovie ? movie.originalTitle : movie.name;
  const date = isMovie ? movie.releaseDate : movie.firstAirDate;
  const poster = movie.posterPath;
  const backdrop = movie.backdropPath;
  const genres = movie.genreIds;
  const rating = movie.voteAverage;

  return (
    <Link
      to={isMovie ? `/MovieDetail/${tmdbId}` : `/SeriesDetail/${tmdbId}`}
      key={index}
      onMouseEnter={() => handleMouseEnter(tmdbId)}
      onMouseLeave={handleMouseLeave}
      className={`group relative fade h-[220px] md:h-[220px] lg:h-[245px] rounded-[7px] bg-[#16181f] cursor-pointer transition-transform duration-500 ${
        hovered && tmdbId === hoveredMovieId
          ? "lg:hover:scale-x-[1.7] lg:hover:scale-y-[1.4] lg:hover:z-[99]"
          : ""
      } ${index % 6 === 0 ? "lg:origin-left" : ""} ${
        index % 6 === 5 && index !== 0 ? "lg:origin-right" : ""
      }`}
    >
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt=""
        className={`skeleton rounded-[5px] h-full w-full ${
          hovered && tmdbId === hoveredMovieId ? "lg:hidden" : ""
        }`}
      />
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w780${backdrop}`}
        alt=""
        className={`skeleton w-full object-cover rounded-[5px] h-[40%] absolute top-0 opacity-0 ${
          hovered && tmdbId === hoveredMovieId
            ? "lg:group-hover:opacity-100 lg:flex"
            : ""
        }`}
      />

      <div
        className={`lg:mt-[50%] flex-col items-start justify-between h-[calc(60%-16px)] hidden w-full py-2 px-2 mt-1 ${
          hovered && tmdbId === hoveredMovieId ? "lg:group-hover:flex" : ""
        }`}
      >
        <div className="flex gap-2 w-[95%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(
                `https://www.youtube.com/watch?v=rcBntNCD4ZY`,
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
            onClick={handleRemove}
            className="text-[8px] h-[30px] w-[30px] flex justify-center items-center bg-[rgba(40,42,49,255)] rounded-[5px] text-white lg:hover:scale-105 transition-all"
          >
            –
          </button>
        </div>
        <p className="font-bold text-[10px] text-[#d9d9da] py-1">{title}</p>
        <div className="w-[95%] flex flex-col gap-1">
          <div className="flex gap-1 items-center text-[8px] font-medium">
            <span className="text-[#d9d9da] text-[8px]">
              {date?.slice(0, 4)}
            </span>
            <span className="text-[#a2a3a5] text-[9px]">•</span>
            {genres.slice(0, 2).map((gid) => (
              <div key={gid} className="flex gap-1 text-[8px]">
                <span className="text-[#d9d9da]">
                  {isMovie ? movie_genres[gid] : tv_genres[gid]}
                </span>
                <span className="text-[#a2a3a5]">•</span>
              </div>
            ))}
            <div className="flex justify-center items-center text-[#d9d9da] gap-1">
              <img
                loading="lazy"
                src="/images/star.png"
                alt=""
                className="w-2 h-2"
              />
              <span className="text-[8px]">
                {rating?.toString().slice(0, 3)}
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
};

export default WatchlistCard;
