from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, PrivateCharacter, Page
from app.aws import allowed_file, get_unique_filename, upload_file, get_s3_location, purge_aws_resource
from app.forms import PageForm


resource_routes = Blueprint('resources', __name__)


# GET /api/book/:bookId/characters
@resource_routes.route('/<int:bookId>/characters', methods=['GET'])
@login_required
def get_all_private_chars(bookId):
  all_characters = PrivateCharacter.query.filter_by(book_id=bookId).all()
  normalized = {each.to_dict()["id"]: each.to_dict()   for each in all_characters}
  return { "characters": normalized }



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
  errors=["Error creating a private character."]
  if "image" not in request.files:
    return { "errors": errors }

  image = request.files["image"]
  charactername = request.form['charactername']
  characterlabel = request.form['characterlabel']

  if len(charactername) == 0 or len(characterlabel) == 0:
    return { "errors": errors }

  if not allowed_file(image.filename):
    return { "errors": errors }

  image.filename = get_unique_filename(image.filename)

  upload = upload_file(image)

  if "url" not in upload:
    return { "errors": errors }

  url = upload["url"]

  new_char = PrivateCharacter(avatar=url, character_name=charactername, character_label=characterlabel, book_id=bookId)
  db.session.add(new_char)
  db.session.commit()
  return { new_char.get_id(): new_char.to_dict() }






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





# /api/book/:bookId/page
@resource_routes.route("/<int:bookId>/page", methods=["POST"])
@login_required
def create_page(bookId):
  form = PageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_page = Page(title=form.data['title'], text=form.data["text"], book_id=bookId)
    db.session.add(new_page)
    db.session.commit()
  return { new_page.get_id(): new_page.to_dict() }






# /api/book/:bookId/page/:pageId
@resource_routes.route("/<int:bookId>/page/<int:pageId>", methods=["DELETE"])
@login_required
def delete_page(bookId, pageId):
  the_page = Page.query.get(pageId)
  db.session.delete(the_page)
  db.session.commit()
  return { "pageId": pageId }








# /api/book/:bookId/page/:pageId
@resource_routes.route("/<int:bookId>/page/<int:pageId>", methods=["PUT"])
@login_required
def update_page(bookId, pageId):
  the_page = Page.query.get(pageId)
  form = PageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    the_page.update_page_data(form.data['title'], form.data["text"])
    db.session.add(the_page)
    db.session.commit()
    return { the_page.get_id(): the_page.to_dict() }












# /api/book/:bookId/character/:characterId
@resource_routes.route("/<int:bookId>/character/<int:characterId>", methods=["PUT"])
@login_required
def update_pri_char(bookId, characterId):
  errors=["An error occurred while trying to update a private character."]
  if "image" not in request.files:
    return { "errors": errors }

  image = request.files["image"]
  charactername = request.form['charactername']
  characterlabel = request.form['characterlabel']

  if len(charactername) == 0 or len(characterlabel) == 0:
    return { "errors": errors }

  if not allowed_file(image.filename):
    return { "errors": errors }

  image.filename = get_unique_filename(image.filename)

  upload = upload_file(image)

  if "url" not in upload:
    return { "errors": errors }

  url = upload["url"]

  old_char = PrivateCharacter.query.get(characterId)
  key = old_char.get_url()

  if(key.startswith(get_s3_location())):
    key = key[39:]
    purge_aws_resource(key)

  old_char.update_character_data(url, charactername, characterlabel)
  db.session.add(old_char)
  db.session.commit()
  return { old_char.get_id(): old_char.to_dict() }
