# UI 规范 — 政务数据治理平台前端

> 本规范适用于本项目所有页面、组件、装饰元素。任何 PR / 迁移 / 重写都必须遵守。
> 违反本规范即视为不合格，需返工。

## 1. 设计基线

- **组件库**：`ant-design-vue@4.2.6`（已通过 `app.use(Antd)` 全局注册）
- **图标**：`@ant-design/icons-vue@7.0.1`（**不使用** Material Symbols / Lucide / Font Awesome 等）
- **主题**：antd default + dark algorithm，已在 `src/App.vue` 通过 `<a-config-provider>` 包好
- **国际化**：中文（`ant-design-vue/es/locale/zh_CN`）
- **设计基准**：antd default 风格（圆角默认 6px、antd 配色、antd 字号字距）
- **视觉参考样板**：`src/views/TagManagement/index.vue` — 用于参考字号 / 间距 / hover 行为 / 装饰元素的 antd 实现方式，**不是**强制结构模板（不同页面排布按各自业务定）

## 2. 强制规则

### 2.1 控件层（必须 antd）

所有用户可交互的控件必须使用 ant-design-vue 组件，禁止自定义实现：

| 用途 | 必须使用 |
|---|---|
| 按钮 | `a-button` |
| 输入 | `a-input` / `a-input-search` / `a-textarea` / `a-input-number` |
| 选择 | `a-select` / `a-cascader` / `a-tree-select` |
| 单选/多选 | `a-radio-group` / `a-checkbox-group` |
| 开关 | `a-switch` |
| 日期 | `a-date-picker` / `a-range-picker` |
| 表格 | `a-table`（行点击用 `customRow`） |
| 分页 | `a-table` 内置 `pagination`，或独立 `a-pagination` |
| 表单 | `a-form` + `a-form-item`（用 `rules` 做校验） |
| 弹窗 | `a-modal` / `a-drawer` |
| 通知 | `a-message` / `a-notification` |
| 标签 | `a-tag`（彩色用 `:color`；细密堆叠用 `:bordered="false"`） |
| 状态点 | `a-badge :status :text`（不要手写色点 span） |
| 进度 | `a-progress` |
| 头像/图标盒 | `a-avatar shape="square" :size="32"`（icon slot 放图标） |
| 折叠/标签页 | `a-collapse` / `a-tabs` |
| 列表 | `a-list` + `a-list-item-meta` |
| 步骤 | `a-steps` |
| 描述 | `a-descriptions` |
| 提示 | `a-alert` / `a-tooltip` / `a-popover` |
| 面包屑 | `a-breadcrumb` |

### 2.2 装饰元素（也必须 antd）

| 想做的装饰 | 用 antd 实现 |
|---|---|
| 标题 / 段落 | `a-typography-title` / `a-typography-paragraph` / `a-typography-text` |
| 副文本 / 灰字 | `a-typography-text type="secondary"` |
| 成功 / 警告 / 错误文本 | `a-typography-text type="success" / type="warning" / type="danger"` |
| 等宽数字（金额、计数） | `a-statistic`（不要手写大字号 div） |
| KPI 卡片 | `a-card` + `a-statistic`（颜色用 `valueStyle.color`，不要 `::before` 左色条） |
| 趋势/排行可视化 | `a-list` + `a-progress`（水平条 + 数字），不手写柱状图 div |
| 图标盒 | `a-avatar shape="square" :size="32"` + icon slot |
| 待办/活动列表 | `a-list` + `a-list-item-meta`（avatar / title / description / extra slot） |
| 行间分割 | `a-divider`（不要手写 `<hr>` 或 `border-top`） |
| 空状态 | `a-empty`（不要手写"暂无数据"div） |
| 加载 | `a-spin`（不要手写 spinner） |

### 2.3 禁止项

- ❌ **不引入新的 UI / 装饰库**（Element Plus、Naive UI、Vuetify、Material Symbols、Bootstrap、Lucide、shadcn 等）
- ❌ **不写自定义控件实现**（自己写 `<select>` `<input>` `<button class="...">`）
- ❌ **不用 Tailwind utility class 做装饰**（颜色 / 边框 / 阴影 / 圆角等）—— Tailwind 默认 preflight 已禁，剩余 utility 仅用于轻量 layout（flex / grid / gap），且能用 `a-space` / `a-row` / `a-col` 替代时优先用 antd
- ❌ **不使用 Material You / Bento 视觉特征**（渐变 `from-x to-y`、`rounded-xl`/`rounded-2xl` 大圆角、左 4px 色条 `border-l-4`、彩色玻璃拟态等）—— 不在 antd default 词典里
- ❌ **不使用 "data terminal" 装饰**（`»` 面包屑符号、`[01]` Mono 编号、`Tab 切换` kbd、`>` 搜索前缀等）—— 也不在 antd default 词典里
- ❌ **不引入图表库** 除非用户明确批准（柱状图 / 折线图先用 a-list + a-progress 替代）
- ❌ **不写自定义 SVG donut / 柱状图**（如必要，等用户审批后接 ECharts 或 @ant-design/charts）

## 3. 主题约束

### 3.1 颜色

- 主色（primary）：`#1138e0`（已设在 ConfigProvider token）
- 状态色用 antd 语义色：
  - 成功：`#52c41a`（`a-tag color="green"` / `a-badge status="success"`）
  - 警告：`#faad14`（`color="orange"` / `status="warning"`）
  - 危险：`#ff4d4f`（`color="red"` / `status="error"`）
  - 信息：`#1138e0`（`color="blue"` / `status="processing"`）
  - 中性：`#bfbfbf`（`color="default"` / `status="default"`）
- 不要硬编码 `#000` / `#fff`，用 `rgba(0,0,0,0.x)` / `rgba(255,255,255,0.x)` 配合 `:global(.dark)` 暗色补丁

### 3.2 字体

- 全局字体已在 `src/App.vue` ConfigProvider `token.fontFamily` 设过，不要在子组件覆盖
- 等宽数字优先用 `a-statistic`（自带 tabular-nums）
- 若必须 inline 等宽（如 ID / 坐标），用 `font-family: 'IBM Plex Mono', ui-monospace, monospace`

### 3.3 圆角

- 全局 borderRadius 由 ConfigProvider 控制（当前默认 6px），不要在组件 scoped style 硬覆盖

### 3.4 间距

- 卡片内边距：`:body-style="{ padding: '16px' }"` 或 `'20px'`，不要 `'24px'` 以上
- 栅格 gutter：`16` 主网格，`[12, 12]` 密集 KPI 区域
- 页面级 gap：`16px`（`.page { display: flex; flex-direction: column; gap: 16px }`）
- 顶级页面内容容器无 max-width 限制（宽屏直接铺满，由 AppLayout 提供 16px 边距）

### 3.5 暗色模式

- 切换通过 `theme.set('dark' | 'light', event)`（`src/stores/theme.js`），含 View Transitions 圆形展开过渡
- 所有自写颜色（含 rgba）必须在 `:global(.dark)` 选择器里给暗色对应值
- 不要 hard-code `color: #fff` 假定亮色背景

## 4. 通用排布约定

> 各页面**主内容区按业务自定**（详情页、表单页、列表页、看板页结构本来就不同）。
> 以下只规定**通用约定**——所有页面都应遵守。

### 4.1 顶级容器

```vue
<template>
  <div class="page">
    <!-- 页头 -->
    <!-- 主内容 -->
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 4.2 页头（建议结构，可按需精简）

每页**至少**应有：
- `a-breadcrumb`（12px 字号，显示当前位置；不强制点击跳转）
- 标题区：`a-typography-title :level="3"` + `a-typography-text type="secondary"` 副标
- 操作按钮区：右侧 `a-space` 包 `a-button` （主操作用 `type="primary"`）

页头布局推荐用 `display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap` 让窄屏自动换行。

如果是详情页 / 表单页，可以省略副标，但 breadcrumb 必须有。

### 4.3 主内容区（按页面类型选）

**列表/管理页**：a-card（或多张 a-card）包 a-table；筛选用 a-form layout="inline"；操作按钮放 a-card 的 `#extra` slot 或 filter bar 末端
**详情页**：a-descriptions（基本信息）+ a-tabs（多视图切换）+ a-table（关联数据）
**表单页**：a-form 单栏或左右两栏 a-row :gutter=16；底部 a-space 放取消/提交
**看板/总览页**：顶部 KPI 行（a-row :gutter=[12,12]，多张 a-card+a-statistic）+ 下方业务网格（a-row :gutter=16）
**设置页**：a-tabs 分组 + a-form 每组分块

以上是**建议组合**，具体取舍按业务来。

### 4.4 栅格

- 全部用 `a-row :gutter="16"` + `a-col :xs :sm :md :lg`
- 响应式断点：`xs=24`（窄屏全宽），`lg` 给大屏分栏
- 常见分栏：`16 / 8`（主图 + 辅助）、`12 / 12`（左右等分）、`14 / 10`（表单左多右少）

## 5. 特殊场景

### 5.1 路由与导航

- `vue-router@4`，所有跳转用 `router.push(path)`
- 面包屑显示当前位置，不做点击跳转链接（除非业务必要）

### 5.2 表格

> 所有列表表格遵循以下统一规范。视觉与行为基线参考 `src/views/TagManagement/index.vue`「标签列表 / 点位列表」两个 tab。

#### 5.2.1 表格容器

- class 一律为 `content-table`（不再使用 `point-table` / `api-table` / `linked-table` 等变体名）
- 必须配置：`:row-key`、`:pagination` 或 `:pagination="false"`、`size="middle"`
- 列定义用 `key`，自定义渲染走 `#bodyCell="{ column, record }"` 插槽
- 行点击跳详情用 `:custom-row="row => ({ onClick: ..., style: 'cursor: pointer' })"`，不要在 `<tr>` 上写 `@click`
- 多选用 `:row-selection="{ selectedRowKeys, onChange }"`，state 用 `ref([])` 维护

#### 5.2.2 必备样式（scoped style 内）

```css
.content-table :deep(.ant-table-thead > tr > th) {
  background: rgba(0, 0, 0, 0.015);
  font-size: 12px;
  font-weight: 600;
}
:global(.dark) .content-table :deep(.ant-table-thead > tr > th) {
  background: rgba(255, 255, 255, 0.025);
}
.content-table :deep(.ant-table-tbody > tr > td) {
  padding-top: 14px;
  padding-bottom: 14px;
}
.content-table :deep(.ant-table-tbody > tr) .row-actions {
  opacity: 0;
  transition: opacity 0.15s;
}
.content-table :deep(.ant-table-tbody > tr:hover) .row-actions {
  opacity: 1;
}
```

#### 5.2.3 列渲染统一约定

**名称列（主列）**：avatar + 双行（名字 + mono ID/编号 sub line）

```vue
<template v-if="column.key === 'name'">
  <a-space :size="12">
    <a-avatar
      shape="square"
      :size="32"
      style="background: rgba(17, 56, 224, 0.08); color: #1138e0"
    >
      <template #icon><component :is="record.icon" /></template>
    </a-avatar>
    <div>
      <a-typography-text strong :style="{ display: 'block' }">{{ record.name }}</a-typography-text>
      <a-typography-text type="secondary" :style="{ fontSize: '11px', fontFamily: 'IBM Plex Mono, ui-monospace, monospace' }">{{ record.id }}</a-typography-text>
    </div>
  </a-space>
</template>
```

- Avatar 颜色固定单色蓝（`bg rgba(17,56,224,0.08) + color #1138e0`），不按业务类型变彩；类型差异由独立 `type` 列承载
- Sub line 是 ID / 英文标识 / 编号 等定位类信息，用 IBM Plex Mono；该实体无 ID 概念可省略 sub
- 极简关联表（如 PointDetail "关联标签"）可降为单行 `a-tag`，无 avatar

| 列类型 | 渲染 |
|---|---|
| 类型 / 分类 | `a-tag :color :bordered="false"` |
| 状态 | `a-badge :status :text` |
| 数量 / 关联标签 | `a-tag color="blue" :bordered="false"` |
| 描述 | `a-typography-text type="secondary" :style="{ fontSize: '12px' }"` + 列定义 `ellipsis: true` |
| 时间 | `a-typography-text type="secondary" :style="{ fontSize: '12px' }"`（不用 mono） |
| ID / 坐标 / 接口名 | inline `font-family: 'IBM Plex Mono', ui-monospace, monospace`（3.2 例外条款） |

#### 5.2.4 操作列

- wrap class 一律为 `row-actions`（不要 `tag-actions` / `row-action` 单数）
- 按钮统一用 `a-button type="link" size="small"`；危险动作加 `danger`
- 阻止行跳转必须加 `@click.stop`
- 列宽：2 个按钮 130px / 3 个 160px / 4 个 180px；`align: 'right'`
- 行 hover 时操作才显示（CSS 已在 5.2.2 提供）

```vue
<template v-else-if="column.key === 'action'">
  <a-space :size="0" class="row-actions">
    <a-button type="link" size="small" @click.stop="...">查看</a-button>
    <a-button type="link" size="small" @click.stop="...">编辑</a-button>
    <a-button type="link" size="small" danger @click.stop>删除</a-button>
  </a-space>
</template>
```

#### 5.2.5 筛选条（表格上方 filter bar）

```vue
<a-form layout="inline" class="filter-bar">
  <a-form-item label="状态">
    <a-select ... />
  </a-form-item>
  <a-form-item class="filter-search">
    <a-input ...><template #prefix><SearchOutlined /></template></a-input>
  </a-form-item>
</a-form>
```

```css
.filter-bar {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  row-gap: 12px;
}
:global(.dark) .filter-bar {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}
.filter-search,
.filter-reset {
  margin-left: auto;
  margin-right: 0 !important;
}
```

- 透明背景，不要灰底
- 末尾 `filter-search` / `filter-reset` 推到右端

#### 5.2.6 分页

**统一配置（嵌入式 a-table 用）**

```js
const xxxPagination = {
  pageSize: 10,                // 或 8、根据业务
  total: N,                    // 总条数
  showSizeChanger: false,      // 关闭「10 条/页」选择器
  showQuickJumper: true,       // 开启「跳至 X 页」
  showTotal: t => `共 ${t} 条`, // 左下角统计文案
}
```

绑到表上：`:pagination="xxxPagination"`。多张表共存（如 tags / points）各自维护一个 pagination 对象。

**外置分页（卡片列表等非 a-table 场景，如 FusionSearch）**

```vue
<div class="pagination-wrap">
  <a-pagination
    :current="1"
    :page-size="10"
    :total="N"
    :show-total="t => `共 ${t} 条`"
    :show-quick-jumper="true"
    :show-size-changer="false"
  />
</div>
```

```css
.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
```

不要用 `simple` 紧凑模式（`< 1 / N >`），与表格分页样式脱节。

**通用约定**

- 三件套必须配齐：`showTotal` + `showQuickJumper: true` + `showSizeChanger: false`
- 分页区 padding 由 `.content-table :deep(.ant-table-pagination) { padding: 16px 20px; margin: 0; }` 兜底
- 不要自己写 `<div class="table-footer">` + 外置 `<a-pagination>` + `<a-typography-text>显示 01-NN / 共 N 条</a-typography-text>` 这种自定义页脚（参考 5.2.7 禁止项）

#### 5.2.7 禁止项

- ❌ 表格 class 不要再起 `xxx-table` 变体名（`api-table` / `linked-table` / `point-table`），统一 `content-table`
- ❌ 操作 wrap 不要叫 `tag-actions` / `row-action`（单数），统一 `row-actions`
- ❌ 序号列不要 mono + `padStart(2, '0')`（属于 2.3 禁止的 `[01] Mono 编号`）
- ❌ avatar 颜色不要按业务类型变彩（蓝/橙混合），统一单色蓝
- ❌ 时间列不要用 mono（除非该列内容本质是 ID / 坐标）
- ❌ filter-bar 不要加灰底背景
- ❌ 同一类操作按钮不要在不同表里混用 `type="link"` 文字 / `type="text"` icon-only，统一文字 link
- ❌ 分页不要自己写 `<div class="table-footer">显示 01-NN / 共 N 条</div>` 这种 padStart `01-04` 自定义页脚（属于 2.3 `[01] Mono 编号`），统一用 antd `showTotal` 配置
- ❌ 分页不要用 `simple` 紧凑模式（`< 1 / N >`），与统一的数字分页样式脱节
- ❌ 不要省略 `showQuickJumper`，所有分页一律开启「跳至 X 页」，无论 total 大小

### 5.3 表单

- `a-form` + `:rules` + `<a-form-item name="...">`，不要 inline 校验
- 提交用 `formRef.value.validate()` 异步 await
- 错误提示由 antd 自动展示，不要手写错误状态

### 5.4 反馈

- 操作成功：`message.success('已...')` （`import { message } from 'ant-design-vue'`）
- 操作失败：`message.error('...')` 或 `a-alert type="error"`
- 二次确认：`Modal.confirm({ ... })`

## 6. 文件组织

```
src/
├─ App.vue                   # ConfigProvider + 主题切换包装
├─ main.js                   # app.use(Antd) 全局注册
├─ stores/theme.js           # 主题切换（含 View Transitions）
├─ components/layout/        # AppLayout / AppSidebar / AppHeader（已迁完）
├─ views/                    # 业务页面（按本规范迁移）
│   └─ TagManagement/index.vue    # 视觉参考样板（字号/间距/hover；不是 DOM 模板）
└─ style.css                 # 全局 CSS 变量（不要在此添加新样式，写到 scoped style）
```

## 7. 迁移流程（旧 Tailwind → antd）

1. 完整 Read 原文件，理解业务结构与所有功能点
2. 按本规范的"控件层 + 装饰元素"映射表逐一替换
3. 删光 Tailwind utility class（除轻量 layout 如 flex / gap）
4. 视觉细节用 `:deep()` 微调 antd 内部样式（表头底色、行 padding 等），不引入新装饰元素
5. 补 `:global(.dark)` 暗色补丁
6. 跑 `npm run build` 验证编译
7. 在浏览器打开页面，对照本规范 + 样板页人工审查

## 8. 派 codex 子 agent 做迁移时

prompt 必须包含：

- 本规范路径：`docs/UI_GUIDELINES.md`
- 样板页路径：`src/views/TagManagement/index.vue`（仅供参考视觉细节，不是 DOM 模板）
- 明确具体**组件映射要求**（`<select>` → a-select / 自定义图标盒 → a-avatar shape=square / 自定义色点 → a-badge / 自定义 toggle → a-switch 等），不要"参考样板风格"这种抽象指令
- 完成后 build 验证 + 列出每个文件的关键组件树
- codex 不具备视觉审美判断，复杂页面（多模块嵌套、自定义可视化）不适合派给它

### 8.1 🚫 严禁给"业务结构建议"

派 codex 做**框架迁移**（如 Tailwind → antd）时，prompt 里**绝对不要写**：

- "推荐结构：a-descriptions + a-tabs（关联点位/治理日志/数据样本）..."
- "右侧加 a-statistic 数据质量预览..."
- "建议加修改记录卡 / KPI 行 / 流程步骤卡..."

**Why:** codex 会把"建议"当成"重新设计许可"，**重构**原版业务结构——新增原版没有的 tab、模块、KPI 行，删除原版有的字段，合并/拆分原版卡片。

prompt 应该这样写：

```
任务：把 X.vue 从 Tailwind 迁到 ant-design-vue。

第一步：完整 Read 原文件，理解每个 div / 卡片 / tab / 按钮的位置。
第二步：Read docs/UI_GUIDELINES.md 与样板页（视觉细节参考）。
第三步：仅替换控件 + 装饰实现，业务结构 100% 与原版一致。

约束：
- 原版有几个 tab，迁移后必须还是几个 tab，标题不变。
- 原版有几张卡片，迁移后还是几张卡片，每张内容范围不变。
- 原版有几个表单字段，迁移后还是几个字段，顺序不变。
- 不允许新增 / 删除 / 合并 / 拆分任何业务模块。
- mock 数据条数与字段保持一致。

迁移内容仅限：
- <table> / <select> / <input> / <button> / 自定义 toggle 等 → 对应 a-* 组件
- 装饰 div（图标盒 / 色点 / 状态文本 / 大数字）→ a-avatar / a-badge / a-typography-text / a-statistic
- Tailwind utility class → 删除，必要样式搬 scoped style
- Material Symbols → @ant-design/icons-vue
```

审查时必须**对比原版**（`git show <commit>:<path>` 或 `git diff HEAD~<n> -- <path>`），不能只看 antd 合规性。
