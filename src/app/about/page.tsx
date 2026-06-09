import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "关于我们 | 888工具站",
  description: "888工具站是一个免费在线工具箱，提供MBTI测试、二维码生成、图片压缩等23个实用工具。无需注册，即开即用！",
  alternates: { canonical: "https://has88888888.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">关于我们</h1>
        <p className="text-sm text-gray-400 mb-8">帮助你了解888工具站</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">我们是谁</h2>
            <p>888工具站（has88888888.com）是一个<span className="font-semibold text-red-600">完全免费</span>的在线工具箱。我们相信好用的工具应该对所有人免费开放，无需注册、无需下载、打开即用。</p>
            <p className="mt-2">域名中的"88888888"寓意"发发发发发发发发"，愿每位用户都能好运连连！🍀</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">我们的工具</h2>
            <p>目前提供 <strong>23个</strong> 在线工具，涵盖三大类：</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">🎯</p>
                <p className="font-semibold text-gray-800">趣味测试</p>
                <p className="text-xs text-gray-500 mt-1">MBTI · 恋爱脑 · 运势 · 姓名打分</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">🛠️</p>
                <p className="font-semibold text-gray-800">实用工具</p>
                <p className="text-xs text-gray-500 mt-1">二维码 · 密码 · 时间戳 · UUID</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">💻</p>
                <p className="font-semibold text-gray-800">开发者</p>
                <p className="text-xs text-gray-500 mt-1">JSON · Base64 · 正则 · 哈希</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">我们的承诺</h2>
            <ul className="space-y-2">
              <li>✅ <strong>永久免费</strong> — 所有工具完全免费使用</li>
              <li>✅ <strong>无需注册</strong> — 无需创建账号即可使用</li>
              <li>✅ <strong>隐私优先</strong> — 数据在本地处理，不上传服务器</li>
              <li>✅ <strong>持续更新</strong> — 不断添加新工具，优化体验</li>
              <li>✅ <strong>极简广告</strong> — 仅展示合作信息，不干扰使用体验</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
