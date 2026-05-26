"""adapt leads to China trip applications

Revision ID: 20260527_0002
Revises: 20260510_0001
Create Date: 2026-05-27
"""
from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "20260527_0002"
down_revision: str | None = "20260510_0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


trip_program = postgresql.ENUM(
    "xian",
    "nanjing-shanghai",
    "chongqing-yangtze",
    name="trip_program",
    create_type=False,
)


def upgrade() -> None:
    bind = op.get_bind()

    if bind.dialect.name == "postgresql":
        op.execute("ALTER TYPE lead_source ADD VALUE IF NOT EXISTS 'hero'")
        op.execute("ALTER TYPE lead_source ADD VALUE IF NOT EXISTS 'request'")
        trip_program.create(bind, checkfirst=True)

    op.alter_column("leads", "name", new_column_name="parent_name")
    op.add_column("leads", sa.Column("child_age", sa.Integer(), nullable=True))
    if bind.dialect.name == "postgresql":
        op.add_column("leads", sa.Column("program", trip_program, nullable=True))
    else:
        op.add_column("leads", sa.Column("program", sa.String(length=40), nullable=True))


def downgrade() -> None:
    bind = op.get_bind()

    op.drop_column("leads", "program")
    op.drop_column("leads", "child_age")
    op.alter_column("leads", "parent_name", new_column_name="name")

    if bind.dialect.name == "postgresql":
        trip_program.drop(bind, checkfirst=True)
