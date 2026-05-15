# Claude Code 项目指南

政务数据治理平台前端。Vue 3 + Vite + Pinia + vue-router + ant-design-vue 4.2.6。

## 必读

**任何 UI 改动开工前，先读 [docs/UI_GUIDELINES.md](docs/UI_GUIDELINES.md)。**
该文档定义本项目的设计基线、组件使用、主题约束、装饰元素映射，是硬性规范。

## 核心约束（一句话版）

- **控件全部用 ant-design-vue**：`a-button` / `a-input` / `a-select` / `a-table` / `a-form` 等，不写自定义实现
- **装饰也全部用 antd**：标题用 `a-typography-title`、图标盒用 `a-avatar shape="square"`、KPI 用 `a-statistic`、趋势用 `a-list + a-progress`、待办用 `a-list-item-meta`
- **不引入新 UI 库**（Element Plus / Naive UI / Material Symbols / Lucide / shadcn 等）
- **不使用** Material You / Bento 视觉特征（渐变、大圆角、左色条）、data terminal 装饰（`»` `[01]` `>` kbd）
- **暗色支持必做**：所有自写颜色补 `:global(.dark)` 选择器
- **不引入图表库** 除非用户明确批准（柱状图用 `a-list + a-progress` 替代）

## 视觉参考样板

`src/views/TagManagement/index.vue` — 用于参考字号 / 间距 / hover 行为 / 装饰元素的 antd 实现。
**注意：参考视觉细节，不是 DOM 模板**。不同页面排布（列表 / 详情 / 表单 / 看板）结构本来就不同，按业务定。

## 派 codex / 子 agent 做 UI 迁移时

prompt 必须包含：
1. `docs/UI_GUIDELINES.md` 路径，要求读完再动手
2. 样板页路径 `src/views/TagManagement/index.vue`
3. 具体组件清单（不要"参考样板风格"这种抽象指令）
4. 完成后 build 验证 + 列出每个文件的关键组件树

codex 不具备视觉审美判断，**交付后必须人工实质审查**（读完整文件对照规范，不能只 grep + build 通过）。

## 验证命令

```
npm run build       # 编译检查
npm run dev         # 本地预览（默认 5173）
```

## 现有迁移进度

- ✅ Layout 层（AppLayout / AppSidebar / AppHeader）已迁 antd
- ✅ TagGovernance/index.vue（早期 antd 风格，待按最新规范微调）
- ✅ TagManagement/index.vue（视觉参考样板）
- ⏳ TagCreate / TagDetail / TagEdit / PointDetail / PointEdit
- ⏳ FusionSearch / MyApprovals / BranchTopics / CollectionCreate
