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
  // 確保 id 全為 number
  const topProductIds = products.slice(0, topN).map((p) => Number(p.id));
  const productIdToName: Record<number, string> = {};
  products.forEach((p) => {
    if ((p.id !== undefined && p.id !== null) && (p.name || p.title))
      productIdToName[Number(p.id)] = p.name ?? p.title;
  });
  const filteredSnapshots = snapshots.filter((s) =>
    s.product_id !== undefined && s.product_id !== null &&
    topProductIds.includes(Number(s.product_id))
  );
  const today = new Date();
  const lastNDays = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - (days - 1 - i));
  return d.toISOString().slice(0, 10); // UTC 時間一致
  });
  const trend: ReviewTrendPoint[] = lastNDays.map((date) => {
    const row: ReviewTrendPoint = { date };
    topProductIds.forEach((pid) => {
      const name = productIdToName[pid] || String(pid);
      const snap = filteredSnapshots.find(
        (s) => {
          if (Number(s.product_id) !== pid) return false;
          if (!s.captured_at) return false;
          // 直接用 slice(0, 10) 比對，避免時區誤差
          const snapDateStr = s.captured_at.slice(0, 10);
          return snapDateStr === date;
        }
      );
      row[name] = snap?.review_count ?? 0;
    });
    return row;
  });
  const trendProducts = topProductIds.map(
    (pid) => productIdToName[pid] || String(pid)
  );
  // 新增 log 方便前端檢查
  // eslint-disable-next-line no-console
  console.log("[ReviewTrend] trend", trend);
  // eslint-disable-next-line no-console
  console.log("[ReviewTrend] trendProducts", trendProducts);
  // eslint-disable-next-line no-console
  console.log("[ReviewTrend] filteredSnapshots", filteredSnapshots);
  // eslint-disable-next-line no-console
  console.log("[ReviewTrend] all snapshots", snapshots);
  // eslint-disable-next-line no-console
  console.log("[ReviewTrend] topProductIds", topProductIds);
  // eslint-disable-next-line no-console
  console.log("[ReviewTrend] productIdToName", productIdToName);
  // eslint-disable-next-line no-console
  console.log("[ReviewTrend] lastNDays", lastNDays);
  // eslint-disable-next-line no-console
  if (filteredSnapshots.length > 0) {
    filteredSnapshots.forEach(s => {
      console.log("[ReviewTrend] filtered captured_at", s.captured_at, s.product_id, s.review_count);
    });
  }
  return { trend, trendProducts };
  
}
