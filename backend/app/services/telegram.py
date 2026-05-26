from html import escape

import httpx

from app.core.config import settings
from app.models.lead import Lead


SOURCE_LABELS = {
    "contact": "Форма контактов",
    "diagnostic": "Калькулятор / диагностика",
    "service": "Заявка на услугу",
}

SELECTION_LABELS = {
    "stage": "Стадия проекта",
    "goal": "Что нужно",
    "pain": "Главная проблема",
    "scale": "Тип объекта",
}

SELECTION_VALUES = {
    "design": "Проектирование",
    "build": "Стройка идет",
    "preacceptance": "Готовимся к сдаче",
    "issues": "Уже есть проблемы",
    "schedule": "Срываются сроки",
    "budget": "Растет бюджет",
    "docs": "Хаос в документации",
    "contractors": "Не доверяю подрядчику",
    "quality": "Плохое качество работ",
    "commercial": "Коммерческий объект",
    "residential": "Жилой комплекс",
    "warehouse": "Склад / производство",
    "other": "Другой объект",
}


def _clean(value: object) -> str:
    return escape(str(value)) if value not in (None, "") else "-"


def _format_selection_value(value: object) -> str:
    if value in (None, ""):
        return "-"
    return SELECTION_VALUES.get(str(value), str(value))


def _format_dict(data: dict | None) -> str:
    if not data:
        return "-"

    rows = []
    for key, value in data.items():
        if value in (None, ""):
            continue
        label = SELECTION_LABELS.get(str(key), str(key))
        rows.append(f"- {escape(label)}: {escape(_format_selection_value(value))}")
    return "\n".join(rows) if rows else "-"


def build_lead_message(lead: Lead) -> str:
    service = lead.selected_service or {}
    service_text = "-"
    if service:
        service_text = _clean(service.get("title"))
        if service.get("price"):
            service_text += f" ({_clean(service['price'])})"

    lines = [
        "<b>Новая заявка CONTROLIX Group</b>",
        "",
        f"<b>Источник:</b> {_clean(SOURCE_LABELS.get(lead.source.value, lead.source.value))}",
        f"<b>Имя:</b> {_clean(lead.name)}",
        f"<b>Телефон:</b> {_clean(lead.phone)}",
        f"<b>Email:</b> {_clean(lead.email)}",
        f"<b>Услуга:</b> {service_text}",
        "",
        "<b>Выбор клиента:</b>",
        _format_dict(lead.selections),
        "",
        f"<b>Комментарий:</b> {_clean(lead.comment)}",
        f"<b>Страница:</b> {_clean(lead.page_url)}",
    ]
    return "\n".join(lines)


async def send_lead_notification(lead: Lead) -> bool:
    if not settings.telegram_enabled:
        return False

    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
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
