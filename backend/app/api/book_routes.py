from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Book


book_routes = Blueprint('books', __name__)


#  /api/books
@book_routes.route('', methods=['GET'])
@login_required
def get_all_books():
  their_books = current_user.get_users_books()
  normalized = {each["id"]:each for each in their_books["books"]}
  return { "books": normalized }
