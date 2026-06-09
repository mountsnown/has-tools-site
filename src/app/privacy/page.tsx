import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "隐私政策 | 888工具站",
  description: "了解888工具站如何收集和使用你的信息。我们重视你的隐私，不收集任何个人信息。",
  alternates: { canonical: "https://has88888888.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">隐私政策</h1>
        <p className="text-sm text-gray-400 mb-8">最后更新: 2026年5月27日</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">引言</h2>
            <p>888工具站（以下简称"我们"）重视用户的隐私。本隐私政策说明我们如何收集、使用和保护你的信息。访问 https://has88888888.com 即表示你同意本政策。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">我们收集的信息</h2>
            <p><strong>我们不收集任何个人信息。</strong>所有工具均在浏览器本地运行，你输入的数据不会被上传到我们的服务器。</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>分析数据:</strong> 我们使用百度统计和Microsoft Clarity收集匿名访问数据（页面浏览、停留时间、点击行为），这些数据无法识别个人身份。</li>
              <li><strong>广告:</strong> 未来接入广告时，广告商可能使用Cookie投放个性化广告。</li>
              <li><strong>IP地址:</strong> IP查询工具通过第三方API (ipapi.co) 查询，我们不会存储你的IP。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Cookie使用</h2>
            <p>我们使用Cookie用于以下目的：</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>统计分析（百度统计、Microsoft Clarity）</li>
              <li>广告投放（将来可能通过 Google AdSense 使用Cookie）</li>
            </ul>
            <p className="mt-2">你可以在浏览器设置中禁用Cookie。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">第三方服务</h2>
            <p>我们使用以下第三方服务，请参阅各自的隐私政策：</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>百度统计 — <a href="https://tongji.baidu.com/" className="text-red-600 hover:underline">tongji.baidu.com</a></li>
              <li>Microsoft Clarity — <a href="https://clarity.microsoft.com/" className="text-red-600 hover:underline">clarity.microsoft.com</a></li>
              <li>ipapi.co — <a href="https://ipapi.co/" className="text-red-600 hover:underline">ipapi.co</a></li>
              <li>QR Server — <a href="https://goqr.me/" className="text-red-600 hover:underline">goqr.me</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">数据安全</h2>
            <p>由于我们不收集个人信息，不存在个人数据泄露风险。所有工具功能在浏览器本地执行，你的数据不会离开你的设备。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">联系我们</h2>
            <p>如有隐私相关问题，请通过以下方式联系：</p>
            <p className="mt-2">📧 邮箱: admin@has88888888.com</p>
            <p>🌐 网站: https://has88888888.com/contact</p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
