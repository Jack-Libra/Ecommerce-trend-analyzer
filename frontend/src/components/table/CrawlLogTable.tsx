// 此檔案已拆分為 CrawlLogTable.tsx, ProductTable.tsx, KeywordManager.tsx, TriggerButton.tsx，請改用分離檔案。
throw new Error("This file is deprecated. Use the new split component files。");

// import { Table } from "@/components/ui/table";

// 將 Table 替換為原生 table
export interface CrawlLog {
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
      <table className="w-full">
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
      </table>
    </div>
  );
}
