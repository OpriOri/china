FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY pyproject.toml .
COPY app ./app
RUN pip install --upgrade pip && pip install .
COPY alembic.ini .
COPY alembic ./alembic
COPY scripts ./scripts

RUN chmod +x /app/scripts/start.sh

EXPOSE 8000

CMD ["/app/scripts/start.sh"]
