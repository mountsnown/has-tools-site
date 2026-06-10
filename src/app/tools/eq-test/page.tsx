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
  // 自我认知 (Self-awareness) - 4题
  { id: 1, text: '当你感到情绪波动时，你能清楚地意识到自己正在经历什么情绪吗？', options: [{ label: '完全意识不到', score: 0 }, { label: '偶尔能意识到', score: 1 }, { label: '经常能意识到', score: 2 }, { label: '总是清楚地知道', score: 3 }], domain: '自我认知' },
  { id: 2, text: '别人对你的评价与你对自己的认知一致吗？', options: [{ label: '完全不一致', score: 0 }, { label: '少数一致', score: 1 }, { label: '大部分一致', score: 2 }, { label: '高度一致', score: 3 }], domain: '自我认知' },
  { id: 3, text: '你能否准确判断自己在不同情境下的优势和劣势？', options: [{ label: '完全不能', score: 0 }, { label: '偶尔可以', score: 1 }, { label: '多数时候可以', score: 2 }, { label: '总是可以准确判断', score: 3 }], domain: '自我认知' },
  { id: 4, text: '当你做了错误的决定后，你会：', options: [{ label: '从不反思', score: 0 }, { label: '偶尔想想', score: 1 }, { label: '认真分析原因', score: 2 }, { label: '深入复盘并总结教训', score: 3 }], domain: '自我认知' },

  // 情绪管理 (Self-regulation) - 4题
  { id: 5, text: '面对突如其来的压力时，你的反应是？', options: [{ label: '情绪失控，无法应对', score: 0 }, { label: '焦虑不安，勉强应对', score: 1 }, { label: '能保持基本冷静', score: 2 }, { label: '从容应对，快速调整心态', score: 3 }], domain: '情绪管理' },
  { id: 6, text: '别人当面批评你时，你通常会：', options: [{ label: '立刻反击或愤怒', score: 0 }, { label: '内心不快但不表达', score: 1 }, { label: '先听对方说完再回应', score: 2 }, { label: '冷静倾听，理性回应', score: 3 }], domain: '情绪管理' },
  { id: 7, text: '遇到挫折或失败后，你的恢复速度是？', options: [{ label: '很久都走不出来', score: 0 }, { label: '需要较长时间', score: 1 }, { label: '较快恢复', score: 2 }, { label: '很快振作并继续前进', score: 3 }], domain: '情绪管理' },
  { id: 8, text: '在激动或愤怒时，你能控制住不说让自己后悔的话吗？', options: [{ label: '完全控制不住', score: 0 }, { label: '大多数时候控制不住', score: 1 }, { label: '多数时候能控制', score: 2 }, { label: '总是能控制住', score: 3 }], domain: '情绪管理' },

  // 自我激励 (Motivation) - 4题
  { id: 9, text: '面对一个长期且困难的目标，你通常会：', options: [{ label: '很快放弃', score: 0 }, { label: '坚持一段时间后放弃', score: 1 }, { label: '坚持较长时间但会动摇', score: 2 }, { label: '持续坚持直到达成', score: 3 }], domain: '自我激励' },
  { id: 10, text: '在没有外部奖励和认可的情况下，你的工作状态是？', options: [{ label: '完全没动力', score: 0 }, { label: '需要一些外部督促', score: 1 }, { label: '基本能自律', score: 2 }, { label: '充满内驱力，主动进取', score: 3 }], domain: '自我激励' },
  { id: 11, text: '对未来的规划，你通常持什么态度？', options: [{ label: '悲观消极，觉得没有希望', score: 0 }, { label: '有时乐观有时悲观', score: 1 }, { label: '整体积极但偶有担忧', score: 2 }, { label: '充满信心，积极规划', score: 3 }], domain: '自我激励' },
  { id: 12, text: '当计划被打乱时，你的反应是？', options: [{ label: '彻底放弃计划', score: 0 }, { label: '感到沮丧但消极应对', score: 1 }, { label: '调整计划继续前进', score: 2 }, { label: '灵活应变并寻找新机会', score: 3 }], domain: '自我激励' },

  // 共情能力 (Empathy) - 4题
  { id: 13, text: '看到身边的人情绪低落，你会：', options: [{ label: '完全察觉不到', score: 0 }, { label: '能察觉但不知道怎么回应', score: 1 }, { label: '会主动关心询问', score: 2 }, { label: '敏锐察觉并给予恰当支持', score: 3 }], domain: '共情能力' },
  { id: 14, text: '当别人向你倾诉烦恼时，你最可能的反应是：', options: [{ label: '觉得无聊或不耐烦', score: 0 }, { label: '听但心不在焉', score: 1 }, { label: '认真倾听并给予安慰', score: 2 }, { label: '感同身受并帮助分析解决', score: 3 }], domain: '共情能力' },
  { id: 15, text: '面对与你观点完全不同的人，你通常会：', options: [{ label: '完全无法理解', score: 0 }, { label: '表面接受但不认同', score: 1 }, { label: '尝试理解对方立场', score: 2 }, { label: '换位思考并从中学到东西', score: 3 }], domain: '共情能力' },
  { id: 16, text: '团队中有人落后或遇到困难，你会：', options: [{ label: '与我无关，不关注', score: 0 }, { label: '注意到了但不行动', score: 1 }, { label: '提供力所能及的帮助', score: 2 }, { label: '主动伸出援手并鼓励对方', score: 3 }], domain: '共情能力' },

  // 社交技巧 (Social skills) - 4题
  { id: 17, text: '在团队合作中，你通常扮演什么角色？', options: [{ label: '独来独往，不参与协作', score: 0 }, { label: '被动配合，只完成分配任务', score: 1 }, { label: '主动沟通，积极协作', score: 2 }, { label: '善于协调各方，推动团队前进', score: 3 }], domain: '社交技巧' },
  { id: 18, text: '与他人发生分歧时，你的处理方式是？', options: [{ label: '坚持己见，不愿妥协', score: 0 }, { label: '回避冲突，不再讨论', score: 1 }, { label: '寻求折中方案', score: 2 }, { label: '有效沟通达成双赢', score: 3 }], domain: '社交技巧' },
  { id: 19, text: '在社交场合中，你通常感觉如何？', options: [{ label: '极度不适，想逃离', score: 0 }, { label: '有些紧张，被动参与', score: 1 }, { label: '比较自在，能融入', score: 2 }, { label: '游刃有余，享受交往', score: 3 }], domain: '社交技巧' },
  { id: 20, text: '你能否有效地说服和影响他人？', options: [{ label: '从来没有影响力', score: 0 }, { label: '偶尔能影响', score: 1 }, { label: '多数时候能有效说服', score: 2 }, { label: '善于沟通并自然赢得认同', score: 3 }], domain: '社交技巧' },
];

const domainLabels: Record<string, string> = {
  '自我认知': '🧘 自我认知',
  '情绪管理': '🌊 情绪管理',
  '自我激励': '🔥 自我激励',
  '共情能力': '💗 共情能力',
  '社交技巧': '🤝 社交技巧',
};

function getEQResult(totalScore: number) {
  if (totalScore >= 50) {
    return {
      level: '情商极高',
      desc: '你拥有出色的情商！你善于觉察和管理自己的情绪，在人际交往中游刃有余。你不仅能够理解他人的感受，还能有效处理各种复杂的社交情境。这种能力会让你在职场和生活中都占据优势。',
      color: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      emoji: '🌟',
    };
  }
  if (totalScore >= 40) {
    return {
      level: '情商较高',
      desc: '你的情商处于较高水平。你在大多数情况下能够管理好情绪、理解他人，人际关系比较和谐。在某些高压力或复杂情境下还有提升空间，继续觉察和完善自己会更好。',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      emoji: '😊',
    };
  }
  if (totalScore >= 28) {
    return {
      level: '情商一般',
      desc: '你的情商处于中等水平，这是大多数人的状态。你在某些方面有一定优势，但在情绪管理或人际交往上还有成长空间。建议多关注自身情绪变化，练习换位思考和有效沟通。',
      color: 'text-cyan-700',
      bg: 'bg-cyan-50',
      border: 'border-cyan-300',
      emoji: '🤔',
    };
  }
  return {
    level: '有待提升',
    desc: '你的情商还有较大提升空间。别担心，情商不是天生的，而是可以通过刻意练习提高的。建议从觉察自己的情绪开始，学习情绪管理技巧，多练习倾听和共情，你会发现自己的改变。',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    emoji: '🌱',
  };
}

export default function EQTestPage() {
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

  const result = useMemo(() => getEQResult(totalScore), [totalScore]);

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

  // Intro
  if (step === 'intro') {
    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-lg mx-auto">
          <h1 className="tool-title bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            🧘 情商测试 (EQ Test)
          </h1>
          <p className="tool-subtitle">
            基于丹尼尔·戈尔曼情商模型，从5个维度全面评估你的情商水平
          </p>

          <AdBanner />

          <div className="card mb-6">
            <h2 className="font-bold text-gray-800 mb-3 text-lg">📋 测试说明</h2>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-500">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg mb-0.5">📝</div>
                <div className="font-medium text-gray-700">20道题</div>
                <div className="text-xs">约3分钟完成</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg mb-0.5">🧩</div>
                <div className="font-medium text-gray-700">5个维度</div>
                <div className="text-xs">全面评估情商</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg mb-0.5">🔬</div>
                <div className="font-medium text-gray-700">科学模型</div>
                <div className="text-xs">戈尔曼情商理论</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg mb-0.5">📊</div>
                <div className="font-medium text-gray-700">维度分析</div>
                <div className="text-xs">各维度详细评分</div>
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 mb-2 text-sm">五大评估维度：</h3>
            <div className="space-y-1.5 text-sm text-gray-600 mb-4">
              {Object.entries(domainLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('test')}
              className="btn-primary w-full"
            >
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
    const answered = answers[currentQ] !== -1;

    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="card mb-4 animate-fade-in">
            <p className="text-lg font-medium text-gray-800 mb-6">{q.text}</p>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const selected = answers[currentQ] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-100 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <span className="text-gray-700">{opt.label}</span>
                  </button>
                );
              })}
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
  const maxScore = questions.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="tool-container min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-lg mx-auto">
        <h1 className="tool-title bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
          🧘 你的情商测试结果
        </h1>
        <p className="tool-subtitle">基于戈尔曼情商模型 · 20题全面评估</p>

        <AdBanner />

        {/* Score Card */}
        <div className={`card mb-4 text-center ${result.bg} border-2 ${result.border}`}>
          <div className="text-5xl mb-2">{result.emoji}</div>
          <div className={`text-4xl font-extrabold ${result.color} mb-1`}>{result.level}</div>
          <div className="text-sm text-gray-500 mb-3">
            总分 {totalScore}/{maxScore} · 得分率 {percentage}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-left">{result.desc}</p>
        </div>

        {/* Domain Breakdown */}
        <div className="card mb-4">
          <h3 className="font-bold text-gray-800 mb-3">📊 各维度得分</h3>
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
                        pct >= 80 ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
                          : pct >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
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

        {/* Share */}
        <div className="card mb-4 text-center">
          <p className="text-sm text-gray-500 mb-3">分享你的结果给朋友</p>
          <ShareButton
            title="我测出了情商水平！"
            text={`我在888工具站测出了情商等级：${result.level}（得分率${percentage}%），快来测测你的情商有多高！`}
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
