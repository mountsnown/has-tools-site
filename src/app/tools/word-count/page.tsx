'use client';

import { useState, useEffect } from 'react';
import AdBanner from '@/components/AdBanner';

export default function WordCountPage() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ chars: 0, charsNoSpace: 0, cnChars: 0, enWords: 0, lines: 0, paras: 0, bytes: 0 });

  useEffect(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const cnChars = (text.match(/[一-鿿㐀-䶿]/g) || []).length;
    const enWords = text.trim() ? text.trim().split(/\s+/).filter(w => /[a-zA-Z]/.test(w)).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const paras = text ? text.split('\n').filter((p) => p.trim() !== '').length : 0;
    const bytes = new Blob([text]).size;

    setStats({ chars, charsNoSpace, cnChars, enWords, lines, paras, bytes });
  }, [text]);

  const clear = () => setText('');

  return (
    <div className="tool-container">
      <h1 className="tool-title">📊 字数统计器</h1>
      <p className="tool-subtitle">在线统计字数、字符数、行数、段落数，写作辅助必备</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        {/* 实时统计卡片 */}
        {text.length > 0 && (
          <div className="grid grid-cols-3 gap-2 animate-fade-in">
            <div className="card text-center py-3">
              <p className="text-2xl font-bold text-red-600">{stats.chars}</p>
              <p className="text-xs text-gray-400">总字符数</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-2xl font-bold text-amber-600">{stats.cnChars}</p>
              <p className="text-xs text-gray-400">中文字数</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-2xl font-bold text-blue-600">{stats.enWords}</p>
              <p className="text-xs text-gray-400">英文单词</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-2xl font-bold text-gray-700">{stats.charsNoSpace}</p>
              <p className="text-xs text-gray-400">字符(无空格)</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-2xl font-bold text-gray-700">{stats.lines}</p>
              <p className="text-xs text-gray-400">行数</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-2xl font-bold text-gray-700">{stats.paras}</p>
              <p className="text-xs text-gray-400">段落数</p>
            </div>
          </div>
        )}

        <div className="card space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="在此输入或粘贴文本，实时统计字数..."
            rows={10}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none resize-none text-sm"
          />
          <button onClick={clear} className="btn-secondary w-full text-sm">清空</button>
        </div>

        {text.length > 0 && (
          <div className="card text-xs text-gray-500 space-y-1">
            <div className="flex justify-between"><span>字节数 (UTF-8)</span><span className="font-mono">{stats.bytes} B</span></div>
            <div className="flex justify-between"><span>预估阅读时间</span><span>{Math.max(1, Math.ceil(stats.cnChars / 400 + stats.enWords / 200))} 分钟</span></div>
            <div className="flex justify-between"><span>预估朗读时间</span><span>{Math.max(1, Math.ceil((stats.cnChars + stats.enWords) / 250))} 分钟</span></div>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
