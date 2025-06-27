// lib/api/keywords.ts
import type {
  Product,
  ProductSnapshot,
  Keyword,
  CategoryStat,
  CrawlLog
} from "@/types";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Keyword Stats 熱門關鍵字分析
export async function fetchKeywordStats(): Promise<Keyword[]> {
  const res = await fetch(`${BASE_URL}/keywords/stats`);
  if (!res.ok) throw new Error("Failed to fetch keyword stats");
  return res.json();
}