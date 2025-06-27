# backend/services/trend_analysis.py
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import timedelta, datetime
from models.product_snapshots import ProductSnapshot
from schemas.price_services import PriceTrendRead, PriceTrendPoint

def get_category_growth(db: Session, category_id: str, days: int = 30):
    #分析指定分類在過去幾天內商品數量的變化
    since = datetime.utcnow() - timedelta(days=days)
    result = (
        db.query(
            func.date(ProductSnapshot.captured_at).label("day"),
            func.count(ProductSnapshot.id).label("count")
        )
        .filter(ProductSnapshot.category_id == category_id)
        .filter(ProductSnapshot.captured_at >= since)
        .group_by("day")
        .order_by("day")
        .all()
    )
    # 可依需求組裝 schema
    return [{"day": r.day, "count": r.count} for r in result]


def get_price_trend(db: Session, product_id: int, days: int = 30):
    #分析單一商品的價格變化趨勢
    since = datetime.utcnow() - timedelta(days=days)
    result = (
        db.query(
            func.date(ProductSnapshot.captured_at).label("day"),
            func.avg(ProductSnapshot.price).label("avg_price")
        )
        .filter(ProductSnapshot.product_id == product_id)
        .filter(ProductSnapshot.captured_at >= since)
        .group_by("day")
        .order_by("day")
        .all()
    )
    trend = [PriceTrendPoint(day=row.day, avg_price=row.avg_price) for row in result]
    return PriceTrendRead(trend=trend)