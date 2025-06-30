from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession #db: AsyncSession接收非同步資料庫連線(接return await)
from sqlalchemy.orm import Session #db: Session接收同步資料庫連線(接return)
from database.client import get_db

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

# 從schemas模組導入相關資料模型
from schemas.price_services import PriceTrendRead,PriceStatsRead,PriceOutlierRead 
from schemas.product import ProductRead, ProductCreate, ProductUpdate
from schemas.snapshot import SnapshotRead

# 從crud模組導入相關函式
# CRUD operations for Product
# 這裡使用了非同步資料庫連線，因為CRUD函式是非同步函式
# 如果你使用的是同步資料庫連線，則需要將這些CRUD函式改為同步版本
# 例如：get_products(db: Session, skip: int = 0, limit: int = 100) -> list[ProductRead]
# 並且在路由裝飾器中使用Depends(get_db)來獲取同步資料庫連線
# 例如：db: Session = Depends(get_db)
from crud.product import (
    get_products,
    get_product,
    create_product,
    update_product,
    delete_product,)
from crud.snapshot import get_snapshots

# 從services模組導入相關函式
# 服務模組包含了業務邏輯，這些函式通常會調用CRUD函式來完成具體的操作
# 例如：get_price_trend(db: Session, product_id: int) -> PriceTrendRead
from services.trend_analysis import get_price_trend
from services.snapshot_processor import get_price_changes, detect_outliers
from services.product_rank import get_top_ranked_products, get_fastest_growing_products

# /products API
# 獲取商品列表
# 這裡使用了非同步資料庫連線，因為get_products是非同步函式
# 如果你使用的是同步資料庫連線，則需要將get_products改為同步版本
# 例如：get_products(db: Session, skip: int = 0, limit: int = 100) -> list[ProductRead]
# 並且在路由裝飾器中使用Depends(get_db)來獲取同步資料庫連線
# 例如：db: Session = Depends(get_db)
@router.get("/", response_model=list[ProductRead])
async def list_products(db: AsyncSession = Depends(get_db)):
    return await get_products(db)

#  /products/top API
# 獲取熱門商品列表
# 這裡使用了非同步資料庫連線，因為get_top_ranked_products是非同步函式
# 如果你使用的是同步資料庫連線，則需要將get_top_ranked_products改為同步版本
# 例如：get_top_ranked_products(db: Session) -> list[ProductRead]
@router.get("/top", response_model=list[ProductRead])
async def top_products(db: AsyncSession = Depends(get_db)):
    return await get_top_ranked_products(db)

# /products/fastest-growing API
# 獲取快速增長的商品列表
# 這裡使用了同步資料庫連線，因為get_fastest_growing_products是同步函式
# 如果你使用的是非同步資料庫連線，則需要將get_fastest_growing_products改為非同步版本
# 例如：async def get_fastest_growing_products(db: AsyncSession, days: int = 7, limit: int = 10) -> list[ProductRead]
# 並且在路由裝飾器中使用Depends(get_db)來獲取非同步資料庫連線
# 例如：db: AsyncSession = Depends(get_db)
@router.get("/fastest-growing", response_model=list[ProductRead])
async def fastest_growing(db:Session = Depends(get_db)):
    return get_fastest_growing_products(db)

# 下面是動態參數路由
# /products/{product_id} API
# 獲取單個商品詳細資訊
# 這裡使用了非同步資料庫連線，因為get_product是非同步函式
# 如果你使用的是同步資料庫連線，則需要將get_product改為同步版本
# 例如：get_product(db: Session, product_id: int) -> ProductRead
@router.get("/{product_id}", response_model=ProductRead)
async def read_product(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# /products API
# 創建新商品
# 這裡使用了非同步資料庫連線，因為create_product是非同步函式
# 如果你使用的是同步資料庫連線，則需要將create_product改為同步版本
# 例如：create_product(db: Session, product: ProductCreate) -> ProductRead
@router.post("/", response_model=ProductRead)
async def create_new_product(product: ProductCreate, db: AsyncSession = Depends(get_db)):
    return await create_product(db, product)

# /products/{product_id} API
# 更新現有商品
# 這裡使用了非同步資料庫連線，因為update_product是非同步函式
# 如果你使用的是同步資料庫連線，則需要將update_product改為同步版本
# 例如：update_product(db: Session, db_product: Product, updates: ProductUpdate ) -> ProductRead
@router.put("/{product_id}", response_model=ProductRead)
async def update_existing_product(product_id: int, updates: ProductUpdate, db: AsyncSession = Depends(get_db)):
    db_product = await get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return await update_product(db, db_product, updates)

# /products/{product_id} API
# 刪除商品
# 這裡使用了非同步資料庫連線，因為delete_product是非同步函式
# 如果你使用的是同步資料庫連線，則需要將delete_product改為同步版本
# 例如：delete_product(db: Session, db_product: Product) -> None  
@router.delete("/{product_id}", response_model=dict)
async def remove_product(product_id: int, db: AsyncSession = Depends(get_db)):
    db_product = await get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    await delete_product(db, db_product)
    return {"ok": True}

# /products/{product_id}/trend API
# 獲取商品價格趨勢快照
# 這裡使用了非同步資料庫連線，因為get_snapshots是非同步函式
# 如果你使用的是同步資料庫連線，則需要將get_snapshots改為同步版本
# 例如：get_snapshots(db: Session, product_id: int, skip: int = 0, limit: int = 100) -> list[SnapshotRead]
@router.get("/{product_id}/trend", response_model=list[SnapshotRead])
async def get_product_trend(product_id: int, db: AsyncSession = Depends(get_db)):
    return await get_snapshots(db, product_id=product_id)


# 價格趨勢分析（折線圖） # 不await同步函式，直接呼叫
# 這裡使用了同步資料庫連線，因為get_price_trend是同步函式
# 如果你使用的是非同步資料庫連線，則需要將get_price_trend改為非同步版本
# 例如：async def get_price_trend(db: AsyncSession, product_id: int) -> PriceTrendRead
@router.get("/{product_id}/price-trend", response_model=PriceTrendRead)
async def price_trend(product_id: int, db: Session = Depends(get_db)):
    return get_price_trend(db, product_id)

# 價格統計（最高、最低、平均價格）
# 這裡使用了同步資料庫連線，因為get_price_changes是同步函式
# 如果你使用的是非同步資料庫連線，則需要將get_price_changes改為非同步版本
# 例如：async def get_price_changes(db: AsyncSession, product_id: int) -> PriceStatsRead
@router.get("/{product_id}/price-stats", response_model=PriceStatsRead)
async def price_stats(product_id: int, db: Session = Depends(get_db)):
    return get_price_changes(db, product_id)

# 價格異常波動（標準差檢測）
# 這裡使用了同步資料庫連線，因為detect_outliers是同步函式
# 如果你使用的是非同步資料庫連線，則需要將detect_outliers改為非同步版本
# 例如：async def detect_outliers(db: AsyncSession, product_id: int) -> PriceOutlierRead
@router.get("/{product_id}/price-outliers", response_model=PriceOutlierRead)
async def price_outliers(product_id: int, db:Session = Depends(get_db)):
    return detect_outliers(db, product_id)
