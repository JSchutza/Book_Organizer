
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    answer_text = StringField("answer_text", validators=[DataRequired()])
