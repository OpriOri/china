from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lead import Lead, LeadStatus
from app.schemas.lead import LeadCreate
from app.services.telegram import send_lead_notification


async def create_lead(
    db: AsyncSession,
    payload: LeadCreate,
    *,
    user_agent: str | None,
    ip_address: str | None,
) -> Lead:
    lead = Lead(
        source=payload.source,
        name=payload.name,
        phone=payload.contact,
        email=str(payload.email) if payload.email else None,
        comment=payload.comment,
        selected_service=payload.selected_service.model_dump(exclude_none=True)
        if payload.selected_service
        else None,
        selections=payload.selections,
        consent=payload.consent,
        page_url=payload.page_url,
        user_agent=user_agent,
        ip_address=ip_address,
    )

    db.add(lead)
    await db.flush()

    try:
        notified = await send_lead_notification(lead)
    except Exception as exc:  # noqa: BLE001 - persisted for operator visibility
        lead.status = LeadStatus.notification_failed
        lead.telegram_error = str(exc)[:1000]
    else:
        if not notified:
            await db.commit()
            await db.refresh(lead)
            return lead
        lead.status = LeadStatus.notified
        lead.telegram_notified_at = datetime.now(timezone.utc)

    await db.commit()
    await db.refresh(lead)
    return lead
