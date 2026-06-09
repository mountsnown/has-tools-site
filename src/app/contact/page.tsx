import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "联系我们 | 888工具站",
  description: "有问题或建议？欢迎联系888工具站团队。我们会在24小时内回复你的邮件。",
  alternates: { canonical: "https://has88888888.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">联系我们</h1>
        <p className="text-sm text-gray-400 mb-8">有问题、建议或合作意向？欢迎联系！</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">联系方式</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium">邮箱</p>
                  <p className="text-sm text-gray-500">admin@has88888888.com</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">反馈建议</h2>
            <p>我们非常欢迎你的反馈！无论是：</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>报告工具中的Bug</li>
              <li>建议新增什么工具</li>
              <li>对现有工具的改进意见</li>
              <li>广告合作咨询</li>
            </ul>
            <p className="mt-2">请发送邮件至 <span className="font-mono text-red-600">admin@has88888888.com</span>，我们将尽快回复。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">合作联系</h2>
            <p>如果你希望与我们进行以下合作：</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>友情链接互换</li>
              <li>广告投放合作</li>
              <li>内容合作</li>
              <li>其他商务合作</li>
            </ul>
            <p className="mt-2">请通过邮件联系，标题注明合作类型。</p>
          </section>

          <section className="bg-amber-50 rounded-xl p-6">
            <p className="text-sm text-amber-800">
              ⏰ 我们通常在 <strong>24小时内</strong> 回复邮件。如遇节假日可能会有延迟，敬请谅解。
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
