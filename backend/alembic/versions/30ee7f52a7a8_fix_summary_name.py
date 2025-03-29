"""fix summary name

Revision ID: 30ee7f52a7a8
Revises: 1877e2fffe1b
Create Date: 2025-03-28 18:58:22.096959

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '30ee7f52a7a8'
down_revision: Union[str, None] = '1877e2fffe1b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    op.drop_table('summaryå')
