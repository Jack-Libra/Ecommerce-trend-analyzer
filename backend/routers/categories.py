from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.client import get_db
from schemas.category import CategoryRead, CategoryCreate, CategoryUpdate
from crud.category import (
    get_categories,
    get_category,
    create_category,
    update_category,
    delete_category,
)

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)

@router.get("/", response_model=list[CategoryRead])
async def list_categories(db: AsyncSession = Depends(get_db)):
    return await get_categories(db)

@router.get("/{category_id}", response_model=CategoryRead)
async def read_category(category_id: str, db: AsyncSession = Depends(get_db)):
    category = await get_category(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=CategoryRead)
async def create_new_category(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
    return await create_category(db, category)

@router.put("/{category_id}", response_model=CategoryRead)
async def update_existing_category(category_id: str, updates: CategoryUpdate, db: AsyncSession = Depends(get_db)):
    db_category = await get_category(db, category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    return await update_category(db, db_category, updates)

@router.delete("/{category_id}", response_model=dict)
async def remove_category(category_id: str, db: AsyncSession = Depends(get_db)):
    db_category = await get_category(db, category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    await delete_category(db, db_category)
    return {"ok": True}