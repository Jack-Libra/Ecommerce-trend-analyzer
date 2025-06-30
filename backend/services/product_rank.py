# backend/services/product_rank.py
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from datetime import datetime, timedelta
from models.product import Product
from models.product_snapshots import ProductSnapshot, LatestProductSnapshot
from schemas.product import ProductRead

from sqlalchemy import select

async def get_top_ranked_products(db: AsyncSession, limit: int = 10):
    # 直接查詢最新快照物化視圖，依 score 排序，join 產品主表
    stmt = (
        select(Product, LatestProductSnapshot.price, LatestProductSnapshot.score)
        .join(LatestProductSnapshot, Product.id == LatestProductSnapshot.product_id)
        .order_by(LatestProductSnapshot.score.desc())
        .limit(limit)
    )
    result = await db.execute(stmt)
    rows = result.all()
    # 回傳 dict，包含商品資料、score、price
    return [
        {**ProductRead.from_orm(row[0]).dict(), "price": float(row[1]) if row[1] is not None else None, "score": row[2]} for row in rows
    ]


def get_fastest_growing_products(db: Session, days: int = 7, limit: int = 10):
    #根據價格下降幅度，找出熱銷潛力商品
    since = datetime.utcnow() - timedelta(days=days)
    subq = (
        db.query(
            ProductSnapshot.product_id,
            (func.max(ProductSnapshot.price) - func.min(ProductSnapshot.price)).label("drop")
        )
        .filter(ProductSnapshot.captured_at >= since)
        .group_by(ProductSnapshot.product_id)
        .order_by(func.max(ProductSnapshot.price) - func.min(ProductSnapshot.price))
        .limit(limit)
        .subquery()
    )
    products = db.query(Product).join(subq, Product.id == subq.c.product_id).all()
    return [ProductRead.from_orm(p) for p in products]
