// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/cards/ProductCard";
import ProductRankingChart from "@/components/charts/ProductRankingChart";
import GrowthRadarChart from "@/components/charts/GrowthRadarChart";

import { fetchTopProducts } from "@/lib/api/product";
import type { Product, ProductSnapshot } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetchTopProducts();
        // 轉換欄位，並從 snapshots 取最新價格
        setProducts(
          data.map((item: Product) => ({
            ...item,
            name: item.title, // 給 ProductCard 用
            platform: item.platform_id,
            category: item.category_id,
            price:
              item.snapshots && item.snapshots.length > 0
                ? item.snapshots[item.snapshots.length - 1].price
                : 0,
            avgPrice:
              item.snapshots && item.snapshots.length > 0
                ? (
                    item.snapshots.reduce((sum: number, s: ProductSnapshot) => sum + (s.price || 0), 0) /
                    item.snapshots.length
                  )
                : undefined,
          }))
        );
      } catch (err) {
        console.error("載入熱門商品失敗", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 轉換成圖表需要的格式
  const rankingData = products.map((p) => ({
    name: p.name ?? p.title,
    score: p.price ?? 0,
  }));

  return (
    <div className="p-6 space-y-6 text-left">
      <h1 className="text-2xl font-bold">熱門商品排行榜</h1>

      <div className="text-left grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductRankingChart data={rankingData} />
        <GrowthRadarChart  data={[]}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>載入中...</p>
        ) : (
          products.map((product) => <ProductCard key={product.id} {...product} />)
        )}
      </div>
    </div>
  );
}





/* export default function HomePage() {
  return (
    <div>
      <h1>熱門商品排行榜</h1>
      {/* 這裡未來可放置熱門商品列表元件 */
      /* <p>這是首頁，顯示熱門商品排行榜。</p>
    </div>
  );
} */