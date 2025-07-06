import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


# 全域例外格式處理
def add_global_exception_handler(app: FastAPI):
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logging.error(f"Unhandled error: {exc}")
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal Server Error"},
        )