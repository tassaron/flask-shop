from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os

# initialize Flask, then plugins
app = Flask("rainbow_shop")
app.config.update(
    SECRET_KEY=os.urandom(16),
    UPLOAD_FOLDER="static/uploads",
    ALLOWED_EXTENSIONS={"jpeg", "jpg", "png", "gif"},
    MAX_CONTENT_LENGTH=2 * 1024 * 1024,  # 2MB
    SQLALCHEMY_DATABASE_URI="sqlite+pysqlite:///db/database.db",
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "account.login"
login_manager.login_message_category = "info"

from . import routes
