from sqlalchemy.orm import declarative_base

Base = declarative_base()

from .product import Product
from .categories import Category
from .platform import Platform
from .keywords import HotKeyword
from .product_snapshots import ProductSnapshot, LatestProductSnapshot 
from .crawl_logs import CrawlLog
from .keyword_trend import KeywordTrend