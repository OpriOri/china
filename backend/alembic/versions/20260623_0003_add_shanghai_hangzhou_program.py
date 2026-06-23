"""add Shanghai and Hangzhou trip program

Revision ID: 20260623_0003
Revises: 20260527_0002
Create Date: 2026-06-23
"""
from collections.abc import Sequence

from alembic import op

revision: str = "20260623_0003"
down_revision: str | None = "20260527_0002"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    bind = op.get_bind()
    if bind.dialect.name == "postgresql":
        op.execute("ALTER TYPE trip_program ADD VALUE IF NOT EXISTS 'shanghai-hangzhou'")


def downgrade() -> None:
    # PostgreSQL enum values cannot be removed safely without rebuilding the type.
    pass
