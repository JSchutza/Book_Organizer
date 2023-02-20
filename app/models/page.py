from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime

from .db import db, Base
from datetime import datetime
from .book import Book


class Page(Base):
    __tablename__ = "pages"

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    text = Column(Text, nullable=False)
    book_id = Column(Integer, ForeignKey("books.id", ondelete='CASCADE'), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    def get_id(self):
        return self.id

    def get_title(self):
        return {
            "title": self.title
        }

    def get_text(self):
        return {
            "text": self.text
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

    def update_page_data(self, new_title, new_text):
        self.title = new_title
        self.text = new_text
