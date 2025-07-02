// components/ProductReviewTrendChart.tsx
"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceDot } from "recharts";
import { TooltipProps } from "recharts";

export interface ReviewTrendPoint {
  date: string;
  [productName: string]: string | number;
}

function CustomTooltip({ active, payload, label, coordinate }: TooltipProps<any, string>) {
  if (!active || !payload || payload.length === 0) return null;
  // 找到與游標 y 座標最接近的 entry，若有多條線重疊則優先顯示最後一條（最上層）
  let entry = payload[0];
  if (payload.length > 1 && coordinate) {
    let minDist = Infinity;
    payload.forEach((e) => {
      // recharts Payload 沒有 tooltipPosition，這裡用 as any 兼容
      const tooltipY = (e as any).tooltipPosition?.y;
      if (typeof tooltipY === 'number' && typeof coordinate.y === 'number') {
        const dist = Math.abs(tooltipY - coordinate.y);
        if (dist < minDist || (dist === minDist && e.dataKey !== payload[0].dataKey)) {
          minDist = dist;
          entry = e;
        }
      }
    });
  }
  return (
    <div className="bg-white border rounded shadow px-2 py-1 text-xs max-w-[220px]">
      <div className="font-bold mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">日期：{label}</div>
      <div style={{ color: entry.stroke, fontWeight: 700 }} className="whitespace-nowrap overflow-hidden text-ellipsis">
        {entry.dataKey}：{entry.value}
      </div>
    </div>
  );
}

export default function ProductReviewTrendChart({ data = [], products = [] }: { data?: ReviewTrendPoint[]; products: string[] }) {
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const handleLegendClick = (o: { value: string }) => {
    setActiveLine((prev) => (prev === o.value ? null : o.value));
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full" style={{ height: 320 }}>
      <h2 className="text-lg font-bold mb-4">熱度變化趨勢圖</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontWeight: activeLine ? 700 : 400, fill: activeLine ? '#000' : undefined }} />
          <YAxis allowDecimals={false} tick={{ fontWeight: activeLine ? 700 : 400, fill: activeLine ? '#000' : undefined }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend onClick={handleLegendClick} />
          {products.map((name, idx) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]}
              strokeWidth={2}
              dot={false}
              hide={activeLine !== null && activeLine !== name}
              activeDot={{ r: 6, stroke: '#000', strokeWidth: 2, fill: ["#8884d8", "#82ca9d", "#ffc658"][idx % 3] }}
            />
          ))}
          {/* 高亮交點 */}
          {activeLine && data.map((d, i) =>
            d[activeLine] !== undefined ? (
              <ReferenceDot
                key={i}
                x={d.date}
                y={d[activeLine] as number}
                r={7}
                fill="#fff"
                stroke="#000"
                strokeWidth={2}
                isFront
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
