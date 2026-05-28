from datetime import datetime
import enum
from uuid import UUID

from pydantic import AnyHttpUrl, BaseModel, ConfigDict, Field, field_validator

from app.models.lead import LeadSource, LeadStatus, TripProgram


class LeadFormSource(str, enum.Enum):
    hero = "hero"
    request = "request"


class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    source: LeadFormSource
    parent_name: str = Field(min_length=2, max_length=120, description="Parent or guardian name")
    phone: str = Field(min_length=10, max_length=32, description="Russian contact phone number")
    child_age: int = Field(ge=7, le=17, description="Child age at the time of travel")
    program: TripProgram
    program_title: str = Field(min_length=2, max_length=120, description="Selected tour title shown to the client")
    program_date: str = Field(min_length=2, max_length=80, description="Selected tour dates shown to the client")
    program_price: str = Field(min_length=2, max_length=80, description="Selected tour price shown to the client")
    consent: bool = Field(description="Consent to personal data processing")
    page_url: AnyHttpUrl | None = Field(default=None, max_length=500)

    @field_validator("parent_name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        normalized = " ".join(value.strip().split())
        if len(normalized) < 2:
            raise ValueError("parent name is required")
        return normalized

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        digits = "".join(ch for ch in value if ch.isdigit())
        if len(digits) != 11 or not digits.startswith("7"):
            raise ValueError("phone must be a Russian number in +7 format")
        return value.strip()

    @field_validator("program_title", "program_date", "program_price")
    @classmethod
    def normalize_program_snapshot(cls, value: str) -> str:
        normalized = " ".join(value.strip().split())
        if len(normalized) < 2:
            raise ValueError("selected program details are required")
        return normalized

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
    parent_name: str
    phone: str
    child_age: int | None
    program: TripProgram | None
    program_title: str | None
    program_date: str | None
    program_price: str | None
    consent: bool
    page_url: AnyHttpUrl | None
    created_at: datetime


class LeadCreateResponse(BaseModel):
    id: UUID
    status: LeadStatus
    message: str = "lead accepted"

