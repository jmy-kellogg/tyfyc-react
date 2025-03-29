"""change summary to string

Revision ID: cec92b239b6a
Revises: 31bcd3fe790c
Create Date: 2025-03-29 08:25:46.541124

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cec92b239b6a'
down_revision: Union[str, None] = '31bcd3fe790c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column("applications", "summary")
    op.add_column("applications", sa.Column('summary', sa.String(), server_default=""))


def downgrade() -> None:
    """Downgrade schema."""
    pass
