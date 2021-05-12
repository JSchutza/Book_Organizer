
from app.models import db, User
from random import randint


def seed_follows():
    count = 100
    tracker = set()
    while count > 0:
        first_user = randint(1, 200)
        second_user = randint(1, 200)
        if first_user == second_user:
            continue

        tup = (first_user, second_user)

        if tup in tracker:
            continue

        tracker.add(tup)
        follower = User.query.get(first_user)
        followee = User.query.get(second_user)

        follower.followers.append(followee)
        db.session.commit()
        count -= 1


def undo_follows():
    db.session.execute('TRUNCATE follower_to_followee RESTART IDENTITY CASCADE;')
    db.session.commit()
