from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.rate_limit import limiter
from app.db.session import get_db
from app.schemas.lead import LeadCreate, LeadCreateResponse
from app.services.leads import create_lead

router = APIRouter()


@router.post(
    "",
    response_model=LeadCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit an application for a China summer trip",
)
@limiter.limit(settings.rate_limit_leads)
async def submit_lead(
    request: Request,
    payload: LeadCreate,
    db: AsyncSession = Depends(get_db),
) -> LeadCreateResponse:
    lead = await create_lead(
        db,
        payload,
        user_agent=request.headers.get("user-agent"),
        ip_address=request.client.host if request.client else None,
    )
    return LeadCreateResponse(id=lead.id, status=lead.status)
