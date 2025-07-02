import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const search = req.nextUrl.search ? req.nextUrl.search : "";
  const url = `${baseUrl}/snapshots${search}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    return new Response("後端快照 API 失敗", { status: 500 });
  }
  const data = await res.json();
  return Response.json(data);
}
