// components/ProductCard.tsx
import React from "react";
import type { Product } from "@/types/product";
import Image from 'next/image';

const ProductCard: React.FC<Product> = ({ name, price, platform, image_url }) => {
  return (
    <div className="border p-4 rounded-xl shadow bg-white">
      <Image
        src={image_url || "/placeholder.png"}
        alt={name || "商品圖片"}
        width={400}
        height={400}
        className="h-32 object-cover mt-2 rounded"
        unoptimized
      />
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <p className="text-sm text-gray-600">平台：{platform}</p>
      <p className="text-blue-600 font-bold text-lg mt-1">${price}</p>

      {/* 如果有平均價格，可以顯示 */}
      {/* {avgPrice && <p className="text-sm text-gray-500">平均價格：${avgPrice}</p>} */}
    </div>
  );
};

export default ProductCard;


/* import React from "react";

export interface ProductCardProps {
  title: string;
  imageUrl: string;
  price: number;
  rank?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imageUrl, price, rank }) => (
  <div className="border rounded p-4 flex flex-col items-center">
    <img src={imageUrl} alt={title} className="w-24 h-24 object-cover mb-2" />
    <h3 className="font-bold">{title}</h3>
    <div className="text-lg text-green-600">${price}</div>
    {rank && <div className="text-sm text-gray-500"># {rank}</div>}
  </div>
);

export default ProductCard; */