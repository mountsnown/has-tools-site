import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "在线图片压缩完全指南 | 888工具站博客",
  description: "详细介绍如何在线压缩PNG、JPEG、WebP图片。不同格式的压缩效果对比，压缩对画质的影响，以及最佳压缩设置推荐。",
  keywords: "图片压缩,在线压缩,PNG压缩,JPEG压缩,WebP压缩,图片优化",
  alternates: { canonical: "https://has88888888.com/blog/compress-images" },
};

export default function CompressBlogPage() {
  return (
    <>
      <Header />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-400 mb-2">2026-05-27 · 工具教程</p>
        <h1 className="text-3xl font-bold mb-4">在线图片压缩完全指南：让图片变小不失真</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          图片是网站性能的最大杀手。一张未经压缩的照片动辄5-10MB，严重拖慢加载速度。本文将详细介绍如何在线压缩图片，不同格式的压缩策略，以及如何在保持画质的同时最大化减小文件体积。
        </p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">为什么需要压缩图片？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {[
                { title: "⚡ 提升加载速度", desc: "图片越大，网页加载越慢。压缩后加载时间可减少50%-80%，用户体验大幅提升。" },
                { title: "🔍 SEO优化", desc: "Google和百度都会考虑页面加载速度作为排名因素。快速加载的网站排名更高。" },
                { title: "💰 节省带宽", desc: "压缩后的图片体积更小，节省服务器带宽成本，对移动端用户尤其友好。" },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">三大图片格式对比</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left">特性</th>
                    <th className="p-3 text-left">JPEG</th>
                    <th className="p-3 text-left">PNG</th>
                    <th className="p-3 text-left">WebP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="p-3">压缩类型</td><td className="p-3">有损</td><td className="p-3">无损/有损</td><td className="p-3">有损/无损</td></tr>
                  <tr className="border-t"><td className="p-3">透明度</td><td className="p-3">不支持</td><td className="p-3">支持</td><td className="p-3">支持</td></tr>
                  <tr className="border-t"><td className="p-3">文件大小</td><td className="p-3">较小</td><td className="p-3">较大</td><td className="p-3">最小</td></tr>
                  <tr className="border-t"><td className="p-3">适用场景</td><td className="p-3">照片</td><td className="p-3">图标/截图</td><td className="p-3">通用推荐</td></tr>
                  <tr className="border-t"><td className="p-3">浏览器支持</td><td className="p-3 text-green-600">100%</td><td className="p-3 text-green-600">100%</td><td className="p-3 text-green-600">97%+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-2">* WebP 格式是由 Google 开发的现代图片格式，压缩率比 JPEG 高 25%-34%。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">不同场景的压缩建议</h2>
            <ul className="space-y-3">
              <li className="bg-blue-50 rounded-xl p-4"><strong>📱 社交媒体分享:</strong> JPEG 品质80%，宽度不超过1920px，文件大小控制在500KB以内。</li>
              <li className="bg-green-50 rounded-xl p-4"><strong>🌐 网站配图:</strong> 优先使用 WebP 格式，JPEG 品质70%-80%，单张不超过200KB。</li>
              <li className="bg-yellow-50 rounded-xl p-4"><strong>📧 邮件附件:</strong> JPEG 品质60%-70%，长边不超过1024px，总附件控制在5MB以内。</li>
              <li className="bg-purple-50 rounded-xl p-4"><strong>🖨️ 打印输出:</strong> 不建议压缩，使用原始高清图片以保证打印质量。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">常见问题</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold">Q: 压缩会明显影响画质吗？</p>
                <p className="text-sm mt-1">对于JPEG格式，品质在70%以上人眼基本无法察觉差异。WebP格式在同等品质下文件更小。</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold">Q: PNG和JPEG哪个更适合压缩？</p>
                <p className="text-sm mt-1">截图和图标用PNG（无损压缩），照片用JPEG或WebP。PNG压缩后仍保留透明度，JPEG不支持透明。</p>
              </div>
            </div>
          </section>

          <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-6 text-center">
            <p className="font-semibold text-gray-800 mb-2">需要压缩图片？试试免费在线工具</p>
            <p className="text-sm text-gray-600 mb-4">上传即压缩，实时预览效果，支持 PNG / JPEG 格式</p>
            <Link href="/tools/image-compress" className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors">
              开始压缩图片 →
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
