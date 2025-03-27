"""create skill table

Revision ID: 3e295332f00f
Revises: 
Create Date: 2025-03-26 17:31:07.021676

"""
from typing import Sequence, Union
import uuid

from alembic import op
import sqlalchemy as sa

def generate_uuid():
    return str(uuid.uuid4())

# revision identifiers, used by Alembic.
revision: str = '3e295332f00f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'skill',
        sa.Column('id', sa.String,  primary_key=True, default=generate_uuid),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('default_category', sa.String(50), nullable=True),
        sa.Column('alias', sa.String(50)),
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
