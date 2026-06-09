'use client';

import { tools, categoryLabels, categoryIcons } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import AdBanner from '@/components/AdBanner';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function HomeContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('cat');

  const filteredTools = activeCategory
    ? tools.filter((t) => t.category === activeCategory)
    : tools;

  const categories = Object.entries(categoryLabels);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-amber-50 to-red-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl">🎱</div>
          <div className="absolute top-20 right-20 text-5xl">🍀</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">💰</div>
          <div className="absolute bottom-20 right-1/3 text-5xl">⭐</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
              888工具站
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-3 leading-relaxed">
            你的免费在线工具箱
          </p>
          <p className="text-sm md:text-base text-gray-400 mb-8 max-w-lg mx-auto">
            MBTI性格测试 · 恋爱脑测试 · 幸运数字 · 二维码生成 · 图片压缩 · 文本处理
            <br />
            全部免费，无需注册，即开即用
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(([key, label]) => (
              <a
                key={key}
                href={`?cat=${key}`}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === key
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                }`}
              >
                {categoryIcons[key]} {label}
              </a>
            ))}
            {activeCategory && (
              <a
                href="/"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
              >
                ✕ 清除筛选
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <AdBanner className="mb-8" />

        {activeCategory && (
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            {categoryIcons[activeCategory]} {categoryLabels[activeCategory]}
            <span className="text-sm font-normal text-gray-400">
              ({filteredTools.length} 个工具)
            </span>
          </h2>
        )}

        {!activeCategory && (
          <>
            {categories.map(([key, label]) => {
              const catTools = tools.filter((t) => t.category === key);
              if (catTools.length === 0) return null;
              return (
                <div key={key} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    {categoryIcons[key]} {label}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {catTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {activeCategory && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        {activeCategory && filteredTools.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p>暂无该分类的工具</p>
          </div>
        )}

        <AdBanner className="mt-12" />
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <div className="bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            🎉 收藏本站，随时使用
          </h2>
          <p className="text-white/80 mb-6 text-sm md:text-base">
            所有工具永久免费，转发给朋友一起来用！
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText('https://has88888888.com');
              alert('链接已复制！发送给朋友吧~');
            }}
            className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors"
          >
            📋 复制链接分享给朋友
          </button>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">加载中...</div>}>
      <HomeContent />
    </Suspense>
  );
}
