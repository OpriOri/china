# CONTROLIX Deploy Notes

## GitHub Secrets

Repository: `OpriOri/controlix`

Required secrets:

- `SSH_HOST` - server IP or hostname
- `SSH_USER` - deploy user
- `SSH_KEY` - private SSH key for deploy user
- `SSH_PORT` - SSH port, usually `22`
- `DEPLOY_PATH` - project directory on server, for example `/opt/controlix`
- `BACKEND_ENV` - full production backend env file contents

## BACKEND_ENV

Do not copy this secret from a local development `backend/.env` unless it already
contains production values. Keep a local ignored file such as
`backend/.env.production` with the exact values that should be written to
`backend/.env` on the server.

Copy the full contents of `backend/.env.production` into GitHub secret
`BACKEND_ENV`.

For production, `backend/.env.production` should use server values:

```env
APP_NAME=CONTROLIX API
APP_ENV=production
DEBUG=false
API_PREFIX=/api/v1

POSTGRES_USER=controlix
POSTGRES_PASSWORD=change-me
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=controlix

CORS_ORIGINS=https://controlix-group.ru,https://www.controlix-group.ru

RATE_LIMIT_DEFAULT=60/minute
RATE_LIMIT_LEADS=5/minute

TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
TELEGRAM_TIMEOUT_SECONDS=8
```

`docker-compose.yml` overrides `POSTGRES_HOST=db` inside the backend container, so the env file can stay convenient for local/manual usage.

Compose-level values live in the project-root `.env` file. GitHub Actions writes it during deploy:

```env
BACKEND_IMAGE=ghcr.io/opriori/controlix-backend
FRONTEND_IMAGE=ghcr.io/opriori/controlix-frontend
IMAGE_TAG=<current commit sha>
BACKEND_PORT=8000
FRONTEND_PORT=3000
```

`FRONTEND_PORT=3000` means the frontend is exposed only on `127.0.0.1:3000`.
Put your server nginx/certbot config in front of it and proxy the public domain
to that local port.

## First Server Setup

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx
sudo mkdir -p /opt/controlix
sudo chown -R deploy:deploy /opt/controlix
```

GitHub Actions does not clone the repository on the server. The deploy job
uploads only `docker-compose.yml`, writes `.env` and `backend/.env`, pulls
images from GHCR, and restarts containers.

After GitHub Secrets are added, pushing to `main` runs tests, builds frontend, writes `backend/.env` from `BACKEND_ENV`, and starts:

```bash
docker compose pull
docker compose up -d --remove-orphans
docker image prune -af --filter "until=24h"
```
