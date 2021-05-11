
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.validators import check_if_empty, check_right_length
# from app.models import User


# from app.models.user import follower_to_followee

user_routes = Blueprint('users', __name__)

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
            return {"public_characters": public_characters}

        errors.append("You entered the wrong search id.")

        return { "errors": errors }
    except ValueError:
        errors = ["You need to enter a search id to search.", "Please try again."]
        return {"errors":  errors}











# @user_routes.route('/followers')
# @login_required
# def followers():
#     userId = current_user.get_id()
#     user = User.query.get(userId)
#     user_data = user.to_dict()
#     followers_array = user_data["followers"]

#     normalized_data = {followers_array[each]: User.query.get(followers_array[each]).username
#                        for each in range(len(followers_array))}

#     return {"username": user.username, "id": user.id, "followers": normalized_data}



# @user_routes.route('/follow')
# @login_required
# def follow():
#     userId1 = int(current_user.get_id())
#     userId2 = int(request.args['userId2'])

#     user1 = User.query.get(userId1)
#     user2 = User.query.get(userId2)

#     if user2 in user1.followers:
#         user1.followers.remove(user2)
#     else:
#         user1.followers.append(user2)
#     db.session.commit()
#     return '200'
