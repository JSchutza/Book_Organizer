from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from app.hash import gen_search_id
from random import randint


# follower_to_followee = db.Table(
#     "follower_to_followee",
#     db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
#     db.Column("followee_id", db.Integer, db.ForeignKey("users.id")),
# )





class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    search_id = db.Column(db.String(6), nullable=False, unique=True, default=gen_search_id(f'{randint(1, 100)}{randint(1, 10000000000)}'))
    user_name = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text)
    location = db.Column(db.String(100))
    avatar = db.Column(db.Text)
    birthday = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    public_characters = db.relationship("PublicCharacter", backref="users", cascade="all, delete")
    books = db.relationship("Book", backref="users", cascade="all, delete")




    # posts = db.relationship("Post", backref="users", cascade="all, delete")
    # comments = db.relationship(
    #     "Comment", backref="users", cascade="all, delete")

    # followers = db.relationship(
    #     "User",
    #     secondary=follower_to_followee,
    #     primaryjoin=id == follower_to_followee.c.follower_id,
    #     secondaryjoin=id == follower_to_followee.c.followee_id,
    #     backref=db.backref("follower_to_followee", lazy="joined"),
    #     lazy="joined",
    # )








    @property
    def the_search_id(self):
        return self.search_id

    @the_search_id.setter
    def the_search_id(self, thing_to_hash):
        new_id = gen_search_id(thing_to_hash)
        exists = User.query.filter_by(search_id=new_id).first()
        # above line gives me  None if the new_id does not already exist
        count = 0
        while count == 0 and exists is not None:
            new_id = gen_search_id(thing_to_hash)
            exists = User.query.filter_by(search_id=new_id).first()
            count += 1
        if exists is None:
            self.search_id = new_id







    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)





    def get_users_search_id(self):
        return {
            "search_id": self.search_id,
        }

    def get_users_username(self):
        return {
            "user_name": self.user_name,
        }


    def get_users_email(self):
        return {
            "email": self.email,
        }


    def get_users_bio(self):
        return {
            "bio": self.bio,
        }


    def get_users_location(self):
        return {
            "location": self.location,
        }


    def get_users_avatar(self):
        return {
            "avatar": self.avatar,
        }


    def get_users_birthday(self):
        return {
            "birthday": self.birthday,
        }


    def get_users_creationdate(self):
        return {
            "created_at": self.created_at,
        }


    def get_users_public_characters(self):
        return {
            "public_characters": [pub_char.to_dict() for pub_char in self.public_characters],
        }




    def get_users_books(self):
        return {
            "books": [book.to_dict() for book in self.books],
        }



    def to_dict(self):
        return {
            "id": self.id,
            "search_id": self.search_id,
            "user_name": self.user_name,
            "email": self.email,
            "bio": self.bio,
            "location": self.location,
            "avatar": self.avatar,
            "birthday": self.birthday,
            "created_at": self.created_at,
        }




            # "followers": [follower.id for follower in self.followers],
            # "comments": [comment.to_dict() for comment in self.comments],
