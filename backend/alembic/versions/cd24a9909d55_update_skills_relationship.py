"""update skills relationship

Revision ID: cd24a9909d55
Revises: ee34c0241b23
Create Date: 2025-03-31 20:23:44.733993

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cd24a9909d55'
down_revision: Union[str, None] = 'ee34c0241b23'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_table('skills')


def downgrade() -> None:
    """Downgrade schema."""
    pass
