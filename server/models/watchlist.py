import uuid
from datetime import datetime, timezone
from extensions import db
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import Integer


class WatchlistMovie(db.Model):
    __tablename__ = "watchlist_movies"
    __table_args__ = (
        db.UniqueConstraint("user_id", "movie_id", name="uq_user_movie"),
    )

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    movie_id = db.Column(db.Integer, nullable=False)
    original_title = db.Column(db.String, nullable=False)
    overview = db.Column(db.Text, nullable=False)
    poster_path = db.Column(db.String, nullable=False)
    backdrop_path = db.Column(db.String)
    original_language = db.Column(db.String)
    release_date = db.Column(db.String)
    vote_average = db.Column(db.Float)
    vote_count = db.Column(db.Integer)
    popularity = db.Column(db.Float)
    genre_ids = db.Column(ARRAY(Integer), nullable=False)
    added_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "movieId": self.movie_id,
            "originalTitle": self.original_title,
            "overview": self.overview,
            "posterPath": self.poster_path,
            "backdropPath": self.backdrop_path,
            "originalLanguage": self.original_language,
            "releaseDate": self.release_date,
            "voteAverage": self.vote_average,
            "voteCount": self.vote_count,
            "popularity": self.popularity,
            "genreIds": self.genre_ids,
            "addedDate": self.added_date.isoformat() if self.added_date else None,
        }


class WatchlistSeries(db.Model):
    __tablename__ = "watchlist_series"
    __table_args__ = (
        db.UniqueConstraint("user_id", "series_id", name="uq_user_series"),
    )

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    series_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)
    overview = db.Column(db.Text, nullable=False)
    poster_path = db.Column(db.String, nullable=False)
    backdrop_path = db.Column(db.String)
    original_language = db.Column(db.String)
    first_air_date = db.Column(db.String)
    vote_average = db.Column(db.Float)
    vote_count = db.Column(db.Integer)
    popularity = db.Column(db.Float)
    genre_ids = db.Column(ARRAY(Integer), nullable=False)
    added_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "seriesId": self.series_id,
            "name": self.name,
            "overview": self.overview,
            "posterPath": self.poster_path,
            "backdropPath": self.backdrop_path,
            "originalLanguage": self.original_language,
            "firstAirDate": self.first_air_date,
            "voteAverage": self.vote_average,
            "voteCount": self.vote_count,
            "popularity": self.popularity,
            "genreIds": self.genre_ids,
            "addedDate": self.added_date.isoformat() if self.added_date else None,
        }
