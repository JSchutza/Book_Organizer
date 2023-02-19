
from random import randint

from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user

from app.aws import allowed_file, upload_file
from app.forms import SignUpForm
from app.models.db import db
from app.models.user import User

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()

    # can NOT return none -- need to return an empty string because if it's a
    # dict which turns to JSON it messes with the implementation of my frontend.
    # also can not return none because my cookies don't show in the browser which
    # breaks things
    return ""


@auth_routes.route('/login', methods=['POST'])
def login():
    errors = ["Invalid login, please try again."]
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()

    return {'errors': errors}


@auth_routes.route('/logout')
def logout():
    logout_user()
    return ''


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    errors = ["Invalid sign-up, please try again."]
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" not in request.files:
        return {"errors": errors}

    image = request.files["image"]
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    if not allowed_file(image.filename):
        return {"errors": errors}

    image.filename = app.aws.get_unique_filename(image.filename)

    if form.validate_on_submit():
        upload = upload_file(image)

        if "url" not in upload:
            return {"errors": errors}

        url = upload["url"]
        user = User(the_search_id=f'{randint(1, 100)}{randint(1, 10000000000)}',
                    user_name=username,
                    email=email,
                    password=password,
                    avatar=url
                    )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    return {"errors": errors}


@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['You are not authorized to access this.']}
