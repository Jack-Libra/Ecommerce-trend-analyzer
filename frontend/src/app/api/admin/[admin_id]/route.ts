import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { admin_id: string } }) {
  const { admin_id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${admin_id}`);
  const data = await res.json();
  return NextResponse.json(data);
}
