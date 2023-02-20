from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from .db import Base
from datetime import datetime
from .user import User


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True)
    the_title = Column(String(100), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    def get_title(self):
        return {
            "the_title": self.the_title,
        }

    def get_creator_id(self):
        return {
            "creator_id": self.creator_id,
        }

    def get_username(self):
        return {
            "username": User.query.get(self.creator_id).user_name,
        }

    def get_creation_date(self):
        return {
            "created_at": self.created_at,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "the_title": self.the_title,
            "creator_id": self.creator_id,
            "username": User.query.get(self.creator_id).user_name,
            "created_at": self.created_at,
        }

    def check_creator_id(self, to_check):
        return int(self.creator_id) == int(to_check)

    def update_title(self, new_title):
        self.the_title = new_title
