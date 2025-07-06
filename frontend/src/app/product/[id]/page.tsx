"use client";
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  // Next.js app router 可用 useParams 取得動態參數
  const params = useParams();
  return (
    <div>
      <h1>單一商品分析頁</h1>
      <p>商品 ID：{params?.id}</p>
      {/* 這裡未來可放置商品分析元件 */}
    </div>
  );
}