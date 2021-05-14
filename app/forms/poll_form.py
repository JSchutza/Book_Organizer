

from flask_wtf import FlaskForm
from wtforms import StringField


class PollForm(FlaskForm):
  title = StringField("title")
  question_text = StringField("text")
