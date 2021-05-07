

from flask_wtf import FlaskForm
from wtforms import StringField



class BookForm(FlaskForm):
  title = StringField("title")
