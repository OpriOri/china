# CONTROLIX Group Backend

FastAPI backend for collecting website leads, storing analytics-ready records, and sending Telegram notifications.

## Local Run

```bash
cp .env.example .env
pip install -r requirements-dev.txt
alembic upgrade head
uvicorn app.main:app --reload
```

For local migrations from Windows/macOS/Linux, keep `POSTGRES_HOST=localhost` in `backend/.env`.
Inside Docker Compose the backend receives `POSTGRES_HOST=db` automatically.

API healthcheck:

```bash
curl http://localhost:8000/health
```

Lead endpoint:

```bash
POST /api/v1/leads
```

## Docker

From the project root:

```bash
cp backend/.env.example backend/.env
cp .env.example .env
docker compose pull
docker compose up -d
```

The database URL is assembled in `app/core/config.py` from:

```env
POSTGRES_USER=controlix
POSTGRES_PASSWORD=controlix
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=controlix
```

## Telegram

Set in `backend/.env`:

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

If Telegram variables are empty, leads are still saved and notification is skipped.

## Deploy

The GitHub Actions workflow expects repository secrets:

- `SSH_HOST`
- `SSH_USER`
- `SSH_KEY`
- `SSH_PORT` optional
- `DEPLOY_PATH`
