import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 商品價格趨勢分析（折線圖）
export async function GET(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const { data, error } = await supabase.from('product_price_trends').select('*').eq('product_id', product_id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
