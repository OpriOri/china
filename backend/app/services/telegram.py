import json
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
    "xian": ("Сиань", "14-26 июня"),
    "nanjing-shanghai": ("Нанкин + Шанхай", "11-25 июля"),
    "chongqing-yangtze": ("Чунцин + Янцзы + Чжанцзяцзе", "11-25 августа"),
    "shanghai-hangzhou": ("Шанхай + Ханчжоу", "4-10 октября"),
}

INTEREST_LABELS = {
    "technology": "Технологии и будущее",
    "education": "Образование и развитие",
    "impressions": "Новые впечатления",
    "choosing": "Пока выбирают",
}


def _clean(value: object) -> str:
    return escape(str(value)) if value not in (None, "") else "-"


def build_lead_message(lead: Lead) -> str:
    program_text = "-"
    if lead.program_title or lead.program_date:
        program_text = f"{_clean(lead.program_title)} / {_clean(lead.program_date)}"
    elif lead.program:
        program = PROGRAM_LABELS.get(lead.program.value)
        if program:
            title, dates = program
            program_text = f"{_clean(title)} / {_clean(dates)}"

    lines = [
        "<b>Новая заявка на тур в Китай</b>",
        "<i>Клиент выбрал программу на сайте</i>",
        "",
        "<b>Тур</b>",
        f"Название / даты: <b>{program_text}</b>",
        f"Что важно: <b>{_clean(INTEREST_LABELS.get(lead.interest, lead.interest))}</b>",
        "",
        "<b>Контакт</b>",
        f"Родитель: <b>{_clean(lead.parent_name)}</b>",
        f"Телефон: <code>{_clean(lead.phone)}</code>",
        f"Почта: <code>{_clean(lead.email)}</code>",
        f"Возраст ребенка: <b>{_clean(lead.child_age)}</b>",
        "",
        "<b>Источник</b>",
        f"Форма: {_clean(SOURCE_LABELS.get(lead.source.value, lead.source.value))}",
        f"Страница: {_clean(lead.page_url)}",
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
        response = await client.post(
            url,
            content=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
            headers={"Content-Type": "application/json; charset=utf-8"},
        )
        response.raise_for_status()
    return True
