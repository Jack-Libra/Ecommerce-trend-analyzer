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
