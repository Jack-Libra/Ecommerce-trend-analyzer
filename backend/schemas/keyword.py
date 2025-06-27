from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class KeywordBase(BaseModel):
    platform_id: str
    keyword: str
    rank: Optional[int]
    search_volume_estimate: Optional[int]
    category_id: Optional[str]
    recorded_at: Optional[datetime]

class KeywordCreate(KeywordBase):
    pass

class KeywordUpdate(KeywordBase):
    pass

class KeywordRead(KeywordBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True