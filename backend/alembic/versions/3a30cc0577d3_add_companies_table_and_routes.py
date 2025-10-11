"""add companies table and routes

Revision ID: 3a30cc0577d3
Revises: 5189b1a99677
Create Date: 2025-10-10 17:05:27.716995

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3a30cc0577d3'
down_revision: Union[str, None] = '5189b1a99677'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
