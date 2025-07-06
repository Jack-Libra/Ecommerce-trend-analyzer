from pydantic import BaseModel
from datetime import date
from typing import List, Optional

#價格趨勢（折線圖）
class PriceTrendPoint(BaseModel):
    day: date
    avg_price: float

class PriceTrendRead(BaseModel):
    trend: List[PriceTrendPoint]

#價格統計
class PriceStatsRead(BaseModel):
    min_price: Optional[float]
    max_price: Optional[float]
    avg_price: Optional[float]

#價格異常波動
class PriceOutlierRead(BaseModel):
    outliers: List[float]

#熱門商品排行榜
class TopProductRead(BaseModel):
    pass #根據 service 回傳內容設計 