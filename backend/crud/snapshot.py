from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import ProductSnapshot
from schemas.snapshot import SnapshotCreate, SnapshotUpdate

# CRUD operations for ProductSnapshot
# This module provides functions to create, read, update, and delete product snapshots.
async def get_snapshot(db: AsyncSession, snapshot_id: int):
    result = await db.execute(select(ProductSnapshot).where(ProductSnapshot.id == snapshot_id))
    return result.scalar_one_or_none()

# Get all snapshots for a specific product with pagination support
async def get_snapshots(db: AsyncSession, product_id: int,skip: int = 0, limit: int = 100):
    result = await db.execute(
        select(ProductSnapshot)
        .where(ProductSnapshot.product_id == product_id)
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

async def create_snapshot(db: AsyncSession, snapshot: SnapshotCreate):
    db_snapshot = ProductSnapshot(**snapshot.dict())
    db.add(db_snapshot)
    await db.commit()
    await db.refresh(db_snapshot)
    return db_snapshot

async def update_snapshot(db: AsyncSession, db_snapshot: ProductSnapshot, updates: SnapshotUpdate):
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(db_snapshot, key, value)
    await db.commit()
    await db.refresh(db_snapshot)
    return db_snapshot

async def delete_snapshot(db: AsyncSession, db_snapshot: ProductSnapshot):
    await db.delete(db_snapshot)
    await db.commit()