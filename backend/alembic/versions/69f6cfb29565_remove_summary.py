"""remove summary

Revision ID: 69f6cfb29565
Revises: 30ee7f52a7a8
Create Date: 2025-03-29 07:13:06.890651

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '69f6cfb29565'
down_revision: Union[str, None] = '30ee7f52a7a8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
        pass


def downgrade() -> None:
       op.drop_table('summary')
       op.add_column("applications", sa.Column('summary', sa.String(), default=""))
