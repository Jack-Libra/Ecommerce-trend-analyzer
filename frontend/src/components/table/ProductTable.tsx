"use client";

export interface Product {
  id: number;
  name: string;
  platform: string;
  category: string;
  price: number;
}

export default function ProductTable({ data }: { data: Product[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">商品資料表</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>名稱</th>
            <th>平台</th>
            <th>分類</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.platform}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
