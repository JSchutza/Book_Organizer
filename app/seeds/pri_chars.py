from faker import Faker
from random import randint

from app.models.db import db
from app.models.private_character import PrivateCharacter

fake = Faker()


def seed_pri_chars():
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

    result = []
    for each in each_icon:
        result.append(PrivateCharacter(avatar=each, character_name=fake.name(), character_label="default label here",
                                       book_id=randint(1, 100)))

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
