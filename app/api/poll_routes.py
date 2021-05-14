from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Poll, Comment





poll_routes = Blueprint('polls', __name__)


#  /api/polls
@poll_routes.route('', methods=['GET'])
@login_required
def get_all_polls():
  their_polls = current_user.get_users_polls()
  normalized = {each["id"]: each for each in their_polls["polls"]}
  return { "polls": normalized }








# /api/polls/:pollId/comments
@poll_routes.route("/<int:pollId>/comments", methods=['GET'])
# @login_required
def get_all_comments(pollId):
  the_comments = Comment.query.filter_by(poll_id=pollId).all()
  normalized = { each.to_dict()["id"]: each.to_dict() for each in the_comments }

  return {"comments": normalized }
















# #  /api/books
# @book_routes.route('', methods=['POST'])
# @login_required
# def create_new_book():
#   form = BookForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     new_book = Book(the_title=form.data['title'],
#                     creator_id=current_user.get_id())
#     db.session.add(new_book)
#     db.session.commit()
#   return {"book": new_book.to_dict()}


# #  /api/books/:bookId
# @book_routes.route('/<int:bookId>', methods=['DELETE'])
# @login_required
# def delete_book(bookId):
#   the_book = Book.query.get(bookId)
#   if the_book.check_creator_id(current_user.get_id()):
#     db.session.delete(the_book)
#     db.session.commit()
#     return {"message": "book successfully deleted"}
#   return {"message": "Error, cannot remove a book that does not belong to the current user."}


# # /api/books/:bookId
# @book_routes.route('/<int:bookId>', methods=['PUT'])
# @login_required
# def update_book(bookId):
#   the_book = Book.query.get(bookId)
#   form = BookForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     the_book.update_title(form.data['title'])
#     db.session.add(the_book)
#     db.session.commit()
#   return {"book": the_book.to_dict()}
