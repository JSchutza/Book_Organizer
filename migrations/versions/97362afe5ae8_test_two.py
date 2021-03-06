"""test-two

Revision ID: 97362afe5ae8
Revises: 4c7684a12bd3
Create Date: 2021-05-04 15:01:36.283581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '97362afe5ae8'
down_revision = '4c7684a12bd3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('the_title', sa.String(length=100), nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('public_characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('avatar', sa.Text(), nullable=True),
    sa.Column('character_name', sa.String(length=100), nullable=False),
    sa.Column('character_label', sa.String(length=100), nullable=False),
    sa.Column('pub_date', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('text', sa.Text(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('private_characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('avatar', sa.Text(), nullable=True),
    sa.Column('character_name', sa.String(length=100), nullable=False),
    sa.Column('character_label', sa.String(length=100), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('private_characters')
    op.drop_table('pages')
    op.drop_table('public_characters')
    op.drop_table('books')
    # ### end Alembic commands ###
