import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MBTI 16型人格完整解读 | 888工具站博客",
  description: "全面解析MBTI 16种性格类型：ISTJ、ISFJ、INFJ、INTJ等。每种人格的特点、适合职业、恋爱风格详尽分析，帮你深入了解自己和他人。",
  keywords: "MBTI,16型人格,性格测试,MBTI详解,人格类型,ISTJ,INFJ,INTJ,ENFP,职业规划",
  alternates: { canonical: "https://has88888888.com/blog/mbti-16-types" },
};

const types = [
  { code: "ISTJ", name: "物流师", traits: "务实、严谨、可靠、有责任感，喜欢按规则和流程办事。", career: "会计、审计、公务员、军人、工程师、法务。", love: "忠诚稳定，行动胜于言语，用行动证明爱而非甜言蜜语。", color: "bg-blue-50" },
  { code: "ISFJ", name: "守护者", traits: "温暖细心、无私奉献、忠诚可靠，默默关心身边的人。", career: "护士、教师、社工、行政人员、心理咨询师。", love: "温柔体贴，习惯默默付出，需要被珍惜和认可。", color: "bg-green-50" },
  { code: "INFJ", name: "提倡者", traits: "理想主义、极富洞察力、有强烈的价值观和使命感。", career: "作家、心理咨询师、HR、教育工作者、非营利组织。", love: "追求灵魂伴侣，深情且专一，渴望深度精神连接。", color: "bg-purple-50" },
  { code: "INTJ", name: "建筑师", traits: "独立自主、战略思维、追求卓越、理性冷静。", career: "科学家、工程师、策略顾问、创业者、CTO。", love: "理性克制，忠诚度高，需要充分的独立空间。", color: "bg-slate-50" },
  { code: "ISTP", name: "鉴赏家", traits: "冷静灵活、动手能力强、善于分析问题、享受冒险。", career: "程序员、机械师、侦探、飞行员、数据分析师。", love: "行动派，用实际行为表达爱，不喜欢空洞的承诺。", color: "bg-teal-50" },
  { code: "ISFP", name: "探险家", traits: "艺术气质、温和随性、感官敏锐、享受当下美好。", career: "设计师、摄影师、艺术家、花艺师、音乐家。", love: "浪漫随性，重视感官体验，追求自由奔放的爱情。", color: "bg-rose-50" },
  { code: "INFP", name: "调停者", traits: "理想主义、善良温暖、创造力丰富、内心情感充沛。", career: "作家、编辑、心理咨询师、公益工作者、UX设计师。", love: "追求真爱，理想化爱情，愿意为爱付出一切。", color: "bg-violet-50" },
  { code: "INTP", name: "逻辑学家", traits: "极其聪明、好奇心旺盛、独立思考、热爱知识和理论。", career: "科学家、数学家、哲学家、软件工程师、研究员。", love: "慢热但专一，不善表达情感但内心世界丰富。", color: "bg-cyan-50" },
  { code: "ESTP", name: "企业家", traits: "行动力强、灵活应变、善于社交、富有冒险精神。", career: "销售冠军、创业者、运动员、急救人员、经纪人。", love: "热情主动，追求刺激和新鲜感，生活充满激情。", color: "bg-orange-50" },
  { code: "ESFP", name: "表演者", traits: "外向热情、乐观开朗、享受生活、善于带动气氛。", career: "演员、主持人、销售、导游、活动策划师。", love: "热情浪漫，喜欢制造惊喜，享受当下的每一刻。", color: "bg-yellow-50" },
  { code: "ENFP", name: "竞选者", traits: "热情洋溢、创造力强、善于社交、对新事物充满好奇。", career: "记者、编剧、公关、培训师、创业者、市场营销。", love: "激情四射，追求浪漫和新鲜感，容易坠入爱河。", color: "bg-amber-50" },
  { code: "ENTP", name: "辩论家", traits: "聪明机智、善于辩论、思维敏捷、追求智力挑战。", career: "律师、创业者、产品经理、发明家、战略顾问。", love: "用才智吸引对方，享受智力上的交锋和思想碰撞。", color: "bg-lime-50" },
  { code: "ESTJ", name: "总经理", traits: "领导力强、务实高效、组织能力强、重视传统和秩序。", career: "管理者、法官、教师、军官、运营总监。", love: "可靠负责，看重承诺和忠诚，传统而稳重的伴侣。", color: "bg-red-50" },
  { code: "ESFJ", name: "执政官", traits: "温暖体贴、责任感强、善于交际、乐于助人。", career: "销售经理、护理主管、教育家、酒店管理、社区工作。", love: "体贴入微，重视家庭和谐，喜欢照顾和保护伴侣。", color: "bg-pink-50" },
  { code: "ENFJ", name: "主人公", traits: "魅力四射、同理心强、善于激励他人、天生的领导者。", career: "教师、咨询师、HR总监、政治家、演说家、培训师。", love: "热情大方，愿意为爱付出一切，渴望深度的情感连接。", color: "bg-indigo-50" },
  { code: "ENTJ", name: "指挥官", traits: "果断有力、目光长远、领导力超强、追求卓越成就。", career: "CEO、企业家、政治家、高级管理者、投资人。", love: "有掌控欲但忠诚可靠，用行动和成功来证明爱。", color: "bg-gray-50" },
];

export default function MBTIBlogPage() {
  return (
    <>
      <Header />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-400 mb-2">2026-05-27 · 性格测试</p>
        <h1 className="text-3xl font-bold mb-4">MBTI 16型人格完整解读</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          MBTI（Myers-Briggs Type Indicator）是全球最广泛使用的性格分类工具。它通过四个维度——外向(E)vs内向(I)、感觉(S)vs直觉(N)、思考(T)vs情感(F)、判断(J)vs感知(P)——将人分为16种人格类型。了解自己的MBTI类型有助于职业规划、人际交往和自我成长。
        </p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-800">四个维度详解</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {[
                { title: "外向 (E) vs 内向 (I)", desc: "你从哪里获得能量？E型喜欢社交互动获取能量，I型喜欢独处反思恢复精力。" },
                { title: "感觉 (S) vs 直觉 (N)", desc: "你如何获取信息？S型关注具体事实和细节，N型关注整体模式和可能性。" },
                { title: "思考 (T) vs 情感 (F)", desc: "你如何做决定？T型依靠逻辑和客观分析，F型考虑人的感受和价值观。" },
                { title: "判断 (J) vs 感知 (P)", desc: "你如何应对外部世界？J型喜欢计划有序，P型喜欢灵活随性。" },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">16种人格类型完整列表</h2>
            <div className="space-y-4 mt-3">
              {types.map((t) => (
                <div key={t.code} className={`${t.color} rounded-xl p-5`}>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {t.code} — {t.name}
                  </h3>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">✨ 性格特点</span>
                      <p className="text-gray-600 mt-1">{t.traits}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">💼 适合职业</span>
                      <p className="text-gray-600 mt-1">{t.career}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">💕 恋爱风格</span>
                      <p className="text-gray-600 mt-1">{t.love}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-6 text-center">
            <p className="font-semibold text-gray-800 mb-2">想知道你的MBTI类型吗？</p>
            <p className="text-sm text-gray-600 mb-4">免费测试，只需3分钟，20道题精准定位你的人格类型</p>
            <Link href="/tools/mbti" className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors">
              开始免费MBTI测试 →
            </Link>
          </section>
        </div>
      </article>
      <Footer />
    </>
  );
}
