from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession #db: AsyncSession接收非同步資料庫連線(接return await)
from sqlalchemy.orm import Session #db: Session接收同步資料庫連線(接return)
from database.client import get_db
from schemas.keyword import KeywordRead, KeywordCreate, KeywordUpdate
from schemas.keyword_trend import KeywordTrendRead
from crud.keyword import (
    get_keywords,
    get_keyword,
    create_keyword,
    update_keyword,
    delete_keyword,
    get_keyword_trend,
)

router = APIRouter(
    prefix="/keywords",
    tags=["keywords"]
)

@router.get("/", response_model=list[KeywordRead])
async def list_keywords(db: AsyncSession = Depends(get_db)):
    return await get_keywords(db)

@router.get("/{keyword_id}", response_model=KeywordRead)
async def read_keyword(keyword_id: int, db: AsyncSession = Depends(get_db)):
    keyword = await get_keyword(db, keyword_id)
    if not keyword:
        raise HTTPException(status_code=404, detail="Keyword not found")
    return keyword

@router.post("/", response_model=KeywordRead)
async def create_new_keyword(keyword: KeywordCreate, db: AsyncSession = Depends(get_db)):
    return await create_keyword(db, keyword)

@router.put("/{keyword_id}", response_model=KeywordRead)
async def update_existing_keyword(keyword_id: int, updates: KeywordUpdate, db: AsyncSession = Depends(get_db)):
    db_keyword = await get_keyword(db, keyword_id)
    if not db_keyword:
        raise HTTPException(status_code=404, detail="Keyword not found")
    return await update_keyword(db, db_keyword, updates)

@router.delete("/{keyword_id}", response_model=dict)
async def remove_keyword(keyword_id: int, db: AsyncSession = Depends(get_db)):
    db_keyword = await get_keyword(db, keyword_id)
    if not db_keyword:
        raise HTTPException(status_code=404, detail="Keyword not found")
    await delete_keyword(db, db_keyword)
    return {"ok": True}

@router.get("/{keyword}/trend", response_model=list[KeywordTrendRead])
async def get_keyword_trend_route(keyword: str, db: AsyncSession = Depends(get_db)):
    return await get_keyword_trend(db, keyword)



# 從services模組導入相關函式
from services.keyword_analysis import (
    get_trending_keywords,
    get_keyword_heatmap
)

from schemas.keyword_trend import KeywordGrowthRead,TrendingKeywordRead

# 取得最近熱門關鍵字（按頻率排序）
@router.get("/trending", response_model=list[TrendingKeywordRead])
async def trending_keywords(limit: int = 10, db:Session = Depends(get_db)):
    return get_trending_keywords(db, limit)

# 取得關鍵字成長趨勢（近7日、30日）
@router.get("/{keyword}/growth", response_model=KeywordGrowthRead)
async def keyword_growth(keyword: str, db: Session = Depends(get_db)):
    return get_keyword_heatmap(db, keyword)

