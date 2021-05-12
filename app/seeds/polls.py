
from app.models import db, Poll
from faker import Faker
from random import randint

fake = Faker()


def seed_polls():

  count = 100
  result = []
  while count > 0:
    result.append(Poll(title=fake.text(max_nb_chars=50), question_text=fake.text(max_nb_chars=100), user_id=randint(1, 200)))
    count -= 1

  for poll in result:
    db.session.add(poll)
    db.session.commit()

  # amount = 0
  # temp = []
  # while amount < 10:
  #   temp.append(Page(title=fake.text(max_nb_chars=50), text=fake.text(
  #       max_nb_chars=100), book_id=int(f'10{amount}')))
  #   amount += 1

  # for demo in temp:
  #   db.session.add(demo)
  #   db.session.commit()


def undo_polls():
  db.session.execute('TRUNCATE polls RESTART IDENTITY CASCADE;')
  db.session.commit()
