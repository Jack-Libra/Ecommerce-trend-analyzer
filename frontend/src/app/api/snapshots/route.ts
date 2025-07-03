import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import type { ProductSnapshot } from "@/types/product";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 只支援單一 product_id 查詢
export async function GET(req: NextRequest) {
  // 支援查詢參數 product_id, skip, limit
  const searchParams = req.nextUrl.searchParams;
  const product_id = searchParams.get("product_id");
  const skip = searchParams.get("skip");
  const limit = searchParams.get("limit");

  let query = supabase.from("product_snapshots").select("*");
  if (product_id) query = query.eq("product_id", product_id);
  if (skip)
    query = query.range(
      Number(skip),
      Number(skip) + (limit ? Number(limit) - 1 : 99)
    );
  else if (limit) query = query.range(0, Number(limit) - 1);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // 強制型別轉換，確保 review_count 為 number，rank/rating 為 string 或 undefined
  const normalized: ProductSnapshot[] = (data ?? []).map((raw: Record<string, unknown>) => ({
    id: 
        raw.id !== undefined && raw.id !== null ? Number(raw.id) : undefined,
    product_id: 
        raw.product_id !== undefined && raw.product_id !== null ? Number(raw.product_id) : undefined,
    price: 
        typeof raw.price === "string" ? parseFloat(raw.price as string) : (raw.price as number),
    rating: 
        raw.rating !== undefined && raw.rating !== null ? String(raw.rating) : undefined,
    review_count: 
        raw.review_count !== undefined && raw.review_count !== null ? Number(raw.review_count) : undefined,
    rank: 
        raw.rank !== undefined && raw.rank !== null ? String(raw.rank) : undefined,
    created_at: 
        raw.created_at ? new Date(raw.created_at as string).toISOString() : undefined,
    captured_at: 
        raw.captured_at ? new Date(raw.captured_at as string).toISOString() : undefined,
  }));
  return NextResponse.json(normalized);
}
