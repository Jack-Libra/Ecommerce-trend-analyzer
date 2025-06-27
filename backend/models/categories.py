from sqlalchemy import (
    Column, String, Integer, Float, ForeignKey, DateTime, Numeric, Text, BigInteger
)
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
import uuid

from models import Base

# 商品分類表
class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True)
    name = Column(String)

    products = relationship("Product", back_populates="category")