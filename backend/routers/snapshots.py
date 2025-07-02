from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from database.client import get_db
from schemas.snapshot import SnapshotRead
from crud.snapshot import get_snapshots
from typing import Optional
from models.product_snapshots import ProductSnapshot
from sqlalchemy.future import select

router = APIRouter(
    prefix="/snapshots",
    tags=["snapshots"]
)

@router.get("/", response_model=list[SnapshotRead])
async def list_snapshots(
    product_id: Optional[int] = Query(None),
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    if product_id is not None:
        return await get_snapshots(db, product_id=product_id, skip=skip, limit=limit)
    # 查詢所有商品的所有快照
    result = await db.execute(
        select(ProductSnapshot).offset(skip).limit(limit)
    )
    return result.scalars().all()
