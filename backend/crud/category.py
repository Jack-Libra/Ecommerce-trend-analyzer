from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import Category
from schemas.category import CategoryCreate, CategoryUpdate

async def get_category(db: AsyncSession, category_id: str):
    result = await db.execute(select(Category).where(Category.id == category_id))
    return result.scalar_one_or_none()

async def get_categories(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(Category).offset(skip).limit(limit))
    return result.scalars().all()

async def create_category(db: AsyncSession, category: CategoryCreate):
    db_category = Category(**category.dict())
    db.add(db_category)
    await db.commit()
    await db.refresh(db_category)
    return db_category

async def update_category(db: AsyncSession, db_category: Category, updates: CategoryUpdate):
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(db_category, key, value)
    await db.commit()
    await db.refresh(db_category)
    return db_category

async def delete_category(db: AsyncSession, db_category: Category):
    await db.delete(db_category)
    await db.commit()