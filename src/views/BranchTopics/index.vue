<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>数据</a-breadcrumb-item>
      <a-breadcrumb-item>标签共享</a-breadcrumb-item>
      <a-breadcrumb-item>共享中心</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">标签共享中心</a-typography-title>
        <a-typography-text type="secondary">
          围绕主题构建标签集合，面向政务内网与跨部门提供数据共享与 API 接口。
        </a-typography-text>
      </div>
      <a-space :size="10">
        <a-button>
          <template #icon><MonitorOutlined /></template>
          运行日志
        </a-button>
        <a-button type="primary" @click="router.push('/branch-topics/collection/create')">
          <template #icon><PlusOutlined /></template>
          新建共享
        </a-button>
      </a-space>
    </div>

    <a-divider orientation="left" class="section-divider">
      <a-space :size="8">
        <span>01 操作入口</span>
        <a-tag color="blue" :bordered="false">快捷动作</a-tag>
      </a-space>
    </a-divider>

    <a-row :gutter="0" class="action-grid">
      <a-col :xs="24" :md="8">
        <a-card
          hoverable
          class="action-card"
          :body-style="{ padding: '20px' }"
          @click="router.push('/tag-management/create')"
        >
          <div class="action-card-top">
            <a-typography-text type="secondary" class="action-card-meta">A · 快捷入口</a-typography-text>
            <PlusCircleOutlined class="action-icon action-icon-primary" />
          </div>
          <a-typography-title :level="5" class="action-title">新建标签</a-typography-title>
          <a-typography-paragraph class="action-desc">
            基于全域数据源，快速定义语义化标签，支持多维属性配置与血缘追踪。
          </a-typography-paragraph>
          <a-button type="link" class="action-link">
            立即开启
            <ArrowRightOutlined />
          </a-button>
        </a-card>
      </a-col>

      <a-col :xs="24" :md="8">
        <a-card
          hoverable
          class="action-card"
          :body-style="{ padding: '20px' }"
          @click="router.push('/branch-topics/collection/create')"
        >
          <div class="action-card-top">
            <a-typography-text type="secondary" class="action-card-meta">B · 聚合分析</a-typography-text>
            <AppstoreOutlined class="action-icon action-icon-accent" />
          </div>
          <a-typography-title :level="5" class="action-title">新建标签集合</a-typography-title>
          <a-typography-paragraph class="action-desc">
            将关联业务标签进行逻辑分组，构建领域模型，提升跨部门数据共享效率。
          </a-typography-paragraph>
          <a-button type="link" class="action-link action-link-accent">
            创建集合
            <ArrowRightOutlined />
          </a-button>
        </a-card>
      </a-col>

      <a-col :xs="24" :md="8">
        <a-card hoverable class="action-card action-card-primary" :body-style="{ padding: '20px' }">
          <div class="action-card-top">
            <span class="action-card-meta action-card-meta-inverse">C · 核心服务</span>
            <ApartmentOutlined class="action-icon action-icon-inverse" />
          </div>
          <a-typography-title :level="5" class="action-title action-title-inverse">API 共享中心</a-typography-title>
          <a-typography-paragraph class="action-desc action-desc-inverse">
            标准化数据接口交付，实时监控调用链路，确保政务数据流通的安全合规。
          </a-typography-paragraph>
          <a-button type="link" class="action-link action-link-inverse">
            访问中心
            <ArrowRightOutlined />
          </a-button>
        </a-card>
      </a-col>
    </a-row>

    <a-divider orientation="left" class="section-divider">
      <a-space :size="8">
        <span>02 活跃 API 服务</span>
        <a-tag color="green" :bordered="false">在线接口</a-tag>
      </a-space>
    </a-divider>

    <a-card class="api-card" :body-style="{ padding: 0 }">
      <div class="table-toolbar">
        <a-space :size="12" class="toolbar-left">
          <a-input-search
            v-model:value="searchText"
            allow-clear
            placeholder="按接口名称筛选..."
            style="width: 320px"
          />
          <a-typography-text type="secondary">{{ filteredApis.length }}/24</a-typography-text>
        </a-space>
        <a-space :size="8">
          <a-button>导出报表</a-button>
          <a-button type="primary">批量授权</a-button>
        </a-space>
      </div>

      <a-table
        :columns="apiColumns"
        :data-source="filteredApis"
        :pagination="false"
        :row-key="record => record.id"
        size="middle"
        class="content-table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-space :size="10">
              <component :is="apiIcon(record.icon)" class="api-row-icon" />
              <a-typography-text code class="mono-code">{{ record.name }}</a-typography-text>
            </a-space>
          </template>
          <template v-else-if="column.key === 'category'">
            <a-typography-text>{{ record.category }}</a-typography-text>
          </template>
          <template v-else-if="column.key === 'calls'">
            <a-typography-text class="mono-text">{{ record.calls }}</a-typography-text>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-badge :status="apiStatusBadge(record.status)" :text="record.status" />
          </template>
          <template v-else-if="column.key === 'updated'">
            <a-typography-text type="secondary" class="mono-text">
              {{ record.updated.replace(/-/g, '.').slice(0, 16) }}
            </a-typography-text>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button type="link" size="small" class="row-actions">详情</a-button>
          </template>
        </template>
      </a-table>

      <div class="table-footer">
        <a-typography-text type="secondary">
          显示 01-{{ String(filteredApis.length).padStart(2, '0') }} / 共 24 个接口
        </a-typography-text>
        <a-pagination v-model:current="currentPage" simple :page-size="8" :total="24" size="small" />
      </div>
    </a-card>

    <a-row :gutter="24">
      <a-col :xs="24" :md="16">
        <a-divider orientation="left" class="section-divider">
          <a-space :size="8">
            <span>03 共享安全看板</span>
            <a-tag color="purple" :bordered="false">运行指标</a-tag>
          </a-space>
        </a-divider>
        <a-card class="kpi-card" :body-style="{ padding: 0 }">
          <a-row :gutter="0">
            <a-col v-for="kpi in kpiCards" :key="kpi.label" :xs="12" :md="6">
              <div class="kpi-cell">
                <a-statistic :title="kpi.label" :value="kpi.value" :value-style="kpi.valueStyle" />
                <a-typography-text type="secondary" class="kpi-sub">{{ kpi.sub }}</a-typography-text>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <a-col :xs="24" :md="8">
        <a-divider orientation="left" class="section-divider">
          <a-space :size="8">
            <span>04 帮助中心</span>
            <a-tag :bordered="false">支持</a-tag>
          </a-space>
        </a-divider>
        <a-card :body-style="{ padding: '20px' }" class="help-card">
          <a-typography-paragraph class="help-desc">
            遇到 API 调用异常或权限申请问题？查看最新开发者指南或联系技术支持。
          </a-typography-paragraph>
          <a-list :data-source="helpItems" class="help-list">
            <template #renderItem="{ item }">
              <a-list-item class="help-item">
                <a-list-item-meta>
                  <template #avatar>
                    <component :is="helpIcon(item.icon)" class="help-icon" />
                  </template>
                  <template #title>
                    <a-typography-text>{{ item.title }}</a-typography-text>
                  </template>
                </a-list-item-meta>
                <template #extra>
                  <a-button type="link" size="small" class="help-arrow" aria-label="打开帮助项">
                    <template #icon><ArrowRightOutlined /></template>
                  </a-button>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  MonitorOutlined,
  PlusOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  ApiOutlined,
  CloudServerOutlined,
  ConsoleSqlOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  CustomerServiceOutlined,
  WarningOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()
const searchText = ref('')
const filterStatus = ref('')
const currentPage = ref(1)

const apiData = ref([
  { id: 1, name: 'GetResidentProfileByTag_V1',    icon: 'code',         category: '人口基础库', calls: '128,492',  status: '运行中', updated: '2023-11-24 14:20' },
  { id: 2, name: 'EnterpriseRiskScore_Query',      icon: 'api',          category: '营商环境',   calls: '45,012',   status: '运行中', updated: '2023-11-25 09:15' },
  { id: 3, name: 'UrbanTrafficDensity_Stream',     icon: 'webhook',      category: '智慧城市',   calls: '2,104,855',status: '维护中', updated: '2023-11-23 23:45' },
  { id: 4, name: 'LandUseCertificate_Verify',      icon: 'terminal',     category: '自然资源',   calls: '8,331',    status: '运行中', updated: '2023-11-25 11:02' },
  { id: 5, name: 'SocialSecurityStatus_Batch',     icon: 'safety_check', category: '社会保障',   calls: '0',        status: '已禁用', updated: '2023-11-20 16:30' },
])

const filteredApis = computed(() =>
  apiData.value.filter(item => {
    const matchSearch = !searchText.value || item.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchStatus = !filterStatus.value || item.status === filterStatus.value
    return matchSearch && matchStatus
  })
)

const apiColumns = [
  { key: 'name',     title: '接口名称', minWidth: 260 },
  { key: 'category', title: '所属分类', width: 120 },
  { key: 'calls',    title: '累计调用', width: 140, align: 'right' },
  { key: 'status',   title: '状态',     width: 110 },
  { key: 'updated',  title: '最后更新', width: 160 },
  { key: 'action',   title: '操作',     width: 90, align: 'right' },
]

const apiIcon = (icon) => ({
  code: CodeOutlined,
  api: ApiOutlined,
  webhook: CloudServerOutlined,
  terminal: ConsoleSqlOutlined,
  safety_check: SafetyCertificateOutlined,
}[icon] || ApiOutlined)

const apiStatusBadge = (status) => ({
  '运行中': 'success',
  '维护中': 'warning',
  '已禁用': 'default',
}[status] || 'default')

const kpiCards = [
  { label: '接口告警', value: '0',     sub: '近 24 小时',     valueStyle: { color: 'var(--metric-success)' } },
  { label: '平均耗时', value: '12ms',  sub: '近 1 小时 P50',  valueStyle: { color: 'var(--metric-text)' } },
  { label: '今日流量', value: '1.2GB', sub: '较 7 日均值 +8%', valueStyle: { color: 'var(--metric-text)' } },
  { label: '成功率',   value: '99.9%', sub: '▲ 较上周 +0.1pt', valueStyle: { color: 'var(--metric-success)' } },
]

const helpItems = [
  { title: '开发文档', icon: 'description' },
  { title: '联调支持', icon: 'support_agent' },
  { title: '故障申报', icon: 'report' },
]

const helpIcon = (icon) => ({
  description: FileTextOutlined,
  support_agent: CustomerServiceOutlined,
  report: WarningOutlined,
}[icon] || FileTextOutlined)
</script>

<style scoped>
.page {
  --primary-color: #1138e0;
  --accent-color: #fa8c16;
  --surface-muted: rgba(0, 0, 0, 0.015);
  --border-soft: rgba(0, 0, 0, 0.06);
  --api-hub-bg: #1138e0;
  --api-hub-color: rgba(255, 255, 255, 0.96);
  --api-hub-muted: rgba(255, 255, 255, 0.78);
  --metric-success: #52c41a;
  --metric-text: rgba(0, 0, 0, 0.88);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

:global(.dark) .page {
  --primary-color: #6d8cff;
  --accent-color: #ffa940;
  --surface-muted: rgba(255, 255, 255, 0.025);
  --border-soft: rgba(255, 255, 255, 0.08);
  --api-hub-bg: #1d39c4;
  --api-hub-color: rgba(255, 255, 255, 0.96);
  --api-hub-muted: rgba(255, 255, 255, 0.76);
  --metric-success: #73d13d;
  --metric-text: rgba(255, 255, 255, 0.88);
}

.crumb {
  font-size: 12px;
}

.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.page-title {
  margin: 0 0 4px !important;
}

.section-divider {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.action-grid {
  border: 1px solid var(--border-soft);
}

.action-card {
  height: 100%;
  cursor: pointer;
  border-radius: 0;
  border: 0;
  border-right: 1px solid var(--border-soft);
}

.action-grid :deep(.ant-col:last-child) .action-card {
  border-right: 0;
}

.action-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.action-card-meta {
  font-size: 12px;
}

.action-icon {
  font-size: 20px;
}

.action-icon-primary,
.action-link {
  color: var(--primary-color);
}

.action-icon-accent,
.action-link-accent {
  color: var(--accent-color);
}

.action-title {
  margin: 0 0 8px !important;
}

.action-desc {
  min-height: 44px;
  margin-bottom: 12px !important;
  color: rgba(0, 0, 0, 0.55);
  font-size: 12px;
  line-height: 1.65;
}

:global(.dark) .action-desc {
  color: rgba(255, 255, 255, 0.58);
}

.action-link {
  padding: 0;
}

.action-link :deep(.anticon) {
  margin-inline-start: 6px;
}

.action-card-primary {
  background: var(--api-hub-bg);
  color: var(--api-hub-color);
}

.action-card-primary:hover {
  background: var(--api-hub-bg);
}

.action-card-meta-inverse,
.action-icon-inverse,
.action-title-inverse,
.action-desc-inverse,
.action-link-inverse {
  color: var(--api-hub-color) !important;
}

.action-desc-inverse {
  color: var(--api-hub-muted) !important;
}

.table-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-soft);
}

.toolbar-left {
  flex: 1;
  min-width: 280px;
}

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

.api-row-icon {
  color: var(--primary-color);
  font-size: 15px;
}

.mono-code,
.mono-text {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 12px 20px;
  border-top: 1px solid var(--border-soft);
}

.kpi-cell {
  padding: 20px;
  border-right: 1px solid var(--border-soft);
}

.kpi-card :deep(.ant-col:last-child) .kpi-cell {
  border-right: 0;
}

.kpi-sub {
  display: block;
  margin-top: 8px;
  font-size: 12px;
}

.help-desc {
  margin-bottom: 12px !important;
  color: rgba(0, 0, 0, 0.55);
  font-size: 12px;
  line-height: 1.7;
}

:global(.dark) .help-desc {
  color: rgba(255, 255, 255, 0.58);
}

.help-list :deep(.ant-list-item) {
  padding: 12px 0;
}

.help-icon {
  color: var(--primary-color);
  font-size: 16px;
}

.help-arrow {
  opacity: 0;
  transition: opacity 0.15s;
}

.help-item:hover .help-arrow {
  opacity: 1;
}
</style>
