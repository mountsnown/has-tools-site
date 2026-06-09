import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "博客 | 888工具站",
  description: "实用工具指南、技术教程和在线工具使用技巧，帮你更高效地使用各种在线工具。",
  alternates: { canonical: "https://has88888888.com/blog" },
};

const articles = [
  {
    title: "MBTI 16型人格完整解读",
    slug: "mbti-16-types",
    summary: "全面解析MBTI 16种性格类型的特点、适合职业和恋爱风格，帮你深入了解每种人格的独特之处。",
    date: "2026-05-27",
    emoji: "🧠",
    tags: ["MBTI", "性格测试"],
  },
  {
    title: "在线图片压缩技巧完全指南",
    slug: "compress-images",
    summary: "详细介绍如何在线压缩图片，PNG、JPEG、WebP各格式的特点对比，以及压缩对画质的影响分析。",
    date: "2026-05-27",
    emoji: "🖼️",
    tags: ["图片压缩", "工具教程"],
  },
  {
    title: "JSON格式化工具有什么用？开发者必备工具指南",
    slug: "json-formatter-guide",
    summary: "JSON格式化是什么？为什么开发者需要它？详细介绍JSON在线工具的用途、使用场景和选择技巧。",
    date: "2026-05-27",
    emoji: "🔧",
    tags: ["JSON", "开发者工具"],
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">📝 博客</h1>
        <p className="text-gray-500 mb-8">在线工具使用指南与实用技巧分享</p>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block card hover:shadow-md hover:border-red-200 transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{article.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-800 mb-1 hover:text-red-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">{article.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{article.date}</span>
                    <div className="flex gap-1.5">
                      {article.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 rounded-full px-2 py-0.5">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
