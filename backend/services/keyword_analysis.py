# backend/services/keyword_analysis.py
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from models.keyword_trend import KeywordTrend
from schemas.keyword_trend import KeywordGrowthRead, GrowthPoint

from schemas.keyword_trend import TrendingKeywordRead

def get_trending_keywords(db, limit=10):
    # 取得 [(keyword, total), ...]
    #熱門關鍵字排行
    rows = (
        db.query(
            KeywordTrend.keyword,
            func.sum(KeywordTrend.frequency).label("total")
        )
        .group_by(KeywordTrend.keyword)
        .order_by(func.sum(KeywordTrend.frequency).desc())
        .limit(limit)
        .all()
    )
    return [TrendingKeywordRead(keyword=row[0], total=row[1]) for row in rows]


def get_keyword_heatmap(db, keyword: str):
    
    #某關鍵字的時間熱度趨勢
    def fetch(days):
        since = datetime.utcnow() - timedelta(days=days)
        rows = (
            db.query(
                func.date(KeywordTrend.captured_at).label("date"),
                func.sum(KeywordTrend.frequency).label("value")
            )
            .filter(KeywordTrend.keyword == keyword)
            .filter(KeywordTrend.captured_at >= since)
            .group_by("date")
            .order_by("date")
            .all()
        )
        return [GrowthPoint(date=row[0], value=row[1]) for row in rows]

    return KeywordGrowthRead(
        keyword=keyword,
        growth_7d=fetch(7),
        growth_30d=fetch(30)
    )

