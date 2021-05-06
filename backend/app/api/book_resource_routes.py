from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import PrivateCharacter, Page


# named this this way because the private characters and pages are scoped to a book --- this was faster

resource_routes = Blueprint('resources', __name__)


# GET /api/book/:bookId/characters
@resource_routes.route('/<int:bookId>/characters', methods=['GET'])
@login_required
def get_all_private_chars(bookId):
  all_characters = PrivateCharacter.query.filter_by(book_id=bookId).all()
  normalized = {each.to_dict()["id"]: each.to_dict()   for each in all_characters}
  return { "private_characters": normalized }
