
from faker import Faker
from random import randint

from app.models.comment import Comment
from app.models.db import db

fake = Faker()


def seed_comments():
    count = 100
    result = []
    while count > 0:
        result.append(Comment(answer_text=fake.text(max_nb_chars=100), poll_id=randint(1, 50), user_id=randint(1, 200)))
        count -= 1

    for comment in result:
        db.session.add(comment)
        db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
