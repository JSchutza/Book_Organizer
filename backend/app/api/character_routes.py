from flask import Blueprint, redirect, request
from app.models import db, PublicCharacter
# from flask_login import login_required, current_user
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
