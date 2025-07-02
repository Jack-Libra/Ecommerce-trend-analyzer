import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const search = req.nextUrl.searchParams.toString();
  const url = search ? `${baseUrl}/snapshots?${search}` : `${baseUrl}/snapshots`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "後端快照 API 失敗" }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "快照 API 代理異常", detail: (error as Error).message }, { status: 500 });
  }
}
