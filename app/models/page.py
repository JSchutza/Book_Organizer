from .db import db
from datetime import datetime
from .book import Book



class Page(db.Model):
  __tablename__ = "pages"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  text = db.Column(db.Text, nullable=False)
  book_id = db.Column(db.Integer, db.ForeignKey("books.id", ondelete='CASCADE'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)


  def get_title(self):
    return {

    }

  def get_text(self):
    return {

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
        "title": self.title,
        "text": self.text,
        "book_id": self.book_id,
        "book_title": Book.query.get(self.book_id).the_title,
        "created_at": self.created_at,
    }
