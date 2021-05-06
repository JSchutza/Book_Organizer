from flask import Blueprint, redirect, request
from app.models import db, PublicCharacter
from flask_login import login_required, current_user
from app.aws import allowed_file, get_unique_filename, upload_file, get_s3_location, purge_aws_resource
# from app.forms import CreatePostForm, CreateCommentForm



character_routes = Blueprint("characters", __name__)




# /api/characters/all
@character_routes.route("/all", methods=['GET'])
def all_characters():
  pub_chars = PublicCharacter.query.order_by(PublicCharacter.created_at).all()
  result = { each.id:each.to_dict()    for each in pub_chars }

  return {
    "characters": result,
  }


# /api/characters
@character_routes.route("", methods=["POST"])
@login_required
def new_pub_char():
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

  new_char = PublicCharacter(avatar=url, character_name=charactername, character_label=characterlabel, user_id=current_user.get_id())

  db.session.add(new_char)
  db.session.commit()
  return {"url": url}






# /api/characters/:characterId
@character_routes.route("/<int:characterId>", methods=["DELETE"])
@login_required
def delete_char(characterId):
  the_character = PublicCharacter.query.get(characterId)
  key = the_character.get_url()
  if(key.startswith(get_s3_location())):
    key = key[39:]
    purge_aws_resource(key)
  db.session.delete(the_character)
  db.session.commit()
  return { "characterId": characterId }
