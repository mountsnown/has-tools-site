'use client';

import { useState, useMemo } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: number;
  domain: string;
}

const questions: Question[] = [
  // 逻辑推理
  { id: 1, text: '如果所有A都是B，所有B都是C，那么：', options: ['所有A都是C', '有些A不是C', '所有C都是A', '无法确定'], answer: 0, domain: '逻辑推理' },
  { id: 2, text: '甲说：乙在说谎。乙说：丙在说谎。丙说：甲和乙都在说谎。请问谁说真话？', options: ['甲', '乙', '丙', '没人说真话'], answer: 1, domain: '逻辑推理' },
  { id: 3, text: '3, 7, 16, 32, 57, ?', options: ['73', '93', '83', '103'], answer: 1, domain: '逻辑推理' },
  { id: 4, text: '小王比小李大2岁，小张比小王大3岁，5年后三人年龄之和为80岁。小王现在几岁？', options: ['18岁', '20岁', '22岁', '24岁'], answer: 0, domain: '逻辑推理' },

  // 数学能力
  { id: 5, text: '一个水池，进水管3小时注满，放水管5小时放完。两管同时开，多久注满？', options: ['6.5小时', '7小时', '7.5小时', '8小时'], answer: 2, domain: '数学能力' },
  { id: 6, text: '从1到100的整数中，既不是3的倍数也不是5的倍数的数有多少个？', options: ['53个', '50个', '47个', '60个'], answer: 0, domain: '数学能力' },
  { id: 7, text: '若 √(x+3) + √(x) = 3，则 x = ?', options: ['0', '1', '2', '4'], answer: 1, domain: '数学能力' },
  { id: 8, text: '一个数列满足 a₁=1, aₙ₊₁=2aₙ+1，则 a₅ = ?', options: ['15', '31', '63', '127'], answer: 1, domain: '数学能力' },

  // 语言理解
  { id: 9, text: '以下哪个词的意思与其他三个不同？', options: ['慷慨', '吝啬', '大方', '豪爽'], answer: 1, domain: '语言理解' },
  { id: 10, text: '"杯弓蛇影"的含义最接近以下哪项？', options: ['实事求是', '疑神疑鬼', '小心谨慎', '胆大心细'], answer: 1, domain: '语言理解' },
  { id: 11, text: '以下哪组词语的关系与"氧气:呼吸"相同？', options: ['水:饮用', '阳光:光合作用', '食物:消化', '大脑:思考'], answer: 1, domain: '语言理解' },
  { id: 12, text: '选出最合适的词填空：他以_____的态度面对困难，最终_____地完成了任务。', options: ['坚韧/圆满', '消极/勉强', '乐观/草率', '谨慎/仓促'], answer: 0, domain: '语言理解' },

  // 空间推理
  { id: 13, text: '如果把一个立方体沿对角线切开，截面是什么形状？', options: ['正方形', '等边三角形', '矩形', '六边形'], answer: 2, domain: '空间推理' },
  { id: 14, text: '一个钟表显示3:15，时针和分针的夹角是多少度？', options: ['0°', '7.5°', '15°', '22.5°'], answer: 1, domain: '空间推理' },
  { id: 15, text: '把一张正方形纸对折3次，再剪去一个角，展开后最多有几个洞？', options: ['1个', '3个', '6个', '8个'], answer: 3, domain: '空间推理' },
  { id: 16, text: '站在北纬30°面向正北，你的影子在你的哪个方向？', options: ['取决于一天中的时间', '正北', '正南', '正西'], answer: 0, domain: '空间推理' },

  // 抽象思维
  { id: 17, text: '如果 "蜜蜂 → 蜂蜜" 是一种变换，那么 "3461 → 1346" 属于哪种排列？', options: ['随机排列', '升序排列', '降序排列', '首末交换'], answer: 1, domain: '抽象思维' },
  { id: 18, text: '以下哪个数字与众不同？', options: ['16 (2⁴=16)', '27 (3³=27)', '36 (6²=36)', '64 (4³=64)'], answer: 0, domain: '抽象思维' },
  { id: 19, text: 'A、B、C、D四人赛跑。A说"我不是最后一名"，B说"C是第一名"，C说"D不是最后一名"，D说"B说的是错的"。已知只有一人说真话，谁是最后一名？', options: ['A', 'B', 'C', 'D'], answer: 0, domain: '抽象思维' },
  { id: 20, text: '如果 ★+▲ = 15，▲+● = 20，●+★ = 17，那么 ★×▲×● = ?', options: ['280', '360', '420', '480'], answer: 2, domain: '抽象思维' },
];

const domainLabels: Record<string, string> = {
  '逻辑推理': '🧩 逻辑推理',
  '数学能力': '🔢 数学能力',
  '语言理解': '📖 语言理解',
  '空间推理': '🌐 空间推理',
  '抽象思维': '💡 抽象思维',
};

function calcIQ(rawScore: number, total: number): { iq: number; level: string; desc: string; color: string; emoji: string } {
  const pct = rawScore / total;
  const iq = Math.round(80 + pct * 65);

  let level: string, desc: string, color: string, emoji: string;
  if (iq >= 135) {
    level = '非常卓越';
    desc = '你的智力水平处于顶尖层次，在逻辑推理和抽象思维方面展现出极强的天赋。解决问题的能力远超常人。';
    color = 'text-purple-700'; emoji = '🌟';
  } else if (iq >= 125) {
    level = '优秀';
    desc = '你的智力水平远超多数人群，在分析和解决复杂问题时表现出色。你在学习和工作中拥有明显优势。';
    color = 'text-indigo-700'; emoji = '💎';
  } else if (iq >= 115) {
    level = '中上';
    desc = '你的智力水平高于平均水平，具备良好的学习和适应能力。在大多数领域都能有不错的表现。';
    color = 'text-blue-700'; emoji = '📘';
  } else if (iq >= 100) {
    level = '中等偏上';
    desc = '你的智力水平略高于人群平均水平，日常生活和工作中能够较好地应对各种挑战。';
    color = 'text-cyan-700'; emoji = '📗';
  } else if (iq >= 85) {
    level = '中等';
    desc = '你的智力水平处于人群平均水平，在多数认知任务中能够胜任。每个人都有自己独特的优势领域。';
    color = 'text-green-700'; emoji = '📙';
  } else {
    level = '需要提升';
    desc = '智力水平有提升空间。别灰心，认知能力可以通过阅读、学习和训练不断提高。每个人都有自己独特的才华。';
    color = 'text-orange-700'; emoji = '📕';
  }

  return { iq, level, desc, color, emoji };
}

export default function AdultIQTestPage() {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));

  const result = useMemo(() => {
    const score = answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 1 : 0), 0);
    const domainScores: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!domainScores[q.domain]) domainScores[q.domain] = { correct: 0, total: 0 };
      domainScores[q.domain].total++;
      if (answers[i] === q.answer) domainScores[q.domain].correct++;
    });
    return { score, domainScores, ...calcIQ(score, questions.length) };
  }, [answers]);

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
  const allAnswered = !answers.includes(-1);

  // Intro
  if (step === 'intro') {
    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-lg mx-auto">
          <h1 className="tool-title bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent">
            🧠 成人智商测试 (IQ Test)
          </h1>
          <p className="tool-subtitle">
            涵盖逻辑、数学、语言、空间和抽象思维5个维度，全面评估认知能力
          </p>

          <AdBanner />

          <div className="card mb-6">
            <h2 className="font-bold text-gray-800 mb-3 text-lg">📋 测试说明</h2>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-500">
              {[
                { icon: '📝', label: '20道题', desc: '约5分钟完成' },
                { icon: '🧩', label: '5个维度', desc: '全面认知评估' },
                { icon: '⏱️', label: '不限时', desc: '认真思考每一题' },
                { icon: '📊', label: '即时结果', desc: '答完立即出分' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg mb-0.5">{item.icon}</div>
                  <div className="font-medium text-gray-700 text-xs">{item.label}</div>
                  <div className="text-xs">{item.desc}</div>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-gray-800 mb-2 text-sm">评估维度：</h3>
            <div className="space-y-1.5 text-sm text-gray-600 mb-4">
              {Object.entries(domainLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-500 to-indigo-500" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mb-4 p-3 bg-amber-50 rounded-lg">
              💡 提示：本测试包含有一定难度的题目，请在安静环境中认真思考后作答，以获得最准确的评估结果。
            </p>

            <button onClick={() => setStep('test')} className="btn-primary w-full">
              开始测试
            </button>
          </div>

          <AdBanner />

          <p className="text-center text-xs text-gray-400 mt-4">
            ⚠️ 本测试为趣味自测工具，不能替代专业智力评估。
          </p>
        </div>
      </div>
    );
  }

  // Test
  if (step === 'test') {
    const q = questions[currentQ];

    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
                className="bg-gradient-to-r from-slate-600 to-indigo-500 h-2 rounded-full transition-all duration-300"
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
                      ? 'border-indigo-500 bg-indigo-50'
                      : answers[currentQ] !== -1
                        ? 'border-gray-100 opacity-40'
                        : 'border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                >
                  <span className="font-medium text-gray-700">
                    {String.fromCharCode(65 + i)}. {opt}
                  </span>
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
    <div className="tool-container min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-lg mx-auto">
        <h1 className="tool-title bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent">
          🧠 你的智商测试结果
        </h1>
        <p className="tool-subtitle">5维度认知能力评估 · 20题标准测试</p>

        <AdBanner />

        {/* Score */}
        <div className="card mb-4 text-center">
          <div className="text-5xl mb-2">{result.emoji}</div>
          <div className={`text-5xl font-extrabold ${result.color} mb-1`}>{result.iq}</div>
          <div className="text-lg font-bold text-gray-800">{result.level}</div>
          <div className="text-sm text-gray-500 mt-1 mb-4">
            正确 {result.score}/{questions.length} 题
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div
              className="bg-gradient-to-r from-slate-600 to-indigo-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${Math.round((result.score / questions.length) * 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-left">{result.desc}</p>
        </div>

        {/* Domain Breakdown */}
        <div className="card mb-4">
          <h3 className="font-bold text-gray-800 mb-3">📊 各维度正确率</h3>
          <div className="space-y-3">
            {Object.entries(domainLabels).map(([key, label]) => {
              const ds = result.domainScores[key];
              const pct = ds ? Math.round((ds.correct / ds.total) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{label}</span>
                    <span className="text-gray-400 text-xs">
                      {ds?.correct}/{ds?.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        pct >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                          : pct >= 50 ? 'bg-gradient-to-r from-blue-400 to-indigo-500'
                          : 'bg-gradient-to-r from-amber-400 to-orange-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* IQ Scale */}
        <div className="card mb-4">
          <h3 className="font-bold text-gray-800 mb-3">📖 IQ 分数参照</h3>
          <div className="space-y-1.5 text-xs">
            {[
              { range: '135+', label: '非常卓越', c: 'text-purple-600' },
              { range: '125-134', label: '优秀', c: 'text-indigo-600' },
              { range: '115-124', label: '中上', c: 'text-blue-600' },
              { range: '100-114', label: '中等偏上', c: 'text-cyan-600' },
              { range: '85-99', label: '中等', c: 'text-green-600' },
              { range: '80-84', label: '需要提升', c: 'text-orange-600' },
            ].map((r) => (
              <div key={r.range} className={`flex items-center justify-between py-1.5 px-3 rounded-lg ${result.iq >= parseInt(r.range) && result.iq <= (r.range.includes('+') ? 200 : parseInt(r.range.split('-')[1])) ? 'bg-indigo-50 font-semibold' : 'bg-gray-50'}`}>
                <span className="font-medium">{r.range}</span>
                <span className={r.c}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="card mb-4 text-center">
          <p className="text-sm text-gray-500 mb-3">分享你的结果给朋友</p>
          <ShareButton
            title="我测出了智商水平！"
            text={`我在888工具站测出了智商：${result.iq}（${result.level}），快来测测你的IQ吧！`}
          />
        </div>

        <AdBanner />

        <button onClick={restart} className="w-full mt-4 py-3 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          重新测试
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          ⚠️ 本测试为趣味自测工具，不能替代专业智力评估。如需专业测评，请咨询心理学专业机构。
        </p>
      </div>
    </div>
  );
}
