
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User

# from app.models.user import follower_to_followee

user_routes = Blueprint('users', __name__)




#  /api/users/:searchId
@user_routes.route('/<int:searchId>')
@login_required
def search_for_user(searchId):
    if int(current_user.the_search_id) == int(searchId):
        result = current_user.get_users_public_characters()
        public_characters = { each["id"]: each   for each in result["public_characters"] }

        return {"public_characters": public_characters}

    return { "Error": "You entered the wrong search_id" }











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
