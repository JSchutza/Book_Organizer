from sqlalchemy import Column, String, Integer, ForeignKey, DateTime

from .db import db, Base
from .user import User
from .poll import Poll
from datetime import datetime


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    answer_text = Column(String(100), nullable=False)
    poll_id = Column(Integer, ForeignKey("polls.id", ondelete='CASCADE'), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    def get_id(self):
        return self.id

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

    def check_creator_id(self, to_check):
        return int(self.user_id) == int(to_check)
