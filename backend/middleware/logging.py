import time
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

# 請求日誌中介軟體
class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000
        logging.info(
            f"{request.method} {request.url.path} - {response.status_code} - {process_time:.2f}ms"
        )
        return response