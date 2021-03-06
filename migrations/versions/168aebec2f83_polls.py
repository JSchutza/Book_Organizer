"""polls

Revision ID: 168aebec2f83
Revises: 97362afe5ae8
Create Date: 2021-05-11 21:17:12.578482

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '168aebec2f83'
down_revision = '97362afe5ae8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follower_to_followee',
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('followee_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followee_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follower_to_followee')
    # ### end Alembic commands ###
