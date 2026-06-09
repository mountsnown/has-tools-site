'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

export default function JSONPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const compress = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="tool-container">
      <h1 className="tool-title">🔧 JSON 格式化工具</h1>
      <p className="tool-subtitle">JSON格式化、压缩、校验</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-3">
        <div className="card space-y-3">
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); setOutput(''); }}
            placeholder='{"name": "888工具站", "url": "https://has88888888.com"}'
            rows={8}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all resize-none font-mono text-sm"
          />

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500 whitespace-nowrap">缩进:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
            >
              <option value={2}>2 空格</option>
              <option value={4}>4 空格</option>
              <option value={0}>Tab</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button onClick={format} className="btn-primary flex-1">格式化</button>
            <button onClick={compress} className="btn-secondary flex-1">压缩</button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
              ❌ {error}
            </div>
          )}
        </div>

        {output && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">结果</span>
              <button onClick={copyOutput} className="text-xs text-red-600 hover:text-red-700">
                📋 复制
              </button>
            </div>
            <pre className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-700 overflow-auto max-h-80 whitespace-pre-wrap break-all">
              {output}
            </pre>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
