from sqlalchemy import Integer, Column, String, DateTime, ForeignKey

from .db import db, Base
from datetime import datetime
from .user import User


class Poll(Base):
    __tablename__ = "polls"

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    question_text = Column(String(100), nullable=False)
    pub_date = Column(DateTime, nullable=False, default=datetime.now)
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
            "title": self.title,
            "question_text": self.question_text,
            "pub_date": self.pub_date,
            "user_id": self.user_id,
            "username": User.query.get(self.user_id).user_name,
            "created_at": self.created_at,
        }

    def update_poll_data(self, new_title, new_text):
        self.title = new_title
        self.question_text = new_text

    def check_creator_id(self, to_check):
        return int(self.user_id) == int(to_check)
