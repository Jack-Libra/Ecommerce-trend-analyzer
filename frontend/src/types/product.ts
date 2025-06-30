// types/product.ts
export interface Product {
  id: number;
  title: string; // 後端回傳 title
  platform_id: string;
  category_id: string;
  url?: string;
  image_url?: string;
  snapshots?: ProductSnapshot[]; // 新增快照欄位
  // 前端顯示用
  name?: string;
  platform?: string;
  category?: string;
  price?: number;
  avgPrice?: number;
  score?: number; // 後端回傳的熱門分數
}

export interface ProductSnapshot {
  id?: number;
  product_id?: number;
  price: number;
  rating?: string;
  review_count?: number;
  rank?: string;
  created_at?: string;
  captured_at?: string;
}

export interface ProductDetail extends Product {
  snapshots?: ProductSnapshot[];
}

export interface PriceTrendPoint {
  day: string; // ISO 日期字串
  avg_price: number;
}

export interface PriceTrendRead {
  trend: PriceTrendPoint[];
}

export interface PriceStatsRead {
  min_price: number;
  max_price: number;
  avg_price: number;
}

export interface PriceOutlierRead {
  outliers: number[];
}
