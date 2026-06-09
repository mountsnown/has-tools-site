'use client';

import { useState, useEffect } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

const fortunes = {
  love: [
    { text: '桃花运旺盛，今天可能遇到心动的人', emoji: '💖', stars: 5 },
    { text: '和伴侣的沟通非常顺畅，甜蜜指数飙升', emoji: '💑', stars: 5 },
    { text: '平平淡淡才是真，享受稳定的小幸福', emoji: '😊', stars: 3 },
    { text: '可能需要多一些耐心和理解', emoji: '🤔', stars: 3 },
    { text: '单身的朋友今天有意外邂逅的机会哦', emoji: '✨', stars: 4 },
    { text: '前任可能来联系你，保持冷静', emoji: '⚠️', stars: 2 },
    { text: '暧昧关系今天可能明朗化', emoji: '💫', stars: 4 },
    { text: '和喜欢的人有独处机会，把握住', emoji: '💝', stars: 5 },
  ],
  career: [
    { text: '工作中会有意外的好消息', emoji: '🎉', stars: 5 },
    { text: '今天的努力会被领导看在眼里', emoji: '👀', stars: 4 },
    { text: '适合制定新的工作计划和目标', emoji: '📋', stars: 4 },
    { text: '小心职场小人，谨言慎行', emoji: '😤', stars: 2 },
    { text: '有贵人相助，困难迎刃而解', emoji: '🤝', stars: 5 },
    { text: '适合学习新技能，充电提升', emoji: '📚', stars: 4 },
    { text: '商务谈判运不错，大胆出击', emoji: '💼', stars: 5 },
    { text: '踏实做事，不要好高骛远', emoji: '🎯', stars: 3 },
  ],
  wealth: [
    { text: '财运亨通！可能有意外之财', emoji: '💰', stars: 5 },
    { text: '适合做小额投资，见好就收', emoji: '📈', stars: 4 },
    { text: '今天尽量控制消费欲望', emoji: '🛒', stars: 2 },
    { text: '之前借出的钱可能会收回来', emoji: '💸', stars: 4 },
    { text: '有赚钱的新想法，记下来', emoji: '💡', stars: 4 },
    { text: '大额消费最好改天再决定', emoji: '🤚', stars: 2 },
    { text: '投资眼光不错，但别贪心', emoji: '🎯', stars: 3 },
    { text: '适合请朋友吃饭，破财消灾', emoji: '🍜', stars: 3 },
  ],
  health: [
    { text: '精力充沛，适合运动锻炼', emoji: '💪', stars: 5 },
    { text: '注意颈椎和腰椎，多起来活动', emoji: '🧘', stars: 3 },
    { text: '饮食清淡，少吃辛辣刺激的', emoji: '🥗', stars: 3 },
    { text: '精神状态很好，心情愉悦', emoji: '😄', stars: 5 },
    { text: '别熬夜了，早睡早起身体好', emoji: '😴', stars: 3 },
    { text: '适合户外活动，呼吸新鲜空气', emoji: '🌳', stars: 4 },
    { text: '注意用眼卫生，不要长时间看屏幕', emoji: '👁️', stars: 3 },
    { text: '身体状态不错，保持住', emoji: '✨', stars: 4 },
  ],
};

type Category = keyof typeof fortunes;

const categoryInfo: Record<Category, { label: string; icon: string }> = {
  love: { label: '爱情运势', icon: '💕' },
  career: { label: '事业运势', icon: '💼' },
  wealth: { label: '财运走势', icon: '💰' },
  health: { label: '健康运势', icon: '💪' },
};

function getDailySeed() {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

function getDailyFortune() {
  const seed = getDailySeed();
  const rng = (max: number, offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  };
  return {
    date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }),
    love: fortunes.love[rng(fortunes.love.length, 1)],
    career: fortunes.career[rng(fortunes.career.length, 2)],
    wealth: fortunes.wealth[rng(fortunes.wealth.length, 3)],
    health: fortunes.health[rng(fortunes.health.length, 4)],
  };
}

export default function FortunePage() {
  const [fortune] = useState(getDailyFortune);

  const overallStars = Math.round(
    (fortune.love.stars + fortune.career.stars + fortune.wealth.stars + fortune.health.stars) / 4
  );

  return (
    <div className="tool-container">
      <h1 className="tool-title">🔮 今日运势</h1>
      <p className="tool-subtitle">{fortune.date}</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4 animate-fade-in">
        {/* Overall */}
        <div className="card text-center">
          <p className="text-sm text-gray-400 mb-2">综合运势</p>
          <div className="text-5xl mb-2">
            {'⭐'.repeat(overallStars)}{'☆'.repeat(5 - overallStars)}
          </div>
          <p className="text-lg font-semibold text-gray-700">
            {overallStars >= 5 ? '运势爆棚！' : overallStars >= 4 ? '运势不错！' : overallStars >= 3 ? '中规中矩' : '诸事小心'}
          </p>
        </div>

        {/* Categories */}
        {(Object.entries(categoryInfo) as [Category, { label: string; icon: string }][]).map(([key, info]) => {
          const f = fortune[key];
          return (
            <div key={key} className="card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">
                  {info.icon} {info.label}
                </h3>
                <span className="text-sm">{'⭐'.repeat(f.stars)}</span>
              </div>
              <p className="text-gray-600">{f.emoji} {f.text}</p>
            </div>
          );
        })}

        <div className="flex flex-col gap-3">
          <ShareButton
            title="今日运势来啦！"
            text={`今日综合运势${'⭐'.repeat(overallStars)}！快来看看你今天的运势如何？`}
          />
          <p className="text-center text-xs text-gray-300">
            * 运势内容仅供娱乐，认真你就输了 😉
          </p>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
