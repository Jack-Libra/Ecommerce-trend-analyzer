// components/CrawlLogTable.tsx
"use client";

import { Table } from "@/components/ui/table";

interface CrawlLog {
  id: number;
  platform: string;
  status: string;
  started_at: string;
  ended_at: string;
  message: string;
}

export default function CrawlLogTable({ data }: { data: CrawlLog[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">爬蟲日誌</h2>
      <Table>
        <thead>
          <tr>
            <th>平台</th>
            <th>狀態</th>
            <th>開始時間</th>
            <th>結束時間</th>
            <th>訊息</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log) => (
            <tr key={log.id}>
              <td>{log.platform}</td>
              <td>{log.status}</td>
              <td>{log.started_at}</td>
              <td>{log.ended_at}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

// components/ProductTable.tsx
"use client";

import { Table } from "@/components/ui/table";

interface Product {
  id: number;
  name: string;
  platform: string;
  category: string;
  price: number;
}

export default function ProductTable({ data }: { data: Product[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">商品資料表</h2>
      <Table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>平台</th>
            <th>分類</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.platform}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

// components/KeywordManager.tsx
"use client";

import { useState } from "react";

export default function KeywordManager({ keywords }: { keywords: string[] }) {
  const [list, setList] = useState<string[]>(keywords);
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    if (newKeyword.trim() && !list.includes(newKeyword)) {
      setList([...list, newKeyword]);
      setNewKeyword("");
    }
  };

  const deleteKeyword = (kw: string) => {
    setList(list.filter((k) => k !== kw));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">關鍵字管理</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="新增關鍵字"
        />
        <button onClick={addKeyword} className="bg-blue-600 text-white px-4 py-2 rounded">
          新增
        </button>
      </div>
      <ul className="space-y-2">
        {list.map((kw) => (
          <li key={kw} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
            <span>{kw}</span>
            <button onClick={() => deleteKeyword(kw)} className="text-red-500">刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// components/TriggerButton.tsx
"use client";

export default function TriggerButton({ onTrigger }: { onTrigger: () => void }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4">手動觸發爬蟲任務</h2>
      <button onClick={onTrigger} className="bg-green-600 text-white px-4 py-2 rounded">
        立即觸發
      </button>
    </div>
  );
}
