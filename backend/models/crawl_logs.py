from sqlalchemy import (
    Column, String, Integer, Float, ForeignKey, DateTime, Numeric, Text, BigInteger
)
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
import uuid


from models import Base


# 爬蟲紀錄表
class CrawlLog(Base):
    __tablename__ = "crawl_logs"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    platform_id = Column(String, ForeignKey("platforms.id"))
    task_name = Column(String)
    status = Column(String)  # success, failed, timeout
    started_at = Column(DateTime(timezone=True))
    finished_at = Column(DateTime(timezone=True))
    message = Column(Text)

    platform = relationship("Platform")