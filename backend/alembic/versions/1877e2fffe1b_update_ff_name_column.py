"""update ff name column

Revision ID: 1877e2fffe1b
Revises: 441c632037cd
Create Date: 2025-03-27 21:59:23.141182

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1877e2fffe1b'
down_revision: Union[str, None] = '441c632037cd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column("feature_flags", "name")
    op.add_column("feature_flags", sa.Column('name', sa.String(50), unique=True, index=True, nullable=False))


def downgrade() -> None:
   op.drop_table('feature_flags')
