// components/ProductRankingChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export interface ProductRankingData {
  name: string;
  score: number;
}

export default function ProductRankingChart({ data = [] }: { data?: ProductRankingData[] }) {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0d911", "#69c0ff"];
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full" style={{ height: 320 }}>
      <h2 className="text-lg font-bold mb-4">熱門商品排行榜</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart layout="vertical" data={data} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Bar dataKey="score" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

