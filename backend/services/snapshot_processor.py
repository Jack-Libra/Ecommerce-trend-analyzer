# backend/services/snapshot_processor.py
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from models.product_snapshots import ProductSnapshot
from schemas.price_services import PriceStatsRead, PriceOutlierRead


def get_price_changes(db: Session, product_id: int, days: int = 7):
     #回傳某商品在一定時間內的價格變動（最高、最低、平均）
    since = datetime.utcnow() - timedelta(days=days)
    result = (
        db.query(
            func.min(ProductSnapshot.price).label("min_price"),
            func.max(ProductSnapshot.price).label("max_price"),
            func.avg(ProductSnapshot.price).label("avg_price")
        )
        .filter(ProductSnapshot.product_id == product_id)
        .filter(ProductSnapshot.captured_at >= since)
        .first()
    )
    # 組裝 schema
    return PriceStatsRead(
        min_price=result.min_price if result else None,
        max_price=result.max_price if result else None,
        avg_price=result.avg_price if result else None
    )
    
def detect_outliers(db: Session, product_id: int, days: int = 7):
    #偵測價格異常變動（超出標準差）
    from statistics import mean, stdev
    since = datetime.utcnow() - timedelta(days=days)
    prices = (
        db.query(ProductSnapshot.price)
        .filter(ProductSnapshot.product_id == product_id)
        .filter(ProductSnapshot.captured_at >= since)
        .all()
    )
    prices = [p[0] for p in prices if p[0] is not None]
    if len(prices) < 2:
        return PriceOutlierRead(outliers=[])
    avg = mean(prices)
    sd = stdev(prices)
    outliers = [p for p in prices if abs(p - avg) > 2 * sd]
    return PriceOutlierRead(outliers=outliers)