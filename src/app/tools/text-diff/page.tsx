'use client';

import { useState, useCallback, useMemo } from 'react';
import AdBanner from '@/components/AdBanner';

interface DiffLine {
  type: 'same' | 'added' | 'removed';
  content: string;
  oldLine: number | null;
  newLine: number | null;
}

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const m = oldLines.length, n = newLines.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = oldLines[i - 1] === newLines[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);

  const result: DiffLine[] = [];
  let i = m, j = n;
  const temp: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      temp.push({ type: 'same', content: oldLines[i - 1], oldLine: i, newLine: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      temp.push({ type: 'added', content: newLines[j - 1], oldLine: null, newLine: j });
      j--;
    } else {
      temp.push({ type: 'removed', content: oldLines[i - 1], oldLine: i, newLine: null });
      i--;
    }
  }
  return temp.reverse();
}

export default function TextDiffPage() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [viewMode, setViewMode] = useState<'unified' | 'side'>('unified');

  const diff = useMemo(() => {
    if (!leftText && !rightText) return null;
    return computeDiff(leftText, rightText);
  }, [leftText, rightText]);

  const stats = useMemo(() => {
    if (!diff) return null;
    let added = 0, removed = 0, same = 0;
    diff.forEach(d => { if (d.type === 'added') added++; else if (d.type === 'removed') removed++; else same++; });
    return { added, removed, same, total: diff.length };
  }, [diff]);

  const swapTexts = () => {
    setLeftText(rightText);
    setRightText(leftText);
  };

  const clearAll = () => {
    setLeftText('');
    setRightText('');
  };

  const sideBySide = useMemo(() => {
    if (!diff) return null;
    const left: (DiffLine | null)[] = [];
    const right: (DiffLine | null)[] = [];
    diff.forEach(d => {
      if (d.type === 'same') { left.push(d); right.push(d); }
      else if (d.type === 'removed') { left.push(d); right.push(null); }
      else { left.push(null); right.push(d); }
    });
    return { left, right };
  }, [diff]);

  return (
    <div className="tool-container" style={{ maxWidth: '64rem' }}>
      <h1 className="tool-title">📊 文本差异对比</h1>
      <p className="tool-subtitle">免费在线文本差异对比工具，两段文本逐行差异高亮，开发者与写作者必备</p>
      <AdBanner className="mb-8" />

      <div className="space-y-4">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">原始文本</h3>
              <span className="text-xs text-gray-400">{leftText.split('\n').filter(l => l.length > 0).length} 行 · {leftText.length} 字</span>
            </div>
            <textarea
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="在此粘贴原始文本..."
              rows={10}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all resize-y text-sm font-mono"
            />
          </div>
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">修改后文本</h3>
              <span className="text-xs text-gray-400">{rightText.split('\n').filter(l => l.length > 0).length} 行 · {rightText.length} 字</span>
            </div>
            <textarea
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="在此粘贴修改后文本..."
              rows={10}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all resize-y text-sm font-mono"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <div className="flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setViewMode('unified')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'unified' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              统一视图
            </button>
            <button
              onClick={() => setViewMode('side')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'side' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              并排对比
            </button>
          </div>
          <button onClick={swapTexts} className="btn-secondary text-sm py-2 px-4">🔄 交换</button>
          <button onClick={clearAll} className="btn-secondary text-sm py-2 px-4">🗑️ 清空</button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">+{stats.added} 新增</span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-medium">-{stats.removed} 删除</span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{stats.same} 未变</span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">共 {stats.total} 行</span>
          </div>
        )}

        {/* Diff Output */}
        {diff && diff.length > 0 && (
          <div className="card animate-fade-in">
            {viewMode === 'unified' ? (
              <div className="font-mono text-sm leading-relaxed overflow-x-auto">
                {diff.map((line, i) => (
                  <div
                    key={i}
                    className={`flex px-3 py-0.5 ${
                      line.type === 'added' ? 'bg-green-50' : line.type === 'removed' ? 'bg-red-50' : ''
                    }`}
                  >
                    <span className={`w-10 shrink-0 select-none text-right mr-3 ${
                      line.type === 'added' ? 'text-green-600' : line.type === 'removed' ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                      {line.newLine || line.oldLine || ''}
                    </span>
                    <span className={`whitespace-pre-wrap break-all ${
                      line.type === 'added' ? 'text-green-800' : line.type === 'removed' ? 'text-red-800' : 'text-gray-700'
                    }`}>
                      {line.content || ' '}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              sideBySide && (
                <div className="grid grid-cols-2 gap-0 font-mono text-sm leading-relaxed overflow-x-auto border-t border-gray-100">
                  <div className="border-r border-gray-100">
                    <div className="px-3 py-1.5 bg-gray-50 text-xs font-semibold text-gray-500 border-b border-gray-100 sticky top-0">原始文本</div>
                    {sideBySide.left.map((line, i) => (
                      <div key={i} className={`flex px-3 py-0.5 min-h-[1.5rem] ${line?.type === 'removed' ? 'bg-red-50' : line?.type === 'added' ? 'bg-gray-50' : ''}`}>
                        <span className="w-8 shrink-0 text-right mr-2 text-gray-400 select-none">{line?.oldLine || ''}</span>
                        <span className={`whitespace-pre-wrap break-all ${line?.type === 'removed' ? 'text-red-800' : 'text-gray-400'}`}>{line?.content || ' '}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="px-3 py-1.5 bg-gray-50 text-xs font-semibold text-gray-500 border-b border-gray-100 sticky top-0">修改后文本</div>
                    {sideBySide.right.map((line, i) => (
                      <div key={i} className={`flex px-3 py-0.5 min-h-[1.5rem] ${line?.type === 'added' ? 'bg-green-50' : line?.type === 'removed' ? 'bg-gray-50' : ''}`}>
                        <span className="w-8 shrink-0 text-right mr-2 text-gray-400 select-none">{line?.newLine || ''}</span>
                        <span className={`whitespace-pre-wrap break-all ${line?.type === 'added' ? 'text-green-800' : 'text-gray-700'}`}>{line?.content || ' '}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {(!leftText || !rightText) && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">📝</div>
            <p>在左右两边输入文本后，自动显示差异对比</p>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
