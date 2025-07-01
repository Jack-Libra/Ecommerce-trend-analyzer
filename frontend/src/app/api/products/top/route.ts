import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { Product } from '@/types/product';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  // 假設 latest_product_snapshots 有 product_id 外鍵
  const { data, error } = await supabase
    .from('latest_product_snapshots')
    .select('*,products(title,platform_id,category_id)')
    .order('score', { ascending: false })
    .limit(10);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // 轉換格式，讓前端 mapProductForFrontend 能正確取得名稱
  const mapped = (data ?? []).map((item): Product => ({
    ...item,
    title: item.products?.title ?? '',
    platform_id: item.products?.platform_id ?? '',
    category_id: item.products?.category_id ?? '',
  }));
  return NextResponse.json(mapped);
}
