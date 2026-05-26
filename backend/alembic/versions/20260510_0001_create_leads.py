"""create leads

Revision ID: 20260510_0001
Revises:
Create Date: 2026-05-10
"""
from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "20260510_0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


lead_source = sa.Enum("contact", "diagnostic", "service", name="lead_source")
lead_status = sa.Enum("new", "notified", "notification_failed", name="lead_status")


def upgrade() -> None:
    op.create_table(
        "leads",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("source", lead_source, nullable=False),
        sa.Column("status", lead_status, server_default="new", nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("phone", sa.String(length=32), nullable=False),
        sa.Column("email", sa.String(length=160), nullable=True),
        sa.Column("comment", sa.Text(), nullable=True),
        sa.Column("selected_service", sa.JSON().with_variant(postgresql.JSONB(), "postgresql"), nullable=True),
        sa.Column("selections", sa.JSON().with_variant(postgresql.JSONB(), "postgresql"), nullable=True),
        sa.Column("consent", sa.Boolean(), server_default=sa.true(), nullable=False),
        sa.Column("page_url", sa.String(length=500), nullable=True),
        sa.Column("user_agent", sa.String(length=500), nullable=True),
        sa.Column("ip_address", sa.String(length=64), nullable=True),
        sa.Column("telegram_error", sa.Text(), nullable=True),
        sa.Column("telegram_notified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_leads_source_created_at", "leads", ["source", "created_at"])
    op.create_index("ix_leads_status_created_at", "leads", ["status", "created_at"])


def downgrade() -> None:
    op.drop_index("ix_leads_status_created_at", table_name="leads")
    op.drop_index("ix_leads_source_created_at", table_name="leads")
    op.drop_table("leads")

    bind = op.get_bind()
    if bind.dialect.name == "postgresql":
        lead_status.drop(bind, checkfirst=True)
        lead_source.drop(bind, checkfirst=True)
