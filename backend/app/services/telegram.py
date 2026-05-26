from html import escape

import httpx

from app.core.config import settings
from app.models.lead import Lead


SOURCE_LABELS = {
    "hero": "Форма на первом экране",
    "request": "Финальная форма заявки",
    "contact": "Форма контактов (старая версия)",
    "diagnostic": "Форма диагностики (старая версия)",
    "service": "Заявка на услугу (старая версия)",
}

PROGRAM_LABELS = {
    "xian": ("Сиань", "14-26 июня", "230 000 ₽"),
    "nanjing-shanghai": ("Нанкин + Шанхай", "11-25 июля", "230 000 ₽"),
    "chongqing-yangtze": ("Чунцин + Янцзы + Чжанцзяцзе", "11-25 августа", "186 500 ₽"),
}


def _clean(value: object) -> str:
    return escape(str(value)) if value not in (None, "") else "-"


def build_lead_message(lead: Lead) -> str:
    program_value = lead.program.value if lead.program else ""
    program = PROGRAM_LABELS.get(program_value)
    program_text = "-"
    if program:
        title, dates, price = program
        program_text = f"{_clean(title)} / {_clean(dates)} / {_clean(price)}"

    lines = [
        "<b>Новая заявка: летняя поездка в Китай</b>",
        "",
        f"<b>Форма:</b> {_clean(SOURCE_LABELS.get(lead.source.value, lead.source.value))}",
        f"<b>Имя родителя:</b> {_clean(lead.parent_name)}",
        f"<b>Телефон:</b> {_clean(lead.phone)}",
        f"<b>Возраст ребенка:</b> {_clean(lead.child_age)}",
        f"<b>Программа:</b> {program_text}",
        f"<b>Страница:</b> {_clean(lead.page_url)}",
    ]
    return "\n".join(lines)


async def send_lead_notification(lead: Lead) -> bool:
    if not settings.telegram_enabled:
        return False

    token = settings.telegram_bot_token.get_secret_value()
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": settings.telegram_chat_id,
        "text": build_lead_message(lead),
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }

    async with httpx.AsyncClient(timeout=settings.telegram_timeout_seconds) as client:
        response = await client.post(url, json=payload)
        response.raise_for_status()
    return True
