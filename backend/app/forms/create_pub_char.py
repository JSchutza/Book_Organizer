
from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField


class CreatePubCharForm(FlaskForm):
    image = FileField("image")
    charactername = StringField("charactername")
    characterlabel = StringField("characterlabel")
