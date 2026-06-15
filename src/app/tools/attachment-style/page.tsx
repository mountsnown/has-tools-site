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
