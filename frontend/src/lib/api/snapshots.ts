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
  const data = await res.json();
  // 強制型別轉換，確保所有欄位型別正確
  return (data ?? []).map((raw: any) => ({
    id: raw.id !== undefined && raw.id !== null ? Number(raw.id) : undefined,
    product_id: raw.product_id !== undefined && raw.product_id !== null ? Number(raw.product_id) : undefined,
    price: typeof raw.price === "string" ? parseFloat(raw.price) : raw.price,
    rating: raw.rating !== undefined && raw.rating !== null ? String(raw.rating) : undefined,
    review_count: raw.review_count !== undefined && raw.review_count !== null ? Number(raw.review_count) : undefined,
    rank: raw.rank !== undefined && raw.rank !== null ? String(raw.rank) : undefined,
    created_at: raw.created_at ? new Date(raw.created_at).toISOString() : undefined,
    captured_at: raw.captured_at ? new Date(raw.captured_at).toISOString() : undefined,
  }));
}
