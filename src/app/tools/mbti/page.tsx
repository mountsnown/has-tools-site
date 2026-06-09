'use client';

import { useState } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

interface Question {
  id: number;
  text: string;
  options: [string, string];
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
}

const questions: Question[] = [
  { id: 1, text: '参加聚会时，你通常会：', options: ['和很多人聊天，认识新朋友', '和熟悉的朋友待在一起'], dimension: 'EI' },
  { id: 2, text: '你更喜欢哪种学习方式？', options: ['通过实践和尝试', '通过阅读和理论学习'], dimension: 'SN' },
  { id: 3, text: '做决定时，你更多依靠：', options: ['逻辑和理性分析', '直觉和内心感受'], dimension: 'TF' },
  { id: 4, text: '你更喜欢的工作方式是：', options: ['按计划一步步执行', '灵活应变，随性而为'], dimension: 'JP' },
  { id: 5, text: '空闲时间你更喜欢：', options: ['外出社交或活动', '在家独处放松'], dimension: 'EI' },
  { id: 6, text: '看待事物时，你更关注：', options: ['具体的细节和事实', '整体的模式和可能性'], dimension: 'SN' },
  { id: 7, text: '朋友遇到困难向你倾诉，你会：', options: ['分析问题，给出解决方案', '先共情安慰，给予情感支持'], dimension: 'TF' },
  { id: 8, text: '面对截止日期，你通常：', options: ['提前规划，按时完成', '最后一刻冲刺完成'], dimension: 'JP' },
  { id: 9, text: '在新的环境中，你感觉：', options: ['兴奋，喜欢认识新朋友', '谨慎，需要时间适应'], dimension: 'EI' },
  { id: 10, text: '你更相信：', options: ['实际经验和数据', '灵感和第六感'], dimension: 'SN' },
  { id: 11, text: '处理冲突时，你更注重：', options: ['公平和原则', '和谐和关系'], dimension: 'TF' },
  { id: 12, text: '旅行时，你更喜欢：', options: ['提前做好详细攻略', '随遇而安，走到哪算哪'], dimension: 'JP' },
  { id: 13, text: '工作时你更喜欢：', options: ['团队合作，互相讨论', '独立完成，深度思考'], dimension: 'EI' },
  { id: 14, text: '描述事物时，你倾向于：', options: ['用具体的例子和细节', '用比喻和抽象概念'], dimension: 'SN' },
  { id: 15, text: '你认为更重要的是：', options: ['追求真理和正确', '维护关系和感受'], dimension: 'TF' },
  { id: 16, text: '收拾房间或办公桌时：', options: ['喜欢整洁有序，物品归位', '随性就好，乱中有序'], dimension: 'JP' },
  { id: 17, text: '接到一个电话，你希望：', options: ['直接打电话说', '先发消息确认是否方便'], dimension: 'EI' },
  { id: 18, text: '学习新东西时，你更关心：', options: ['怎么用，实际效果如何', '为什么，背后的原理是什么'], dimension: 'SN' },
  { id: 19, text: '批评别人时，你通常：', options: ['直接指出问题', '委婉表达，怕伤害对方'], dimension: 'TF' },
  { id: 20, text: '你的生活状态更接近：', options: ['有规律，喜欢确定性', '随性，享受不确定性'], dimension: 'JP' },
];

const typeDescriptions: Record<string, { name: string; traits: string; career: string; love: string }> = {
  ISTJ: { name: '物流师', traits: '务实、严谨、可靠、有责任感', career: '会计、审计、公务员、军人、工程师', love: '忠诚稳定，不善于表达感情，用行动证明爱' },
  ISFJ: { name: '守护者', traits: '温暖、细心、忠诚、乐于助人', career: '护士、教师、社工、行政、心理咨询师', love: '温柔体贴，默默付出，需要被珍惜和认可' },
  INFJ: { name: '提倡者', traits: '理想主义、有洞察力、富有同情心', career: '作家、心理咨询师、人力资源、教育工作者', love: '追求灵魂伴侣，深情且专一，渴望深度连接' },
  INTJ: { name: '建筑师', traits: '独立、战略思维、追求卓越、理性', career: '科学家、工程师、策略顾问、创业者', love: '理性克制，忠诚度高，需要独立空间' },
  ISTP: { name: '鉴赏家', traits: '冷静、灵活、动手能力强、善于分析', career: '程序员、机械师、侦探、飞行员', love: '行动派，用实际行为表达爱，不喜欢甜言蜜语' },
  ISFP: { name: '探险家', traits: '艺术气质、温和、随性、享受当下', career: '设计师、摄影师、艺术家、花艺师', love: '浪漫随性，重视感官体验，追求自由恋爱' },
  INFP: { name: '调停者', traits: '理想主义、善良、有创造力、敏感', career: '作家、编辑、心理咨询师、公益工作者', love: '追求真爱，理想化爱情，容易付出全部' },
  INTP: { name: '逻辑学家', traits: '聪明、好奇、独立思考、分析能力强', career: '科学家、数学家、哲学家、软件工程师', love: '慢热但专一，不善表达但内心丰富' },
  ESTP: { name: '企业家', traits: '行动力强、灵活、善于社交、冒险精神', career: '销售、创业者、运动员、急救人员', love: '热情主动，追求刺激，需要新鲜感' },
  ESFP: { name: '表演者', traits: '外向、热情、乐观、享受生活', career: '演员、主持人、销售、导游、活动策划', love: '热情浪漫，喜欢惊喜，享受当下每一刻' },
  ENFP: { name: '竞选者', traits: '热情、创造力强、善于社交、乐观', career: '记者、编剧、公关、培训师、创业', love: '激情洋溢，追求浪漫，容易坠入爱河' },
  ENTP: { name: '辩论家', traits: '聪明、好奇、善于辩论、思维敏捷', career: '律师、创业者、产品经理、发明家', love: '用才智吸引对方，喜欢智力上的交锋' },
  ESTJ: { name: '总经理', traits: '领导力强、务实、高效、有组织能力', career: '管理者、法官、教师、军官', love: '可靠负责，注重承诺，传统而稳重' },
  ESFJ: { name: '执政官', traits: '温暖、责任感强、善于交际、乐于助人', career: '销售、护理、教育、酒店管理', love: '体贴入微，重视家庭，喜欢照顾伴侣' },
  ENFJ: { name: '主人公', traits: '富有魅力、有同理心、善于激励他人', career: '教师、咨询师、HR、政治家、演讲家', love: '热情大方，愿意为爱付出，渴望深度关系' },
  ENTJ: { name: '指挥官', traits: '果断、有远见、领导力强、追求卓越', career: 'CEO、企业家、政治家、高级管理者', love: '有掌控欲但忠诚可靠，会用行动证明爱' },
};

export default function MBTIPage() {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({ EI: 0, SN: 0, TF: 0, JP: 0 });
  const [result, setResult] = useState<string>('');

  const handleStart = () => setStep('test');

  const handleAnswer = (optionIndex: number) => {
    const q = questions[currentQ];
    const newAnswers = { ...answers };
    newAnswers[q.dimension] += optionIndex === 0 ? -1 : 1;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const type =
        (newAnswers.EI <= 0 ? 'I' : 'E') +
        (newAnswers.SN <= 0 ? 'S' : 'N') +
        (newAnswers.TF <= 0 ? 'T' : 'F') +
        (newAnswers.JP <= 0 ? 'J' : 'P');
      setResult(type);
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      const q = questions[currentQ - 1];
      const newAnswers = { ...answers };
      newAnswers[q.dimension] -= newAnswers[q.dimension] < 0 ? -1 : 1;
      newAnswers[q.dimension] += newAnswers[q.dimension] < 0 ? 1 : -1;
      setAnswers({ ...answers });
      setCurrentQ(currentQ - 1);
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentQ(0);
    setAnswers({ EI: 0, SN: 0, TF: 0, JP: 0 });
    setResult('');
  };

  if (step === 'intro') {
    return (
      <div className="tool-container">
        <h1 className="tool-title">🧠 MBTI 性格测试</h1>
        <p className="tool-subtitle">16型人格测试 · 了解真实的自己</p>

        <AdBanner className="mb-8" />

        <div className="card max-w-lg mx-auto text-center">
          <p className="text-gray-600 mb-6 leading-relaxed">
            MBTI 是目前全球最流行的性格测试工具，通过 20 道简单问题，
            帮你了解自己的性格类型、适合的职业方向和恋爱风格。
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-500">
            <div className="bg-gray-50 rounded-lg p-3">📋 20道题</div>
            <div className="bg-gray-50 rounded-lg p-3">⏱️ 约3分钟</div>
            <div className="bg-gray-50 rounded-lg p-3">🎯 16种人格</div>
            <div className="bg-gray-50 rounded-lg p-3">💯 完全免费</div>
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
        <h1 className="tool-title">🧠 MBTI 性格测试</h1>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>第 {currentQ + 1}/{questions.length} 题</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="card mb-4">
            <h2 className="text-lg font-medium text-gray-800 mb-6">{q.text}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-red-300 hover:bg-red-50 transition-all text-gray-700"
                >
                  <span className="inline-block w-7 h-7 rounded-full bg-gray-100 text-center leading-7 text-sm mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
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

  const typeInfo = typeDescriptions[result];

  return (
    <div className="tool-container">
      <h1 className="tool-title">🎉 测试结果</h1>
      <p className="tool-subtitle">你的 MBTI 人格类型是...</p>

      <AdBanner className="mb-8" />

      <div className="card max-w-lg mx-auto text-center animate-fade-in">
        <div className="text-7xl mb-4">🧠</div>
        <div className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
          {result}
        </div>
        <div className="text-xl font-bold text-gray-700 mb-6">
          {typeInfo.name}
        </div>

        <div className="grid grid-cols-1 gap-4 text-left mb-8">
          <div className="bg-red-50 rounded-xl p-4">
            <div className="font-semibold text-red-700 mb-1">✨ 性格特点</div>
            <p className="text-sm text-gray-600">{typeInfo.traits}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="font-semibold text-amber-700 mb-1">💼 适合职业</div>
            <p className="text-sm text-gray-600">{typeInfo.career}</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4">
            <div className="font-semibold text-pink-700 mb-1">💕 恋爱风格</div>
            <p className="text-sm text-gray-600">{typeInfo.love}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <ShareButton
            title="我测出了MBTI人格类型！"
            text={`我的 MBTI 是 ${result}（${typeInfo.name}），快来测测你是什么类型！`}
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
