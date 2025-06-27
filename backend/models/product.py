from sqlalchemy import Column, BigInteger, String, Numeric, Text, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
from .platform import Platform
from .categories import Category
from .product_snapshots import ProductSnapshot


from models import Base


# 商品主表
class Product(Base):
    __tablename__ = "products"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    platform_id = Column(String, ForeignKey("platforms.id"))
    product_code = Column(String)
    title = Column(Text)
    category_id = Column(String, ForeignKey("categories.id"))
    url = Column(Text)
    image_url = Column(Text)


    platform = relationship("Platform", back_populates="products")
    category = relationship("Category", back_populates="products")
    snapshots = relationship("ProductSnapshot", back_populates="product")
