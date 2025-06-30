// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";

// 引入 ProductCard 組件用於顯示商品卡片
// 引入 ProductRankingChart 組件用於顯示熱門商品排行榜
// 引入 ProductReviewTrendChart 組件用於顯示過去 7 天熱門商品的評論數變化趨勢圖
import ProductCard from "@/components/cards/ProductCard";
import ProductRankingChart from "@/components/charts/ProductRankingChart";
import ProductReviewTrendChart from "@/components/charts/ProductReviewTrendChart";

// 引入 fetchTopProducts 用於從後端 API 獲取熱門商品資料
// 引入 mapProductForFrontend 用於將後端商品資料轉換為前端需要的格式
// 引入 getReviewTrendData 用於計算過去 7 天熱門商品的評論數變化資料
import { fetchTopProducts } from "@/lib/api/product";
import {mapProductForFrontend, getReviewTrendData} from "@/lib/transform/product";

// 引入 Product 和 ProductSnapshot 類型定義
// 這些類型定義用於描述商品資料的結構，確保在使用商品資料時具有正確的類型檢查
import type { Product, ProductSnapshot } from "@/types/product";

export default function HomePage() {
  // 使用 useState 定義 products 狀態，初始為空陣列，用於存儲從後端獲取的熱門商品資料
  // 使用 useState 定義 loading 狀態，初始為 true，表示正在載入資料，用於控制載入提示的顯示
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true);

  //使用 useEffect (用於在組件掛載時)載入熱門商品資料
  // 定義一個異步函數 fetchProducts 用於載入熱門商品資料
  // fetchTopProducts 從 API 獲取熱門商品
  // mapProductForFrontend將後端資料轉換為前端需要的格式 setProducts 將轉換後的商品資料存入products 狀態
  // 如果載入失敗，清空商品列表
  //setLoading 用於控制載入狀態，初始為 true，載入完成後設為 false 如果載入失敗，則在控制台輸出錯誤信息並清空商品列表
  useEffect(() => {
    async function fetchProducts() {  
      try {
        const data = await fetchTopProducts(); 
        setProducts(data.map(mapProductForFrontend)); 
      } catch (err) {
        console.error("載入熱門商品失敗", err);
        setProducts([]); 
      } finally {
        setLoading(false);  
      }
    }
    fetchProducts(); 
  }, []);

  // 將 products 狀態中的商品資料映射為圖表需要的格式
  // 每個商品物件包含 name 和 score 屬性，name 使用商品的 name 或 title，score 使用商品的 score 屬性
  // 如果商品沒有 score，則默認為 0
  // 最後將 rankingData 傳遞給 ProductRankingChart 組件以顯示熱門商品排行榜
  const rankingData = products.map((p) => ({
    name: p.name ?? p.title,
    score: p.score ?? 0, // 直接用後端回傳的 score
  }));

  // 使用 useState 定義 reviewTrendData 狀態，初始為空陣列，用於存儲評論數變化資料
  // 使用 useState 定義 trendProducts 狀態，初始為空陣列，用於存儲過去 7 天熱門商品的名稱
  const [reviewTrendData, setReviewTrendData] = useState<any[]>([]);
  const [trendProducts, setTrendProducts] = useState<string[]>([]);


  // 使用 useEffect 在 products 狀態變化時計算評論數變化資料
  // getReviewTrendData 函數會從 products 中取得過去 7 天 top 3 熱門商品的評論數變化資料
  // 返回一個包含日期和每個商品評論數的陣列trend，以及一個包含商品名稱的陣列trendProducts
  // setReviewTrendData 將計算後的評論數變化資料存入 reviewTrendData 狀態
  // setTrendProducts 將計算後的商品名稱列表存入 trendProducts 
  // 這些資料將用於在 ProductReviewTrendChart 組件中顯示評論數變化趨勢
  useEffect(() => {
    if (products.length === 0) return;
    const { trend, trendProducts } = getReviewTrendData(products, 3); 
    setReviewTrendData(trend);
    setTrendProducts(trendProducts);
  }, [products]);


  // 返回一個包含頁面內容的 JSX 結構
  // 包含一個標題、一個商品排行榜圖表、一個熱度變化趨勢圖和一個商品卡片列表
  return (
    <div className="p-6 space-y-6 text-left">
      <h1 className="text-2xl font-bold">平台電商趨勢分析</h1>

      <div className="text-left grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductRankingChart data={rankingData} />
        <ProductReviewTrendChart data={reviewTrendData} products={trendProducts} />
      </div>
      {/* 商品卡片列表 */}
      {/* 如果 loading 狀態為 true，則顯示載入提示 */}
      {/* 否則，遍歷 products 狀態中的商品資料，為每個商品渲染一個 ProductCard 組件 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (<p>載入中...</p>) :
        (products.map((product) => <ProductCard key={product.id} {...product} />)
        )}
      </div>
    </div>
  );
}