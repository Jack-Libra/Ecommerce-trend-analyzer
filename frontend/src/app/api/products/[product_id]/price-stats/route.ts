import { NextRequest, NextResponse } from 'next/server';

// 商品價格統計（最高、最低、平均）
export async function GET(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${product_id}/price-stats`);
  const data = await res.json();
  return NextResponse.json(data);
}
