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
        <BarChart layout="vertical" data={data} margin={{ top: 0, right: 20, left: 0, bottom: 5 }} barCategoryGap={5} >
          <XAxis type="number" />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={100} 
            orientation="left"
            interval={0} // 強制每個分類都顯示
            tick={props => {
              // 產品名稱顯示在 y 軸左側，間距更緊密，超過寬度自動省略
              const maxWidth = 90; // px，與 YAxis width 對齊
              const text = String(props.payload.value);
              // 建立 canvas 測量字串寬度
              if (typeof window !== 'undefined') {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.font = '13px sans-serif';
                  let display = text;
                  let i = text.length;
                  while (i > 0 && ctx.measureText(text.slice(0, i) + '...').width > maxWidth) {
                    i--;
                  }
                  display = text.slice(0, i) + '...';
                  const finalWidth = ctx.measureText(display).width; // eslint: width 改 const
                  return (
                    <text
                      x={0}
                      y={props.y}
                      textAnchor="start"
                      dominantBaseline="middle"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: 13,
                        fill: '#666',
                      }}
                    >
                      {display}
                    </text>
                  );
                }
              }
              // fallback: 只顯示前 8 字
              return (
                <text
                  x={0}
                  y={props.y}
                  textAnchor="start"
                  dominantBaseline="middle"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 13,
                    fill: '#666',
                  }}
                >
                  {text.slice(0, 8) + (text.length > 8 ? '...' : '')}
                </text>
              );
            }}
            tickLine={false}
            axisLine={true} // 顯示 y 軸線
          />
          <Tooltip 
            wrapperStyle={{ zIndex: 1000 }}
            contentStyle={{ fontSize: 13 }}
          />
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

