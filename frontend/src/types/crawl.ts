// types/crawl.ts
export interface CrawlLog {
  id: number;
  platform: string;
  status: string;
  started_at: string;
  ended_at: string;
  message: string;
}