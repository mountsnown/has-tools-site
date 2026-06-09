'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

export default function DedupPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });

  const dedup = () => {
    const lines = input.split('\n');
    let processed = trimLines ? lines.map((l) => l.trim()) : lines;
    if (removeEmpty) processed = processed.filter((l) => l !== '');

    const seen = new Set<string>();
    const unique: string[] = [];
    for (const line of processed) {
      if (!seen.has(line)) {
        seen.add(line);
        unique.push(line);
      }
    }

    setOutput(unique.join('\n'));
    setStats({ original: lines.length, unique: unique.length, removed: lines.length - unique.length });
  };

  const copy = () => navigator.clipboard.writeText(output);
  const clear = () => { setInput(''); setOutput(''); setStats({ original: 0, unique: 0, removed: 0 }); };

  return (
    <div className="tool-container">
      <h1 className="tool-title">📋 文字去重工具</h1>
      <p className="tool-subtitle">在线文本去重，按行去重、忽略空行、保留顺序</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="每行一个关键词、链接或名单...&#10;例如：&#10;张三&#10;李四&#10;张三&#10;王五&#10;李四"
            rows={10}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none resize-none font-mono text-sm"
          />

          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={removeEmpty}
                onChange={(e) => setRemoveEmpty(e.target.checked)}
                className="accent-red-600 w-4 h-4"
              />
              <span className="text-gray-600">忽略空行</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={trimLines}
                onChange={(e) => setTrimLines(e.target.checked)}
                className="accent-red-600 w-4 h-4"
              />
              <span className="text-gray-600">去除首尾空格</span>
            </label>
          </div>

          <div className="flex gap-2">
            <button onClick={dedup} className="btn-primary flex-1">去重</button>
            <button onClick={clear} className="btn-secondary">清空</button>
          </div>

          {stats.original > 0 && (
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-gray-400">原始行数</p>
                <p className="text-lg font-bold text-gray-700">{stats.original}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <p className="text-gray-400">去重后</p>
                <p className="text-lg font-bold text-green-600">{stats.unique}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-2">
                <p className="text-gray-400">已去除</p>
                <p className="text-lg font-bold text-red-600">{stats.removed}</p>
              </div>
            </div>
          )}
        </div>

        {output && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">去重结果</span>
              <button onClick={copy} className="text-xs text-red-600 hover:text-red-700">📋 复制全部</button>
            </div>
            <pre className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-700 overflow-auto max-h-80 whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
