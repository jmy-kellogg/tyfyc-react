"""change skills to skill options

Revision ID: ee34c0241b23
Revises: cec92b239b6a
Create Date: 2025-03-31 11:02:29.956379

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ee34c0241b23'
down_revision: Union[str, None] = 'cec92b239b6a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.rename_table('skills', 'skill_options')


def downgrade() -> None:
    """Downgrade schema."""
    pass
