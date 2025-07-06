from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class KeywordTrendRead(BaseModel):
    id: int
    keyword: str
    platform_id: str
    search_volume: Optional[int]
    rank: Optional[int]
    recorded_at: Optional[datetime]

    class Config:
        orm_mode = True
        from_attributes = True

class GrowthPoint(BaseModel):
    date: datetime
    value: int

class KeywordGrowthRead(BaseModel):
    keyword: str
    growth_7d: List[GrowthPoint]
    growth_30d: List[GrowthPoint]

class TrendingKeywordRead(BaseModel):
    keyword: str
    total: int