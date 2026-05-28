from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lead import Lead, LeadSource, LeadStatus
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
        source=LeadSource(payload.source.value),
        parent_name=payload.parent_name,
        phone=payload.phone,
        child_age=payload.child_age,
        program=payload.program,
        program_title=payload.program_title,
        program_date=payload.program_date,
        program_price=payload.program_price,
        consent=payload.consent,
        page_url=str(payload.page_url) if payload.page_url else None,
        user_agent=user_agent[:500] if user_agent else None,
        ip_address=ip_address[:64] if ip_address else None,
    )

    db.add(lead)
    await db.flush()

    try:
        notified = await send_lead_notification(lead)
    except Exception:  # noqa: BLE001 - Telegram failure must not reject an accepted lead
        lead.status = LeadStatus.notification_failed
        # HTTP client exceptions can contain the bot token in the request URL.
        lead.telegram_error = "Telegram notification failed"
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
