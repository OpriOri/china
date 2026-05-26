import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, Index, String, Text, Uuid, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import JSON

from app.db.base import Base


class LeadSource(str, enum.Enum):
    contact = "contact"
    diagnostic = "diagnostic"
    service = "service"


class LeadStatus(str, enum.Enum):
    new = "new"
    notified = "notified"
    notification_failed = "notification_failed"


class Lead(Base):
    __tablename__ = "leads"
    __table_args__ = (
        Index("ix_leads_source_created_at", "source", "created_at"),
        Index("ix_leads_status_created_at", "status", "created_at"),
    )

    id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source: Mapped[LeadSource] = mapped_column(Enum(LeadSource, name="lead_source"), nullable=False)
    status: Mapped[LeadStatus] = mapped_column(
        Enum(LeadStatus, name="lead_status"),
        nullable=False,
        default=LeadStatus.new,
        server_default=LeadStatus.new.value,
    )

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    email: Mapped[str | None] = mapped_column(String(160))
    comment: Mapped[str | None] = mapped_column(Text)

    selected_service: Mapped[dict | None] = mapped_column(JSON().with_variant(JSONB, "postgresql"))
    selections: Mapped[dict | None] = mapped_column(JSON().with_variant(JSONB, "postgresql"))
    consent: Mapped[bool] = mapped_column(nullable=False, default=True, server_default="true")

    page_url: Mapped[str | None] = mapped_column(String(500))
    user_agent: Mapped[str | None] = mapped_column(String(500))
    ip_address: Mapped[str | None] = mapped_column(String(64))

    telegram_error: Mapped[str | None] = mapped_column(Text)
    telegram_notified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )
