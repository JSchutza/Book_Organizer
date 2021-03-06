from .db import db
from datetime import datetime
from .book import Book


class PrivateCharacter(db.Model):
  __tablename__ = "private_characters"

  id = db.Column(db.Integer, primary_key=True)
  avatar = db.Column(db.Text)
  character_name = db.Column(db.String(100), nullable=False)
  character_label = db.Column(db.String(100), nullable=False)
  book_id = db.Column(db.Integer, db.ForeignKey("books.id", ondelete='CASCADE'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)



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


  def get_book_id(self):
    return {
        "book_id": self.book_id,
    }

  def get_book_title(self):
    return {
        "book_title": Book.query.get(self.book_id).the_title
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
        "book_id": self.book_id,
        "book_title": Book.query.get(self.book_id).the_title,
        "created_at": self.created_at,
    }


  def get_url(self):
    return self.avatar



  def update_character_data(self, new_avatar, new_character_name, new_character_label):
    self.avatar = new_avatar
    self.character_name = new_character_name
    self.character_label = new_character_label
