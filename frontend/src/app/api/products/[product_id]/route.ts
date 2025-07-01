import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 查詢單一商品
export async function GET(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const { data, error } = await supabase.from('products').select('*').eq('id', product_id).single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// 更新商品
export async function PUT(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const body = await req.json();
  const { data, error } = await supabase.from('products').update(body).eq('id', product_id).select().single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// 刪除商品
export async function DELETE(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const { error } = await supabase.from('products').delete().eq('id', product_id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
