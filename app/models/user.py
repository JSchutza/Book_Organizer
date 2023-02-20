from sqlalchemy import Column, Integer, ForeignKey, String, Text, DateTime
from sqlalchemy.orm import relationship, backref

from .db import db, Base
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from app.hash import gen_search_id
from random import randint

follower_to_followee = relationship("follower_to_followee",
                                    Column("follower_id", Integer, ForeignKey("users.id")),
                                    Column("followee_id", Integer, ForeignKey("users.id")),
                                    )

followee_to_follower = relationship("followee_to_follower",
                                    Column("followee_id", Integer, ForeignKey("users.id")),
                                    Column("follower_id", Integer, ForeignKey("users.id")),
                                    )


class User(Base, UserMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    search_id = Column(String(6), nullable=False, unique=True,
                       default=gen_search_id(f'{randint(1, 100)}{randint(1, 10000000000)}'))
    user_name = Column(String(45), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)
    bio = Column(Text)
    location = Column(String(100))
    avatar = Column(Text)
    birthday = Column(DateTime)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    public_characters = relationship("PublicCharacter", backref="users", cascade="all, delete")
    books = relationship("Book", backref="users", cascade="all, delete")
    polls = relationship("Poll", backref="users", cascade="all, delete")
    comments = relationship("Comment", backref="users", cascade="all, delete")

    # followers = relationship("User",
    #                          secondary=follower_to_followee,
    #                          primaryjoin=id == follower_to_followee.c.follower_id,
    #                          secondaryjoin=id == follower_to_followee.c.followee_id,
    #                          backref=backref("follower_to_followee", lazy="joined"),
    #                          lazy="joined",
    #                          )
    #
    # following = relationship("User",
    #                          secondary=followee_to_follower,
    #                          primaryjoin=id == followee_to_follower.c.followee_id,
    #                          secondaryjoin=id == followee_to_follower.c.follower_id,
    #                          backref=backref("followee_to_follower", lazy="joined"),
    #                          lazy="joined",
    #                          )

    def follow_or_unfollow(self, user_to_search):
        if user_to_search in self.following:
            return "UN_FOLLOW"
        else:
            return "FOLLOW"

    @property
    def the_search_id(self):
        return self.search_id

    @the_search_id.setter
    def the_search_id(self, thing_to_hash):
        new_id = gen_search_id(thing_to_hash)
        exists = User.query.filter_by(search_id=new_id).first()
        # above line gives me  None if the new_id does not exist
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

    def get_users_polls(self):
        return {
            "polls": [poll.to_dict() for poll in self.polls],
        }

    def get_users_followers(self):
        normalized_data = {follower.id: follower.to_dict() for follower in self.followers}
        return {"followers": normalized_data}

    def get_people_they_follow(self):
        normalized_data = {eachperson.id: eachperson.to_dict() for eachperson in self.following}
        return {"following": normalized_data}

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
            "polls": {poll.id: poll.to_dict() for poll in self.polls},
            "comments": {comment.id: comment.to_dict() for comment in self.comments},
            "followers": {follower.id: follower.user_name for follower in self.followers},
            "following": {each.id: each.user_name for each in self.following},
            "characters": {each_char.id: each_char.to_dict() for each_char in self.public_characters},
            "books": {each_book.id: each_book.to_dict() for each_book in self.books},
        }

    def get_url(self):
        return self.avatar

    def update_user(self, new_name, new_email, new_password, new_bio, new_location, new_avatar, new_birthdate):
        self.user_name = new_name
        self.email = new_email
        self.hashed_password = generate_password_hash(new_password)
        self.bio = new_bio
        self.location = new_location
        self.avatar = new_avatar
        self.birthday = new_birthdate
