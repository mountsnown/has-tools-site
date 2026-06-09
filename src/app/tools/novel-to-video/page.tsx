'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

export default function NovelToVideoPage() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <span className="text-6xl mb-6 block">📖</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            小说配图转视频
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2 leading-relaxed max-w-2xl mx-auto">
            AI 自动为小说每一章生成动漫风格配图，合成动图并整合为视频
          </p>
          <p className="text-sm text-gray-400 mb-8">
            免费使用 · Windows 桌面应用 · AI 文生图无需 API Key
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/novel-to-video.exe"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 text-lg"
              download
            >
              ⬇ 下载 Windows 版
              <span className="text-sm font-normal text-white/70">35MB</span>
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText('https://has88888888.com/novel-to-video.exe');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="inline-flex items-center gap-2 bg-white text-gray-700 font-medium px-6 py-4 rounded-xl hover:bg-gray-100 transition-all border border-gray-200"
            >
              {copied ? '✅ 已复制' : '🔗 复制下载链接'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            支持 Windows 10/11 · 无需安装，双击即用 · 永久免费
          </p>
        </div>
      </section>

      <AdBanner className="max-w-4xl mx-auto px-4 py-6" />

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">✨ 功能特色</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: '🤖',
              title: 'AI 智能配图',
              desc: '基于 Pollinations.ai 免费文生图模型，自动为每段情节生成高质量动漫风格插画，无需 API Key。',
            },
            {
              icon: '📑',
              title: '智能章节拆分',
              desc: '自动识别"第一章""第二章"等标题，将整本小说拆分为独立章节，逐章处理。',
            },
            {
              icon: '🎞️',
              title: '动图合成',
              desc: '每章配图自动合成 GIF + APNG 动图，512-600KB 高品质，可调速播放。',
            },
            {
              icon: '🎬',
              title: '视频整合',
              desc: '所有章节动图自动合成一条 60-72 秒视频，支持调速、统一帧率、高画质输出。',
            },
            {
              icon: '🖱️',
              title: '极简操作',
              desc: '双击打开，选择小说 .docx 文件，全自动处理。也支持拖拽 .docx 到程序图标。',
            },
            {
              icon: '🆓',
              title: '完全免费',
              desc: '无广告、无付费墙、无使用次数限制。AI 生图费用由 Pollinations.ai 免费提供。',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">📋 使用步骤</h2>
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <ol className="space-y-6">
            {[
              { step: 1, title: '准备小说文件', desc: '将你的小说保存为 .docx 格式（Microsoft Word 文档）' },
              { step: 2, title: '打开程序', desc: '双击"小说配图工具.exe"，在弹出窗口中选择你的 .docx 文件' },
              { step: 3, title: '等待 AI 生成', desc: '程序自动提取章节 → 调用 AI 生成配图 → 压缩到 512-600KB，每张约 10-30 秒' },
              { step: 4, title: '获取成果', desc: '在同目录下"小说配图动图输出"文件夹中获取：章节文本、配图、GIF/APNG 动图、整合视频' },
            ].map((s) => (
              <li key={s.step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                  {s.step}
                </span>
                <div>
                  <h4 className="font-semibold text-gray-800">{s.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">⚙️ 系统要求</h2>
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">必须</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span> Windows 10 或 Windows 11
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span> 网络连接（AI 生图需要联网）
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span> .docx 格式小说文件
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">可选</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">⚡</span> FFmpeg（用于视频整合，动图不受影响）
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">⚡</span> 下载 FFmpeg：ffmpeg.org/download.html
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠️ 技术说明</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['Python 3.14', 'Pollinations.ai', 'Pillow', 'python-docx', 'FFmpeg', 'PyInstaller'].map(
            (tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border border-gray-200"
              >
                {tech}
              </span>
            )
          )}
        </div>
        <p className="text-xs text-gray-400 mt-6">
          本工具使用 Pollinations.ai 免费文生图 API，图片生成速度取决于网络和服务负载。
          <br />
          视频功能需额外安装 FFmpeg 并加入系统 PATH。
        </p>
      </section>

      {/* Download CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">准备好了吗？</h2>
          <p className="text-white/80 mb-6">下载 Windows 桌面程序，开始将你的小说变成视频</p>
          <a
            href="/novel-to-video.exe"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-lg"
            download
          >
            ⬇ 免费下载 (35MB)
          </a>
          <p className="text-white/50 text-xs mt-4">版本 v1.0 · 2026-06-06 · 支持 Windows 10/11</p>
        </div>
      </section>
    </div>
  );
}
