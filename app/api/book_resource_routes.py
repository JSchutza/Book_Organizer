from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, PrivateCharacter, Page
from app.aws import allowed_file, get_unique_filename, upload_file, get_s3_location, purge_aws_resource

# named this this way because the private characters and pages are scoped to a book --- this was faster

resource_routes = Blueprint('resources', __name__)


# GET /api/book/:bookId/characters
@resource_routes.route('/<int:bookId>/characters', methods=['GET'])
@login_required
def get_all_private_chars(bookId):
  all_characters = PrivateCharacter.query.filter_by(book_id=bookId).all()
  normalized = {each.to_dict()["id"]: each.to_dict()   for each in all_characters}
  return { "private_characters": normalized }



# GET /api/book/:bookId/pages
@resource_routes.route('/<int:bookId>/pages', methods=['GET'])
@login_required
def get_all_pages(bookId):
  all_pages = Page.query.filter_by(book_id=bookId).all()
  normalized = {each.to_dict()["id"]: each.to_dict()   for each in all_pages}
  return { "pages": normalized }





#  /api/book/:bookId/character
@resource_routes.route('/<int:bookId>/character', methods=['POST'])
@login_required
def create_pri_char(bookId):
  if "image" not in request.files:
    return {"errors": "image required"}, 400

  image = request.files["image"]
  charactername = request.form['charactername']
  characterlabel = request.form['characterlabel']


  if not allowed_file(image.filename):
    return {"errors": "file type not permitted"}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file(image)

  if "url" not in upload:
    return upload, 400

  url = upload["url"]

  new_char = PrivateCharacter(avatar=url, character_name=charactername, character_label=characterlabel, book_id=bookId)
  db.session.add(new_char)
  db.session.commit()
  return {"url": url}





# /api/book/:bookId/character/:characterId
@resource_routes.route("/<int:bookId>/character/<int:characterId>", methods=["DELETE"])
@login_required
def delete_char(bookId, characterId):
  the_character = PrivateCharacter.query.get(characterId)
  key = the_character.get_url()
  if(key.startswith(get_s3_location())):
    key = key[39:]
    purge_aws_resource(key)
  db.session.delete(the_character)
  db.session.commit()
  return {"characterId": characterId}
