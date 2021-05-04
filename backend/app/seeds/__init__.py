from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pub_chars import seed_pub_chars, undo_pub_chars
from .books import  seed_books, undo_books
# from .pri_chars import seed_pri_chars, undo_pri_chars
# from .pages import  seed_pages, undo_pages




# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_pub_chars()
    seed_books()
    # seed_pri_chars()
    # seed_pages()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pub_chars()
    undo_books()
    # undo_pri_chars()
    # undo_pages()
