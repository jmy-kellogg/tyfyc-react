"""add notes to applications

Revision ID: a0142517cf6d
Revises: d87caf789806
Create Date: 2025-04-06 21:03:58.671038

"""
from typing import Sequence, Union

from alembic import op
from sqlalchemy import Column, Text


# revision identifiers, used by Alembic.
revision: str = 'a0142517cf6d'
down_revision: Union[str, None] = 'd87caf789806'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("applications", Column('notes', Text(), server_default="", nullable=False))


def downgrade() -> None:
    """Downgrade schema."""
    pass
