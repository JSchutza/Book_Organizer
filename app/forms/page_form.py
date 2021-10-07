

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired




class PageForm(FlaskForm):
  title = StringField("title", validators=[DataRequired()])
  text = StringField("text", validators=[DataRequired()])
