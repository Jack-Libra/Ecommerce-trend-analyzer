// types/keyword.ts
export interface Keyword {
  id: number;
  keyword: string;
  platform_id: string;
  rank?: number;
  search_volume_estimate?: number;
  category_id?: string;
  recorded_at?: string;
}

export interface KeywordTrend {
  id: number;
  keyword: string;
  platform_id: string;
  search_volume?: number;
  rank?: number;
  recorded_at?: string;
}

export interface TrendingKeywordRead {
  keyword: string;
  total: number;
}

export interface GrowthPoint {
  date: string;
  value: number;
}

export interface KeywordGrowthRead {
  keyword: string;
  growth_7d: GrowthPoint[];
  growth_30d: GrowthPoint[];
}
