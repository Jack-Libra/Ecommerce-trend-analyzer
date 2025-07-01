import { NextRequest, NextResponse } from 'next/server';

// 單一商品詳細
export async function GET(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${product_id}`);
  const data = await res.json();
  return NextResponse.json(data);
}

// 商品更新
export async function PUT(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const body = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${product_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

// 商品刪除
export async function DELETE(req: NextRequest, { params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${product_id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return NextResponse.json(data);
}
