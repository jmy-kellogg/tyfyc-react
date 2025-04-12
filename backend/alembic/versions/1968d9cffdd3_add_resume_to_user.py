"""add resume to user

Revision ID: 1968d9cffdd3
Revises: 0a5a23756dc3
Create Date: 2025-04-11 19:12:53.352982

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1968d9cffdd3'
down_revision: Union[str, None] = '0a5a23756dc3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('resume', sa.String(), server_default=""))


def downgrade() -> None:
    op.drop_column('users', 'resume')
