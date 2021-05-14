from .db import db
from datetime import datetime
from .user import User



class Poll(db.Model):
  __tablename__ = "polls"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  question_text = db.Column(db.String(100), nullable=False)
  pub_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)



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
