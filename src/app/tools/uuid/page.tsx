'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

function generateUUIDs(count: number): string[] {
  return Array.from({ length: count }, () => crypto.randomUUID());
}

export default function UUIDPage() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    setUuids(generateUUIDs(Math.min(count, 50)));
    setCopied(null);
  };

  const copyOne = async (uuid: string, i: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="tool-container">
      <h1 className="tool-title">🆔 UUID 生成器</h1>
      <p className="tool-subtitle">在线批量生成 UUID v4，开发者必备工具</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              生成数量: <span className="text-red-600 font-bold">{count}</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>1</span><span>50</span>
            </div>
          </div>
          <button onClick={generate} className="btn-primary w-full text-lg py-4">
            🎲 生成 UUID{count > 1 ? ` ×${count}` : ''}
          </button>
        </div>

        {uuids.length > 0 && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">结果 ({uuids.length})</span>
              <div className="flex gap-2">
                <button onClick={copyAll} className="text-xs text-red-600 hover:text-red-700">
                  {copied === -1 ? '✅ 已复制' : '📋 一键复制全部'}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              {uuids.map((uuid, i) => (
                <div
                  key={i}
                  onClick={() => copyOne(uuid, i)}
                  className="bg-gray-50 rounded-lg px-3 py-2.5 text-sm font-mono text-gray-700 cursor-pointer hover:bg-red-50 hover:text-red-700 transition-colors select-all flex items-center justify-between group"
                >
                  <span className="break-all">{uuid}</span>
                  <span className="text-xs text-gray-300 group-hover:text-red-400 ml-2 shrink-0">
                    {copied === i ? '✅' : '📋'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
