from sqlalchemy import select

from app.models.lead import Lead, LeadSource, LeadStatus
from app.services.telegram import build_lead_message


def lead_payload(**overrides):
    payload = {
        "source": "hero",
        "parent_name": "Ирина Петрова",
        "phone": "+7 (909) 386-55-54",
        "child_age": 12,
        "program": "nanjing-shanghai",
        "program_title": "Нанкин + Шанхай",
        "program_date": "11-25 июля",
        "program_price": "230 000 ₽",
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
    assert lead.source == LeadSource.hero
    assert lead.parent_name == "Ирина Петрова"
    assert lead.phone == "+7 (909) 386-55-54"
    assert lead.child_age == 12
    assert lead.program.value == "nanjing-shanghai"
    assert lead.program_title == "Нанкин + Шанхай"
    assert lead.program_date == "11-25 июля"
    assert lead.program_price == "230 000 ₽"
    assert lead.consent is True


async def test_create_lead_requires_valid_phone(client):
    response = await client.post("/api/v1/leads", json=lead_payload(phone="hello"))

    assert response.status_code == 422


async def test_create_lead_rejects_unknown_legacy_payload(client):
    response = await client.post(
        "/api/v1/leads",
        json=lead_payload(selected_service={"title": "Подмена стоимости"}),
    )

    assert response.status_code == 422


async def test_create_lead_requires_supported_child_age(client):
    response = await client.post("/api/v1/leads", json=lead_payload(child_age=6))

    assert response.status_code == 422


async def test_create_lead_requires_consent(client):
    response = await client.post("/api/v1/leads", json=lead_payload(consent=False))

    assert response.status_code == 422


async def test_telegram_message_keeps_russian_text(client, db_session):
    await client.post("/api/v1/leads", json=lead_payload())

    result = await db_session.execute(select(Lead))
    lead = result.scalar_one()
    message = build_lead_message(lead)

    assert "Ирина Петрова" in message
    assert "Нанкин + Шанхай" in message
    assert "Форма на первом экране" in message
    assert "Возраст ребенка: <b>12</b>" in message
    assert "<b>Тур</b>" in message
    assert "<code>+7 (909) 386-55-54</code>" in message


async def test_telegram_error_does_not_persist_bot_token(client, db_session, monkeypatch):
    async def fail_notification(_lead):
        raise RuntimeError("https://api.telegram.org/botSECRET_TOKEN/sendMessage")

    monkeypatch.setattr("app.services.leads.send_lead_notification", fail_notification)

    response = await client.post("/api/v1/leads", json=lead_payload())

    assert response.status_code == 201
    result = await db_session.execute(select(Lead))
    lead = result.scalar_one()
    assert lead.status == LeadStatus.notification_failed
    assert lead.telegram_error == "Telegram notification failed"
    assert "SECRET_TOKEN" not in lead.telegram_error
