# 心理测试中心 - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 has88888888.com 新建心理测试中心，包含 1 个共享 TestEngine 组件 + 1 个心理测试中心首页 + 8 个新测试页 + 工具注册与导航更新。

**Architecture:** 共享 `TestEngine` 组件统一驱动 intro → test → result 三阶段 UI。8 个新测试页每个只导入 TestEngine 并传入配置数据（题目 + 计分逻辑 + 结果映射）。心理测试中心首页 (`/tools/psychology`) 分三个区展示 12 个测试卡片。沿用现有 AdBanner + ShareButton 组件模式。

**Tech Stack:** Next.js 16 + TypeScript + Tailwind CSS v4 + 纯前端计算

---

## File Structure

| 文件 | 操作 | 职责 |
|------|------|------|
| `src/components/TestEngine.tsx` | 新建 | 共享测试引擎：intro/测试/结果三阶段 UI |
| `src/app/tools/big-five/page.tsx` | 新建 | 大五人格测试（配置数据） |
| `src/app/tools/enneagram/page.tsx` | 新建 | 九型人格测试（配置数据） |
| `src/app/tools/disc/page.tsx` | 新建 | DISC 性格测试（配置数据） |
| `src/app/tools/dark-triad/page.tsx` | 新建 | 暗黑人格测试（配置数据） |
| `src/app/tools/color-personality/page.tsx` | 新建 | 色彩性格测试（配置数据） |
| `src/app/tools/love-languages/page.tsx` | 新建 | 爱的五种语言测试（配置数据） |
| `src/app/tools/attachment-style/page.tsx` | 新建 | 依恋类型测试（配置数据） |
| `src/app/tools/holland-code/page.tsx` | 新建 | 霍兰德职业测试（配置数据） |
| `src/app/tools/psychology/page.tsx` | 新建 | 心理测试中心首页 |
| `src/lib/tools.ts` | 修改 | 新增 8 个工具注册 + psychology 分类 |
| `src/app/tools/layout.tsx` | 修改 | 新增 8 个测试 + psychology 页面元数据 |
| `src/app/sitemap.ts` | 修改 | 新增 9 个路由 |

---

### Task 1: 创建 TestEngine 共享组件

**Files:**
- Create: `src/components/TestEngine.tsx`

- [ ] **Step 1: Write TestEngine component**

```typescript
'use client';

import { useState, useCallback } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

export interface Question {
  id: number;
  text: string;
  options: [string, string];
  dimension: string;
}

export interface ResultEntry {
  name: string;
  traits: string;
  career: string;
  love: string;
  emoji?: string;
}

export interface TestMeta {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  infoCards: { emoji: string; text: string }[];
  disclaimer?: string;
}

export interface TestConfig {
  meta: TestMeta;
  questions: Question[];
  resultMap: Record<string, ResultEntry>;
  calculateResult: (answers: Record<string, number>) => string;
  share: {
    title: string;
    textFn: (result: string, info: ResultEntry) => string;
  };
}

export default function TestEngine({ config }: { config: TestConfig }) {
  const { meta, questions, resultMap, calculateResult, share } = config;
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string>('');

  const handleStart = () => {
    const init: Record<string, number> = {};
    questions.forEach((q) => { init[q.dimension] = 0; });
    setAnswers(init);
    setCurrentQ(0);
    setStep('test');
  };

  const handleAnswer = (optionIndex: number) => {
    const q = questions[currentQ];
    const newAnswers = { ...answers };
    newAnswers[q.dimension] = (newAnswers[q.dimension] || 0) + (optionIndex === 0 ? -1 : 1);
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      const r = calculateResult(newAnswers);
      setResult(r);
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      const q = questions[currentQ - 1];
      const newAnswers = { ...answers };
      newAnswers[q.dimension] = (newAnswers[q.dimension] || 0) - (answers[q.dimension] > 0 ? 1 : -1);
      setAnswers(newAnswers);
      setCurrentQ((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentQ(0);
    setResult('');
  };

  // Intro
  if (step === 'intro') {
    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
        <div className="max-w-lg mx-auto">
          <h1 className="tool-title bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
            {meta.emoji} {meta.title}
          </h1>
          <p className="tool-subtitle">{meta.subtitle}</p>

          <AdBanner className="mb-8" />

          <div className="card max-w-lg mx-auto text-center">
            <p className="text-gray-600 mb-6 leading-relaxed">
              {meta.description}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-500">
              {meta.infoCards.map((card, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  {card.emoji} {card.text}
                </div>
              ))}
            </div>
            <button onClick={handleStart} className="btn-primary w-full text-lg py-4">
              开始测试
            </button>
          </div>

          <AdBanner className="mt-8" />

          {meta.disclaimer && (
            <p className="text-center text-xs text-gray-400 mt-4">{meta.disclaimer}</p>
          )}
        </div>
      </div>
    );
  }

  // Test
  if (step === 'test') {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
        <div className="max-w-lg mx-auto">
          <h1 className="tool-title bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
            {meta.emoji} {meta.title}
          </h1>
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

  // Result
  const info = resultMap[result];
  if (!info) return null;

  return (
    <div className="tool-container min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
      <div className="max-w-lg mx-auto">
        <h1 className="tool-title bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
          🎉 测试结果
        </h1>
        <p className="tool-subtitle">{meta.subtitle}</p>

        <AdBanner className="mb-8" />

        <div className="card max-w-lg mx-auto text-center animate-fade-in">
          <div className="text-7xl mb-4">{meta.emoji}</div>
          {info.emoji && <div className="text-5xl mb-2">{info.emoji}</div>}
          <div className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            {result}
          </div>
          <div className="text-xl font-bold text-gray-700 mb-6">
            {info.name}
          </div>

          <div className="grid grid-cols-1 gap-4 text-left mb-8">
            <div className="bg-red-50 rounded-xl p-4">
              <div className="font-semibold text-red-700 mb-1">✨ 性格特点</div>
              <p className="text-sm text-gray-600">{info.traits}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="font-semibold text-amber-700 mb-1">💼 适合职业</div>
              <p className="text-sm text-gray-600">{info.career}</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="font-semibold text-pink-700 mb-1">💕 情感风格</div>
              <p className="text-sm text-gray-600">{info.love}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <ShareButton
              title={share.title}
              text={share.textFn(result, info)}
            />
            <button onClick={handleRestart} className="btn-secondary">
              🔄 重新测试
            </button>
          </div>
        </div>

        <AdBanner className="mt-8" />

        {meta.disclaimer && (
          <p className="text-center text-xs text-gray-400 mt-4">{meta.disclaimer}</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/components/TestEngine.tsx
git commit -m "feat: add reusable TestEngine component for psychology tests
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: 大五人格 (Big Five) 测试页

**Files:**
- Create: `src/app/tools/big-five/page.tsx`

- [ ] **Step 1: Write Big Five test page**

```typescript
'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'big-five',
    title: '大五人格测试',
    emoji: '🔮',
    subtitle: '探索你的五大性格维度',
    description: '大五人格（Big Five / OCEAN）是全球心理学界最认可的性格模型，通过 20 道题评估你外向性、宜人性、尽责性、神经质和开放性五个核心维度。',
    infoCards: [
      { emoji: '📋', text: '20道题' },
      { emoji: '⏱️', text: '约3分钟' },
      { emoji: '🔬', text: 'OCEAN模型' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业心理评估。',
  },
  questions: [
    // 外向性 Extraversion
    { id: 1, text: '在社交聚会中，你通常：', options: ['充满活力，乐于结识新朋友', '倾向于和少数熟人深入交流'], dimension: 'E' },
    { id: 2, text: '独处时你的感受是？', options: ['感到无聊，想找事情做', '享受独处的宁静时光'], dimension: 'E' },
    { id: 3, text: '和一大群人在一起后，你：', options: ['感到精力充沛', '感觉疲惫，需要独处充电'], dimension: 'E' },
    { id: 4, text: '你更喜欢的沟通方式是：', options: ['面对面聊天或打电话', '文字消息或邮件'], dimension: 'E' },
    // 宜人性 Agreeableness
    { id: 5, text: '朋友找你帮忙搬家，你会：', options: ['爽快答应并主动安排', '看情况，自己有事可能会拒绝'], dimension: 'A' },
    { id: 6, text: '和人有分歧时，你倾向于：', options: ['寻找共同的立场，避免冲突升级', '坚持自己的立场，该争就争'], dimension: 'A' },
    { id: 7, text: '看到陌生人遇到困难，你通常会：', options: ['主动上前帮忙', '等对方求助或别人先行动'], dimension: 'A' },
    { id: 8, text: '你认为大多数人是：', options: ['善良可信的', '需要小心对待的'], dimension: 'A' },
    // 尽责性 Conscientiousness
    { id: 9, text: '对于计划和安排，你：', options: ['喜欢提前规划好一切', '随性而为，不喜欢被计划束缚'], dimension: 'C' },
    { id: 10, text: '你的房间或工作台通常：', options: ['整洁有序，物品各就各位', '有点乱但我知道东西在哪'], dimension: 'C' },
    { id: 11, text: '面对截止日期，你通常：', options: ['提前很多天就开始准备', '最后关头冲刺完成'], dimension: 'C' },
    { id: 12, text: '对于承诺过的事情，你：', options: ['说到做到，很可靠', '有时会忘记或改变主意'], dimension: 'C' },
    // 神经质 Neuroticism
    { id: 13, text: '遇到压力时，你通常：', options: ['容易焦虑，想很多', '保持冷静，从容应对'], dimension: 'N' },
    { id: 14, text: '别人批评你时，你会：', options: ['耿耿于怀，反复回想', '很快就能释怀'], dimension: 'N' },
    { id: 15, text: '面对不确定的未来，你：', options: ['经常担忧和焦虑', '顺其自然，不必太担心'], dimension: 'N' },
    { id: 16, text: '你的情绪波动程度：', options: ['情绪起伏较大，容易受影响', '情绪比较稳定平和'], dimension: 'N' },
    // 开放性 Openness
    { id: 17, text: '对于新鲜事物和体验，你：', options: ['非常好奇，喜欢尝试新东西', '更喜欢熟悉的套路和方式'], dimension: 'O' },
    { id: 18, text: '你对艺术和美的感受：', options: ['容易被艺术和美感打动', '不太关注这些，觉得实用更重要'], dimension: 'O' },
    { id: 19, text: '在思维方式上，你：', options: ['喜欢天马行空，发挥想象力', '注重实际，讲求逻辑'], dimension: 'O' },
    { id: 20, text: '对于不同的文化和价值观，你：', options: ['很有兴趣了解，觉得开阔眼界', '尊重但不太会主动去了解'], dimension: 'O' },
  ],
  calculateResult: (answers) => {
    const e = answers.E <= 0 ? 'I' : 'E';
    const a = answers.A <= 0 ? 'L' : 'A';
    const c = answers.C <= 0 ? 'U' : 'C';
    const n = answers.N <= 0 ? 'S' : 'N';
    const o = answers.O <= 0 ? 'T' : 'O';
    return e + a + c + n + o;
  },
  resultMap: {
    EACST: { name: '社交达人', traits: '外向热情、善解人意、稳重大方', career: '销售经理、公关顾问、活动策划', love: '主动热情，善于表达，重视另一半感受' },
    EACNT: { name: '魅力领袖', traits: '外向果断、富有感染力、敢于冒险', career: '企业家、创业者、演讲家', love: '充满激情和魅力，喜欢主导关系节奏' },
    EACSO: { name: '阳光使者', traits: '乐观开朗、亲和力强、富有创造力', career: '教师、主持人、创意总监', love: '温暖阳光，积极营造甜蜜关系' },
    EACNO: { name: '全能型', traits: '综合素质极高、情绪敏感但坚韧、创意爆棚', career: 'CEO、艺术家、战略顾问', love: '情感丰富且投入，追求深度连接' },
    ELCSO: { name: '理性务实', traits: '内向外向平衡、踏实认真、思维开放', career: '工程师、分析师、律师', love: '慢热但专一，行动胜过言语' },
    ELCTO: { name: '安静努力型', traits: '内向稳重、尽职尽责、传统保守', career: '公务员、会计、研究员', love: '不善表达但可靠踏实，最有安全感' },
    EUCNO: { name: '随性自由', traits: '情绪敏感、好奇心强、随心所欲', career: '自由职业者、艺术家、作家', love: '浪漫不羁，享受当下的美好' },
    ILUST: { name: '深思内省型', traits: '内向安静、自由奔放、情绪稳定', career: '程序员、数据分析师、图书管理员', love: '不主动但深情，需要对方多给空间' },
  },
  share: {
    title: '我测出了大五人格类型！',
    textFn: (result, info) => `我的大五人格是 ${result}（${info.name}），快来测测你的五大性格维度！`,
  },
};

export default function BigFivePage() {
  return <TestEngine config={config} />;
}
```

- [ ] **Step 2: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/app/tools/big-five/page.tsx
git commit -m "feat: add Big Five personality test page
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: 九型人格 (Enneagram) 测试页

**Files:**
- Create: `src/app/tools/enneagram/page.tsx`

- [ ] **Step 1: Write Enneagram test page**

```typescript
'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'enneagram',
    title: '九型人格测试',
    emoji: '🎭',
    subtitle: '发现你的核心人格类型',
    description: '九型人格（Enneagram）是一种古老的性格分类系统，将人分为 9 种类型。每种类型都有独特的世界观、核心动机和行为模式。全球数百万人通过九型人格更好地了解自己和他人。',
    infoCards: [
      { emoji: '📋', text: '18道题' },
      { emoji: '⏱️', text: '约3分钟' },
      { emoji: '🎯', text: '9种人格' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业心理评估。',
  },
  questions: [
    // Type 1: Reformer
    { id: 1, text: '做事情时，你更注重：', options: ['追求完美和正确，注重细节', '追求效率和结果，差不多就行'], dimension: 'T1' },
    { id: 2, text: '看到别人做事马虎，你会：', options: ['忍不住想指出并纠正', '觉得那是他的事，无所谓'], dimension: 'T1' },
    // Type 2: Helper
    { id: 3, text: '帮助别人时你的心态是：', options: ['很享受被需要的感觉，愿意付出', '帮助是互相的，不会无条件付出'], dimension: 'T2' },
    { id: 4, text: '你对人际关系的看法：', options: ['关系是最重要的，愿意为他人付出', '保持独立，不轻易依赖或被依赖'], dimension: 'T2' },
    // Type 3: Achiever
    { id: 5, text: '在社交媒体上，你：', options: ['喜欢展示自己的成就和高光时刻', '不太在意外在形象，真实就好'], dimension: 'T3' },
    { id: 6, text: '成功的定义对你来说是：', options: ['获得外界的认可和赞赏', '内心的满足和成长'], dimension: 'T3' },
    // Type 4: Individualist
    { id: 7, text: '你对自我表达的态度：', options: ['追求独特，不喜欢和别人一样', '随大流也挺好的，不必太特别'], dimension: 'T4' },
    { id: 8, text: '情绪低落时，你会：', options: ['沉浸在情绪中，觉得有种美感', '迅速找方法让自己好起来'], dimension: 'T4' },
    // Type 5: Investigator
    { id: 9, text: '面对新领域，你：', options: ['渴望深入了解，刨根问底', '了解够用就好，不会深钻'], dimension: 'T5' },
    { id: 10, text: '社交对你来说：', options: ['消耗能量，更喜欢独处钻研', '充电的方式，喜欢和人交流'], dimension: 'T5' },
    // Type 6: Loyalist
    { id: 11, text: '对于安全感，你：', options: ['非常看重，对未来有很多担忧', '不太焦虑，相信一切都会好的'], dimension: 'T6' },
    { id: 12, text: '做重要决定前，你：', options: ['反复权衡各种可能性，想到最坏情况', '相信直觉，想到就去做'], dimension: 'T6' },
    // Type 7: Enthusiast
    { id: 13, text: '你对新鲜体验的态度：', options: ['生活就是一场冒险，永远在寻找新刺激', '喜欢稳定的生活，偶尔来点变化'], dimension: 'T7' },
    { id: 14, text: '面对困难时，你倾向于：', options: ['快速转向有趣的新事物', '坚持到底，咬紧牙关'], dimension: 'T7' },
    // Type 8: Challenger
    { id: 15, text: '面对不公平时，你通常会：', options: ['直接站出来对抗，保护弱者', '保持低调，不想惹麻烦'], dimension: 'T8' },
    { id: 16, text: '在团队中你倾向于：', options: ['自然而然成为主导者', '配合他人，做好分内事'], dimension: 'T8' },
    // Type 9: Peacemaker
    { id: 17, text: '处理冲突时，你通常：', options: ['尽量调解，维持和谐氛围', '该吵就吵，直面问题'], dimension: 'T9' },
    { id: 18, text: '做决定时，你：', options: ['比较纠结，难以下定决心', '果断迅速，不拖泥带水'], dimension: 'T9' },
  ],
  calculateResult: (answers) => {
    const scores = Object.entries(answers).map(([key, val]) => ({ type: key, score: val }));
    scores.sort((a, b) => b.score - a.score);
    return scores[0].type;
  },
  resultMap: {
    T1: { emoji: '⚖️', name: '1号 完美主义者 / 改革者', traits: '有原则、自律、追求完美、有强烈的是非观', career: '法官、审计、质检、编辑、教师', love: '忠诚专一，对伴侣有高要求，希望关系"正确"' },
    T2: { emoji: '💝', name: '2号 助人者 / 给予者', traits: '温暖贴心、慷慨大方、善解人意、乐于助人', career: '护士、社工、心理咨询师、HR', love: '无微不至的关怀，但需注意不要过度牺牲自我' },
    T3: { emoji: '🏆', name: '3号 成就者 / 实干家', traits: '目标导向、适应力强、充满魅力、追求成功', career: 'CEO、销售、明星、创业者', love: '用成功来证明爱，需要伴侣理解其事业心' },
    T4: { emoji: '🎨', name: '4号 个人主义者 / 浪漫主义者', traits: '独特敏感、富有创意、情感丰富、追求意义', career: '艺术家、作家、设计师、音乐家', love: '追求灵魂深处的连接，爱得深沉且戏剧化' },
    T5: { emoji: '🔬', name: '5号 探索者 / 观察者', traits: '理性冷静、好奇钻研、独立自足、注重隐私', career: '科学家、程序员、研究员、工程师', love: '慢热克制，需要大量个人空间，但爱得深入' },
    T6: { emoji: '🛡️', name: '6号 忠诚者 / 怀疑论者', traits: '忠诚可靠、谨慎警觉、有责任心、未雨绸缪', career: '公务员、安保、审核、项目管理', love: '需要很多安全感，一旦信任则无比忠诚' },
    T7: { emoji: '🎪', name: '7号 热情者 / 享乐主义者', traits: '乐观活泼、充满能量、多才多艺、追求快乐', career: '旅行博主、活动策划、创业者、主持人', love: '热情洋溢，给伴侣带来无限欢乐，但怕束缚' },
    T8: { emoji: '🦁', name: '8号 挑战者 / 保护者', traits: '勇敢果断、有领导力、保护欲强、直率坦诚', career: '企业家、军官、律师、运动教练', love: '强势但深情，是伴侣最坚实的依靠' },
    T9: { emoji: '☮️', name: '9号 和平缔造者 / 调停者', traits: '温和包容、善于倾听、追求和谐、随和淡定', career: '调解员、顾问、外交官、行政人员', love: '平和包容，不愿起冲突，是最温和的恋人' },
  },
  share: {
    title: '我测出了九型人格类型！',
    textFn: (result, info) => `我的九型人格是 ${info.name}，快来测测你的核心人格类型！`,
  },
};

export default function EnneagramPage() {
  return <TestEngine config={config} />;
}
```

- [ ] **Step 2: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/app/tools/enneagram/page.tsx
git commit -m "feat: add Enneagram personality test page
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: DISC 性格测试页

**Files:**
- Create: `src/app/tools/disc/page.tsx`

- [ ] **Step 1: Write DISC test page**

```typescript
'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'disc',
    title: 'DISC 性格测试',
    emoji: '🔴',
    subtitle: '了解你的行为风格',
    description: 'DISC 是全球企业最常用的行为风格测评工具之一。通过 16 道题评估你在支配力(D)、影响力(I)、稳健性(S)和谨慎性(C)四个维度的倾向，帮你在职场和生活中发挥优势。',
    infoCards: [
      { emoji: '📋', text: '16道题' },
      { emoji: '⏱️', text: '约2分钟' },
      { emoji: '🏢', text: '企业广泛使用' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业测评。',
  },
  questions: [
    // D: Dominance
    { id: 1, text: '在团队讨论时，你通常：', options: ['主导发言，推动决策', '先听大家说，再表达看法'], dimension: 'D' },
    { id: 2, text: '面对挑战时，你的反应是：', options: ['兴奋，迫不及待要攻克', '谨慎，先评估再行动'], dimension: 'D' },
    { id: 3, text: '做决策的速度：', options: ['快速果断，不喜欢拖延', '需要时间，希望考虑周全'], dimension: 'D' },
    { id: 4, text: '竞争对你来说：', options: ['让我充满动力！', '不太喜欢，更注重合作'], dimension: 'D' },
    // I: Influence
    { id: 5, text: '在社交场合中，你：', options: ['是活跃气氛的人', '更喜欢安静观察'], dimension: 'I' },
    { id: 6, text: '表达情感时，你：', options: ['外露直接，喜形于色', '内敛含蓄，不轻易表露'], dimension: 'I' },
    { id: 7, text: '你对社交媒体的态度：', options: ['非常活跃，喜欢分享', '偶尔看看，很少发布'], dimension: 'I' },
    { id: 8, text: '说服别人时，你依靠：', options: ['热情和感染力', '数据和逻辑'], dimension: 'I' },
    // S: Steadiness
    { id: 9, text: '面对突如其来的变化，你：', options: ['感到不安，希望保持稳定', '适应力强，享受变化'], dimension: 'S' },
    { id: 10, text: '你的工作节奏是：', options: ['稳重持续，不喜欢赶时间', '节奏多变，可以同时处理多件事'], dimension: 'S' },
    { id: 11, text: '做事情时你更喜欢：', options: ['按部就班，一次做一件事', '灵活多变，多线程并行'], dimension: 'S' },
    { id: 12, text: '在朋友中，你通常是：', options: ['稳定可靠的倾听者', '活跃气氛的开心果'], dimension: 'S' },
    // C: Conscientiousness
    { id: 13, text: '做决定时，你更看重：', options: ['数据和事实', '直觉和感受'], dimension: 'C' },
    { id: 14, text: '对规则和流程的态度：', options: ['严格遵守，规则很重要', '灵活变通，规则是参考'], dimension: 'C' },
    { id: 15, text: '你做事更注重：', options: ['质量和准确性', '速度和效率'], dimension: 'C' },
    { id: 16, text: '指出别人的错误时，你：', options: ['会直接指出，准确很重要', '会委婉或不指出，关系更重要'], dimension: 'C' },
  ],
  calculateResult: (answers) => {
    const scores = { D: answers.D || 0, I: answers.I || 0, S: answers.S || 0, C: answers.C || 0 };
    const max = Math.max(scores.D, scores.I, scores.S, scores.C);
    const top = Object.entries(scores).filter(([, v]) => v === max);
    return top[0][0];
  },
  resultMap: {
    D: { emoji: '🔥', name: 'D 型 — 支配者 / 指挥型', traits: '果断自信、结果导向、敢于冒险、有领导力', career: 'CEO、创业者、军官、销售总监', love: '主导型恋人，喜欢掌控节奏，需要被崇拜' },
    I: { emoji: '🌟', name: 'I 型 — 影响者 / 社交型', traits: '热情乐观、善于沟通、有感染力、人脉广泛', career: '主持人、公关、营销、培训师', love: '浪漫热情的表达者，是朋友圈里的甜蜜担当' },
    S: { emoji: '🕊️', name: 'S 型 — 稳健者 / 支持型', traits: '温和耐心、忠诚可靠、善于倾听、团队稳定器', career: '护士、教师、客服、行政、HR', love: '默默付出型，最可靠最温暖的伴侣' },
    C: { emoji: '📐', name: 'C 型 — 谨慎者 / 思考型', traits: '严谨细致、逻辑清晰、追求精准、高标准', career: '工程师、会计师、研究员、数据分析师', love: '理性克制，用事实说话，爱得很认真' },
  },
  share: {
    title: '我测出了DISC性格类型！',
    textFn: (result, info) => `我的 DISC 行为风格是 ${info.name}，快来测测你的职场性格！`,
  },
};

export default function DISCPage() {
  return <TestEngine config={config} />;
}
```

- [ ] **Step 2: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/app/tools/disc/page.tsx
git commit -m "feat: add DISC personality test page
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 5: 暗黑人格 (Dark Triad) + 色彩性格 (Color Personality) 测试页

**Files:**
- Create: `src/app/tools/dark-triad/page.tsx`
- Create: `src/app/tools/color-personality/page.tsx`

- [ ] **Step 1: Write Dark Triad test page**

```typescript
'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'dark-triad',
    title: '暗黑人格测试',
    emoji: '🕶',
    subtitle: '探索你性格中的暗黑面',
    description: '暗黑人格三合一（Dark Triad）测试评估三种暗黑人格特质：自恋(Narcissism)、马基雅维利主义(Machiavellianism)和精神病态(Psychopathy)。了解这些特质能帮你在职场和社交中更好地认识自己和他人。',
    infoCards: [
      { emoji: '📋', text: '18道题' },
      { emoji: '⏱️', text: '约3分钟' },
      { emoji: '🔬', text: '三大维度' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业心理评估。高暗黑特质不代表心理疾病。',
  },
  questions: [
    // Narcissism
    { id: 1, text: '你认为自己比大多数人：', options: ['更优秀更有魅力', '和大多数人差不多'], dimension: 'N' },
    { id: 2, text: '别人夸奖你时，你通常觉得：', options: ['理所当然，我确实很厉害', '有点不好意思'], dimension: 'N' },
    { id: 3, text: '在团队中，你希望：', options: ['成为中心人物', '和大家平起平坐'], dimension: 'N' },
    { id: 4, text: '拍照修图时，你：', options: ['很在意自己的形象是否完美', '差不多就行了，自然就好'], dimension: 'N' },
    { id: 5, text: '对权力和地位：', options: ['非常渴望，想成为有影响力的人', '不太在意，开心就好'], dimension: 'N' },
    { id: 6, text: '看到别人比自己优秀时：', options: ['有些不爽，希望自己是最好的', '为对方高兴，没有比较心'], dimension: 'N' },
    // Machiavellianism
    { id: 7, text: '为了达成目标，你会：', options: ['策略性地利用人际关系', '坚持诚实透明，不走捷径'], dimension: 'M' },
    { id: 8, text: '你对人际关系的看法：', options: ['很多关系都是利益关系', '关系应该是真诚无条件的'], dimension: 'M' },
    { id: 9, text: '在竞争中，你：', options: ['可以接受一些灰色手段', '必须公平竞争'], dimension: 'M' },
    { id: 10, text: '你认为成功的秘诀是：', options: ['知道怎么影响和利用人', '能力和努力'], dimension: 'M' },
    { id: 11, text: '对于别人的秘密，你：', options: ['会记住，说不定以后有用', '不会多想，尊重隐私'], dimension: 'M' },
    { id: 12, text: '谈判时，你更倾向于：', options: ['隐藏真实意图来获得优势', '坦诚相待，建立信任'], dimension: 'M' },
    // Psychopathy
    { id: 13, text: '看到感人视频，你通常：', options: ['没什么感觉，有点假', '很容易被感动到'], dimension: 'P' },
    { id: 14, text: '对于冒险行为：', options: ['我喜欢刺激和冒险', '我更喜欢安全可靠的事'], dimension: 'P' },
    { id: 15, text: '冲动做事的频率：', options: ['经常想到就做，不考虑后果', '会想清楚再行动'], dimension: 'P' },
    { id: 16, text: '做错事后你的感觉：', options: ['不太会内疚，过去就好了', '会自责很久'], dimension: 'P' },
    { id: 17, text: '对规则的看法：', options: ['规则是束缚，我喜欢打破它', '规则很重要，维持秩序'], dimension: 'P' },
    { id: 18, text: '伤害了别人你会：', options: ['不太在乎，对方太敏感了吧', '感到很抱歉，会主动道歉'], dimension: 'P' },
  ],
  calculateResult: (answers) => {
    const highest = Math.max(answers.N || 0, answers.M || 0, answers.P || 0);
    if (answers.N === highest && answers.M === highest) return 'NM';
    if (answers.M === highest && answers.P === highest) return 'MP';
    if (answers.N === highest && answers.P === highest) return 'NP';
    if (answers.N === highest) return 'N';
    if (answers.M === highest) return 'M';
    if (answers.P === highest) return 'P';
    return 'B';
  },
  resultMap: {
    B: { emoji: '😇', name: '光明型', traits: '暗黑特质总体偏低，你待人真诚、富有同理心。不是暗黑人格，你的性格偏阳光。', career: '社会工作、教育、医疗等助人领域', love: '真诚温暖，值得信赖的伴侣' },
    N: { emoji: '🪞', name: '自恋倾向型', traits: '自信且善于展示自己，对赞美有需求。适度自恋有益职场发展，注意不要过于自我中心。', career: '娱乐圈、销售、领导岗位、社交媒体', love: '需要被崇拜和认可，给足面子很重要' },
    M: { emoji: '♟️', name: '策略型', traits: '善于观察和影响他人，懂策略懂人心。在商场上这是优势，但要警惕在亲密关系中过于算计。', career: '商业谈判、政治、策略咨询、管理', love: '善于经营关系，但有时显得不够真诚' },
    P: { emoji: '🎢', name: '冒险型', traits: '追求刺激、不受约束、活在当下。你可能是个"酷"的人，但注意冲动行为和同理心不足。', career: '极限运动员、特种兵、急救人员、自由职业', love: '刺激有趣的伴侣，但稳定性较差' },
    NM: { emoji: '👑', name: '领袖暗黑型', traits: '自信且有手腕，天生的领导者和策略家。你可能在职场所向披靡，但亲密关系需要放下盔甲。', career: 'CEO、政治家、战略家、创业者', love: '魅力十足但有掌控欲，需要学会示弱' },
    MP: { emoji: '🎭', name: '危险魅力型', traits: '冷酷且迷人，善于操控且爱冒险。你需要警惕伤害身边的人，即使是无意的。', career: '谈判专家、间谍、特工、高风险行业', love: '令人着迷但危险，真心被层层包裹' },
    NP: { emoji: '🐺', name: '独狼型', traits: '自信且冲动，不按套路出牌。你不在乎别人看法，活得肆意潇洒，但社交关系可能受影响。', career: '独立艺术家、自由职业、冒险家', love: '难以驯服，只有真正理解的人才能靠近' },
  },
  share: {
    title: '我测出了暗黑人格特质！',
    textFn: (result, info) => `我的暗黑人格是 ${info.name}，快来测测你的性格暗黑面！`,
  },
};

export default function DarkTriadPage() {
  return <TestEngine config={config} />;
}
```

- [ ] **Step 2: Write Color Personality test page**

```typescript
'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'color-personality',
    title: '色彩性格测试',
    emoji: '🌈',
    subtitle: '用颜色读懂你的性格',
    description: '色彩性格学将性格分为红、蓝、黄、绿四种颜色类型，每种颜色代表不同的性格特质和行为模式。这是一种简单直观的性格分类方法，在亚洲广受欢迎。',
    infoCards: [
      { emoji: '📋', text: '16道题' },
      { emoji: '⏱️', text: '约2分钟' },
      { emoji: '🎨', text: '4种色彩' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业心理评估。',
  },
  questions: [
    // Red
    { id: 1, text: '在团队中，你通常：', options: ['主动承担领导角色', '配合团队，做好自己'], dimension: 'R' },
    { id: 2, text: '面对目标，你的态度是：', options: ['不达目的不罢休', '尽力而为，结果随缘'], dimension: 'R' },
    { id: 3, text: '你的行动风格是：', options: ['快速决策，立即行动', '深思熟虑，稳妥行事'], dimension: 'R' },
    { id: 4, text: '和别人发生分歧时：', options: ['据理力争，坚持原则', '以和为贵，各退一步'], dimension: 'R' },
    // Blue
    { id: 5, text: '你做事更注重：', options: ['过程和细节的完美', '结果和效率'], dimension: 'B' },
    { id: 6, text: '对待感情你：', options: ['深沉内敛，追求灵魂共鸣', '热情外放，喜欢表达'], dimension: 'B' },
    { id: 7, text: '整理东西时：', options: ['井井有条，喜欢分类归纳', '差不多就行，能用就好'], dimension: 'B' },
    { id: 8, text: '做决策依据：', options: ['数据分析、逻辑推理', '直觉和即时感受'], dimension: 'B' },
    // Yellow
    { id: 9, text: '在聚会中，你通常是：', options: ['活跃气氛、侃侃而谈的人', '安静倾听、偶尔插话的人'], dimension: 'Y' },
    { id: 10, text: '对新事物：', options: ['充满好奇心，迫不及待尝试', '保持观望，等别人试过再说'], dimension: 'Y' },
    { id: 11, text: '你的朋友圈风格：', options: ['阳光正能量，分享快乐', '低调内敛，偶尔分享深度内容'], dimension: 'Y' },
    { id: 12, text: '面对问题时：', options: ['乐观面对，相信一定有办法', '会先想到各种可能的风险'], dimension: 'Y' },
    // Green
    { id: 13, text: '朋友向你吐槽时，你：', options: ['耐心倾听，给予温暖回应', '直接给建议，帮忙解决问题'], dimension: 'G' },
    { id: 14, text: '工作节奏你更喜欢：', options: ['稳定平和的节奏', '快节奏、压力大的环境'], dimension: 'G' },
    { id: 15, text: '处理冲突时：', options: ['主动调解，希望大家和谐', '有问题当面说开'], dimension: 'G' },
    { id: 16, text: '你的生活态度：', options: ['知足常乐，享受当下', '不断进取，追求更好'], dimension: 'G' },
  ],
  calculateResult: (answers) => {
    const scores = { R: answers.R || 0, B: answers.B || 0, Y: answers.Y || 0, G: answers.G || 0 };
    const max = Math.max(scores.R, scores.B, scores.Y, scores.G);
    const types = Object.entries(scores).filter(([, v]) => v === max).map(([k]) => k);
    if (types.length >= 2) return types.slice(0, 2).join('');
    return types[0];
  },
  resultMap: {
    R: { emoji: '❤️', name: '红色性格 — 行动派', traits: '果断勇敢、目标感强、行动力爆表、是天生的领导者', career: 'CEO、创业者、指挥官、运动员', love: '主动出击，热情直接，爱就要大声说出来' },
    B: { emoji: '💙', name: '蓝色性格 — 思想派', traits: '理性内敛、追求完美、逻辑严密、富有深度', career: '科学家、工程师、哲学家、战略顾问', love: '深沉而专一，不轻易动心但一旦爱了就是一辈子' },
    Y: { emoji: '💛', name: '黄色性格 — 快乐派', traits: '乐观阳光、感染力强、创意无限、自带动量', career: '主持人、演员、创意总监、创业家', love: '开心果型恋人，每天都有新惊喜' },
    G: { emoji: '💚', name: '绿色性格 — 和平派', traits: '温和包容、乐于倾听、随和可靠、人际关系润滑剂', career: '心理咨询师、HR、教师、外交官', love: '最温柔最可靠的伴侣，给你岁月静好的感觉' },
    RB: { emoji: '💜', name: '红+蓝 — 战略领袖', traits: '既有红色行动力又有蓝色思维力，天生的战略家', career: '企业家、军事家、高级管理者', love: '事业为重，但内心深情，是可靠型伴侣' },
    RY: { emoji: '🧡', name: '红+黄 — 激情领袖', traits: '活力四射感染力爆棚，带团队冲锋陷阵的第一人选', career: '销售总监、创意领袖、政客', love: '热情似火，恋爱像打仗一样全力以赴' },
    BY: { emoji: '💎', name: '蓝+黄 — 创意大师', traits: '理性与创意的完美平衡，既能想又能做', career: '产品经理、设计师、导演', love: '有趣的灵魂+深刻的内心，难得的完美恋人' },
    BG: { emoji: '🩵', name: '蓝+绿 — 温柔智者', traits: '智慧且温和，像一位慈祥的导师', career: '教育家、研究员、医生', love: '默默守护型的灵魂伴侣，润物细无声' },
    RG: { emoji: '🩷', name: '红+绿 — 温暖领袖', traits: '既有行动力又温和包容，软硬兼备的稀有组合', career: '社会企业家、教练、非营利组织负责人', love: '有魄力有温度，既能撑起天也能温柔待你' },
    YG: { emoji: '💚', name: '黄+绿 — 阳光天使', traits: '乐观开朗又温柔体贴，走到哪里都受欢迎', career: '儿童教育者、社区工作者、活动策划', love: '满满正能量，和你在一起每天都很快乐' },
  },
  share: {
    title: '我测出了色彩性格类型！',
    textFn: (result, info) => `我的色彩性格是 ${info.name}，快来测测你是什么颜色！`,
  },
};

export default function ColorPersonalityPage() {
  return <TestEngine config={config} />;
}
```

- [ ] **Step 3: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/app/tools/dark-triad/page.tsx src/app/tools/color-personality/page.tsx
git commit -m "feat: add Dark Triad and Color Personality test pages
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 6: 爱的五种语言 (Love Languages) + 依恋类型 (Attachment Style) 测试页

**Files:**
- Create: `src/app/tools/love-languages/page.tsx`
- Create: `src/app/tools/attachment-style/page.tsx`

- [ ] **Step 1: Write Love Languages test page**

```typescript
'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'love-languages',
    title: '爱的五种语言测试',
    emoji: '💌',
    subtitle: '发现你表达和接收爱的方式',
    description: '爱的五种语言由盖瑞·查普曼博士提出，全球超过 3000 万人使用。了解你的爱之语，能帮你更好地表达爱意、改善亲密关系。五种语言：肯定的言语、精心的时刻、接受礼物、服务的行动、身体的接触。',
    infoCards: [
      { emoji: '📋', text: '15道题' },
      { emoji: '⏱️', text: '约2分钟' },
      { emoji: '💝', text: '5种爱语' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业情感咨询。',
  },
  questions: [
    // A: Words of Affirmation vs others
    { id: 1, text: '哪种更让你感到被爱？', options: ['伴侣对你说"我爱你"', '伴侣给你一个拥抱'], dimension: 'A' },
    { id: 2, text: '哪种更让你开心？', options: ['收到一封手写的情书', '收到一份精心准备的礼物'], dimension: 'A' },
    { id: 3, text: '哪种更能安慰你？', options: ['"一切都会好的"', '伴侣默默帮你处理事情'], dimension: 'A' },
    // B: Quality Time vs others
    { id: 4, text: '你更珍惜：', options: ['和伴侣一起专心聊天的时间', '收到伴侣送的有心意的小礼物'], dimension: 'B' },
    { id: 5, text: '你更喜欢：', options: ['周末一起去散步', '伴侣帮你做家务'], dimension: 'B' },
    { id: 6, text: '约会时最重要的是：', options: ['深入交流，心无旁骛', '牵手拥抱等亲密互动'], dimension: 'B' },
    // C: Receiving Gifts vs others
    { id: 7, text: '哪种更让你感动？', options: ['伴侣出差带回的小礼物', '伴侣说"你真棒"'], dimension: 'C' },
    { id: 8, text: '纪念日时你更看重：', options: ['收到精心准备的礼物', '共同度过一整天'], dimension: 'C' },
    { id: 9, text: '表达爱的方式：', options: ['送小惊喜', '经常拥抱和牵手'], dimension: 'C' },
    // D: Acts of Service vs others
    { id: 10, text: '最让你感动的是：', options: ['伴侣主动做了你不想做的家务', '伴侣认真听你讲烦心事'], dimension: 'D' },
    { id: 11, text: '你需要帮助时：', options: ['伴侣二话不说出手帮忙', '伴侣温柔地鼓励你'], dimension: 'D' },
    { id: 12, text: '哪个更让你有安全感？', options: ['伴侣帮你解决了实际问题', '伴侣为你准备了一份礼物'], dimension: 'D' },
    // E: Physical Touch vs others
    { id: 13, text: '你更享受：', options: ['看电视时靠着伴侣', '伴侣为你做饭'], dimension: 'E' },
    { id: 14, text: '安慰伴侣时你倾向于：', options: ['抱住对方', '说温柔鼓励的话'], dimension: 'E' },
    { id: 15, text: '恋爱中最重要的是：', options: ['亲密的肢体接触', '深入的灵魂交流'], dimension: 'E' },
  ],
  calculateResult: (answers) => {
    const scores = { A: answers.A || 0, B: answers.B || 0, C: answers.C || 0, D: answers.D || 0, E: answers.E || 0 };
    const max = Math.max(scores.A, scores.B, scores.C, scores.D, scores.E);
    const top = Object.entries(scores).filter(([, v]) => v === max).map(([k]) => k);
    return top[0];
  },
  resultMap: {
    A: { emoji: '💬', name: '肯定的言语', traits: '你通过话语来感受和表达爱。"我爱你""你真棒""有你在真好"这些看似简单的话对你来说胜过千言万语。', career: '—', love: '你需要伴侣经常用言语表达爱意。请告诉对方：你最需要的是听到他说爱你、夸你、肯定你。' },
    B: { emoji: '⏳', name: '精心的时刻', traits: '把全部注意力给到你，比什么都重要。心不在焉的陪伴对你来说是最大的伤害。', career: '—', love: '你需要高质量的陪伴时间。请告诉伴侣：一起散步、认真聊天、放下手机的专属时光对你最重要。' },
    C: { emoji: '🎁', name: '接受礼物', traits: '礼物对你来说是爱的具象化。重要的不是价格，而是对方在挑选礼物时想着你的心意。', career: '—', love: '你喜欢通过礼物感受爱。请告诉伴侣：小惊喜和用心的小礼物能让你感受满满爱意。' },
    D: { emoji: '🛠️', name: '服务的行动', traits: '行动比语言更打动你。对方帮你分担家务、修好东西、解决实际问题时，你觉得被深深爱着。', career: '—', love: '你需要对方用行动来证明爱。请告诉伴侣：帮你做事就是他表达爱的最好方式。' },
    E: { emoji: '🤗', name: '身体的接触', traits: '拥抱、牵手、亲吻对你来说是爱的氧气。缺乏肢体接触会让你感觉不到被爱。', career: '—', love: '你需要充分的身体接触。请告诉伴侣：多抱抱你、牵你的手，这能让你感到安心和被爱。' },
  },
  share: {
    title: '我发现了我的爱之语！',
    textFn: (result, info) => `我的爱之语是「${info.name}」，快来测测你接受和表达爱的方式！`,
  },
};

export default function LoveLanguagesPage() {
  return <TestEngine config={config} />;
}
```

- [ ] **Step 2: Write Attachment Style test page**

```typescript
'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'attachment-style',
    title: '依恋类型测试',
    emoji: '🔗',
    subtitle: '了解你的亲密关系模式',
    description: '依恋理论由心理学家约翰·鲍比提出，认为早期与照顾者的互动会影响成年后的亲密关系模式。了解你的依恋类型，能帮你建立更健康、更充实的亲密关系。四种类型：安全型、焦虑型、回避型、恐惧型。',
    infoCards: [
      { emoji: '📋', text: '16道题' },
      { emoji: '⏱️', text: '约2分钟' },
      { emoji: '🔐', text: '4种类型' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业心理评估。',
  },
  questions: [
    // Anxiety dimension
    { id: 1, text: '伴侣不回消息时，你：', options: ['开始担心是不是我哪里做错了', 'ta可能在忙，等等就好'], dimension: 'ANX' },
    { id: 2, text: '恋爱中你经常：', options: ['担心对方会突然不爱我了', '对这段关系比较有信心'], dimension: 'ANX' },
    { id: 3, text: '吵架后你的心态：', options: ['非常焦虑，希望马上和好', '需要冷静一段时间'], dimension: 'ANX' },
    { id: 4, text: '伴侣和异性社交，你：', options: ['会感到不安和嫉妒', '觉得这是正常社交，不会多想'], dimension: 'ANX' },
    { id: 5, text: '你常常想知道：', options: ['ta到底有多爱我？够不够爱？', '顺其自然，不需要反复确认'], dimension: 'ANX' },
    { id: 6, text: '独处时你：', options: ['容易胡思乱想担心被抛弃', '享受独处时光，感到自在'], dimension: 'ANX' },
    { id: 7, text: '你需要伴侣给予：', options: ['大量的确认和安全感', '适度的空间和尊重'], dimension: 'ANX' },
    { id: 8, text: '感情中的小细节：', options: ['我会过度解读，总觉得有隐含意思', '不会想太多，相信对方的表达'], dimension: 'ANX' },
    // Avoidance dimension
    { id: 9, text: '对于亲密关系你：', options: ['有点害怕太亲密，需要个人空间', '渴望深入的感情连接'], dimension: 'AVD' },
    { id: 10, text: '伴侣想深入了解你时：', options: ['会感到不自在，想保持距离', '很愿意分享内心世界'], dimension: 'AVD' },
    { id: 11, text: '对于依赖别人，你：', options: ['觉得依赖是软弱的，要保持独立', '适度的依赖是健康关系的一部分'], dimension: 'AVD' },
    { id: 12, text: '当关系变得太近时：', options: ['会下意识想逃离或冷淡', '这正是我想要的亲密感'], dimension: 'AVD' },
    { id: 13, text: '表达脆弱时你：', options: ['很难向伴侣展示脆弱面', '愿意向信任的伴侣袒露脆弱'], dimension: 'AVD' },
    { id: 14, text: '对于承诺：', options: ['有点害怕做出长期承诺', '愿意做出承诺并珍惜'], dimension: 'AVD' },
    { id: 15, text: '伴侣需要更多亲密时：', options: ['觉得有点窒息和压力', '觉得甜蜜和温暖'], dimension: 'AVD' },
    { id: 16, text: '分手后的反应：', options: ['很快就恢复，甚至有点解脱', '需要很长时间才能走出来'], dimension: 'AVD' },
  ],
  calculateResult: (answers) => {
    const anx = (answers.ANX || 0) <= 0 ? 'LOW_ANX' : 'HIGH_ANX';
    const avd = (answers.AVD || 0) <= 0 ? 'LOW_AVD' : 'HIGH_AVD';
    return `${anx}_${avd}`;
  },
  resultMap: {
    LOW_ANX_LOW_AVD: { emoji: '💚', name: '安全型依恋', traits: '你对亲密关系有健康的态度——既享受和伴侣的亲密，也能在独处时感到自在。你不害怕被抛弃，也不害怕过于亲密。这是最健康的依恋类型。', career: '—', love: '你是最理想的恋人类型！情绪稳定，信任伴侣，同时给对方足够空间。保持这种状态，你是关系中的稳定器。' },
    HIGH_ANX_LOW_AVD: { emoji: '💛', name: '焦虑型依恋', traits: '你渴望亲密和确认，但总是担心对方不够爱自己。你容易在关系中过度投入，需要伴侣不断地证明爱意。有时会因为太怕失去反而把对方推开。', career: '—', love: '学会自我安抚和自我肯定。不要把所有安全感都建立在伴侣身上。和伴侣坦诚沟通你的需求，但也要给对方空间。安全型伴侣最适合你。' },
    LOW_ANX_HIGH_AVD: { emoji: '💙', name: '回避型依恋', traits: '你重视独立和个人空间，对过于亲密感到不适。你可能把"不需要别人"当作保护自己的方式，但内心深处可能同样渴望连接。', career: '—', love: '试着慢慢打开心扉，学会接受亲密。告诉自己：依赖不是软弱。从小事开始向伴侣分享感受，安全型伴侣的耐心能帮你慢慢适应亲密关系。' },
    HIGH_ANX_HIGH_AVD: { emoji: '💜', name: '恐惧型依恋', traits: '这是最矛盾的类型——既渴望亲密又害怕亲密。你想要被爱，但一旦有人接近又本能地逃避。你常觉得自己不值得被爱，又担心被抛弃。', career: '—', love: '你需要在专业人士帮助下处理深层的不安全感。试着找一个安全型的伴侣，给自己时间去学会信任。疗愈是一个过程，别对自己太苛刻。' },
  },
  share: {
    title: '我测出了依恋类型！',
    textFn: (result, info) => `我的依恋类型是「${info.name}」，快来测测你的亲密关系模式！`,
  },
};

export default function AttachmentStylePage() {
  return <TestEngine config={config} />;
}
```

- [ ] **Step 3: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/app/tools/love-languages/page.tsx src/app/tools/attachment-style/page.tsx
git commit -m "feat: add Love Languages and Attachment Style test pages
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 7: 霍兰德职业兴趣 (Holland Code) 测试页

**Files:**
- Create: `src/app/tools/holland-code/page.tsx`

- [ ] **Step 1: Write Holland Code test page**

```typescript
'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'holland-code',
    title: '霍兰德职业兴趣测试',
    emoji: '🏗',
    subtitle: '发现你的职业兴趣类型',
    description: '霍兰德职业兴趣测试（Holland Code / RIASEC）是全球最广泛使用的职业测评工具，将职业兴趣分为六种类型。了解你的霍兰德代码，帮你找到真正热爱的工作方向。',
    infoCards: [
      { emoji: '📋', text: '18道题' },
      { emoji: '⏱️', text: '约3分钟' },
      { emoji: '🧭', text: '6种类型' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业职业咨询。',
  },
  questions: [
    // R: Realistic
    { id: 1, text: '你更喜欢：', options: ['动手操作，修理或搭建东西', '分析思考，解决抽象问题'], dimension: 'R' },
    { id: 2, text: '户外工作 vs 室内工作：', options: ['喜欢户外或动手的工作', '喜欢室内或脑力的工作'], dimension: 'R' },
    { id: 3, text: '你对机械和工具：', options: ['很感兴趣，喜欢拆装东西', '不太感兴趣，更关注概念和想法'], dimension: 'R' },
    // I: Investigative
    { id: 4, text: '遇到不懂的事，你：', options: ['刨根问底，要搞清楚原理', '了解大概就行，不必深究'], dimension: 'I' },
    { id: 5, text: '你对科学研究：', options: ['非常着迷，喜欢探索未知', '不太感冒，觉得太理论化'], dimension: 'I' },
    { id: 6, text: '解决问题的方式：', options: ['逻辑分析，理性推理', '凭经验和直觉'], dimension: 'I' },
    // A: Artistic
    { id: 7, text: '你对艺术和创作：', options: ['充满兴趣，喜欢自我表达', '不太擅长，更喜欢实际有用的东西'], dimension: 'A' },
    { id: 8, text: '你的思维方式更：', options: ['天马行空，发散思维', '有规律有逻辑，线性思维'], dimension: 'A' },
    { id: 9, text: '工作环境你更喜欢：', options: ['自由不拘，有创造力发挥空间', '规则明确，流程清晰'], dimension: 'A' },
    // S: Social
    { id: 10, text: '和人打交道时你：', options: ['感到兴奋，乐在其中', '消耗能量，更喜欢独处做事'], dimension: 'S' },
    { id: 11, text: '你想做的改变：', options: ['帮助他人、推动社会进步', '技术创新、提高效率'], dimension: 'S' },
    { id: 12, text: '你更擅长：', options: ['倾听和沟通', '分析和计算'], dimension: 'S' },
    // E: Enterprising
    { id: 13, text: '对于领导和说服：', options: ['我很享受，这是我擅长的', '不太喜欢，更喜欢配合他人'], dimension: 'E' },
    { id: 14, text: '你对金钱和商业：', options: ['很有兴趣，喜欢琢磨赚钱', '觉得够用就行，更看重其他'], dimension: 'E' },
    { id: 15, text: '在团队中你希望：', options: ['成为决策者和推动者', '成为可靠的执行者和专家'], dimension: 'E' },
    // C: Conventional
    { id: 16, text: '对于数据和记录：', options: ['我喜欢整理和有条理的工作', '觉得枯燥，更喜欢灵活'], dimension: 'C' },
    { id: 17, text: '做事风格：', options: ['严谨细致，按流程来', '灵活变通，不拘小节'], dimension: 'C' },
    { id: 18, text: '你对细节的态度：', options: ['注重细节，力求准确', '抓大放小，不拘泥于细枝末节'], dimension: 'C' },
  ],
  calculateResult: (answers) => {
    const dims = { R: answers.R || 0, I: answers.I || 0, A: answers.A || 0, S: answers.S || 0, E: answers.E || 0, C: answers.C || 0 };
    const sorted = Object.entries(dims).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 3).map(([k]) => k).join('');
  },
  resultMap: {
    RIA: { emoji: '🔧', name: 'RIA — 实用创新者', traits: '动手能力强且有创造力，喜欢建造和创新', career: '建筑师、工程师、工业设计师、飞行员', love: '—' },
    RIS: { emoji: '🔬', name: 'RIS — 研究探索者', traits: '科学严谨且乐于助人，喜欢解决实际问题', career: '医生、药剂师、生物学家、法医', love: '—' },
    RIE: { emoji: '⚙️', name: 'RIE — 技术驱动者', traits: '技术精湛且有领导力，喜欢主导项目', career: '工程经理、技术总监、项目经理', love: '—' },
    RAI: { emoji: '🎨', name: 'RAI — 创意工匠', traits: '手巧且审美出众，能把想法变成作品', career: '建筑师、景观设计师、珠宝设计师', love: '—' },
    RSE: { emoji: '🏗', name: 'RSE — 实干推动者', traits: '务实且有社交能力，能把想法落地', career: '项目经理、销售工程师、采购经理', love: '—' },
    IAS: { emoji: '🧪', name: 'IAS — 科学助人者', traits: '智力突出且有社会责任感，追求真理', career: '医生、教授、环境科学家、营养师', love: '—' },
    IAR: { emoji: '🔭', name: 'IAR — 理论创造者', traits: '逻辑严密且艺术气息，打破学科界限', career: '天文学家、人类学家、科学作家', love: '—' },
    AIR: { emoji: '🎭', name: 'AIR — 艺术思想家', traits: '创造力强且有智慧深度，情感丰富', career: '作家、记者、艺术评论家、策展人', love: '—' },
    AIS: { emoji: '📖', name: 'AIS — 人文关怀者', traits: '富有创意且善于共情，艺术的温度', career: '作家、心理咨询师、教育工作者', love: '—' },
    SAI: { emoji: '🫂', name: 'SAI — 智慧助人者', traits: '富有同理心且智慧，服务与思考结合', career: '心理咨询师、医生、社会工作者、牧师', love: '—' },
    SEA: { emoji: '🌟', name: 'SEA — 社会领导者', traits: '善于社交且果断，正义感和创造力强', career: '政治家、公益组织负责人、法官', love: '—' },
    SEC: { emoji: '🏛', name: 'SEC — 社会管理者', traits: '善于沟通且有条理，管理协调能力出众', career: '公务员、行政主管、酒店经理', love: '—' },
    EAS: { emoji: '💼', name: 'EAS — 创意企业家', traits: '商业头脑且审美出色，创意与商业结合', career: '创意总监、广告人、经纪人', love: '—' },
    ESC: { emoji: '📊', name: 'ESC — 商业领导者', traits: '领导力强且条理清晰，谈判高手', career: 'CEO、销售总监、投资人、律师', love: '—' },
    CRI: { emoji: '📐', name: 'CRI — 精确分析者', traits: '严谨细致且有逻辑头脑，保证零误差', career: '精算师、数据分析师、质检专家', love: '—' },
    CSI: { emoji: '📑', name: 'CSI — 系统管理者', traits: '条理清晰且有一定助人意愿，环境稳定器', career: '会计、审计、行政总监、IT经理', love: '—' },
  },
  share: {
    title: '我测出了霍兰德职业类型！',
    textFn: (result, info) => `我的霍兰德职业代码是 ${info.name}，快来测测你的职业兴趣方向！`,
  },
};

export default function HollandCodePage() {
  return <TestEngine config={config} />;
}
```

- [ ] **Step 2: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/app/tools/holland-code/page.tsx
git commit -m "feat: add Holland Code career interest test page
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 8: 心理测试中心首页

**Files:**
- Create: `src/app/tools/psychology/page.tsx`

- [ ] **Step 1: Write Psychology Center hub page**

This is a server component (no 'use client') since it has no interactive state.

```typescript
import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '心理测试中心 - 12款免费心理测试 | 888工具站',
  description: '免费在线心理测试中心，12款专业心理测评工具：MBTI、大五人格、九型人格、DISC、暗黑人格、色彩性格、爱情测试、爱的五种语言、依恋类型、EQ情商、AQ逆商、霍兰德职业兴趣。全部免费！',
  openGraph: {
    title: '心理测试中心 - 12款免费心理测试 | 888工具站',
    description: '免费在线心理测试中心，12款专业心理测评工具：MBTI、大五人格、九型人格、DISC、暗黑人格、色彩性格、爱情测试、爱的五种语言、依恋类型、EQ情商、AQ逆商、霍兰德职业兴趣。全部免费！',
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
```

- [ ] **Step 2: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/app/tools/psychology/page.tsx
git commit -m "feat: add psychology test center hub page
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 9: 更新工具注册、布局元数据、Sitemap

**Files:**
- Modify: `src/lib/tools.ts`
- Modify: `src/app/tools/layout.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add 8 new tools to tools.ts**

Append the following 8 entries to the `tools` array (before the closing `]`):

```typescript
  {
    id: 'big-five',
    name: '大五人格测试',
    description: '基于OCEAN模型，五大维度科学评估你的性格特质',
    icon: '🔮',
    category: 'fun',
    href: '/tools/big-five',
  },
  {
    id: 'enneagram',
    name: '九型人格测试',
    description: '探索9种核心人格类型，发现你的内在动机和行为模式',
    icon: '🎭',
    category: 'fun',
    href: '/tools/enneagram',
  },
  {
    id: 'disc',
    name: 'DISC 性格测试',
    description: '四维行为风格测评，了解你的职场沟通和处事风格',
    icon: '🔴',
    category: 'fun',
    href: '/tools/disc',
  },
  {
    id: 'dark-triad',
    name: '暗黑人格测试',
    description: '评估自恋、马基雅维利主义和精神病态三种暗黑特质',
    icon: '🕶',
    category: 'fun',
    href: '/tools/dark-triad',
  },
  {
    id: 'color-personality',
    name: '色彩性格测试',
    description: '红蓝黄绿四种性格色彩，简单直观读懂你的性格',
    icon: '🌈',
    category: 'fun',
    href: '/tools/color-personality',
  },
  {
    id: 'love-languages',
    name: '爱的五种语言测试',
    description: '发现你表达和接收爱的方式，改善亲密关系',
    icon: '💌',
    category: 'fun',
    href: '/tools/love-languages',
  },
  {
    id: 'attachment-style',
    name: '依恋类型测试',
    description: '了解你的亲密关系模式，安全型/焦虑型/回避型/恐惧型',
    icon: '🔗',
    category: 'fun',
    href: '/tools/attachment-style',
  },
  {
    id: 'holland-code',
    name: '霍兰德职业兴趣测试',
    description: 'RIASEC六型职业兴趣测评，找到最适合你的职业方向',
    icon: '🏗',
    category: 'fun',
    href: '/tools/holland-code',
  },
```

- [ ] **Step 2: Add 9 new metadata entries to tools/layout.tsx `toolMeta` object**

```typescript
  psychology: {
    title: "心理测试中心 - 12款免费心理测试 | 888工具站",
    description: "免费在线心理测试中心，12款专业心理测评工具：MBTI、大五人格、九型人格、DISC、暗黑人格、色彩性格、爱情测试、爱的五种语言、依恋类型、EQ情商、AQ逆商、霍兰德职业兴趣。全部免费！",
  },
  "big-five": {
    title: "大五人格测试 - OCEAN五大维度免费测评",
    description: "免费在线大五人格测试，基于学术界最认可的OCEAN模型，20道题评估你外向性、宜人性、尽责性、神经质和开放性五个核心维度。即测即知！",
  },
  enneagram: {
    title: "九型人格测试 - 免费Enneagram人格类型测评",
    description: "免费在线九型人格测试，18道题发现你的核心人格类型。1-9号人格深度解析：完美主义者、助人者、成就者...探索你的内在动机！",
  },
  disc: {
    title: "DISC 性格测试 - 免费行为风格测评",
    description: "免费在线DISC性格测试，16道题评估支配力(D)、影响力(I)、稳健性(S)、谨慎性(C)四个维度。全球企业最常用的行为风格测评工具！",
  },
  "dark-triad": {
    title: "暗黑人格测试 - Dark Triad免费测评",
    description: "免费在线暗黑人格测试，18道题评估自恋、马基雅维利主义和精神病态三种特质。了解性格的暗黑面，更好地认识自己和他人！",
  },
  "color-personality": {
    title: "色彩性格测试 - 红蓝黄绿免费性格测评",
    description: "免费在线色彩性格测试，16道题测出你的性格颜色：红色行动派、蓝色思想派、黄色快乐派、绿色和平派。简单直观读懂性格！",
  },
  "love-languages": {
    title: "爱的五种语言测试 - 免费爱之语测评",
    description: "免费在线爱的五种语言测试，全球超3000万人使用。15道题发现你的爱之语：肯定言语、精心时刻、接受礼物、服务行动、身体接触。改善亲密关系！",
  },
  "attachment-style": {
    title: "依恋类型测试 - 免费亲密关系模式测评",
    description: "免费在线依恋类型测试，16道题判断你的依恋模式：安全型、焦虑型、回避型、恐惧型。了解你的亲密关系模式，建立更健康的感情！",
  },
  "holland-code": {
    title: "霍兰德职业兴趣测试 - 免费RIASEC职业测评",
    description: "免费在线霍兰德职业兴趣测试，18道题发现你的RIASEC六型职业代码。全球最广泛使用的职业测评工具，找到真正适合你的职业方向！",
  },
```

- [ ] **Step 3: Update sitemap.ts**

Add the following to the `tools` array in `sitemap.ts`:
```typescript
    'big-five', 'enneagram', 'disc', 'dark-triad', 'color-personality',
    'love-languages', 'attachment-style', 'holland-code', 'psychology',
```

Also add these to the page-level entries (after the blog entries):

```typescript
    { url: `${baseUrl}/tools/psychology`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog/psychology-tests-guide`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
```

- [ ] **Step 4: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add src/lib/tools.ts src/app/tools/layout.tsx src/app/sitemap.ts
git commit -m "feat: register 8 new psychology tests in tools registry, metadata, and sitemap
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 10: 构建并验证

- [ ] **Step 1: Build the project**

```bash
cd /c/Users/14922/has-tools-site
npm run build
```

Expected: build succeeds with no errors or warnings.

- [ ] **Step 2: Verify all routes work**

Check that all 9 new URLs are generated in the build output:
- `/tools/psychology`
- `/tools/big-five`
- `/tools/enneagram`
- `/tools/disc`
- `/tools/dark-triad`
- `/tools/color-personality`
- `/tools/love-languages`
- `/tools/attachment-style`
- `/tools/holland-code`

- [ ] **Step 3: Commit**

```bash
cd /c/Users/14922/has-tools-site
git add -A
git commit -m "chore: build verification passed for psychology test center
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```
