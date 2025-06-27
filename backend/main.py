from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import products, keywords, categories, admin

from middleware.cors import get_cors_middleware
from middleware.logging import LoggingMiddleware
from middleware.auth import AuthMiddleware
from middleware.exception_handler import add_global_exception_handler

import os

app = FastAPI()

# CORS
get_cors_middleware(app)

# 請求日誌
app.add_middleware(LoggingMiddleware)

# 驗證 token
app.add_middleware(AuthMiddleware, secret_key=os.getenv("SECRET_KEY", "your-secret"), algorithms=["HS256"])

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 或 ["*"] 開發用
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 全域例外處理
add_global_exception_handler(app)

app.include_router(products.router)
app.include_router(keywords.router)
app.include_router(categories.router)
app.include_router(admin.router)

