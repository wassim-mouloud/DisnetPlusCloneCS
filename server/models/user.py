import uuid
from extensions import db
from flask_login import UserMixin


class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    watchlist_movies = db.relationship("WatchlistMovie", backref="user", lazy=True, cascade="all, delete-orphan")
    watchlist_series = db.relationship("WatchlistSeries", backref="user", lazy=True, cascade="all, delete-orphan")
