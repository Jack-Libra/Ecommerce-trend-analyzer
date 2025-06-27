from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URL
from typing import AsyncGenerator, cast

# 額外型別保證，讓型別檢查器知道這裡一定是 str
DATABASE_URL = cast(str, DATABASE_URL)

# 建立 async SQLAlchemy engine
engine = create_async_engine(DATABASE_URL, echo=True)

# 建立 session factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autoflush=False,
    expire_on_commit=False
)

# 依需求建立 get_db 依賴
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session