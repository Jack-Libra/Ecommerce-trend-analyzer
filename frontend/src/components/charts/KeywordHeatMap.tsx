// components/KeywordHeatMap.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface KeywordData {
  keyword: string;
  count: number;
}

export function KeywordHeatMap({ data }: { data: KeywordData[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">熱門關鍵字</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" />
          <YAxis dataKey="keyword" type="category" width={100} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}



/* import React from "react";
// 這裡可用第三方 heatmap/radar 圖表套件，如 react-heatmap-grid 或 echarts-for-react

export interface KeywordHeatMapProps {
  data: { keyword: string; date: string; value: number }[];
}

const KeywordHeatMap: React.FC<KeywordHeatMapProps> = ({ data }) => (
  <div>
    {/* TODO: 實作熱力圖，可用第三方元件 */
   /*  <div>Heatmap Chart Placeholder</div>
  </div>
);

export default KeywordHeatMap; */ 