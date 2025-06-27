// components/TrendChart.tsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface TrendChartProps {
  data: { date: string; price: number }[];
}

// 用於單一商品分析頁，顯示價格趨勢折線圖
const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">價格趨勢</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;

/* import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface TrendChartProps {
  data: { day: string; avg_price: number }[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="avg_price" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

export default TrendChart; */