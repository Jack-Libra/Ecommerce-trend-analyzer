from sqlalchemy import (
    Column, String, Integer, Float, ForeignKey, DateTime, Numeric, Text, BigInteger
)
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
import uuid


from models import Base

# 熱門關鍵字資料表
class HotKeyword(Base):
    __tablename__ = "hot_keywords"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    platform_id = Column(String, ForeignKey("platforms.id"))
    keyword = Column(String)
    rank = Column(Integer)
    search_volume_estimate = Column(Integer)
    category_id = Column(String, ForeignKey("categories.id"), nullable=True)
    recorded_at = Column(DateTime(timezone=True), default=func.now())

    platform = relationship("Platform")
    category = relationship("Category")





# 錯誤日誌（可選）
#class ErrorLog(Base):
    __tablename__ = "error_logs"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    platform_id = Column(String, ForeignKey("platforms.id"))
    error_type = Column(String)
    message = Column(Text)
    created_at = Column(DateTime(timezone=True), default=func.now())

    platform = relationship("Platform")


# 資料表更新狀態（可選）
#class UpdateStatus(Base):
    __tablename__ = "update_status"

    table_name = Column(String, primary_key=True)
    last_updated = Column(DateTime(timezone=True))
    record_count = Column(Integer)
