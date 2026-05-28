"""store selected tour snapshot on leads

Revision ID: 20260527_0003
Revises: 20260527_0002
Create Date: 2026-05-27
"""
from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa

revision: str = "20260527_0003"
down_revision: str | None = "20260527_0002"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("leads", sa.Column("program_title", sa.String(length=120), nullable=True))
    op.add_column("leads", sa.Column("program_date", sa.String(length=80), nullable=True))
    op.add_column("leads", sa.Column("program_price", sa.String(length=80), nullable=True))


def downgrade() -> None:
    op.drop_column("leads", "program_price")
    op.drop_column("leads", "program_date")
    op.drop_column("leads", "program_title")
