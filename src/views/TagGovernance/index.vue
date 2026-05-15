<template>
  <div class="page">
    <!-- Page header -->
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>治理</a-breadcrumb-item>
      <a-breadcrumb-item>总览</a-breadcrumb-item>
      <a-breadcrumb-item>2026 · Q2</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <h1 class="page-title">标签治理概览</h1>
        <p class="page-sub">实时洞察全域标签的标准化、关联与质量进展。所有指标取自政务主数据通道，刷新间隔 60 秒。</p>
      </div>
      <a-space :size="10">
        <a-tag color="green">
          <a-badge status="processing" color="green" /> 实时
        </a-tag>
        <span class="sync-time">最近同步 · 14:32:18</span>
      </a-space>
    </div>

    <!-- KPI strip -->
    <a-row :gutter="[12, 12]" class="kpi-row">
      <a-col v-for="card in statCards" :key="card.label" :xs="12" :sm="8" :md="8" :lg="4">
        <a-card size="small" :body-style="{ padding: '16px' }">
          <div class="kpi-head">
            <span class="kpi-code">{{ card.code }}</span>
            <component :is="card.icon" class="kpi-icon" />
          </div>
          <a-statistic
            :value="card.value"
            :value-style="{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em' }"
          />
          <div class="kpi-meta">
            <span class="kpi-label">{{ card.label }}</span>
          </div>
          <div class="kpi-foot">
            <span class="kpi-delta">
              <ArrowUpOutlined /> {{ card.delta }}
            </span>
            <span class="kpi-percent">{{ card.percent }}</span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Main grid -->
    <a-row :gutter="16" class="main-grid">
      <!-- Left: Table -->
      <a-col :xs="24" :lg="16" class="left-col">
        <a-card
          title="子标签明细"
          class="left-card"
          :body-style="{ padding: '16px' }"
        >
          <template #extra>
            <a-space :size="8">
              <a-input
                v-model:value="searchText"
                placeholder="按标签名称筛选…"
                style="width: 220px"
                allow-clear
              >
                <template #prefix><SearchOutlined style="opacity:.45" /></template>
              </a-input>
              <a-button>
                <template #icon><DownloadOutlined /></template>
                导出 CSV
              </a-button>
              <a-button type="primary" @click="router.push('/tag-management/create')">
                <template #icon><PlusOutlined /></template>
                新建标签
              </a-button>
            </a-space>
          </template>

          <a-table
            :columns="columns"
            :data-source="filteredTableData"
            :pagination="{ pageSize: 10, total: 142, showSizeChanger: false, showTotal: t => `共 ${t} 条` }"
            :row-key="r => r.id"
            :custom-row="rowClickHandler"
            size="middle"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'idx'">
                <span class="cell-idx">{{ String(index + 1).padStart(2, '0') }}</span>
              </template>
              <template v-else-if="column.key === 'code'">
                <span class="cell-code">T-{{ String(100200 + record.id).padStart(6, '0') }}</span>
              </template>
              <template v-else-if="column.key === 'name'">
                <a-space :size="8">
                  <span class="cell-dot" :style="{ background: record.color }"></span>
                  <span class="cell-name">{{ record.name }}</span>
                </a-space>
              </template>
              <template v-else-if="column.key === 'status'">
                <a-tag :color="statusColor(record.status)">{{ record.status }}</a-tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button type="link" size="small" @click.stop="router.push(`/tag-management/detail/${record.id}`)">
                  详情 <RightOutlined />
                </a-button>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>

      <!-- Right: Charts -->
      <a-col :xs="24" :lg="8">
        <a-space direction="vertical" :size="16" style="width:100%">
          <!-- Donut -->
          <a-card title="标签分布占比">
            <div class="donut-wrap">
              <svg class="donut" viewBox="0 0 100 100">
                <circle class="donut-track" cx="50" cy="50" r="40" fill="transparent" stroke-width="14" />
                <circle class="donut-seg seg-1" cx="50" cy="50" r="40" fill="transparent" stroke-width="14" stroke-dasharray="103.5 251.2" />
                <circle class="donut-seg seg-2" cx="50" cy="50" r="40" fill="transparent" stroke-width="14" stroke-dasharray="54.8 251.2" stroke-dashoffset="-103.5" />
                <circle class="donut-seg seg-3" cx="50" cy="50" r="40" fill="transparent" stroke-width="14" stroke-dasharray="36.2 251.2" stroke-dashoffset="-158.3" />
              </svg>
              <div class="donut-center">
                <div class="donut-label">点位总数</div>
                <div class="donut-value">58,669</div>
              </div>
            </div>
            <a-divider style="margin: 12px 0" />
            <div class="legend">
              <div v-for="item in legendItems" :key="item.label" class="legend-row">
                <span class="legend-mark" :style="{ background: item.color }"></span>
                <span class="legend-label">{{ item.label }}</span>
                <span class="legend-value">{{ item.value }}</span>
              </div>
            </div>
          </a-card>

          <!-- Progress -->
          <a-card title="治理进展详情">
            <div v-for="item in progressItems" :key="item.label" class="progress-row">
              <div class="progress-head">
                <span class="progress-label">
                  <span class="progress-code">{{ item.code }} ·</span> {{ item.label }}
                </span>
                <span class="progress-pct">{{ item.value }}<small>%</small></span>
              </div>
              <a-progress
                :percent="item.value"
                :show-info="false"
                :stroke-color="item.value >= 80 ? '#52c41a' : '#1138e0'"
                size="small"
              />
            </div>
            <a-alert
              type="info"
              show-icon
              style="margin-top: 12px"
            >
              <template #message>
                本周完成 <b>12</b> 个新标签标准化，质量达标率 <b>+4.2%</b>。
              </template>
            </a-alert>
          </a-card>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowUpOutlined,
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  RightOutlined,
  UserOutlined,
  BankOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  InboxOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()
const searchText = ref('')

const statCards = [
  { code: '人口', label: '人口基础', value: 12840, percent: '24%', delta: '+312', icon: UserOutlined },
  { code: '法人', label: '法人单位', value: 8421,  percent: '18%', delta: '+128', icon: BankOutlined },
  { code: '地理', label: '空间地理', value: 24190, percent: '32%', delta: '+846', icon: EnvironmentOutlined },
  { code: '证照', label: '电子证照', value: 6720,  percent: '12%', delta:  '+92', icon: IdcardOutlined },
  { code: '资产', label: '资产资源', value: 4388,  percent:  '9%', delta:  '+48', icon: InboxOutlined },
  { code: '信用', label: '社会信用', value: 2110,  percent:  '5%', delta:  '+21', icon: SafetyCertificateOutlined },
]

const tableData = ref([
  { id: 1, name: '常住人口标识',     category: '人口基础标签', count: '12,045', status: '治理中', color: '#1138e0' },
  { id: 2, name: '企业纳税等级',     category: '法人单位标签', count: '5,412',  status: '治理中', color: '#1138e0' },
  { id: 3, name: '街道行政编码',     category: '空间地理标签', count: '22,100', status: '已完成', color: '#52c41a' },
  { id: 4, name: '高新技术企业',     category: '法人单位标签', count: '3,200',  status: '治理中', color: '#1138e0' },
  { id: 5, name: '医疗机构许可证',   category: '电子证照标签', count: '1,250',  status: '待审核', color: '#faad14' },
  { id: 6, name: '社保参保人员',     category: '人口基础标签', count: '9,872',  status: '已完成', color: '#52c41a' },
  { id: 7, name: '商事主体登记',     category: '法人单位标签', count: '6,348',  status: '治理中', color: '#1138e0' },
  { id: 8, name: '不动产权属编码',   category: '空间地理标签', count: '14,560', status: '治理中', color: '#1138e0' },
  { id: 9, name: '食品经营许可证',   category: '电子证照标签', count: '2,108',  status: '待审核', color: '#faad14' },
  { id: 10, name: '城市网格单元码',  category: '空间地理标签', count: '18,920', status: '已完成', color: '#52c41a' },
])

const filteredTableData = computed(() =>
  tableData.value.filter(item => !searchText.value || item.name.includes(searchText.value))
)

const columns = [
  { key: 'idx',      title: '序号',    width: 64 },
  { key: 'code',     title: '编号',    width: 120 },
  { key: 'name',     title: '名称' },
  { dataIndex: 'category', title: '分类' },
  { dataIndex: 'count',    title: '覆盖量', align: 'right', width: 100 },
  { key: 'status',   title: '状态',    width: 90 },
  { key: 'action',   title: '',        width: 90, align: 'right' },
]

const rowClickHandler = (record) => ({
  onClick: () => router.push(`/tag-management/detail/${record.id}`),
  style: 'cursor: pointer',
})

const statusColor = (status) => ({
  '治理中': 'blue',
  '已完成': 'green',
  '待审核': 'orange',
  '已停用': 'default',
}[status] || 'default')

const legendItems = [
  { label: '空间地理', value: '41.2%', color: '#1138e0' },
  { label: '人口基础', value: '21.8%', color: '#597ef7' },
  { label: '法人单位', value: '14.4%', color: '#52c41a' },
  { label: '其他类型', value: '22.6%', color: '#d9d9d9' },
]

const progressItems = [
  { code: '01', label: '数据标准化', value: 85 },
  { code: '02', label: '关联映射',   value: 62 },
  { code: '03', label: '质量核查',   value: 48 },
]
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  margin-bottom: 4px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.15;
}

.page-sub {
  font-size: 13px;
  opacity: 0.6;
  margin: 6px 0 0;
  max-width: 640px;
  line-height: 1.55;
}

.sync-time {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
  opacity: 0.55;
  letter-spacing: 0.04em;
}

/* Main grid: left card stretches to match right col height */
.main-grid {
  align-items: stretch;
}

.left-col {
  display: flex;
}

.left-card {
  width: 100%;
  height: 100%;
}

/* KPI cards */
.kpi-row {
  margin-bottom: 4px;
}

.kpi-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.kpi-code {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  opacity: 0.55;
}

.kpi-icon {
  font-size: 14px;
  opacity: 0.4;
}

.kpi-meta {
  margin-top: 2px;
}

.kpi-label {
  font-size: 11px;
  opacity: 0.6;
}

.kpi-foot {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
}

.kpi-delta {
  color: #52c41a;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.kpi-percent {
  opacity: 0.5;
  letter-spacing: 0.06em;
}

/* Table cells */
.cell-idx,
.cell-code {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
  opacity: 0.65;
  letter-spacing: 0.04em;
}

.cell-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
}

.cell-name {
  font-weight: 500;
  font-size: 13px;
}

/* Donut chart */
.donut-wrap {
  position: relative;
  width: 176px;
  height: 176px;
  margin: 0 auto;
}

.donut {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.donut-track {
  stroke: rgba(0, 0, 0, 0.06);
}

:global(.dark) .donut-track {
  stroke: rgba(255, 255, 255, 0.08);
}

.seg-1 { stroke: #1138e0; }
.seg-2 { stroke: #597ef7; }
.seg-3 { stroke: #52c41a; }

.donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-label {
  font-size: 11px;
  opacity: 0.55;
}

.donut-value {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 2px;
}

/* Legend */
.legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.legend-mark {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 1px;
}

.legend-label {
  opacity: 0.7;
  flex: 1;
}

.legend-value {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 600;
}

/* Progress rows */
.progress-row {
  margin-bottom: 14px;
}

.progress-row:last-of-type {
  margin-bottom: 0;
}

.progress-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 12px;
  margin-bottom: 4px;
}

.progress-label {
  opacity: 0.75;
}

.progress-code {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  opacity: 0.55;
  margin-right: 4px;
}

.progress-pct {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 600;
}

.progress-pct small {
  font-size: 10px;
  opacity: 0.6;
  margin-left: 1px;
}
</style>
