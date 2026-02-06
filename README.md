# 导航网站

一个基于 Vue 3 + Vite + TailwindCSS 构建的现代化网站导航平台，提供简洁、高效的网站收藏和分类管理功能。

## 功能特性

- 🎯 **网站导航** - 按分类浏览和访问常用网站
- 🔍 **智能搜索** - 快速搜索已收录的网站
- 🏷️ **标签筛选** - 通过标签快速定位相关网站
- ⭐ **收藏管理** - 收藏常用网站，方便快速访问
- 🌙 **暗色模式** - 支持明暗主题切换，保护视力
- 📱 **响应式设计** - 适配不同屏幕尺寸，提供良好的移动端体验
- 🎨 **极简科技风** - 扁平化设计，弱阴影，少色彩，强留白

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式框架**: TailwindCSS 3.4.1
- **数据存储**: JSON 配置文件 + LocalStorage
- **图标库**: Google Favicon API

## 快速开始

### 环境要求

- Node.js >= 20.19 或 >= 22.12
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 查看项目

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
navigation-website/
├── src/
│   ├── components/          # 组件目录
│   │   ├── App.vue         # 主应用组件
│   │   ├── SearchBar.vue   # 搜索栏组件
│   │   ├── CategoryList.vue# 分类列表组件
│   │   ├── TagFilter.vue   # 标签筛选组件
│   │   ├── BookmarkCard.vue# 网站卡片组件
│   │   └── ThemeToggle.vue# 主题切换组件
│   ├── composables/         # 组合式函数
│   │   └── useNavigation.js# 导航逻辑
│   ├── data/               # 数据目录
│   │   └── navigation.json # 网站数据配置
│   ├── styles/             # 样式目录
│   │   └── main.css        # 主样式文件
│   └── main.js             # 应用入口
├── public/                 # 静态资源
├── index.html              # HTML 模板
├── tailwind.config.js      # TailwindCSS 配置
└── package.json            # 项目配置
```

## 配置说明

### 添加新网站

编辑 `src/data/navigation.json` 文件，添加新的网站配置：

```json
{
  "id": "唯一标识",
  "title": "网站标题",
  "url": "网站URL",
  "description": "网站描述",
  "categoryId": "分类ID",
  "tags": ["标签1", "标签2"],
  "sort": 排序序号,
  "isRecommended": true/false,
  "favicon": "网站图标URL",
  "isFavorite": false,
  "lastVisited": null
}
```

### 自定义分类

在 `navigation.json` 中的 `categories` 数组中添加新分类：

```json
{
  "id": "分类ID",
  "name": "分类名称",
  "icon": "分类图标"
}
```

### 主题配置

在 `tailwind.config.js` 中自定义颜色和样式：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        // 其他颜色配置
      }
    }
  }
}
```

## 开发指南

### 组件开发

所有组件使用 Vue 3 的 `<script setup>` 语法，遵循以下规范：

- 使用 Composition API
- Props 和 Emits 明确定义
- 组件样式使用 TailwindCSS 类名
- 保持组件单一职责

### 状态管理

使用 `useNavigation.js` 组合式函数管理导航状态：

```javascript
import { useNavigation } from './composables/useNavigation'

const { 
  categories, 
  websites, 
  filteredWebsites,
  selectedCategory,
  selectedTag,
  searchQuery
} = useNavigation()
```

### 样式规范

- 使用 TailwindCSS 工具类
- 遵循极简设计原则
- 使用语义化的颜色和间距
- 确保暗色模式兼容

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- 初始版本发布
- 实现基础导航功能
- 支持分类和标签筛选
- 支持搜索和收藏功能
- 实现暗色模式
- 响应式设计优化
