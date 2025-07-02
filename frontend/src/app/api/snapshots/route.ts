import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // 建議用 API_BASE_URL，確保 server 端能正確取得
  const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const search = req.nextUrl.searchParams.toString();
  const url = `${baseUrl}/snapshots${search ? `?${search}` : ""}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    // 可依需求加上 cache 控制
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    return new Response("後端快照 API 失敗", { status: 500 });
  }
  const data = await res.json();
  return Response.json(data);
}
