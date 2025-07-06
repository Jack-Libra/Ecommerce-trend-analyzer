// lib/api/categories.ts
import type { CategoryStat } from "@/types/category";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Category Stats (7 days and 30 days) 類別分析頁
export async function fetchCategoryStats(): Promise<CategoryStat[]> {
  const res = await fetch(`${BASE_URL}/categories/stats`);
  if (!res.ok) throw new Error("Failed to fetch category stats");
  return res.json();
}