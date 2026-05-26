from ipaddress import ip_address

from starlette.requests import Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import settings


def get_rate_limit_address(request: Request) -> str:
    if settings.trust_proxy_headers:
        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            candidate = forwarded_for.split(",", maxsplit=1)[0].strip()
            try:
                return str(ip_address(candidate))
            except ValueError:
                pass
    return get_remote_address(request)


limiter = Limiter(key_func=get_rate_limit_address, default_limits=[settings.rate_limit_default])

