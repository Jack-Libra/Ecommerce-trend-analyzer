# filepath: backend/routers/admin.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.client import get_db
from crud.product import get_products
from crud.keyword import get_keywords
from crud.category import get_categories

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

@router.get("/ping")
async def ping():
    return {"msg": "pong"}

@router.post("/login")
async def admin_login():
    # TODO: 管理員登入，回傳 JWT
    return {"token": "fake-jwt-token"}

@router.get("/me")
async def admin_me():
    # TODO: 取得當前管理員資訊
    return {"admin": {"username": "admin"}}

@router.get("/summary")
async def admin_summary(db: AsyncSession = Depends(get_db)):
    products = await get_products(db)
    keywords = await get_keywords(db)
    categories = await get_categories(db)
    return {
        "summary": {
            "products": len(products),
            "keywords": len(keywords),
            "categories": len(categories)
        }
    }

@router.post("/trigger-crawler")
async def trigger_crawler():
    # TODO: 觸發爬蟲
    return {"status": "crawler triggered"}