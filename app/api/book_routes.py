from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Book
from app.forms import BookForm

book_routes = Blueprint('books', __name__)


#  /api/books
@book_routes.route('', methods=['GET'])
@login_required
def get_all_books():
  their_books = current_user.get_users_books()
  normalized = {each["id"]:each for each in their_books["books"]}
  return { "books": normalized }




#  /api/books
@book_routes.route('', methods=['POST'])
@login_required
def create_new_book():
  form = BookForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_book = Book(the_title=form.data['title'], creator_id=current_user.get_id())
    db.session.add(new_book)
    db.session.commit()
  return { "book": new_book.to_dict() }
