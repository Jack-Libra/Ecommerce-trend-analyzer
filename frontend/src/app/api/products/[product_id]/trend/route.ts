import { NextRequest, NextResponse } from 'next/server';

// 商品價格快照（折線圖）
export async function GET(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${product_id}/trend`);
  const data = await res.json();
  return NextResponse.json(data);
}
