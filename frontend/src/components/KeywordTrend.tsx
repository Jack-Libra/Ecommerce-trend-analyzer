"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface KeywordCount {
  keyword: string;
  count: number;
}

export default function KeywordTrend({ data }: { data: KeywordCount[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">熱門關鍵字趨勢</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="keyword" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
