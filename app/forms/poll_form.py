

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired



class PollForm(FlaskForm):
  title = StringField("title", validators=[DataRequired()])
  question_text = StringField("text", validators=[DataRequired()])
