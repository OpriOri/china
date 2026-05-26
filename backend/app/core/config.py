from functools import lru_cache
from pathlib import Path
from urllib.parse import quote_plus

from pydantic import Field, SecretStr, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=BACKEND_DIR / ".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = Field()
    app_env: str = Field()
    debug: bool = Field()
    api_prefix: str = Field()

    postgres_user: str = Field()
    postgres_password: str = Field()
    postgres_host: str = Field()
    postgres_port: int = Field()
    postgres_db: str = Field()

    cors_origins: str = Field()

    rate_limit_default: str = Field()
    rate_limit_leads: str = Field()
    trust_proxy_headers: bool = Field(default=False)

    telegram_bot_token: SecretStr | None = Field()
    telegram_chat_id: str | None = Field()
    telegram_timeout_seconds: int = Field()

    @field_validator("debug", mode="before")
    @classmethod
    def parse_debug(cls, value: bool | str) -> bool:
        if isinstance(value, bool):
            return value
        normalized = value.strip().lower()
        if normalized in {"release", "prod", "production", "false", "0", "no"}:
            return False
        if normalized in {"dev", "local", "true", "1", "yes"}:
            return True
        return False

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def database_url(self) -> str:
        user = quote_plus(self.postgres_user)
        password = quote_plus(self.postgres_password)
        host = self.postgres_host
        db_name = quote_plus(self.postgres_db)
        return f"postgresql+asyncpg://{user}:{password}@{host}:{self.postgres_port}/{db_name}"

    @property
    def telegram_enabled(self) -> bool:
        return bool(
            self.telegram_bot_token
            and self.telegram_bot_token.get_secret_value()
            and self.telegram_chat_id
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
