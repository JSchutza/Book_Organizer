import boto3
import uuid
import os
from flask import Blueprint, redirect, request
from app.models import db, PublicCharacter
from flask_login import login_required, current_user
# from app.forms import CreatePostForm, CreateCommentForm



s3 = boto3.client(
  "s3",
  aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
)

BUCKET_NAME = "bookorganizer"
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
  return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
  ext = filename.rsplit(".", 1)[1].lower()
  unique_filename = uuid.uuid4().hex
  return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
  try:
    s3.upload_fileobj(
      file,
      BUCKET_NAME,
      file.filename,
      ExtraArgs={"ACL": acl, "ContentType": file.content_type},
    )
  except Exception as e:
      # in case the our s3 upload fails
    return {"errors": str(e)}

  return {"url": f"{S3_LOCATION}{file.filename}"}




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

  upload = upload_file_to_s3(image)

  if "url" not in upload:
    return upload, 400

  url = upload["url"]

  new_char = PublicCharacter(avatar=url, character_name=charactername, character_label=characterlabel, user_id=current_user.get_id())

  db.session.add(new_char)
  db.session.commit()
  return {"url": url}
