// lib/api/products.ts
import type {
  Product,
  ProductSnapshot,
  ProductDetail,
  PriceTrendRead,
  PriceStatsRead,
  PriceOutlierRead,
} from "@/types/product";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// 單一商品價格快照（折線圖）
export async function fetchProductTrend(id: number): Promise<ProductSnapshot[]> {
  const res = await fetch(`${BASE_URL}/products/${id}/trend`);
  if (!res.ok) throw new Error("無法取得商品趨勢");
  return res.json();
}

// 商品詳細資料
export async function fetchProductDetail(id: number): Promise<ProductDetail> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("無法取得商品資料");
  return res.json();
}

// 價格趨勢分析（折線圖）
export async function fetchPriceTrend(id: number): Promise<PriceTrendRead> {
  const res = await fetch(`${BASE_URL}/products/${id}/price-trend`);
  if (!res.ok) throw new Error("無法取得價格趨勢");
  return res.json();
}

// 價格統計（最高、最低、平均）
export async function fetchPriceStats(id: number): Promise<PriceStatsRead> {
  const res = await fetch(`${BASE_URL}/products/${id}/price-stats`);
  if (!res.ok) throw new Error("無法取得價格統計");
  return res.json();
}

// 價格異常波動
export async function fetchPriceOutliers(id: number): Promise<PriceOutlierRead> {
  const res = await fetch(`${BASE_URL}/products/${id}/price-outliers`);
  if (!res.ok) throw new Error("無法取得價格異常");
  return res.json();
}

// 熱門商品排行榜
export async function fetchTopProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/top`);
  if (!res.ok) throw new Error("無法取得熱門商品排行榜");
  return res.json();
}

// 快速成長商品排行榜
export async function fetchFastestGrowingProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/fastest-growing`);
  if (!res.ok) throw new Error("無法取得快速成長商品排行榜");
  return res.json();
}




