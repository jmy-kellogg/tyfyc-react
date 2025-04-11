"""add user to application

Revision ID: 0a5a23756dc3
Revises: a0142517cf6d
Create Date: 2025-04-11 11:48:21.237545

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0a5a23756dc3'
down_revision: Union[str, None] = 'a0142517cf6d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("applications", sa.Column('user_id', sa.String(), sa.ForeignKey('user.id')))


def downgrade() -> None:
    """Downgrade schema."""
    pass
