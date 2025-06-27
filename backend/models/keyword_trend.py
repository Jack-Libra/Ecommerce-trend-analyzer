from sqlalchemy import (
    Column, String, Integer, Float, ForeignKey, DateTime, BigInteger
)
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func


from models import Base

# 關鍵字趨勢資料表
class KeywordTrend(Base):
    __tablename__ = "keyword_trends"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    keyword = Column(String, index=True)
    platform_id = Column(String, ForeignKey("platforms.id"))
    search_volume = Column(Integer)
    rank = Column(Integer)
    recorded_at = Column(DateTime(timezone=True), default=func.now())

    platform = relationship("Platform")