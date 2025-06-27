from sqlalchemy import (
    Column, String, Integer, Float, ForeignKey, DateTime, Numeric, Text, BigInteger
)
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func, text
import uuid


from models import Base



# 商品快照表（歷史價格、評論、評分等）
class ProductSnapshot(Base):
    __tablename__ = "product_snapshots"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    product_id = Column(BigInteger, ForeignKey("products.id"))
    price = Column(Numeric(10, 2))
    rating = Column(String)
    review_count = Column(Integer)
    rank = Column(String)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=text('now()'))
    captured_at = Column(DateTime, nullable=False)
    product = relationship("Product", back_populates="snapshots")