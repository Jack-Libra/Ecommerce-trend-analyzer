from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import HotKeyword
from models.keyword_trend import KeywordTrend
from schemas.keyword import KeywordCreate, KeywordUpdate

async def get_keyword(db: AsyncSession, keyword_id: int):
    result = await db.execute(select(HotKeyword).where(HotKeyword.id == keyword_id))
    return result.scalar_one_or_none()

async def get_keywords(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(HotKeyword).offset(skip).limit(limit))
    return result.scalars().all()

async def create_keyword(db: AsyncSession, keyword: KeywordCreate):
    db_keyword = HotKeyword(**keyword.dict())
    db.add(db_keyword)
    await db.commit()
    await db.refresh(db_keyword)
    return db_keyword

async def update_keyword(db: AsyncSession, db_keyword: HotKeyword, updates: KeywordUpdate):
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(db_keyword, key, value)
    await db.commit()
    await db.refresh(db_keyword)
    return db_keyword

async def delete_keyword(db: AsyncSession, db_keyword: HotKeyword):
    await db.delete(db_keyword)
    await db.commit()

async def get_keyword_trend(db: AsyncSession, keyword: str):
    result = await db.execute(select(KeywordTrend).where(KeywordTrend.keyword == keyword))
    return result.scalars().all()