using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieApp.Models;

namespace MovieApp.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<WatchlistMovie> WatchlistMovies { get; set; }
        public DbSet<WatchlistSeries> WatchlistSeries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<WatchlistMovie>()
                .HasIndex(w => new { w.UserId, w.MovieId })
                .IsUnique();

            builder.Entity<WatchlistSeries>()
                .HasIndex(w => new { w.UserId, w.SeriesId })
                .IsUnique();
        }
    }
}
