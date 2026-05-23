from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from extensions import db, bcrypt, login_manager
from models.user import User

auth_bp = Blueprint("auth", __name__)


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, user_id)


@auth_bp.post("/register")
def register():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    username = data.get("username", "").strip()

    if not email or not password or not username:
        return jsonify({"errors": ["Email, password, and username are required."]}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"errors": ["Email is already registered."]}), 400

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(email=email, username=username, password_hash=hashed)
    db.session.add(user)
    db.session.commit()

    login_user(user, remember=True)
    return jsonify({"id": user.id, "email": user.email, "username": user.username}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"errors": ["Invalid email or password."]}), 401

    login_user(user, remember=True)
    return jsonify({"id": user.id, "email": user.email, "username": user.username})


@auth_bp.post("/logout")
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out."})


@auth_bp.get("/@me")
@login_required
def me():
    return jsonify({"id": current_user.id, "email": current_user.email, "username": current_user.username})
