from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from extensions import db
from models.watchlist import WatchlistMovie, WatchlistSeries
from sqlalchemy.exc import IntegrityError

watchlist_bp = Blueprint("watchlist", __name__)


# ── Movies ──────────────────────────────────────────────────────────────────

@watchlist_bp.get("/movies")
@login_required
def get_movies():
    movies = WatchlistMovie.query.filter_by(user_id=current_user.id).all()
    return jsonify([m.to_dict() for m in movies])


@watchlist_bp.post("/movies/add")
@login_required
def add_movie():
    data = request.get_json()
    try:
        movie = WatchlistMovie(
            user_id=current_user.id,
            movie_id=data["movieId"],
            original_title=data["originalTitle"],
            overview=data["overview"],
            poster_path=data["posterPath"],
            backdrop_path=data.get("backdropPath"),
            original_language=data.get("originalLanguage"),
            release_date=data.get("releaseDate"),
            vote_average=data.get("voteAverage"),
            vote_count=data.get("voteCount"),
            popularity=data.get("popularity"),
            genre_ids=data.get("genreIds", []),
        )
        db.session.add(movie)
        db.session.commit()
        return jsonify(movie.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Movie already in watchlist."}), 409
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400


@watchlist_bp.post("/movies/remove")
@login_required
def remove_movie():
    data = request.get_json(force=True, silent=True)
    movie_id = data.get("id") if isinstance(data, dict) else data
    movie = WatchlistMovie.query.filter_by(user_id=current_user.id, movie_id=movie_id).first()
    if not movie:
        return jsonify({"error": "Not found."}), 404
    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message": "Removed."})


# ── Series ───────────────────────────────────────────────────────────────────

@watchlist_bp.get("/series")
@login_required
def get_series():
    series = WatchlistSeries.query.filter_by(user_id=current_user.id).all()
    return jsonify([s.to_dict() for s in series])


@watchlist_bp.post("/series/add")
@login_required
def add_series():
    data = request.get_json()
    try:
        series = WatchlistSeries(
            user_id=current_user.id,
            series_id=data["seriesId"],
            name=data["name"],
            overview=data["overview"],
            poster_path=data["posterPath"],
            backdrop_path=data.get("backdropPath"),
            original_language=data.get("originalLanguage"),
            first_air_date=data.get("firstAirDate"),
            vote_average=data.get("voteAverage"),
            vote_count=data.get("voteCount"),
            popularity=data.get("popularity"),
            genre_ids=data.get("genreIds", []),
        )
        db.session.add(series)
        db.session.commit()
        return jsonify(series.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Series already in watchlist."}), 409
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400


@watchlist_bp.post("/series/remove")
@login_required
def remove_series():
    data = request.get_json(force=True, silent=True)
    series_id = data.get("id") if isinstance(data, dict) else data
    series = WatchlistSeries.query.filter_by(user_id=current_user.id, series_id=series_id).first()
    if not series:
        return jsonify({"error": "Not found."}), 404
    db.session.delete(series)
    db.session.commit()
    return jsonify({"message": "Removed."})
