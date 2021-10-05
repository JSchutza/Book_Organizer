
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.validators import check_if_empty, check_right_length, check_lengths
from app.models import db, User
from app.forms import UpdateUserForm
from app.aws import allowed_file, get_unique_filename, upload_file, get_s3_location, purge_aws_resource


# from app.models.user import follower_to_followee

user_routes = Blueprint('users', __name__)



# /api/users/:userId
@user_routes.route('/<int:user_id>', methods=['PUT'])
@login_required
def update_user_info(user_id):
    errors = []
    error_message = "A error occurred when updating your profile."
    if "new_avatar" not in request.files:
        errors.append(error_message)
        return { "errors":  errors }

    form = UpdateUserForm()
    name = form.data['new_name']
    email = form.data['new_email']
    password = form.data['new_password']
    bio = form.data['new_bio']
    location = form.data['new_location']
    birthdate = form.data['new_birthdate']
    avatar = request.files["new_avatar"]

    if not allowed_file(avatar.filename):
        errors.append(error_message)
        return { "errors":  errors }


    avatar.filename = get_unique_filename(avatar.filename)
    form['csrf_token'].data = request.cookies['csrf_token']


    if int(user_id) == int(current_user.get_id()):
        if check_lengths(name, email, password, bio, location, birthdate):
            errors.append(error_message)
            return { "errors":  errors }

        if form.validate_on_submit():
            upload = upload_file(avatar)

            if "url" not in upload:
                errors.append(error_message)
                return { "errors":  errors }

            url = upload["url"]
            key = current_user.get_url()
            if(key.startswith(get_s3_location())):
                key = key[39:]
                purge_aws_resource(key)

            current_user.update_user(name, email, password, bio, location, url, birthdate)
            db.session.add(current_user)
            db.session.commit()
            return { "user": current_user.to_dict() }

    errors.append(error_message)
    return { "errors":  errors }




# /api/users/:userId
@user_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    if int(user_id) == int(current_user.get_id()):
        db.session.delete(current_user)
        db.session.commit()
        return { "Success": "Your accont was successfully deleted." }
    else:
        return { "errors" : [ "You can not remove another user.", "Please try again." ] }








# /api/users/
@user_routes.route('/')
@login_required
def index():
    errors = [ "You need to enter a search id to search.", "Please try again." ]
    return {"errors":  errors }








#  /api/users/:searchId
@user_routes.route('/<string:searchId>')
@login_required
def search_for_user(searchId):
    try:
        errors = []
        if check_if_empty(str(searchId)):
            errors.append("You need to enter a search id.")

        if check_right_length(str(searchId)):
            errors.append("Your search id needs to be six characters long.")

        if int(current_user.the_search_id) == int(searchId):
            result = current_user.get_users_public_characters()
            public_characters = { each["id"]: each   for each in result["public_characters"] }
            return { "public_characters": public_characters }
        else:
            searched_user = User.query.filter_by(search_id=str(searchId)).first()
            if searched_user is None:
                errors.append("You entered the wrong search id.")
                return { "errors": errors }
            else:
                result = searched_user.get_users_public_characters()
                public_characters = { each["id"]: each   for each in result["public_characters"] }
                return { "public_characters": public_characters }

    except ValueError:
        errors = ["You need to enter a search id to search.", "Please try again."]
        return { "errors":  errors }


#  /api/users/search/:searchId
@user_routes.route('/search/<string:searchId>')
@login_required
def get_specific_user(searchId):
    errors = []
    searched_user = User.query.filter_by(search_id=str(searchId)).first()
    if searched_user is None:
        errors.append("You entered the wrong search id.")
        return { "errors": errors }
    else:
        return { "searchedUser": searched_user.to_dict() }










#  /api/users/followers
@user_routes.route('/followers')
@login_required
def followers():
    return current_user.get_users_followers()




#  /api/users/following
@user_routes.route('/following')
@login_required
def following():
    return current_user.get_people_they_follow()












#  /api/users/:userId/following
@user_routes.route('/<int:userId>/following', methods=['POST'])
@login_required
def check_if_following(userId):
    searched_user = User.query.get(userId)

    if current_user.follow_or_unfollow(searched_user) == "UN_FOLLOW":
        current_user.following.remove(searched_user)
        searched_user.followers.remove(current_user)
        db.session.commit()
        return { "message": ["User has been unfollowed."] }
    else:
        current_user.following.append(searched_user)
        searched_user.followers.append(current_user)
        db.session.commit()
        return { "message": ["User has been followed."] }
