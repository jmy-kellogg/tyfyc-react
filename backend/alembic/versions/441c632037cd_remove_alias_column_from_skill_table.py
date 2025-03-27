"""remove alias column from skill table

Revision ID: 441c632037cd
Revises: 3e295332f00f
Create Date: 2025-03-26 17:41:55.634368

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

def generate_uuid():
    return str(uuid.uuid4())

# revision identifiers, used by Alembic.
revision: str = '441c632037cd'
down_revision: Union[str, None] = '3e295332f00f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'skills',
        sa.Column('id', sa.String,  primary_key=True, default=generate_uuid),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('default_category', sa.String(50), nullable=True),
    )


def downgrade() -> None:
   op.drop_table('skill')
