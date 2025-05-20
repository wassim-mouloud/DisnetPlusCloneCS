using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class UpdateGenreIdsToArray : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GenreIdsJson",
                table: "WatchlistSeries");

            migrationBuilder.DropColumn(
                name: "GenreIdsJson",
                table: "WatchlistMovies");

            migrationBuilder.AddColumn<int[]>(
                name: "GenreIds",
                table: "WatchlistSeries",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);

            migrationBuilder.AddColumn<int[]>(
                name: "GenreIds",
                table: "WatchlistMovies",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GenreIds",
                table: "WatchlistSeries");

            migrationBuilder.DropColumn(
                name: "GenreIds",
                table: "WatchlistMovies");

            migrationBuilder.AddColumn<string>(
                name: "GenreIdsJson",
                table: "WatchlistSeries",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GenreIdsJson",
                table: "WatchlistMovies",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
