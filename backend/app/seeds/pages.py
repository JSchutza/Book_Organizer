
from app.models import db, Page
from faker import Faker
from random import randint

fake = Faker()


def seed_pages():

  count = 100
  result = []
  while count > 0:
    result.append(Page(title=fake.text(max_nb_chars=50), text=fake.text(max_nb_chars=100), book_id=randint(1, 100)))
    count -= 1



  for page in result:
    db.session.add(page)
    db.session.commit()





def undo_pages():
  db.session.execute('TRUNCATE pages RESTART IDENTITY CASCADE;')
  db.session.commit()
