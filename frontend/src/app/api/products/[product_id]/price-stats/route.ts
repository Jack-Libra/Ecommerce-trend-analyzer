import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    product_id: string;
  };
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 商品價格統計（最高、最低、平均）
export async function GET(req: NextRequest, context: Context) {
  const { product_id } = context.params;
  const { data, error } = await supabase.from('product_price_stats').select('*').eq('product_id', product_id).single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
