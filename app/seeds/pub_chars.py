

from app.models import db, PublicCharacter
from faker import Faker
from random import randint

fake = Faker()






def seed_pub_chars():
  each_icon = [
    'https://i.imgur.com/VpdIZ7N.jpg',
    'https://i.imgur.com/14Zu8YC.jpg',
    'https://i.imgur.com/e16GmZl.jpg',
    'https://i.imgur.com/xigtQ2t.jpg',
    'https://i.imgur.com/NqV02Dq.jpg',
    'https://i.imgur.com/KqacL01.jpg',
    'https://i.imgur.com/kWBs1kf.jpg',
    'https://i.imgur.com/Wdwlwpg.jpg',
    'https://i.imgur.com/ZXXZcFP.jpg',
    'https://i.imgur.com/bQMnXMs.jpg',
    'https://i.imgur.com/BJvRkUU.jpg',
    'https://i.imgur.com/T7zWYcJ.jpg',
    'https://i.imgur.com/LcKVkoH.jpg',
    'https://i.imgur.com/XuF1xOR.jpg',
    'https://i.imgur.com/TpGJLlk.jpg',
    'https://i.imgur.com/jkDF1Bu.jpg',
    'https://i.imgur.com/7ALKF7N.jpg',
    'https://i.imgur.com/1cORKz1.jpg',
    'https://i.imgur.com/j8JW0vt.jpg',
    'https://i.imgur.com/48uYYUd.jpg',
    'https://i.imgur.com/EvK1eL0.jpg',
    'https://i.imgur.com/G2PWjKh.jpg',
    'https://i.imgur.com/GKbLG3R.jpg',
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
