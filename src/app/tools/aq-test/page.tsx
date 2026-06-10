'use client';

import { useState, useMemo } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

interface Question {
  id: number;
  text: string;
  options: { label: string; score: number }[];
  domain: string;
}

const questions: Question[] = [
  // 控制感 (Control) - 4题
  { id: 1, text: '面对突如其来的困难或挫折，你通常觉得：', options: [{ label: '完全无能为力', score: 0 }, { label: '只能被动接受', score: 1 }, { label: '有一些可控的部分', score: 2 }, { label: '总可以找到我能做的事情来改善', score: 3 }], domain: '控制感' },
  { id: 2, text: '当工作或生活中的事情偏离预期时：', options: [{ label: '觉得一切都不受控制', score: 0 }, { label: '感到慌乱，只能等待', score: 1 }, { label: '尝试找到自己能掌控的部分', score: 2 }, { label: '相信能通过行动影响结果', score: 3 }], domain: '控制感' },
  { id: 3, text: '面对一个复杂的难题，你的第一反应是：', options: [{ label: '这太难了，我解决不了', score: 0 }, { label: '试试看，但没信心', score: 1 }, { label: '分析问题，逐步解决', score: 2 }, { label: '积极面对，相信能找到办法', score: 3 }], domain: '控制感' },
  { id: 4, text: '当重要决策的结果不如预期时：', options: [{ label: '后悔自己做了这个决定', score: 0 }, { label: '自责但不知如何补救', score: 1 }, { label: '接受现实并调整策略', score: 2 }, { label: '从中学习并积极寻找新方案', score: 3 }], domain: '控制感' },

  // 起因归属 (Origin & Ownership) - 4题
  { id: 5, text: '当遇到失败时，你倾向于认为原因是：', options: [{ label: '全是我的错', score: 0 }, { label: '全是外部因素造成的', score: 1 }, { label: '部分是我的原因，部分是外部原因', score: 2 }, { label: '客观分析内外因，明确自己可改进的部分', score: 3 }], domain: '起因归属' },
  { id: 6, text: '团队项目出问题时，你通常：', options: [{ label: '把责任推给他人', score: 0 }, { label: '全揽在自己身上', score: 1 }, { label: '承认自己的部分责任', score: 2 }, { label: '客观分析原因并主动承担应负的责任', score: 3 }], domain: '起因归属' },
  { id: 7, text: '被人误解或批评时，你的反应是？', options: [{ label: '全是对方的错，与我无关', score: 0 }, { label: '我肯定哪里做错了', score: 1 }, { label: '思考双方的立场和原因', score: 2 }, { label: '理性分析误解根源并主动沟通澄清', score: 3 }], domain: '起因归属' },
  { id: 8, text: '当你实现了某个目标，你通常会想：', options: [{ label: '纯粹是运气好', score: 0 }, { label: '全靠我自己的努力', score: 1 }, { label: '运气和努力都有', score: 2 }, { label: '有运气的成分，但自己的努力和能力是关键', score: 3 }], domain: '起因归属' },

  // 影响范围 (Reach) - 4题
  { id: 9, text: '工作上出了差错后，你的感受是：', options: [{ label: '我的人生全完了', score: 0 }, { label: '影响到了生活和心情', score: 1 }, { label: '只在工作上有影响', score: 2 }, { label: '就事论事，不影响其他方面', score: 3 }], domain: '影响范围' },
  { id: 10, text: '一段关系出现矛盾时，你会：', options: [{ label: '觉得所有关系都搞不好', score: 0 }, { label: '连带影响其他社交', score: 1 }, { label: '仅在当前关系中感受到影响', score: 2 }, { label: '把问题限定在具体事件上，不影响其他', score: 3 }], domain: '影响范围' },
  { id: 11, text: '一次面试或考试失败后：', options: [{ label: '觉得自己什么都做不好', score: 0 }, { label: '影响到其他方面的信心', score: 1 }, { label: '只影响这类的信心', score: 2 }, { label: '只当一次独立事件，继续前行', score: 3 }], domain: '影响范围' },
  { id: 12, text: '当收到一个负面反馈时：', options: [{ label: '否定自己的全部价值', score: 0 }, { label: '影响整天的心情', score: 1 }, { label: '只在相关领域有些挫败感', score: 2 }, { label: '客观看待，仅作为改善的参考', score: 3 }], domain: '影响范围' },

  // 持续性 (Endurance) - 4题
  { id: 13, text: '遇到一个让你沮丧的事情后，你的负面情绪通常持续多久？', options: [{ label: '很久都走不出来', score: 0 }, { label: '持续一两天', score: 1 }, { label: '几小时后就好', score: 2 }, { label: '很快调整过来', score: 3 }], domain: '持续性' },
  { id: 14, text: '对于当前面临的困难，你倾向于认为：', options: [{ label: '这困境会永远持续', score: 0 }, { label: '会持续很长时间', score: 1 }, { label: '是暂时的，会过去', score: 2 }, { label: '很快就会解决，充满信心', score: 3 }], domain: '持续性' },
  { id: 15, text: '经历一次重大挫折后，你相信自己：', options: [{ label: '再也站不起来了', score: 0 }, { label: '需要很长时间才能恢复', score: 1 }, { label: '假以时日可以走出来', score: 2 }, { label: '这次经历会让我更强大', score: 3 }], domain: '持续性' },
  { id: 16, text: '面对困境时，你对未来的看法是：', options: [{ label: '完全没有希望', score: 0 }, { label: '悲观，觉得不会好转', score: 1 }, { label: '谨慎乐观，会慢慢好起来', score: 2 }, { label: '充满希望，困境是暂时的', score: 3 }], domain: '持续性' },

  // 应对能力 (Coping) - 4题
  { id: 17, text: '压力很大的时候，你能找到有效的减压方式吗？', options: [{ label: '完全找不到', score: 0 }, { label: '很少能找到', score: 1 }, { label: '有一些有效的方法', score: 2 }, { label: '有多种成熟的应对策略', score: 3 }], domain: '应对能力' },
  { id: 18, text: '面对不确定性时，你的处理方式是？', options: [{ label: '极度焦虑，无法行动', score: 0 }, { label: '担心但被动等待', score: 1 }, { label: '做好准备，以应对各种可能', score: 2 }, { label: '坦然接受不确定性并积极规划', score: 3 }], domain: '应对能力' },
  { id: 19, text: '当你感到被压得喘不过气时，你会：', options: [{ label: '彻底崩溃', score: 0 }, { label: '硬撑但效率很低', score: 1 }, { label: '适当休息并调整节奏', score: 2 }, { label: '寻求帮助并重新规划优先级', score: 3 }], domain: '应对能力' },
  { id: 20, text: '完成一件非常困难的事情后，你通常会：', options: [{ label: '庆幸终于结束了，不想再回顾', score: 0 }, { label: '简单放松一下就好', score: 1 }, { label: '总结经验，为下次做准备', score: 2 }, { label: '系统复盘，并将经验应用到未来', score: 3 }], domain: '应对能力' },
];

const domainLabels: Record<string, string> = {
  '控制感': '🎮 控制感',
  '起因归属': '🎯 起因归属',
  '影响范围': '🌐 影响范围',
  '持续性': '⏳ 持续性',
  '应对能力': '🛡️ 应对能力',
};

function getAQResult(totalScore: number) {
  if (totalScore >= 50) {
    return {
      level: '逆商极高 — 攀岩者',
      desc: '你拥有极高的逆商！像攀岩者一样，你能够迎难而上，把挫折视为成长的机会。你对困难有强烈的控制感，善于将问题的影响限定在合理范围内，并相信困境是暂时的。这种能力将使你在事业和生活中始终立于不败之地。',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      emoji: '🏔️',
    };
  }
  if (totalScore >= 40) {
    return {
      level: '逆商较高 — 奋进者',
      desc: '你的逆商处于较高水平。面对逆境时，你通常能够保持积极的应对态度，有较好的情绪调节能力。偶尔在面对重大挫折时会有短暂的退缩，但总体上能够战胜困难。继续锻炼逆商，你还能变得更强。',
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-300',
      emoji: '⛰️',
    };
  }
  if (totalScore >= 28) {
    return {
      level: '逆商一般 — 露营者',
      desc: '你的逆商处于中等水平。当困难来临时，你有时能够积极应对，但有时也会感到无力。你容易让一个领域的挫折影响到其他生活方面。建议练习把问题限定在具体范围内，并相信困难只是暂时的。',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      emoji: '🏕️',
    };
  }
  return {
    level: '逆商较低 — 放弃者',
    desc: '你的逆商还有较大的提升空间。面对困难时你容易感到无力和消极，挫折会较大范围地影响你的生活，且负面情绪持续时间较长。好消息是逆商是可以通过训练提高的。建议从小目标开始，逐步建立对困难的掌控感。',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    emoji: '🌄',
  };
}

export default function AQTestPage() {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));

  const totalScore = useMemo(
    () => answers.reduce((sum, a, i) => sum + (a >= 0 ? questions[i].options[a].score : 0), 0),
    [answers],
  );

  const domainScores = useMemo(() => {
    const ds: Record<string, { score: number; max: number }> = {};
    questions.forEach((q, i) => {
      if (!ds[q.domain]) ds[q.domain] = { score: 0, max: 0 };
      ds[q.domain].max += 3;
      if (answers[i] >= 0) ds[q.domain].score += q.options[answers[i]].score;
    });
    return ds;
  }, [answers]);

  const result = useMemo(() => getAQResult(totalScore), [totalScore]);

  const handleAnswer = (optIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optIdx;
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 200);
    }
  };

  const prevQ = () => { if (currentQ > 0) setCurrentQ(currentQ - 1); };
  const restart = () => {
    setStep('intro');
    setCurrentQ(0);
    setAnswers(new Array(questions.length).fill(-1));
  };

  const progress = ((currentQ + 1) / questions.length) * 100;
  const maxScore = questions.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Intro
  if (step === 'intro') {
    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-lg mx-auto">
          <h1 className="tool-title bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            🏔️ 逆商测试 (AQ Test)
          </h1>
          <p className="tool-subtitle">
            基于保罗·史托兹逆商理论，从5个维度评估你面对逆境时的应对能力
          </p>

          <AdBanner />

          <div className="card mb-6">
            <h2 className="font-bold text-gray-800 mb-3 text-lg">📋 测试说明</h2>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-500">
              {[
                { icon: '📝', label: '20道题', desc: '约3分钟完成' },
                { icon: '🧩', label: '5个维度', desc: 'C.O.R.E模型' },
                { icon: '📚', label: '史托兹理论', desc: '国际权威逆商模型' },
                { icon: '📊', label: '即时结果', desc: '答完立即查看' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg mb-0.5">{item.icon}</div>
                  <div className="font-medium text-gray-700 text-xs">{item.label}</div>
                  <div className="text-xs">{item.desc}</div>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-gray-800 mb-2 text-sm">C.O.R.E 四维模型：</h3>
            <div className="space-y-1.5 text-sm text-gray-600 mb-4">
              {[
                { key: '控制感', label: 'C - Control 控制感：你对困境有多大的掌控力？' },
                { key: '起因归属', label: 'O - Origin & Ownership 起因归属：你如何归因成败？' },
                { key: '影响范围', label: 'R - Reach 影响范围：挫折影响你生活的多广？' },
                { key: '持续性', label: 'E - Endurance 持续性：困境会持续多久？' },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mb-4 p-3 bg-amber-50 rounded-lg">
              💡 逆商（Adversity Quotient）衡量你在逆境中的应对能力。高逆商者在职场和生活中更有韧性和成功率。
            </p>

            <button onClick={() => setStep('test')} className="btn-primary w-full">
              开始测试
            </button>
          </div>

          <AdBanner />

          <p className="text-center text-xs text-gray-400 mt-4">
            ⚠️ 本测试为趣味自测工具，不能替代专业心理评估。
          </p>
        </div>
      </div>
    );
  }

  // Test
  if (step === 'test') {
    const q = questions[currentQ];

    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-lg mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>第 {currentQ + 1}/{questions.length} 题</span>
              <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-gray-100">
                {domainLabels[q.domain]}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="card mb-4 animate-fade-in">
            <p className="text-lg font-medium text-gray-800 mb-6">{q.text}</p>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    answers[currentQ] === i
                      ? 'border-emerald-500 bg-emerald-50'
                      : answers[currentQ] !== -1
                        ? 'border-gray-100 opacity-40'
                        : 'border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <span className="text-gray-700">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {currentQ > 0 && (
              <button onClick={prevQ} className="btn-secondary flex-1">上一题</button>
            )}
            {currentQ === questions.length - 1 && answers[currentQ] !== -1 && (
              <button onClick={() => setStep('result')} className="btn-primary flex-1">
                查看结果
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Result
  return (
    <div className="tool-container min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-lg mx-auto">
        <h1 className="tool-title bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          🏔️ 你的逆商测试结果
        </h1>
        <p className="tool-subtitle">基于保罗·史托兹 C.O.R.E 模型 · 20题全面评估</p>

        <AdBanner />

        {/* Score Card */}
        <div className={`card mb-4 text-center ${result.bg} border-2 ${result.border}`}>
          <div className="text-5xl mb-2">{result.emoji}</div>
          <div className={`text-xl font-extrabold ${result.color} mb-1`}>{result.level}</div>
          <div className="text-sm text-gray-500 mb-3">
            总分 {totalScore}/{maxScore} · 得分率 {percentage}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-left">{result.desc}</p>
        </div>

        {/* Domain Breakdown */}
        <div className="card mb-4">
          <h3 className="font-bold text-gray-800 mb-3">📊 C.O.R.E 各维度得分</h3>
          <div className="space-y-3">
            {Object.entries(domainLabels).map(([key, label]) => {
              const ds = domainScores[key];
              const pct = ds ? Math.round((ds.score / ds.max) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{label}</span>
                    <span className="text-gray-400 text-xs">{ds?.score}/{ds?.max}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        pct >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                          : pct >= 60 ? 'bg-gradient-to-r from-teal-500 to-cyan-500'
                          : pct >= 40 ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                          : 'bg-gradient-to-r from-orange-500 to-red-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AQ Levels Reference */}
        <div className="card mb-4">
          <h3 className="font-bold text-gray-800 mb-3">📖 逆商等级参照</h3>
          <div className="space-y-1.5 text-xs">
            {[
              { range: '50-60分', label: '攀岩者：迎难而上，把挫折当机会', c: 'text-emerald-600', icon: '🏔️' },
              { range: '40-49分', label: '奋进者：能克服困难，偶有动摇', c: 'text-teal-600', icon: '⛰️' },
              { range: '28-39分', label: '露营者：有时能应对，有时感无力', c: 'text-amber-600', icon: '🏕️' },
              { range: '0-27分', label: '放弃者：容易退缩，需要提升韧性', c: 'text-orange-600', icon: '🌄' },
            ].map((r) => (
              <div key={r.range} className={`flex items-center justify-between py-1.5 px-3 rounded-lg ${
                (r.range.startsWith(String(Math.floor(totalScore / 10) * 10)) || (totalScore >= 50 && r.range === '50-60分') || (totalScore < 28 && r.range === '0-27分'))
                  ? 'bg-emerald-50 font-semibold' : 'bg-gray-50'
              }`}>
                <span className="font-medium">
                  {r.icon} {r.range}
                </span>
                <span className={r.c}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="card mb-4 text-center">
          <p className="text-sm text-gray-500 mb-3">分享你的结果给朋友</p>
          <ShareButton
            title="我测出了逆商水平！"
            text={`我在888工具站测出了逆商等级：${result.level}（得分率${percentage}%），快来测测你的逆商有多高！`}
          />
        </div>

        <AdBanner />

        <button onClick={restart} className="w-full mt-4 py-3 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          重新测试
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          ⚠️ 本测试为趣味自测工具，不能替代专业心理评估。如需专业测评，请咨询心理咨询师。
        </p>
      </div>
    </div>
  );
}
