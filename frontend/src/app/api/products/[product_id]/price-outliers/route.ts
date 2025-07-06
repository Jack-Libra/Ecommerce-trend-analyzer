import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 商品價格異常波動
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const product_id = url.pathname.split('/').pop();
  const { data, error } = await supabase.from('product_price_outliers').select('*').eq('product_id', product_id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
