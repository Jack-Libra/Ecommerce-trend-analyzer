from pydantic import BaseModel
from typing import Optional

class CategoryBase(BaseModel):
    name: Optional[str]

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryRead(CategoryBase):
    id: str

    class Config:
        orm_mode = True
        from_attributes = True