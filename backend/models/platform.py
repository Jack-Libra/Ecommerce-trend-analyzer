from sqlalchemy import (
    Column, String, Integer, Float, ForeignKey, DateTime, Numeric, Text, BigInteger
)
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
import uuid


from models import Base

# 平台表
class Platform(Base):
    __tablename__ = "platforms"

    id = Column(String, primary_key=True)  # e.g. "momo", "shopee"
    name = Column(String)
    logo_url = Column(String)

    products = relationship("Product", back_populates="platform")