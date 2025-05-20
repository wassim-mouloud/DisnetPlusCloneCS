using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MovieApp.Models
{
    public class WatchlistMovie
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        [BindNever] 
        public IdentityUser? User { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public string OriginalTitle { get; set; }

        [Required]
        public string Overview { get; set; }

        [Required]
        public string PosterPath { get; set; }

        public string? BackdropPath { get; set; }

        public string? OriginalLanguage { get; set; }

        public string? ReleaseDate { get; set; }

        public float? VoteAverage { get; set; }

        public int? VoteCount { get; set; }

        public float? Popularity { get; set; }

        [Required]
        public int[] GenreIds { get; set; }  

        public DateTime AddedDate { get; set; } = DateTime.UtcNow;
    }
}
