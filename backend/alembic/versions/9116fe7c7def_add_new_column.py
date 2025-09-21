"""add rank column to skill table

Revision ID: 9116fe7c7def
Revises: d59ac91876a7
Create Date: 2025-09-21 16:01:00.937000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9116fe7c7def'
down_revision: Union[str, None] = 'd59ac91876a7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('skills', sa.Column('rank', sa.Integer, nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('skills', 'new_column')
