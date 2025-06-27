from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession #db: AsyncSession接收非同步資料庫連線(接return await)
from sqlalchemy.orm import Session #db: Session接收同步資料庫連線(接return)
from database.client import get_db

from schemas.product import ProductRead, ProductCreate, ProductUpdate
from schemas.snapshot import SnapshotRead

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

# 從crud模組導入相關函式(13-55行)
from crud.product import (
    get_products,
    get_product,
    create_product,
    update_product,
    delete_product,)
from crud.snapshot import get_snapshots

# 從services模組導入相關函式
from services.trend_analysis import get_price_trend
from services.snapshot_processor import get_price_changes, detect_outliers
from services.product_rank import get_top_ranked_products, get_fastest_growing_products

from schemas.price_services import PriceTrendRead,PriceStatsRead,PriceOutlierRead 
@router.get("/", response_model=list[ProductRead])
async def list_products(db: AsyncSession = Depends(get_db)):
    return await get_products(db)

# 固定字串路由要放前面
@router.get("/top", response_model=list[ProductRead])
async def top_products(db: AsyncSession = Depends(get_db)):
    return await get_top_ranked_products(db)

@router.get("/fastest-growing", response_model=list[ProductRead])
async def fastest_growing(db:Session = Depends(get_db)):
    return get_fastest_growing_products(db)

# 下面才是動態參數路由
@router.get("/{product_id}", response_model=ProductRead)
async def read_product(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductRead)
async def create_new_product(product: ProductCreate, db: AsyncSession = Depends(get_db)):
    return await create_product(db, product)

@router.put("/{product_id}", response_model=ProductRead)
async def update_existing_product(product_id: int, updates: ProductUpdate, db: AsyncSession = Depends(get_db)):
    db_product = await get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return await update_product(db, db_product, updates)

@router.delete("/{product_id}", response_model=dict)
async def remove_product(product_id: int, db: AsyncSession = Depends(get_db)):
    db_product = await get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    await delete_product(db, db_product)
    return {"ok": True}

@router.get("/{product_id}/trend", response_model=list[SnapshotRead])
async def get_product_trend(product_id: int, db: AsyncSession = Depends(get_db)):
    return await get_snapshots(db, product_id=product_id)




# 價格趨勢分析（折線圖） # 不await同步函式，直接呼叫
@router.get("/{product_id}/price-trend", response_model=PriceTrendRead)
async def price_trend(product_id: int, db: Session = Depends(get_db)):
    return get_price_trend(db, product_id)

# 價格統計（最高、最低、平均）
@router.get("/{product_id}/price-stats", response_model=PriceStatsRead)
async def price_stats(product_id: int, db: Session = Depends(get_db)):
    return get_price_changes(db, product_id)

# 價格異常波動（標準差檢測）
@router.get("/{product_id}/price-outliers", response_model=PriceOutlierRead)
async def price_outliers(product_id: int, db:Session = Depends(get_db)):
    return detect_outliers(db, product_id)
