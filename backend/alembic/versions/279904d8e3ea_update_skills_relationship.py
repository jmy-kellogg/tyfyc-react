"""update skills relationship

Revision ID: 279904d8e3ea
Revises: cd24a9909d55
Create Date: 2025-03-31 20:34:01.447640

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '279904d8e3ea'
down_revision: Union[str, None] = 'cd24a9909d55'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_table('skills')

def downgrade() -> None:
    """Downgrade schema."""
    pass
