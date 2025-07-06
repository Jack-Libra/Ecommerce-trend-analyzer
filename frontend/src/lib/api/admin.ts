// lib/api/admin.ts
import type { CrawlLog } from "@/types/crawl";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Crawl Logs (Admin) 後台爬蟲日誌
export async function fetchCrawlLogs(): Promise<CrawlLog[]> {
  const res = await fetch(`${BASE_URL}/admin/crawl-logs`);
  if (!res.ok) throw new Error("Failed to fetch crawl logs");
  return res.json();
}

// Trigger Manual Crawl 手動觸發爬蟲
export async function triggerCrawl(): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/admin/trigger`, {
    method: "POST"
  });
  if (!res.ok) throw new Error("Failed to trigger crawl");
  return res.json();
}