

from flask_wtf import FlaskForm
from wtforms import StringField




class PageForm(FlaskForm):
  title = StringField("title")
  text = StringField("text")
