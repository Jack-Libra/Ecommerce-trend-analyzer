# backend/schemas/product.py
from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    platform_id: str
    product_code: Optional[str]
    title: Optional[str]
    category_id: Optional[str]
    url: Optional[str]
    image_url: Optional[str]

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True
