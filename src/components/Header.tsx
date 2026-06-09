'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">🎱</span>
          <span className="bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
            888工具站
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/?cat=fun" className="hover:text-red-600 transition-colors">
            趣味测试
          </Link>
          <Link href="/?cat=utility" className="hover:text-red-600 transition-colors">
            实用工具
          </Link>
          <Link href="/?cat=image" className="hover:text-red-600 transition-colors">
            图片处理
          </Link>
          <Link href="/?cat=medical" className="hover:text-red-600 transition-colors">
            医学工具
          </Link>
          <Link href="/blog" className="hover:text-red-600 transition-colors">
            博客
          </Link>
          <Link href="/about" className="hover:text-red-600 transition-colors">
            关于
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          <Link href="/?cat=fun" className="block py-2 text-gray-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
            🎯 趣味测试
          </Link>
          <Link href="/?cat=utility" className="block py-2 text-gray-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
            🛠️ 实用工具
          </Link>
          <Link href="/?cat=image" className="block py-2 text-gray-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
            🖼️ 图片处理
          </Link>
          <Link href="/?cat=medical" className="block py-2 text-gray-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
            🏥 医学工具
          </Link>
          <Link href="/blog" className="block py-2 text-gray-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
            📝 博客
          </Link>
          <Link href="/about" className="block py-2 text-gray-600 hover:text-red-600" onClick={() => setMenuOpen(false)}>
            💡 关于我们
          </Link>
        </div>
      )}
    </header>
  );
}
