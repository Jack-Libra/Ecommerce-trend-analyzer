import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { category_id: string } }) {
  const { category_id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${category_id}`);
  const data = await res.json();
  return NextResponse.json(data);
}
