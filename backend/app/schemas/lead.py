from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.models.lead import LeadSource, LeadStatus


class SelectedService(BaseModel):
    code: str | None = Field(default=None, max_length=32)
    title: str = Field(min_length=2, max_length=160)
    price: str | None = Field(default=None, max_length=80)


class LeadCreate(BaseModel):
    source: LeadSource
    name: str = Field(min_length=2, max_length=120)
    contact: str = Field(min_length=10, max_length=32, description="Required phone number")
    email: EmailStr | None = None
    comment: str | None = Field(default=None, max_length=500)
    selected_service: SelectedService | None = None
    selections: dict[str, Any] | None = None
    consent: bool
    page_url: str | None = Field(default=None, max_length=500)

    @field_validator("name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        return " ".join(value.strip().split())

    @field_validator("contact")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        digits = "".join(ch for ch in value if ch.isdigit())
        if len(digits) != 11 or not digits.startswith("7"):
            raise ValueError("phone must be a Russian number in +7 format")
        return value.strip()

    @field_validator("comment")
    @classmethod
    def normalize_comment(cls, value: str | None) -> str | None:
        if value is None:
            return None
        value = value.strip()
        return value or None

    @field_validator("consent")
    @classmethod
    def require_consent(cls, value: bool) -> bool:
        if not value:
            raise ValueError("consent is required")
        return value


class LeadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    source: LeadSource
    status: LeadStatus
    name: str
    phone: str
    email: str | None
    comment: str | None
    selected_service: dict | None
    selections: dict | None
    consent: bool
    page_url: str | None
    created_at: datetime


class LeadCreateResponse(BaseModel):
    id: UUID
    status: LeadStatus
    message: str = "lead accepted"

