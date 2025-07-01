import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: 改為 fetch('https://your-fastapi-url/keywords')
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/keywords');
  const data = await res.json();
  return NextResponse.json(data);
}
