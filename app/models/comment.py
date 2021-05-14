from .db import db
from .user import User
from .poll import Poll
from datetime import datetime



class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    answer_text = db.Column(db.String(100), nullable=False)
    poll_id = db.Column(db.Integer, db.ForeignKey("polls.id", ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)


    def get_creation_date(self):
        return {
            "created_at": self.created_at,
        }


    def to_dict(self):
        return {
            "id": self.id,
            "answer_text": self.answer_text,
            "poll_id": self.poll_id,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "username": User.query.get(self.user_id).user_name,
            "poll_title": Poll.query.get(self.poll_id).title,
            "poll_text": Poll.query.get(self.poll_id).question_text,
        }


    def update_comment(self, new_answer):
        self.answer_text = new_answer
