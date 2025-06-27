// components/CategoryBarChart.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CategoryData {
  category: string;
  count7: number;
  count30: number;
}

export function CategoryBarChart({ data }: { data: CategoryData[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">商品分類趨勢</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count7" fill="#82ca9d" name="近 7 天" />
          <Bar dataKey="count30" fill="#8884d8" name="近 30 天" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}



/* import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface CategoryBarChartProps {
  data: { category: string; growth: number }[];
}

const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="growth" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default CategoryBarChart; */