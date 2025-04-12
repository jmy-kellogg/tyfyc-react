"""add resume to applicaions

Revision ID: d59ac91876a7
Revises: 1968d9cffdd3
Create Date: 2025-04-12 16:22:51.682239

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd59ac91876a7'
down_revision: Union[str, None] = '1968d9cffdd3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('applications', sa.Column('resume', sa.String(), server_default=""))


def downgrade() -> None:
    op.drop_column('applications', 'resume')
