// components/GrowthRadarChart.tsx
"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface GrowthData {
  name: string;
  search: number;
  price_drop: number;
  click_rate: number;
  sales: number;
  exposure: number;
}

export default function GrowthRadarChart({ data = [] }: { data?: GrowthData[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full" style={{ height: 320 }}>
      <h2 className="text-lg font-bold mb-4">成長最快商品雷達圖</h2>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />
          <Radar name="成長分數" dataKey="search" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
