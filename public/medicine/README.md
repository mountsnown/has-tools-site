# 医捷通 MedConnect Global - 跨境就医网站

## 项目简介

医捷通是一个专业的跨境就医一站式服务平台，为国际患者提供：
- 远程视频咨询服务
- 专家门诊预约服务
- 全程医疗陪同服务
- 跨境医疗转诊服务

## 网站结构

```
website/
├── index.html          # 首页
├── services.html       # 服务项目页
├── pricing.html        # 价格优化页
├── hospitals.html      # 医疗机构页
├── fee-policy.html     # 服务费用政策页
├── booking.html       # 预约服务页
├── experts.html        # 专家团队页
├── expert-detail.html  # 专家详情页
├── cases.html          # 客户案例页
├── about.html          # 关于我们页
├── contact.html        # 联系我们页
├── admin.html          # 后台管理系统
├── css/
│   └── style.css       # 主样式表
└── js/
    └── main.js         # 主脚本文件
```

## 设计规范

- **主色调**：#165DFF（医疗蓝）
- **辅助色**：#D4AF37（金色）
- **字体**：系统默认字体栈
- **响应式**：支持PC端和移动端

## 功能特性

### 前台网站
1. **首页**：Banner轮播、专家团队展示、服务介绍
2. **服务项目**：4个子服务页面（远程咨询、专家预约、全程陪同、跨境医疗）
3. **价格优化**：价格计算器、优惠活动展示
4. **医疗机构**：医院列表、筛选功能
5. **专家团队**：专家列表、个人详情页
6. **客户案例**：案例展示、客户评价
7. **预约系统**：4步预约流程、表单验证
8. **后台管理**：客户管理、预约管理、专家管理、财务管理

### 后台系统
- 仪表盘：数据统计、最近预约
- 客户管理：客户列表、编辑功能
- 预约管理：预约列表、状态筛选
- 专家管理：专家列表、添加编辑
- 财务管理：收入统计、退款管理
- 系统设置：基本配置

## 部署说明

### 本地部署
1. 将整个 `website` 文件夹复制到Web服务器
2. 确保服务器支持HTML5
3. 访问 `index.html` 即可查看网站

### 生产环境
1. 使用Nginx或Apache配置静态文件服务
2. 可添加HTTPS支持
3. 建议启用Gzip压缩

### CDN资源
- Font Awesome图标：https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css

## 技术栈

- HTML5
- CSS3（Flexbox、Grid、CSS变量）
- Vanilla JavaScript
- Font Awesome 6.4

## 浏览器兼容性

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)
- 移动端浏览器

## 联系方式

- 电话：+86 15653251358
- 邮箱：3032785238@qq.com
- 微信：yzp88888898
- 地址：上海市浦东新区世纪大道100号环球金融中心B座28层

---

© 2026 医捷通 MedConnect Global 版权所有
