import type { Product, ProductSnapshot } from "@/types/product";
import type { ReviewTrendPoint } from "@/components/charts/ProductReviewTrendChart";

// 將 API 回傳的 Product 轉換成前端顯示用 Product 型別
export function mapProductForFrontend(item: Product): Product {
  return {
    ...item,
    name: item.name ?? item.title ?? "",
    platform: item.platform ?? item.platform_id ?? "",
    category: item.category ?? item.category_id ?? "",
    price: item.price ?? 0, // 直接取最新快照表的 price 欄位
    avgPrice: undefined, // 若有需要可再計算
    score: item.score,
  };
}

// 取得過去 7 天 top N 熱門商品的評論數變化資料
export function getReviewTrendData(
  products: Product[],
  topN: number = 3
): { trend: Record<string, number | string>[]; trendProducts: string[] } {
  const top = products.slice(0, topN);
  const trendProducts = top.map((p) => (p.name ?? p.title) || "");
  const allDates = Array.from(
    new Set(
      top.flatMap((p) =>
        (p.snapshots || []).map((s) => s.captured_at?.slice(0, 10) || "")
      )
    )
  )
    .filter(Boolean)
    .sort();
  const trend: Record<string, number | string>[] = allDates.map((date) => {
    const row: Record<string, number | string> = { date };
    top.forEach((p) => {
      const snap = (p.snapshots || []).find(
        (s) => (s.captured_at?.slice(0, 10) || "") === date
      );
      row[(p.name ?? p.title) || ""] = snap?.review_count ?? 0;
    });
    return row;
  });
  return { trend, trendProducts };
}

// 依 snapshots 與排行榜前N商品產生 ReviewTrendPoint[]
export function getReviewTrendDataFromSnapshots(
  products: Product[],
  snapshots: ProductSnapshot[],
  days: number = 7,
  topN: number = 3
): { trend: ReviewTrendPoint[]; trendProducts: string[] } {
  const topProductIds = products.slice(0, topN).map((p) => p.id);
  const productIdToName: Record<number, string> = {};
  products.forEach((p) => {
    if (typeof p.id === "number" && (p.name || p.title))
      productIdToName[p.id] = p.name ?? p.title;
  });
  const filteredSnapshots = snapshots.filter((s) =>
    s.product_id && topProductIds.includes(s.product_id)
  );
  const today = new Date();
  const lastNDays = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    return d.toISOString().slice(0, 10);
  });
  const trend: ReviewTrendPoint[] = lastNDays.map((date) => {
    const row: ReviewTrendPoint = { date };
    topProductIds.forEach((pid) => {
      const name = productIdToName[pid] || String(pid);
      const snap = filteredSnapshots.find(
        (s) =>
          s.product_id === pid &&
          (s.captured_at?.slice(0, 10) || "") === date
      );
      row[name] = snap?.review_count ?? 0;
    });
    return row;
  });
  const trendProducts = topProductIds.map(
    (pid) => productIdToName[pid] || String(pid)
  );
  return { trend, trendProducts };
}