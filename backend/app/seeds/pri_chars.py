

from app.models import db, PrivateCharacter
from faker import Faker
from random import randint

fake = Faker()


def seed_pri_chars():
  each_icon = [
    'https://i.imgur.com/edA9qh5.jpg',
    'https://i.imgur.com/SrbOBhN.jpg',
    'https://i.imgur.com/X1o1dJB.jpg',
    'https://i.imgur.com/3h2t2jn.jpg',
    'https://i.imgur.com/dnpLSDb.jpg',
    'https://i.imgur.com/4G0Bd3J.jpg',
    'https://i.imgur.com/tNHmQDx.jpg',
    'https://i.imgur.com/5vK4RsC.jpg',
    'https://i.imgur.com/mgB9BK3.jpg',
    'https://i.imgur.com/xQZZT8t.jpg',
    'https://i.imgur.com/YKwotMw.jpg',
    'https://i.imgur.com/5exlOWk.jpg',
    'https://i.imgur.com/C77lYz4.jpg',
    'https://i.imgur.com/cFDZIbv.jpg',
    'https://i.imgur.com/z24jb4a.jpg',
    'https://i.imgur.com/auUXIPA.jpg',
    'https://i.imgur.com/UC1WhT5.jpg',
    'https://i.imgur.com/kAxbTFI.jpg',
    'https://i.imgur.com/MLEpcTh.jpg',
    'https://i.imgur.com/jX3CHRh.jpg',
    'https://i.imgur.com/4Bo2Kiz.jpg',
    'https://i.imgur.com/DwHPXWl.jpg',
    'https://i.imgur.com/OFHXRI4.jpg',
  ]


  result = []
  for each in each_icon:
    result.append(PrivateCharacter(avatar=each, character_name=fake.name(), character_label="default label here", book_id=randint(1, 100)))

  for character in result:
    db.session.add(character)
    db.session.commit()

  count = 0
  temp = []
  while count < 10:
    temp.append(PrivateCharacter(avatar=each, character_name=fake.name(),
      character_label="default label here", book_id=int(f'10{count}')
    ))
    count += 1


  for demo in temp:
    db.session.add(demo)
    db.session.commit()





def undo_pri_chars():
  db.session.execute('TRUNCATE private_characters RESTART IDENTITY CASCADE;')
  db.session.commit()
