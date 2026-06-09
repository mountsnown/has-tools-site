'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

export default function Base64Page() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError(mode === 'decode' ? '解码失败，请检查输入是否为有效的 Base64 字符串' : '编码失败');
      setOutput('');
    }
  };

  const copy = () => navigator.clipboard.writeText(output);
  const swap = () => { setMode(mode === 'encode' ? 'decode' : 'encode'); setInput(output); setOutput(''); setError(''); };

  return (
    <div className="tool-container">
      <h1 className="tool-title">🔣 Base64 编解码</h1>
      <p className="tool-subtitle">在线Base64编码解码，支持中文和UTF-8字符</p>

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
            {mode === 'encode' ? '输入文本' : '输入 Base64'}
          </label>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder={mode === 'encode' ? '输入需要编码的文本...' : '输入 Base64 字符串...'}
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
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
