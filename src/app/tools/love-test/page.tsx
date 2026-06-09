'use client';

import { useState } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

interface Question {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: '喜欢的人超过3小时没回消息，你会？',
    options: [
      { label: '该干嘛干嘛，无所谓', score: 0 },
      { label: '有点在意但可以忍', score: 1 },
      { label: '每隔5分钟看一次手机', score: 3 },
      { label: '已经脑补了一场分手大戏', score: 5 },
    ],
  },
  {
    id: 2,
    text: '对方给你点了个赞，你什么反应？',
    options: [
      { label: '礼貌性回赞', score: 0 },
      { label: '开心一下下', score: 1 },
      { label: '觉得对方对你有意思', score: 3 },
      { label: '已经在想孩子叫什么了', score: 5 },
    ],
  },
  {
    id: 3,
    text: '朋友说你对象不好，你会？',
    options: [
      { label: '理性分析，可能朋友说得对', score: 0 },
      { label: '有点不开心但会思考', score: 1 },
      { label: '立刻反驳，为对象辩护', score: 3 },
      { label: '和朋友绝交', score: 5 },
    ],
  },
  {
    id: 4,
    text: '恋爱中你会为了对方改变自己吗？',
    options: [
      { label: '不会，我坚持做自己', score: 0 },
      { label: '小事上可以迁就', score: 1 },
      { label: '愿意改变很多习惯', score: 3 },
      { label: '对方喜欢什么样的我就变成什么样', score: 5 },
    ],
  },
  {
    id: 5,
    text: '分手后你的状态是？',
    options: [
      { label: '很快走出来，继续生活', score: 0 },
      { label: '难过一阵子就好', score: 1 },
      { label: '很久走不出来，反复回忆', score: 3 },
      { label: '感觉活不下去了', score: 5 },
    ],
  },
  {
    id: 6,
    text: '看到前任发了新动态，你会？',
    options: [
      { label: '划过，不在意', score: 0 },
      { label: '瞄一眼但不纠结', score: 1 },
      { label: '仔细研究，各种分析', score: 3 },
      { label: '立刻发一条更好的动态', score: 5 },
    ],
  },
  {
    id: 7,
    text: '约会前你会花多久准备？',
    options: [
      { label: '正常洗漱就出门', score: 0 },
      { label: '收拾一下，半小时左右', score: 1 },
      { label: '精心打扮，一小时起步', score: 3 },
      { label: '提前一天就开始焦虑准备', score: 5 },
    ],
  },
  {
    id: 8,
    text: '发现对方手机里有异性聊天，你？',
    options: [
      { label: '信任对方，不过问', score: 0 },
      { label: '有点好奇但不说', score: 1 },
      { label: '直接问清楚', score: 3 },
      { label: '偷偷查所有聊天记录', score: 5 },
    ],
  },
  {
    id: 9,
    text: '恋爱中觉得对方不够关心你，你会？',
    options: [
      { label: '直接沟通表达需求', score: 0 },
      { label: '暗示一下', score: 1 },
      { label: '生闷气等对方发现', score: 3 },
      { label: '崩溃大哭觉得对方不爱了', score: 5 },
    ],
  },
  {
    id: 10,
    text: '单身的时候你什么感觉？',
    options: [
      { label: '享受单身，自由自在', score: 0 },
      { label: '还好，偶尔想谈恋爱', score: 1 },
      { label: '渴望谈恋爱，很着急', score: 3 },
      { label: '人生不完整，必须找到另一半', score: 5 },
    ],
  },
];

const results = [
  {
    minScore: 0,
    maxScore: 10,
    emoji: '🧊',
    title: '冷静理智型',
    level: '轻度恋爱脑（0%）',
    desc: '你在感情中非常理智清醒，不会被爱情冲昏头脑。你懂得爱自己，也知道如何平衡爱情和生活。虽然偶尔会被说"不够浪漫"，但你这种态度往往能经营出健康的长期关系。',
    advice: '适当放下理性，允许自己为爱疯狂一次~',
  },
  {
    minScore: 11,
    maxScore: 22,
    emoji: '😊',
    title: '感性正常型',
    level: '中度恋爱脑（40%）',
    desc: '你在恋爱中会投入感情，但不会完全失去自我。你懂得享受爱情的甜蜜，也能在需要时保持理智。可以说是"刚刚好"的恋爱状态——有温度但不烫手。',
    advice: '保持这个状态，你已经做得很好了！',
  },
  {
    minScore: 23,
    maxScore: 34,
    emoji: '🥺',
    title: '重度投入型',
    level: '重度恋爱脑（70%）',
    desc: '一谈恋爱就容易上头！你非常重视感情，愿意为爱付出一切。虽然你的真心很珍贵，但有时候会过于投入而失去自我。朋友可能会觉得你"太恋爱脑了"。',
    advice: '恋爱重要，但也别忘了一直陪着你的朋友们哦~',
  },
  {
    minScore: 35,
    maxScore: 50,
    emoji: '😱',
    title: '恋爱脑晚期',
    level: '终极恋爱脑（95%）',
    desc: '恭喜你，你已经达到了恋爱脑的终极形态！爱情是你人生的全部意义，你愿意为对方做任何事。虽然你的爱很纯粹很热烈，但请一定记住：先爱自己，才能更好地爱别人。',
    advice: '建议把手机屏保换成"冷静"两个大字！',
  },
];

export default function LoveTestPage() {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleStart = () => setStep('test');

  const handleAnswer = (score: number) => {
    const newScore = totalScore + score;
    setTotalScore(newScore);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentQ(0);
    setTotalScore(0);
  };

  if (step === 'intro') {
    return (
      <div className="tool-container">
        <h1 className="tool-title">💕 恋爱脑测试</h1>
        <p className="tool-subtitle">朋友圈都在测！看看你有多恋爱脑</p>
        <AdBanner className="mb-8" />
        <div className="card max-w-lg mx-auto text-center">
          <p className="text-gray-600 mb-6 leading-relaxed">
            10道趣味测试题，测测你在恋爱中的"上头"程度。
            据说大多数人都在40%-70%之间，来挑战一下吧！
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-500">
            <div className="bg-pink-50 rounded-lg p-3">💝 10道题</div>
            <div className="bg-pink-50 rounded-lg p-3">⏱️ 约2分钟</div>
            <div className="bg-pink-50 rounded-lg p-3">😂 搞笑结果</div>
            <div className="bg-pink-50 rounded-lg p-3">📤 可分享</div>
          </div>
          <button onClick={handleStart} className="btn-primary w-full text-lg py-4">
            开始测试
          </button>
        </div>
        <AdBanner className="mt-8" />
      </div>
    );
  }

  if (step === 'test') {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div className="tool-container">
        <h1 className="tool-title">💕 恋爱脑测试</h1>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>第 {currentQ + 1}/{questions.length} 题</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="card mb-4">
            <h2 className="text-lg font-medium text-gray-800 mb-6">{q.text}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-pink-300 hover:bg-pink-50 transition-all text-gray-700"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {currentQ > 0 && (
            <button onClick={handlePrev} className="text-sm text-gray-400 hover:text-gray-600">
              ← 上一题
            </button>
          )}
        </div>
      </div>
    );
  }

  const result = results.find((r) => totalScore >= r.minScore && totalScore <= r.maxScore) || results[0];

  return (
    <div className="tool-container">
      <h1 className="tool-title">🎉 测试结果</h1>
      <p className="tool-subtitle">你的恋爱脑程度...</p>
      <AdBanner className="mb-8" />
      <div className="card max-w-lg mx-auto text-center animate-fade-in">
        <div className="text-7xl mb-4">{result.emoji}</div>
        <div className="text-2xl font-bold text-gray-800 mb-1">{result.title}</div>
        <div className="text-lg font-semibold text-pink-500 mb-4">{result.level}</div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-gradient-to-r from-pink-400 to-red-500 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${((totalScore - result.minScore) / (result.maxScore - result.minScore)) * 100}%` }}
          />
        </div>
        <p className="text-gray-600 mb-2 leading-relaxed">{result.desc}</p>
        <p className="text-sm text-amber-500 font-medium mb-6">💡 {result.advice}</p>
        <div className="flex flex-col gap-3">
          <ShareButton
            title="我测出了恋爱脑程度！"
            text={`我的恋爱脑程度是：${result.level}（${result.title}）！你也来测测？`}
          />
          <button onClick={handleRestart} className="btn-secondary">
            🔄 重新测试
          </button>
        </div>
      </div>
      <AdBanner className="mt-8" />
    </div>
  );
}
