'use client';

import { useState, useMemo } from 'react';
import AdBanner from '@/components/AdBanner';

const commonPatterns = [
  { name: '手机号', pattern: '^1[3-9]\\d{9}$' },
  { name: '邮箱', pattern: '^[\\w.-]+@[\\w.-]+\\.\\w+$' },
  { name: 'URL', pattern: '^https?://[\\w.-]+(:\\d+)?(/.*)?$' },
  { name: '身份证', pattern: '^\\d{17}[\\dXx]$' },
  { name: 'IP地址', pattern: '^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$' },
  { name: '日期 YYYY-MM-DD', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
  { name: '中文', pattern: '[\\u4e00-\\u9fff]+' },
  { name: '邮政编码', pattern: '^\\d{6}$' },
  { name: 'QQ号', pattern: '^[1-9]\\d{4,10}$' },
  { name: '微信号', pattern: '^[a-zA-Z][\\w-]{5,19}$' },
];

export default function RegexPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({ global: true, ignoreCase: false, multiline: false });
  const [testText, setTestText] = useState('');
  const [error, setError] = useState('');

  const flagStr = `${flags.global ? 'g' : ''}${flags.ignoreCase ? 'i' : ''}${flags.multiline ? 'm' : ''}`;

  const matches = useMemo(() => {
    setError('');
    if (!pattern || !testText) return [];
    try {
      const re = new RegExp(pattern, flagStr);
      const result: { index: number; text: string }[] = [];
      let m: RegExpExecArray | null;
      if (flags.global) {
        while ((m = re.exec(testText)) !== null) {
          result.push({ index: m.index, text: m[0] });
          if (m[0] === '') re.lastIndex++;
        }
      } else {
        m = re.exec(testText);
        if (m) result.push({ index: m.index, text: m[0] });
      }
      return result;
    } catch (e) {
      setError((e as Error).message);
      return [];
    }
  }, [pattern, flagStr, testText]);

  const highlightText = useMemo(() => {
    if (!testText || matches.length === 0) return testText;
    const sorted = [...matches].sort((a, b) => a.index - b.index);
    const parts: string[] = [];
    let last = 0;
    for (const m of sorted) {
      if (m.index > last) parts.push(testText.slice(last, m.index));
      parts.push(`<mark>${testText.slice(m.index, m.index + m.text.length)}</mark>`);
      last = m.index + m.text.length;
    }
    if (last < testText.length) parts.push(testText.slice(last));
    return parts.join('');
  }, [testText, matches]);

  const copyPattern = (p: string) => setPattern(p);

  return (
    <div className="tool-container">
      <h1 className="tool-title">🔍 正则表达式测试</h1>
      <p className="tool-subtitle">在线正则表达式测试工具，实时匹配高亮显示</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">正则表达式</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-mono">/</span>
              <input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="例如: \\d+"
                className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-red-300 focus:outline-none font-mono text-sm"
              />
              <span className="text-gray-400 font-mono">/{flagStr}</span>
            </div>
          </div>

          <div className="flex gap-3 text-sm">
            {Object.entries(flags).map(([key, val]) => (
              <label key={key} className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={val}
                  onChange={() => setFlags({ ...flags, [key]: !val })}
                  className="accent-red-600 w-3.5 h-3.5"
                />
                <span className={val ? 'text-red-600 font-medium' : 'text-gray-400'}>{key === 'global' ? 'g' : key === 'ignoreCase' ? 'i' : 'm'}</span>
              </label>
            ))}
          </div>

          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="输入测试文本..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none resize-none font-mono text-sm"
          />

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">❌ {error}</div>
          )}

          {testText && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-700 max-h-40 overflow-auto">
              {matches.length > 0 ? (
                <div dangerouslySetInnerHTML={{ __html: highlightText.replace(/<mark>/g, '<mark class="bg-yellow-200 rounded px-0.5">') }} />
              ) : (
                <span className="text-gray-400">无匹配</span>
              )}
            </div>
          )}

          {matches.length > 0 && (
            <div className="text-sm text-gray-500">
              共 <span className="font-bold text-red-600">{matches.length}</span> 处匹配
              <div className="mt-2 space-y-1 max-h-32 overflow-auto">
                {matches.slice(0, 20).map((m, i) => (
                  <div key={i} className="bg-gray-50 rounded px-3 py-1 text-xs font-mono text-gray-600">
                    [{i + 1}] 位置{m.index}: &quot;{m.text}&quot;
                  </div>
                ))}
                {matches.length > 20 && <div className="text-xs text-gray-400">...还有 {matches.length - 20} 处匹配</div>}
              </div>
            </div>
          )}
        </div>

        {/* 常用正则速查 */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-700 mb-3">📚 常用正则速查</h3>
          <div className="grid grid-cols-2 gap-1.5">
            {commonPatterns.map((item) => (
              <button
                key={item.name}
                onClick={() => copyPattern(item.pattern)}
                className="text-left px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-xs"
              >
                <span className="font-medium">{item.name}</span>
                <br />
                <span className="font-mono text-gray-400">{item.pattern}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
