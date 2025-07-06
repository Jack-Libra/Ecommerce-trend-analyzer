// components/KeywordChart.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface KeywordChartProps {
  data: { keyword: string; count: number }[];
}

// 用於熱門關鍵字分析頁，顯示關鍵字出現次數柱狀圖
const KeywordChart: React.FC<KeywordChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">熱門關鍵字統計</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="keyword" type="category" width={100} />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KeywordChart;



/* import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface KeywordChartProps {
  data: { keyword: string; total: number }[];
}

const KeywordChart: React.FC<KeywordChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="keyword" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);

export default KeywordChart; */