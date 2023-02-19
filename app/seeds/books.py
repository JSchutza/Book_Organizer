from faker import Faker
from random import randint

from app.models.book import Book
from app.models.db import db

fake = Faker()


def seed_books():
    count = 100
    result = []
    while count > 0:
        result.append(Book(the_title=fake.text(max_nb_chars=50), creator_id=randint(1, 200)))
        count -= 1

    for book in result:
        db.session.add(book)
        db.session.commit()

    amount = 10
    temp = []
    while amount > 0:
        temp.append(Book(the_title=fake.text(max_nb_chars=50), creator_id=1))
        amount -= 1
    for demo in temp:
        db.session.add(demo)
        db.session.commit()


def undo_books():
    db.session.execute('TRUNCATE books RESTART IDENTITY CASCADE;')
    db.session.commit()
