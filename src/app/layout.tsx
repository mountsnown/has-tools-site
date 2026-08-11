import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    default: "888工具站 - 你的免费在线工具箱 | MBTI测试 | 二维码生成 | 图片压缩",
    template: "%s | 888工具站",
  },
  description:
    "888工具站提供免费在线工具：MBTI性格测试、恋爱脑测试、幸运数字生成、二维码生成器、图片压缩、文本处理等。无需注册，即开即用！",
  keywords:
    "MBTI测试,恋爱脑测试,二维码生成器,图片压缩,在线工具,免费工具,幸运数字,运势,性格测试",
  alternates: {
    canonical: "https://has88888888.com",
  },
  openGraph: {
    title: "888工具站 - 你的免费在线工具箱",
    description: "MBTI测试 | 二维码生成 | 图片压缩 | 趣味测试，全部免费！",
    url: "https://has88888888.com",
    siteName: "888工具站",
    locale: "zh_CN",
    type: "website",
  },
  verification: {
    other: {
      "baidu-site-verification": "b2e2b9b4fbd240e1c4a93bb5fc853e06",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
    >
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "888工具站",
            url: "https://has88888888.com",
            description: "免费在线工具箱，MBTI性格测试、恋爱脑测试、幸运数字生成、二维码生成器、图片压缩等18个实用工具",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://has88888888.com/tools/{search_term}",
              "query-input": "required name=search_term",
            },
          }}
        />
        {process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?${process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID}";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();`,
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        {/* Top Ad Banner */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-bold leading-tight">
                🏥 中国顶级医院提前就诊住院，国外1/3的价格，1/10的住院等待时间
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base shrink-0">
              <a href="tel:13465321962" className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 font-bold transition-colors">
                📞 13465321962
              </a>
              <a href="weixin://dl/chat?yzp88888898" className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 font-bold transition-colors">
                💬 yzp88888898
              </a>
            </div>
          </div>
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
