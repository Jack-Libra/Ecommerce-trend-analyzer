// components/ProductCard.tsx
import React from "react";

const ProductCard: React.FC<any> = ({ name, price, platform, avgPrice }) => {
  return (
    <div className="border p-4 rounded-xl shadow bg-white">
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <p className="text-sm text-gray-600">平台：{platform}</p>
      <p className="text-blue-600 font-bold text-lg mt-1">${price}</p>
      {avgPrice !== undefined && (
        <p className="text-xs text-gray-400">平均價格：${avgPrice.toFixed(2)}</p>
      )}
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