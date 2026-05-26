from sqlalchemy import select

from app.models.lead import Lead, LeadSource, LeadStatus
from app.services.telegram import build_lead_message


def lead_payload(**overrides):
    payload = {
        "source": "diagnostic",
        "name": "Иван Петров",
        "contact": "+7 (909) 386-55-54",
        "email": "ivan@example.com",
        "comment": "Нужен первичный разбор проекта",
        "selected_service": {"title": "Аудит сметы", "price": "от 120 000 ₽"},
        "selections": {"stage": "design", "pain": "budget", "scale": "commercial"},
        "consent": True,
        "page_url": "http://localhost:8080/",
    }
    payload.update(overrides)
    return payload


async def test_create_lead_saves_payload(client, db_session):
    response = await client.post("/api/v1/leads", json=lead_payload())

    assert response.status_code == 201
    body = response.json()
    assert body["message"] == "lead accepted"
    assert body["status"] == LeadStatus.new.value

    result = await db_session.execute(select(Lead))
    lead = result.scalar_one()
    assert lead.source == LeadSource.diagnostic
    assert lead.name == "Иван Петров"
    assert lead.phone == "+7 (909) 386-55-54"
    assert lead.email == "ivan@example.com"
    assert lead.selected_service["title"] == "Аудит сметы"
    assert lead.selections["pain"] == "budget"
    assert lead.consent is True


async def test_create_lead_requires_valid_phone(client):
    response = await client.post("/api/v1/leads", json=lead_payload(contact="hello"))

    assert response.status_code == 422


async def test_create_lead_requires_consent(client):
    response = await client.post("/api/v1/leads", json=lead_payload(consent=False))

    assert response.status_code == 422


async def test_telegram_message_keeps_russian_text(client, db_session):
    await client.post("/api/v1/leads", json=lead_payload())

    result = await db_session.execute(select(Lead))
    lead = result.scalar_one()
    message = build_lead_message(lead)

    assert "Иван Петров" in message
    assert "Аудит сметы" in message
    assert "Калькулятор / диагностика" in message
    assert "Стадия проекта: Проектирование" in message
    assert "Главная проблема: Растет бюджет" in message
