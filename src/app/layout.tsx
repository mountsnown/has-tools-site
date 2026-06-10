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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
