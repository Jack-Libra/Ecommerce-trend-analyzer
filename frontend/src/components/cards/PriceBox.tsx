// components/PriceBox.tsx
import React from "react";

interface PriceBoxProps {
  min: number;
  max: number;
  avg: number;
}

export function PriceBox({ min, max, avg }: PriceBoxProps) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow w-full">
      <div>
        <h3 className="font-semibold text-gray-600">最低價</h3>
        <p className="text-green-600 font-bold text-lg">${min}</p>
      </div>
      <div>
        <h3 className="font-semibold text-gray-600">平均價</h3>
        <p className="text-blue-600 font-bold text-lg">${avg}</p>
      </div>
      <div>
        <h3 className="font-semibold text-gray-600">最高價</h3>
        <p className="text-red-600 font-bold text-lg">${max}</p>
      </div>
    </div>
  );
}

/* import React from "react";

export interface PriceBoxProps {
  min: number;
  max: number;
  avg: number;
}

const PriceBox: React.FC<PriceBoxProps> = ({ min, max, avg }) => (
  <div className="border rounded p-2 flex flex-col items-center">
    <div className="text-xs text-gray-500">最低</div>
    <div className="font-bold text-green-600">{min}</div>
    <div className="text-xs text-gray-500">最高</div>
    <div className="font-bold text-red-600">{max}</div>
    <div className="text-xs text-gray-500">平均</div>
    <div className="font-bold text-blue-600">{avg}</div>
  </div>
);

export default PriceBox; */