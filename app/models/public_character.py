from sqlalchemy import Column, Integer, Text, String, DateTime, ForeignKey

from .db import db, Base
from datetime import datetime
from .user import User


class PublicCharacter(Base):
    __tablename__ = "public_characters"

    id = Column(Integer, primary_key=True)
    avatar = Column(Text)
    character_name = Column(String(100), nullable=False)
    character_label = Column(String(100), nullable=False)
    pub_date = Column(DateTime, nullable=False, default=datetime.now)
    user_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    def get_id(self):
        return self.id

    def get_avatar(self):
        return {
            "avatar": self.avatar,
        }

    def get_char_name(self):
        return {
            "character_name": self.character_name,
        }

    def get_char_label(self):
        return {
            "character_label": self.character_label,
        }

    def get_pub_date(self):
        return {
            "pub_date": self.pub_date,
        }

    def get_user_id(self):
        return {
            "user_id": self.user_id,
        }

    def get_username(self):
        return {
            "username": User.query.get(self.user_id).user_name,
        }

    def get_creation_date(self):
        return {
            "created_at": self.created_at,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "avatar": self.avatar,
            "character_name": self.character_name,
            "character_label": self.character_label,
            "pub_date": self.pub_date,
            "user_id": self.user_id,
            "username": User.query.get(self.user_id).user_name,
            "created_at": self.created_at,
            "search_id": User.query.get(self.user_id).search_id,
        }

    def get_url(self):
        return self.avatar

    def update_character_data(self, new_avatar, new_character_name, new_character_label):
        self.avatar = new_avatar
        self.character_name = new_character_name
        self.character_label = new_character_label
