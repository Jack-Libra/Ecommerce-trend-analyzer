import type { Product } from "@/types/product";

// 將 API 回傳的 Product 轉換成前端顯示用 Product 型別
export function mapProductForFrontend(item: Product): Product {
  return {
    ...item,
    name: item.title,
    platform: item.platform_id,
    category: item.category_id,
    price: item.price ?? 0, // 直接取最新快照表的 price 欄位
    avgPrice: undefined, // 若有需要可再計算
  };
}

// 取得過去 7 天 top N 熱門商品的評論數變化資料
export function getReviewTrendData(products: any[], topN: number = 3) {
  const top = products.slice(0, topN);
  const trendProducts = top.map((p) => p.name ?? p.title);
  const allDates = Array.from(
    new Set(
      top.flatMap((p) =>
        (p.snapshots || []).map((s: any) => s.captured_at?.slice(0, 10))
      )
    )
  ).sort();
  const trend: any[] = allDates.map((date) => {
    const row: any = { date };
    top.forEach((p) => {
      const snap = (p.snapshots || []).find((s: any) => s.captured_at?.slice(0, 10) === date);
      row[p.name ?? p.title] = snap?.review_count ?? 0;
    });
    return row;
  });
  return { trend, trendProducts };
}