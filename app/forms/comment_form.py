
from flask_wtf import FlaskForm
from wtforms import StringField


class CommentForm(FlaskForm):
    answer_text = StringField("answer_text")
