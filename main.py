import os

from flask import Flask, request, redirect
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf

from app.api.auth_routes import auth_routes
from app.api.book_resource_routes import resource_routes
from app.api.book_routes import book_routes
from app.api.character_routes import character_routes
from app.api.poll_routes import poll_routes
from app.api.user_routes import user_routes
from app.config import Config
from app.models.user import User
from app.models.db import getconn, DynamicDatabase
from app.seeds import seed_commands

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

# configure Flask-SQLAlchemy to use Python Connector
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+pg8000://"
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "creator": getconn
}


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(character_routes, url_prefix='/api/characters')
app.register_blueprint(book_routes, url_prefix='/api/books')
app.register_blueprint(resource_routes, url_prefix='/api/book')
app.register_blueprint(poll_routes, url_prefix='/api/polls')

CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    is_secure: bool = True if os.environ.get('FLASK_ENV') == 'production' else False
    same_site = 'Strict' if os.environ.get('FLASK_ENV') == 'production' else None
    response.set_cookie(
        'csrf_token', generate_csrf(), secure=is_secure, samesite=same_site, httponly=True
    )
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')