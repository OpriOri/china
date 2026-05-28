# ROBBO China Trips Backend

FastAPI backend for applications to educational summer trips to China. It validates the
selected route and child age, stores applications, and can send Telegram notifications.

## Local Run

```bash
cp .env.example .env
python -m pip install -e ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload
```

For local migrations from Windows/macOS/Linux, keep `POSTGRES_HOST=localhost` in
`backend/.env`. Inside Docker Compose the backend receives `POSTGRES_HOST=db`.

Healthcheck:

```bash
curl http://localhost:8000/health
```

## Lead API

```http
POST /api/v1/leads
Content-Type: application/json
```

```json
{
  "source": "hero",
  "parent_name": "Анна Иванова",
  "phone": "+7 (999) 123-45-67",
  "child_age": 12,
  "program": "xian",
  "program_title": "Сиань",
  "program_date": "14-26 июня",
  "program_price": "230 000 ₽",
  "consent": true,
  "page_url": "http://localhost:8080/"
}
```

Allowed form sources: `hero`, `request`.

Allowed programs:

- `xian`
- `nanjing-shanghai`
- `chongqing-yangtze`

The API accepts applications for children aged `7-17` and rejects unknown input fields.
The frontend sends the selected tour snapshot (`program_title`, `program_date`,
`program_price`) so the saved lead and Telegram notification match the client choice.

## Docker

From the project root:

```bash
cp backend/.env.example backend/.env
cp .env.example .env
docker compose up -d --build
```

## Telegram

Set in `backend/.env`:

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

If Telegram variables are empty, applications are still saved and notification is skipped.
Notification failures are recorded without storing a bot token or request URL.

## Security Notes

- CORS origins must be explicitly configured through `CORS_ORIGINS`.
- Application submission is rate-limited with `RATE_LIMIT_LEADS`.
- The endpoint requires consent and validates known programs, age, phone, and page URL.
- Store production PostgreSQL and Telegram credentials only in environment secrets.
