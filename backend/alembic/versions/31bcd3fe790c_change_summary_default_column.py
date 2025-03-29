"""change summary default column

Revision ID: 31bcd3fe790c
Revises: 69f6cfb29565
Create Date: 2025-03-29 08:16:40.488482

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '31bcd3fe790c'
down_revision: Union[str, None] = '69f6cfb29565'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column("applications", "summary")
    op.add_column("applications", sa.Column('summary', sa.String(), server_default=""))


def downgrade() -> None:
    """Downgrade schema."""
    pass
