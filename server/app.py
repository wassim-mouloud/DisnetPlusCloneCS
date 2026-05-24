import os
from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt, login_manager
from routes.auth import auth_bp
from routes.watchlist import watchlist_bp


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "change-me-in-production")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL",
        "postgresql+psycopg2://postgres:Federer18%40@127.0.0.1:5432/movieappdb"
    ).replace("postgres://", "postgresql+psycopg2://", 1)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_SECURE"] = os.environ.get("FLASK_ENV") == "production"

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = "auth.login"

    allowed_origins = os.environ.get("CORS_ORIGIN", "http://localhost:3000").split(",")
    CORS(app, origins=allowed_origins, supports_credentials=True,
         allow_headers=["Content-Type"], methods=["GET", "POST", "OPTIONS"])

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(watchlist_bp, url_prefix="/api/watchlist")

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=5029, debug=True)
