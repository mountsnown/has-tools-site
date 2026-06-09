'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

export default function URLEncodePage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setError(mode === 'decode' ? '解码失败，请检查输入是否为有效的 URL 编码字符串' : '编码失败');
      setOutput('');
    }
  };

  const copy = () => navigator.clipboard.writeText(output);
  const swap = () => { setMode(mode === 'encode' ? 'decode' : 'encode'); setInput(output); setOutput(''); setError(''); };

  return (
    <div className="tool-container">
      <h1 className="tool-title">🔗 URL 编解码</h1>
      <p className="tool-subtitle">在线URL编码解码，轻松处理URL中的特殊字符和中文参数</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex gap-2 justify-center">
          {(['encode', 'decode'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setOutput(''); setError(''); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                mode === m ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {m === 'encode' ? '编码 Encode' : '解码 Decode'}
            </button>
          ))}
        </div>

        <div className="card space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {mode === 'encode' ? '输入文本' : '输入 URL 编码字符串'}
          </label>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder={mode === 'encode' ? '输入需要编码的文本或URL...' : '输入需要解码的 URL 编码字符串...'}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none resize-none font-mono text-sm"
          />
          <div className="flex gap-2">
            <button onClick={convert} className="btn-primary flex-1">
              {mode === 'encode' ? '编码' : '解码'}
            </button>
            <button onClick={swap} className="btn-secondary px-4" title="交换模式">🔄</button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">❌ {error}</div>
        )}

        {output && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">结果</span>
              <button onClick={copy} className="text-xs text-red-600 hover:text-red-700">📋 复制</button>
            </div>
            <pre className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-700 overflow-auto max-h-60 whitespace-pre-wrap break-all">
              {output}
            </pre>
          </div>
        )}

        {/* 常用示例 */}
        <div className="card">
          <h3 className="text-sm font-medium text-gray-700 mb-3">💡 常用编码示例</h3>
          <div className="space-y-1.5 text-xs font-mono">
            {[
              { raw: '空格', encoded: '%20' },
              { raw: '中文', encoded: '%E4%B8%AD%E6%96%87' },
              { raw: '@', encoded: '%40' },
              { raw: 'https://has88888888.com', encoded: 'https%3A%2F%2Fhas88888888.com' },
            ].map((item) => (
              <div key={item.raw} className="flex justify-between bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-500">{item.raw}</span>
                <span className="text-gray-400">→</span>
                <span className="text-red-600">{item.encoded}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
