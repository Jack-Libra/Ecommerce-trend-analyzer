import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { Product } from '@/types/product';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('latest_product_snapshots') // 從 latest_product_snapshots 表格取得資料
    .select('*,products(title,platform_id,category_id,url,image_url)') // 加入 url, image_url 欄位
    .order('score', { ascending: false })
    .limit(10);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // 轉換格式，讓前端 mapProductForFrontend 能正確取得名稱與圖片
  const mapped = (data ?? []).map((item): Product => ({
    id: item.product_id, // 以 product_id 作為商品 id
    title: item.products?.title ?? '',
    platform_id: item.products?.platform_id ?? '',
    category_id: item.products?.category_id ?? '',
    url: item.products?.url ?? item.url ?? null,
    image_url: item.products?.image_url ?? item.image_url ?? undefined,
    price: item.price ?? 0,
    score: item.score ?? 0,
    // 其餘欄位可依需要補上
  }));
  return NextResponse.json(mapped);
}
