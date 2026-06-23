"""store the selected child interest on leads

Revision ID: 20260624_0004
Revises: 20260623_0003
Create Date: 2026-06-24
"""
from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa

revision: str = "20260624_0004"
down_revision: str | None = "20260623_0003"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("leads", sa.Column("interest", sa.String(length=40), nullable=True))


def downgrade() -> None:
    op.drop_column("leads", "interest")
