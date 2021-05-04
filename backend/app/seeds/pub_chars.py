

from app.models import db, PublicCharacter
from faker import Faker
from random import randint

fake = Faker()






def seed_pub_chars():
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

  # count = 1000
  # count -= 1
  result = []
  for each in each_icon:
    result.append(PublicCharacter(avatar=each, character_name=fake.name(), character_label="default label here", user_id=randint(1, 200)))


  for character in result:
    db.session.add(character)
    db.session.commit()





def undo_pub_chars():
  db.session.execute('TRUNCATE public_characters RESTART IDENTITY CASCADE;')
  db.session.commit()
