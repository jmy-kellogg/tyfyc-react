"""add job_search table for saving search links

Revision ID: 5189b1a99677
Revises: 9116fe7c7def
Create Date: 2025-10-09 20:44:21.148249

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5189b1a99677'
down_revision: Union[str, None] = '9116fe7c7def'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
