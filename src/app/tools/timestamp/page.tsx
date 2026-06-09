'use client';

import { useState, useEffect } from 'react';
import AdBanner from '@/components/AdBanner';

export default function TimestampPage() {
  const [now, setNow] = useState(Date.now());
  const [tsInput, setTsInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [result, setResult] = useState('');
  const [unit, setUnit] = useState<'s' | 'ms'>('s');

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tsToDate = () => {
    const ts = unit === 's' ? Number(tsInput) * 1000 : Number(tsInput);
    if (!ts) { setResult('请输入有效的时间戳'); return; }
    const d = new Date(ts);
    setResult(d.toLocaleString('zh-CN', { hour12: false }));
  };

  const dateToTs = () => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) { setResult('请输入有效的日期时间'); return; }
    setResult(unit === 's' ? String(Math.floor(d.getTime() / 1000)) : String(d.getTime()));
  };

  const copy = () => navigator.clipboard.writeText(result);

  return (
    <div className="tool-container">
      <h1 className="tool-title">⏱️ 时间戳转换</h1>
      <p className="tool-subtitle">Unix时间戳 ↔ 日期时间 在线互转</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        {/* 当前时间戳 */}
        <div className="card text-center">
          <p className="text-sm text-gray-400 mb-2">当前时间戳</p>
          <p className="text-2xl font-mono font-bold text-gray-800 select-all">
            {Math.floor(now / 1000)}
          </p>
          <p className="text-xs text-gray-400 mt-1">秒 (10位)</p>
          <p className="text-lg font-mono text-gray-600 select-all mt-2">{now}</p>
          <p className="text-xs text-gray-400">毫秒 (13位)</p>
        </div>

        {/* 精度选择 */}
        <div className="flex gap-2 justify-center">
          {(['s', 'ms'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                unit === u ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {u === 's' ? '秒 (10位)' : '毫秒 (13位)'}
            </button>
          ))}
        </div>

        {/* 时间戳 → 日期 */}
        <div className="card space-y-3">
          <h3 className="text-sm font-medium text-gray-700">时间戳 → 日期</h3>
          <input
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder={unit === 's' ? '例如: 1700000000' : '例如: 1700000000000'}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none font-mono text-sm"
          />
          <button onClick={tsToDate} className="btn-primary w-full">转换为日期</button>
        </div>

        {/* 日期 → 时间戳 */}
        <div className="card space-y-3">
          <h3 className="text-sm font-medium text-gray-700">日期 → 时间戳</h3>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none text-sm"
          />
          <button onClick={dateToTs} className="btn-primary w-full">转换为时间戳</button>
        </div>

        {/* 结果 */}
        {result && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">结果</span>
              <button onClick={copy} className="text-xs text-red-600 hover:text-red-700">📋 复制</button>
            </div>
            <p className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-700 break-all select-all">{result}</p>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
