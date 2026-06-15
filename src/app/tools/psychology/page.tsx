import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '心理测试中心 - 12款免费心理测试 | 888工具站',
  description: '免费在线心理测试中心，12款专业心理测评工具：MBTI、大五人格、九型人格、DISC、暗黑人格、色彩性格、爱情测试、爱的五种语言、依恋类型、EQ情商、AQ逆商、霍兰德职业兴趣。全部免费！',
  openGraph: {
    title: '心理测试中心 - 12款免费心理测试 | 888工具站',
    description: '免费在线心理测试中心，12款专业心理测评工具。全部免费，无需注册，即测即看结果！',
    url: 'https://has88888888.com/tools/psychology',
    siteName: '888工具站',
    locale: 'zh_CN',
    type: 'website',
  },
};

interface PsychTest {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  href: string;
  popular?: boolean;
}

const personalityTests: PsychTest[] = [
  { id: 'mbti', name: 'MBTI 16型人格', emoji: '🧠', desc: '全球最流行，16种人格类型精准定位', href: '/tools/mbti', popular: true },
  { id: 'big-five', name: '大五人格', emoji: '🔮', desc: '学术界最认可，五大维度科学评估', href: '/tools/big-five' },
  { id: 'enneagram', name: '九型人格', emoji: '🎭', desc: '古老智慧，9种核心人格深度解析', href: '/tools/enneagram' },
  { id: 'disc', name: 'DISC 性格', emoji: '🔴', desc: '企业首选，四维行为风格测评', href: '/tools/disc' },
  { id: 'dark-triad', name: '暗黑人格', emoji: '🕶', desc: '探索性格暗黑面，了解人性复杂', href: '/tools/dark-triad' },
  { id: 'color-personality', name: '色彩性格', emoji: '🌈', desc: '红蓝黄绿，简单直观读懂性格', href: '/tools/color-personality' },
];

const loveTests: PsychTest[] = [
  { id: 'love-test', name: '恋爱脑测试', emoji: '💝', desc: '朋友圈爆款，测测你的恋爱上头程度', href: '/tools/love-test', popular: true },
  { id: 'love-languages', name: '爱的五种语言', emoji: '💌', desc: '3000万人验证，找到你的爱之语', href: '/tools/love-languages' },
  { id: 'attachment-style', name: '依恋类型', emoji: '🔗', desc: '了解亲密关系模式，改善感情质量', href: '/tools/attachment-style' },
];

const careerTests: PsychTest[] = [
  { id: 'eq-test', name: '情商测试 EQ', emoji: '🧘', desc: '5维度全面评估你的情商水平', href: '/tools/eq-test' },
  { id: 'aq-test', name: '逆商测试 AQ', emoji: '🏔️', desc: '评估你的逆境应对能力和心理韧性', href: '/tools/aq-test' },
  { id: 'holland-code', name: '霍兰德职业兴趣', emoji: '🏗', desc: '全球最广的职业测评，找到热爱的工作', href: '/tools/holland-code' },
];

function TestCard({ test }: { test: PsychTest }) {
  return (
    <Link
      href={test.href}
      className="group card hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col items-center text-center p-5"
    >
      <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {test.emoji}
      </span>
      <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
        {test.name}
      </h3>
      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{test.desc}</p>
      {test.popular && (
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
          🔥 热门
        </span>
      )}
    </Link>
  );
}

export default function PsychologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            <span className="bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
              🧠 心理测试中心
            </span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            12款专业心理测试 · 全部免费 · 无需注册 · 即测即看结果
          </p>
        </div>

        <AdBanner className="mb-10" />

        {/* 性格测试 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🤔 性格测试
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {personalityTests.map((t) => (
              <TestCard key={t.id} test={t} />
            ))}
          </div>
        </section>

        <AdBanner className="mb-10" />

        {/* 情感测试 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            💕 情感测试
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {loveTests.map((t) => (
              <TestCard key={t.id} test={t} />
            ))}
          </div>
        </section>

        <AdBanner className="mb-10" />

        {/* 能力与职业 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🚀 能力与职业
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {careerTests.map((t) => (
              <TestCard key={t.id} test={t} />
            ))}
          </div>
        </section>

        <AdBanner className="mb-10" />

        {/* Bottom disclaimer */}
        <p className="text-center text-xs text-gray-400">
          ⚠️ 以上所有测试均为趣味自测工具，结果仅供娱乐参考，不能替代专业心理评估。
          如需专业帮助，请咨询持证心理咨询师或精神科医生。
        </p>
      </div>
    </div>
  );
}
