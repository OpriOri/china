import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, Index, String, Text, Uuid, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class LeadSource(str, enum.Enum):
    contact = "contact"
    diagnostic = "diagnostic"
    service = "service"
    hero = "hero"
    request = "request"


class TripProgram(str, enum.Enum):
    xian = "xian"
    nanjing_shanghai = "nanjing-shanghai"
    chongqing_yangtze = "chongqing-yangtze"


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

    parent_name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    child_age: Mapped[int | None] = mapped_column(nullable=True)
    program: Mapped[TripProgram | None] = mapped_column(
        Enum(TripProgram, name="trip_program", values_callable=lambda values: [item.value for item in values]),
        nullable=True,
    )
    consent: Mapped[bool] = mapped_column(nullable=False, default=False, server_default="false")

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
