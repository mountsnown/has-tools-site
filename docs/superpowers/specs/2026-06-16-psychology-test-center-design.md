# 心理测试中心 - 设计文档

**日期**: 2026-06-16  
**状态**: 待实现

---

## 概述

在 has88888888.com 上建设心理测试中心，新增 8 个心理测试 + 保留已有 4 个，共 12 个测试。新建 `/tools/psychology` 心理测试专区首页，三个分类展示。

## 技术决策

- **方案**: 共享测试引擎 `TestEngine` 组件
- **深度**: 轻量快速型，15-20 题，约 3 分钟完成
- **结果结构**: 性格特点 + 适合职业 + 情感风格

## 文件结构

```
src/
├── components/
│   └── TestEngine.tsx              # 共享测试引擎（新建）
├── app/tools/
│   ├── psychology/page.tsx         # 心理测试中心首页（新建）
│   ├── big-five/page.tsx           # 大五人格（新建）
│   ├── enneagram/page.tsx          # 九型人格（新建）
│   ├── disc/page.tsx               # DISC 性格（新建）
│   ├── love-languages/page.tsx     # 爱的五种语言（新建）
│   ├── attachment-style/page.tsx   # 依恋类型（新建）
│   ├── dark-triad/page.tsx         # 暗黑人格（新建）
│   ├── holland-code/page.tsx       # 霍兰德职业（新建）
│   └── color-personality/page.tsx  # 色彩性格（新建）
```

已有测试（不变）: `mbti/`, `eq-test/`, `aq-test/`, `love-test/`

## TestEngine 组件 API

```typescript
interface TestConfig {
  meta: {
    id: string;           // "big-five"
    title: string;        // "大五人格测试"
    emoji: string;        // "🔮"
    subtitle: string;
    description: string;
    infoCards: { emoji: string; text: string }[];  // 题数/时长/类型/免费
  };
  questions: { id: number; text: string; options: [string, string]; dimension: string }[];
  resultMap: Record<string, { name: string; traits: string; career: string; love: string }>;
  calculateResult: (answers: Record<string, number>) => string;
  share: { title: string; textFn: (result: string, info: ResultEntry) => string };
}
```

## 12 个测试总览

### 性格测试 (6)
| # | 测试 | 路由 | 状态 |
|---|------|------|------|
| 1 | MBTI 16型人格 | `/tools/mbti` | 已有 |
| 2 | 大五人格 Big Five | `/tools/big-five` | 新建 |
| 3 | 九型人格 Enneagram | `/tools/enneagram` | 新建 |
| 4 | DISC 性格 | `/tools/disc` | 新建 |
| 5 | 暗黑人格 Dark Triad | `/tools/dark-triad` | 新建 |
| 6 | 色彩性格 | `/tools/color-personality` | 新建 |

### 情感测试 (4)
| # | 测试 | 路由 | 状态 |
|---|------|------|------|
| 7 | 爱情测试 | `/tools/love-test` | 已有 |
| 8 | 爱的五种语言 | `/tools/love-languages` | 新建 |
| 9 | 依恋类型 | `/tools/attachment-style` | 新建 |

### 能力与职业 (3)
| # | 测试 | 路由 | 状态 |
|---|------|------|------|
| 10 | 情商 EQ | `/tools/eq-test` | 已有 |
| 11 | 逆境商 AQ | `/tools/aq-test` | 已有 |
| 12 | 霍兰德职业 | `/tools/holland-code` | 新建 |

## 心理测试中心页面布局

`/tools/psychology`:
- Hero: 标题 + 副标题 + AdBanner
- 性格测试区: 6 个卡片（3x2 网格）+ AdBanner
- 情感测试区: 3 个卡片 + AdBanner
- 能力与职业区: 3 个卡片 + AdBanner

每个卡片: emoji + 名称 + 一句话描述 → 点击进入测试

## 导航更新

- `/tools` 工具列表: 新增"心理测试"入口卡片
- 导航栏工具下拉: 新增"心理测试"链接
- sitemap.ts: 添加所有新路由

## 边界

- 不涉及: 用户系统、历史记录、数据存储、后端 API
- 所有测试纯前端计算，无服务端依赖
