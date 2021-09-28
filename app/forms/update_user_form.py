

from flask_wtf import FlaskForm
from wtforms import StringField


class UpdateUserForm(FlaskForm):
  new_name = StringField("new_name")
  new_email = StringField("new_email")
  new_password = StringField("new_password")
  new_bio = StringField("new_bio")
  new_location = StringField("new_location")
  new_avatar = StringField("new_avatar")
  new_birthdate = StringField("new_birthdate")
