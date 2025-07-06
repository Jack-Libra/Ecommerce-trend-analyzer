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
