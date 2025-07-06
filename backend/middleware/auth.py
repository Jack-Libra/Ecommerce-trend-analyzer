from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, status
from fastapi.responses import JSONResponse
from jose import JWTError, jwt


# 驗證 JWT Token 中介軟體（簡易範例，實際請依需求調整）
class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, secret_key: str, algorithms: list):
        super().__init__(app)
        self.secret_key = secret_key
        self.algorithms = algorithms

    async def dispatch(self, request: Request, call_next):
        if request.url.path.startswith("/admin"):
            token = request.headers.get("Authorization")
            if not token or not token.startswith("Bearer "):
                return JSONResponse(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"detail": "Not authenticated"},
                )
            try:
                jwt.decode(token[7:], self.secret_key, algorithms=self.algorithms)
            except JWTError:
                return JSONResponse(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"detail": "Invalid token"},
                )
        return await call_next(request)