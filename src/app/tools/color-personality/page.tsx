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
