"""add location to empoyment

Revision ID: d87caf789806
Revises: 279904d8e3ea
Create Date: 2025-04-04 21:13:48.290028

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd87caf789806'
down_revision: Union[str, None] = '279904d8e3ea'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("employment", sa.Column('location', sa.String()))

def downgrade() -> None:
    """Downgrade schema."""
    pass
