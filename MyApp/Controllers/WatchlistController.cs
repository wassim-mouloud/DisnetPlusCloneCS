using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieApp.Data;
using MovieApp.Models;
using System.Security.Claims;

namespace MovieApp.Controllers
{
    [ApiController]
    [Route("api/watchlist")]
    [Authorize]
    public class WatchlistController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WatchlistController(ApplicationDbContext context)
        {
            _context = context;
        }

        private string GetUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        // ---- MOVIES ----

        [HttpPost("movies/add")]
        public async Task<IActionResult> AddMovie([FromBody] WatchlistMovie movie)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            movie.UserId = GetUserId();
            _context.WatchlistMovies.Add(movie);
            await _context.SaveChangesAsync();
            return Created("", new { message = "Movie added to watchlist" });
        }

        [HttpPost("movies/remove")]
        public async Task<IActionResult> RemoveMovie([FromBody] int id)
        {
            var userId = GetUserId();
            var movie = await _context.WatchlistMovies
                .FirstOrDefaultAsync(m => m.UserId == userId && m.MovieId == id);

            if (movie == null)
                return NotFound(new { error = "Movie not found in watchlist" });

            _context.WatchlistMovies.Remove(movie);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Movie removed from watchlist" });
        }

        [HttpGet("movies")]
        public async Task<IActionResult> GetMovies()
        {
            var userId = GetUserId();
            var movies = await _context.WatchlistMovies
                .Where(m => m.UserId == userId)
                .ToListAsync();

            return Ok(movies);
        }

        // ---- SERIES ----

        [HttpPost("series/add")]
        public async Task<IActionResult> AddSeries([FromBody] WatchlistSeries series)
        {
            series.UserId = GetUserId();
            _context.WatchlistSeries.Add(series);
            await _context.SaveChangesAsync();
            return Created("", new { message = "Series added to watchlist" });
        }

        [HttpPost("series/remove")]
        public async Task<IActionResult> RemoveSeries([FromBody] int id)
        {
            var userId = GetUserId();
            var series = await _context.WatchlistSeries
                .FirstOrDefaultAsync(s => s.UserId == userId && s.SeriesId == id);

            if (series == null)
                return NotFound(new { error = "Series not found in watchlist" });

            _context.WatchlistSeries.Remove(series);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Series removed from watchlist" });
        }

        [HttpGet("series")]
        public async Task<IActionResult> GetSeries()
        {
            var userId = GetUserId();
            var series = await _context.WatchlistSeries
                .Where(s => s.UserId == userId)
                .ToListAsync();

            return Ok(series);
        }
    }
}
