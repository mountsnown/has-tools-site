import type { Metadata } from "next";

const toolMeta: Record<string, { title: string; description: string }> = {
  mbti: {
    title: "MBTI 性格测试 - 免费16型人格测试",
    description: "免费MBTI性格测试，20道题精准定位你的16型人格类型，了解适合的职业方向和恋爱风格。无需注册，即测即看结果！",
  },
  "love-test": {
    title: "恋爱脑测试 - 测测你有多恋爱脑",
    description: "朋友圈都在玩的恋爱脑测试！10道趣味测试题，测测你在恋爱中的上头程度。轻度还是终极恋爱脑？一测便知！",
  },
  lucky: {
    title: "幸运数字生成器 - 生成专属幸运号码",
    description: "输入姓名和生日，免费生成你的专属幸运数字、幸运色、幸运方位。准确的运势分析，来看看你的幸运数字是什么！",
  },
  fortune: {
    title: "今日运势 - 每日免费运势预测",
    description: "免费每日运势预测，涵盖爱情、事业、财运、健康四大方面。看看今天运气如何？每日更新！",
  },
  qrcode: {
    title: "二维码生成器 - 免费在线制作二维码",
    description: "免费在线二维码生成器，支持自定义颜色和大小。输入网址或文本即可生成高清二维码，一键下载PNG格式。",
  },
  "image-compress": {
    title: "图片压缩工具 - 在线压缩PNG/JPEG/WebP",
    description: "免费在线图片压缩工具，支持JPEG、PNG、WebP格式。拖拽上传，调整质量，实时预览压缩效果，一键下载。",
  },
  "text-tools": {
    title: "文本处理工具 - 字数统计 大小写转换 文本对比",
    description: "免费在线文本处理工具集：字数统计、大小写转换、文本差异对比。无需安装，打开即用。",
  },
  password: {
    title: "密码生成器 - 在线生成高强度随机密码",
    description: "免费在线密码生成器，支持自定义长度和字符类型。使用浏览器原生加密随机数，安全可靠。保护你的账号安全！",
  },
  "color-palette": {
    title: "配色方案生成器 - 一键生成好看配色",
    description: "免费配色方案生成器，随机生成5色配色方案。支持多种预设风格，点击即可复制色值，设计师和开发者必备。",
  },
  json: {
    title: "JSON 格式化工具 - 在线JSON格式化压缩校验",
    description: "免费在线JSON格式化工具，支持JSON格式化、压缩、语法校验。开发者日常必备，无需安装任何插件。",
  },
  meme: {
    title: "表情包生成器 - 在线制作搞笑表情包",
    description: "免费在线表情包生成器，上传图片添加文字即可制作专属表情包。支持自定义上方和下方文字，一键下载。",
  },
  "name-score": {
    title: "姓名打分器 - 你的名字能打多少分",
    description: "免费在线姓名打分器，输入名字即可获得专属评分。看看你的名字能打多少分？好玩有趣，快分享给朋友！",
  },
  timestamp: {
    title: "时间戳转换 - Unix时间戳在线转换工具",
    description: "免费在线Unix时间戳转换工具，支持时间戳转日期、日期转时间戳，支持秒级和毫秒级精度。开发者日常必备！",
  },
  base64: {
    title: "Base64 编解码 - 在线Base64编码解码工具",
    description: "免费在线Base64编码解码工具，支持中文字符、UTF-8编码。文本转Base64，Base64转文本，一键复制结果。",
  },
  hash: {
    title: "哈希计算器 - MD5/SHA256在线加密工具",
    description: "免费在线哈希计算器，支持MD5、SHA-1、SHA-256、SHA-512等多种加密算法。文本哈希值计算，数据校验必备。",
  },
  bmi: {
    title: "BMI 计算器 - 身体质量指数在线计算",
    description: "免费在线BMI计算器，输入身高和体重即可快速计算身体质量指数。了解你的体重是否健康，成人儿童通用。",
  },
  "age-calculator": {
    title: "年龄计算器 - 在线精确计算年龄",
    description: "免费在线年龄计算器，输入出生日期精确计算周岁、月数、天数。还能算出出生总天数、下次生日倒计时！",
  },
  uuid: {
    title: "UUID 生成器 - 在线批量生成UUID",
    description: "免费在线UUID生成器，支持批量生成UUID v4随机标识符。一键复制单个或批量导出，开发者必备工具。",
  },
  "url-encode": {
    title: "URL 编解码 - 在线URL编码解码工具",
    description: "免费在线URL编码解码工具，支持encodeURIComponent和decodeURIComponent。轻松处理URL中的特殊字符、中文参数，一键复制结果。",
  },
  dedup: {
    title: "文字去重工具 - 在线文本去重排序",
    description: "免费在线文本去重工具，支持按行去重、忽略空行、保留顺序。批量处理名单、关键词、链接列表，快速去除重复项。",
  },
  "word-count": {
    title: "字数统计器 - 在线统计字数 字符数 行数",
    description: "免费在线字数统计器，支持中文字数、英文字符数、标点符号、行数、段落数统计。写作、翻译、自媒体必备工具。",
  },
  regex: {
    title: "正则表达式测试 - 在线Regex匹配工具",
    description: "免费在线正则表达式测试工具，实时匹配高亮显示，支持全局/忽略大小写/多行等模式。内置常用正则速查，开发者日常必备。",
  },
  "ip-lookup": {
    title: "IP 地址查询 - 你的公网IP查询工具",
    description: "免费在线IP地址查询工具，一键查看你的公网IPv4地址、所在地、运营商等信息。支持IPv6检测，网络安全必备。",
  },
  "hepatitis-b": {
    title: "乙肝大小三阳自测 - 乙肝五项检测结果判定",
    description: "免费在线乙肝五项检测结果判定工具，根据HBsAg和HBeAg结果快速判断大三阳、小三阳或未感染状态。健康科普参考，即测即知！",
  },
  "hepatitis-b-treatment": {
    title: "乙肝是否需要抗病毒治疗 - HBsAg/HBV DNA结果判定",
    description: "免费在线乙肝抗病毒治疗判定工具，根据HBsAg、HBV DNA和高敏HBV DNA检测结果，快速判断是否需要抗病毒治疗。健康科普参考，即测即知！",
  },
  "novel-to-video": {
    title: "小说配图转视频 - AI自动生成动漫配图合成视频",
    description: "免费小说配图转视频工具，AI自动为每章生成动漫风格配图，合成GIF动图并整合为视频。支持.docx格式，AI文生图免费无限制！",
  },
  "lung-cancer": {
    title: "肺癌治疗方案速查 - NSCLC/SCLC分期用药指南查询",
    description: "免费在线肺癌治疗方案速查工具，支持NSCLC和SCLC，按病理类型/临床分期/驱动基因/体能评分精准推荐方案。基于CSCO/NCCN指南，医学知识科普参考。",
  },
  bazi: {
    title: "四柱预测（八字测算）- 免费在线算命查五行",
    description: "免费在线四柱预测工具，输入出生年月日时精准推算八字命盘、五行分布、日主属性。了解你的先天命运格局，测测你是什么命！",
  },
  "hypertension-risk": {
    title: "高血压风险评估 - 在线心血管健康风险自测",
    description: "免费在线高血压风险评估工具，输入血压、年龄、BMI、家族史、吸烟等指标，快速评估高血压风险等级。健康科普参考，即测即知！",
  },
  "diabetes-risk": {
    title: "糖尿病风险评估 - 基于中国糖尿病风险评分表",
    description: "免费在线糖尿病风险评估工具，基于中国糖尿病风险评分表，输入年龄、腰围、BMI、家族史等指标，评估2型糖尿病患病风险。健康科普参考！",
  },
  "stroke-risk": {
    title: "中风风险评估 - Framingham卒中风险评分",
    description: "免费在线中风风险评估工具，基于改良Framingham卒中风险评分，输入年龄、血压、血脂、吸烟等指标评估10年卒中风险。健康科普参考！",
  },
  "gout-risk": {
    title: "痛风风险评估 - 尿酸与痛风风险自测",
    description: "免费在线痛风风险评估工具，输入尿酸值、关节症状、饮食史等指标，评估痛风及急性发作风险等级。健康科普参考，即测即知！",
  },
  egfr: {
    title: "eGFR 肾小球滤过率计算 - CKD-EPI公式在线评估肾功能",
    description: "免费在线eGFR肾小球滤过率计算器，基于CKD-EPI公式，输入血肌酐、年龄、性别快速计算eGFR，评估慢性肾脏病分期。医学知识科普参考！",
  },
  bsa: {
    title: "体表面积 BSA 计算 - Mosteller/DuBois公式",
    description: "免费在线体表面积BSA计算器，支持Mosteller、DuBois、Haycock等多种公式。化疗药物剂量、心输出量计算必备工具，医学知识科普参考。",
  },
  "due-date": {
    title: "预产期计算器 - 末次月经推算预产期",
    description: "免费在线预产期计算器，输入末次月经第一天自动推算出预产期，显示当前孕周、距离预产期天数。孕期妈妈必备，医学知识科普参考！",
  },
  "cha2ds2-vasc": {
    title: "CHA₂DS₂-VASc 房颤卒中评分 - 抗凝治疗决策辅助",
    description: "免费在线CHA₂DS₂-VASc评分工具，房颤患者卒中风险评估，指导是否需要长期口服抗凝药物治疗。ACC/AHA指南推荐，医学知识科普参考。",
  },
  "wells-score": {
    title: "Wells 肺栓塞评分 - DVT/PE临床概率评估",
    description: "免费在线Wells肺栓塞和深静脉血栓评分工具，评估DVT和PE临床概率，辅助D二聚体检测决策。Wells标准两水平评分，医学知识科普参考。",
  },
  "headache-check": {
    title: "头痛鉴别 - 偏头痛/紧张性/丛集性头痛自查",
    description: "免费在线头痛鉴别工具，根据头痛部位、性质、伴随症状区分偏头痛、紧张性头痛、丛集性头痛，含危险信号紧急就医提示。健康科普参考。",
  },
  "chest-pain-check": {
    title: "胸痛鉴别 - 心源性/肺源性/消化性胸痛自查",
    description: "免费在线胸痛鉴别工具，根据胸痛部位、性质、诱因区分心源性、肺源性、消化性、肌肉性胸痛，含急性心梗/肺栓塞紧急就医提示。健康科普参考。",
  },
  "abdominal-pain-check": {
    title: "腹痛鉴别 - 按部位/性质区分腹痛原因",
    description: "免费在线腹痛鉴别工具，按疼痛部位（九分法）和疼痛性质区分腹痛原因，含急腹症警示和紧急就医提示。健康科普参考，不能替代医生诊断。",
  },
  "rash-check": {
    title: "皮疹鉴别 - 按形态分类过敏性/传染性皮疹",
    description: "免费在线皮疹鉴别工具，按皮疹形态（斑疹/丘疹/水疱/风团等）分类鉴别，传染性、过敏性、自身免疫性皮疹特征对比。健康科普参考。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool?: string[] }>;
}): Promise<Metadata> {
  const resolved = await params;
  const tool = resolved.tool?.[0] || "";
  const meta = toolMeta[tool];

  if (!meta) {
    return {
      title: "在线工具 | 888工具站",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://has88888888.com/tools/${tool}`,
      siteName: "888工具站",
      locale: "zh_CN",
      type: "website",
    },
    alternates: {
      canonical: `https://has88888888.com/tools/${tool}`,
    },
  };
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
