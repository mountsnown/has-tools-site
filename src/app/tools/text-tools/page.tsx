'use client';

import { useState, useMemo } from 'react';
import AdBanner from '@/components/AdBanner';

export default function TextToolsPage() {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'case' | 'diff'>('stats');

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const charsNoSpace = text.replace(/\s/g, '').length;
    const chars = text.length;
    const words = trimmed ? text.split(/\s+/).filter(Boolean).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const chineseChars = (text.match(/[一-鿿]/g) || []).length;
    const sentences = trimmed ? text.split(/[。！？.!?\n]/).filter(Boolean).length : 0;
    return { chars, charsNoSpace, words, lines, chineseChars, sentences };
  }, [text]);

  const [caseResult, setCaseResult] = useState('');

  const caseOperations = [
    { label: '全部大写', action: () => setCaseResult(text.toUpperCase()) },
    { label: '全部小写', action: () => setCaseResult(text.toLowerCase()) },
    { label: '首字母大写', action: () => setCaseResult(text.replace(/\b\w/g, (c) => c.toUpperCase())) },
    { label: '反转大小写', action: () => setCaseResult(text.replace(/[a-zA-Z]/g, (c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())) },
  ];

  // Diff
  const [diffText1, setDiffText1] = useState('');
  const [diffText2, setDiffText2] = useState('');
  const [diffResult, setDiffResult] = useState<{ type: 'same' | 'added' | 'removed'; text: string }[]>([]);

  const runDiff = () => {
    const lines1 = diffText1.split('\n');
    const lines2 = diffText2.split('\n');
    const maxLen = Math.max(lines1.length, lines2.length);
    const result: { type: 'same' | 'added' | 'removed'; text: string }[] = [];
    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] || '';
      const l2 = lines2[i] || '';
      if (l1 === l2) {
        if (l1) result.push({ type: 'same', text: l1 });
      } else {
        if (l1) result.push({ type: 'removed', text: l1 });
        if (l2) result.push({ type: 'added', text: l2 });
      }
    }
    setDiffResult(result);
  };

  const tabs = [
    { id: 'stats' as const, label: '📊 字数统计' },
    { id: 'case' as const, label: '🔤 大小写转换' },
    { id: 'diff' as const, label: '🔄 文本对比' },
  ];

  return (
    <div className="tool-container">
      <h1 className="tool-title">📝 文本处理工具</h1>
      <p className="tool-subtitle">字数统计 · 大小写转换 · 文本对比</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto">
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'stats' && (
          <div className="card space-y-4 animate-fade-in">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="在此输入或粘贴文本..."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all resize-none"
            />
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="总字符数" value={stats.chars} />
              <StatCard label="中文字数" value={stats.chineseChars} />
              <StatCard label="英文单词" value={stats.words} />
              <StatCard label="不含空格" value={stats.charsNoSpace} />
              <StatCard label="行数" value={stats.lines} />
              <StatCard label="句子数" value={stats.sentences} />
            </div>
          </div>
        )}

        {activeTab === 'case' && (
          <div className="card space-y-4 animate-fade-in">
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setCaseResult(''); }}
              placeholder="在此输入要转换的文本..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all resize-none"
            />
            <div className="grid grid-cols-2 gap-2">
              {caseOperations.map((op) => (
                <button key={op.label} onClick={op.action} className="btn-secondary text-sm py-2">
                  {op.label}
                </button>
              ))}
            </div>
            {caseResult && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2">转换结果：</p>
                <p className="text-gray-700 whitespace-pre-wrap break-all">{caseResult}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'diff' && (
          <div className="card space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-400 mb-1">原始文本</p>
                <textarea
                  value={diffText1}
                  onChange={(e) => setDiffText1(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-red-300 focus:outline-none text-sm resize-none"
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">对比文本</p>
                <textarea
                  value={diffText2}
                  onChange={(e) => setDiffText2(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-red-300 focus:outline-none text-sm resize-none"
                />
              </div>
            </div>
            <button onClick={runDiff} className="btn-primary w-full">
              对比差异
            </button>
            {diffResult.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm space-y-1 max-h-64 overflow-auto">
                {diffResult.map((line, i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded ${
                      line.type === 'added'
                        ? 'bg-green-100 text-green-800'
                        : line.type === 'removed'
                        ? 'bg-red-100 text-red-800'
                        : 'text-gray-600'
                    }`}
                  >
                    <span className="mr-2 text-xs">
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                    </span>
                    {line.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className="text-2xl font-bold text-gray-700">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}
