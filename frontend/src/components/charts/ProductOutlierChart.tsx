// components/ProductOutlierChart.tsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";

interface Snapshot {
  timestamp: string;
  price: number;
  isOutlier?: boolean;
}

export function ProductOutlierChart({ data }: { data: Snapshot[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">價格變動與異常點</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
          {data.map((d, i) =>
            d.isOutlier ? (
              <ReferenceDot key={i} x={d.timestamp} y={d.price} r={6} fill="red" stroke="none" />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


/*   import React from "react";
  import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Scatter } from "recharts";

  export interface ProductOutlierChartProps {
    data: { day: string; price: number; isOutlier?: boolean }[];
  }

  const ProductOutlierChart: React.FC<ProductOutlierChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <Scatter data={data.filter(d => d.isOutlier)} fill="red" />
      </LineChart>
    </ResponsiveContainer>
  );

  export default ProductOutlierChart; */
