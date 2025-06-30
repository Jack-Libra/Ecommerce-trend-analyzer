// components/ProductReviewTrendChart.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export interface ReviewTrendPoint {
  date: string;
  [productName: string]: string | number;
}

export default function ProductReviewTrendChart({ data = [], products = [] }: { data?: ReviewTrendPoint[]; products: string[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full" style={{ height: 320 }}>
      <h2 className="text-lg font-bold mb-4">熱度變化趨勢圖</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {products.map((name, idx) => (
            <Line key={name} type="monotone" dataKey={name} stroke={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
