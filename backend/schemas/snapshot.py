from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SnapshotBase(BaseModel):
    product_id: int
    price: Optional[float]
    rating: Optional[float]
    review_count: Optional[int]
    rank: Optional[int]
    created_at: Optional[datetime]
    captured_at: Optional[datetime]

class SnapshotCreate(SnapshotBase):
    pass

class SnapshotUpdate(SnapshotBase):
    pass

class SnapshotRead(SnapshotBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True