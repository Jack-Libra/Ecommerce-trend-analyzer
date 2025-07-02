import type { ProductSnapshot } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// 取得所有商品快照（可選 product_id, skip, limit）
export async function fetchSnapshots(params?: { product_id?: number; skip?: number; limit?: number }): Promise<ProductSnapshot[]> {
  const search = new URLSearchParams();
  if (params?.product_id) search.set("product_id", params.product_id.toString());
  if (params?.skip) search.set("skip", params.skip.toString());
  if (params?.limit) search.set("limit", params.limit.toString());
  const url = `${BASE_URL}/snapshots${search.toString() ? `?${search}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("無法取得商品快照");
  return res.json();
}
