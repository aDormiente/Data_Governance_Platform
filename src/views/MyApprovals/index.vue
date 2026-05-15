<template>
  <div class="page approvals-page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>工作台</a-breadcrumb-item>
      <a-breadcrumb-item>{{ activeTab === 'mine' ? '我的审批' : '我的申请' }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ activeTab === 'mine' ? '待办列表' : '申请记录' }}</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">
          {{ activeTab === 'mine' ? '我的审批' : '我的申请' }}
        </a-typography-title>
        <a-typography-text type="secondary">
          {{ activeTab === 'mine'
            ? '查看与处理待我审批的事项，跟踪历史决策记录。'
            : '管理我发起的申请，跟踪流程进度与最新动态。' }}
        </a-typography-text>
      </div>

      <a-button v-if="activeTab === 'apply'" type="primary">
        <template #icon><PlusOutlined /></template>
        发起申请
      </a-button>
    </div>

    <div class="tab-switcher">
      <a-segmented
        v-model:value="activeTab"
        :options="approvalTabOptions"
        size="large"
      />
    </div>

    <Transition name="tab-fade" mode="out-in">
    <div v-if="activeTab === 'mine'" key="mine" class="tab-pane">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :lg="16">
          <a-card title="审批效率" :body-style="{ padding: '20px' }">
            <a-row :gutter="[16, 16]" align="bottom">
              <a-col :xs="24" :md="8">
                <a-statistic
                  title="待我处理"
                  :value="24"
                  :value-style="{ fontSize: '48px', fontWeight: 600 }"
                />
              </a-col>
              <a-col :xs="12" :md="5">
                <a-statistic
                  title="通过率"
                  :value="'98.2'"
                  suffix="%"
                  :value-style="successStatisticStyle"
                />
              </a-col>
              <a-col :xs="12" :md="5">
                <a-statistic
                  title="平均耗时"
                  :value="'1.2'"
                  suffix="h"
                  :value-style="primaryStatisticStyle"
                />
              </a-col>
              <a-col :xs="24" :md="6" class="export-col">
                <a-button>
                  <template #icon><DownloadOutlined /></template>
                  导出统计
                </a-button>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :xs="24" :lg="8">
          <a-card class="notice-card" :body-style="{ padding: '20px', minHeight: '143px' }">
            <a-space direction="vertical" :size="18">
              <a-typography-text class="notice-label">系统公告</a-typography-text>
              <a-typography-text strong class="notice-title">
                V2.4 审批流引擎性能升级已完成
              </a-typography-text>
              <a-typography-text class="notice-time">2023.11.20 · 14:00</a-typography-text>
            </a-space>
          </a-card>
        </a-col>
      </a-row>

      <a-divider orientation="left" class="section-divider">
        <a-space :size="8">
          <span>01 待审批列表</span>
          <a-tag color="blue" :bordered="false">待处理</a-tag>
        </a-space>
      </a-divider>

      <a-card :body-style="{ padding: 0 }" class="table-card">
        <div class="table-toolbar">
          <a-space :size="10" wrap>
            <a-select
              v-model:value="filterStatus"
              :options="mineStatusOptions"
              style="width: 144px"
            />
            <a-space :size="6" class="date-window">
              <CalendarOutlined />
              <a-typography-text>近 7 天</a-typography-text>
            </a-space>
          </a-space>
          <a-tooltip title="刷新">
            <a-button>
              <template #icon><ReloadOutlined /></template>
            </a-button>
          </a-tooltip>
        </div>

        <a-table
          :columns="mineColumns"
          :data-source="filteredMineRows"
          :pagination="minePagination"
          :row-key="row => row.id"
          size="middle"
          class="content-table mine-table"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'title'">
              <a-typography-text strong :style="{ display: 'block' }">{{ record.title }}</a-typography-text>
              <a-typography-text type="secondary" class="record-id">
                {{ record.id }}
              </a-typography-text>
            </template>
            <template v-else-if="column.key === 'name'">
              <a-space :size="12">
                <a-avatar shape="square" :size="32" :style="{ background: 'rgba(17, 56, 224, 0.08)', color: '#1138e0' }">{{ record.name[0] }}</a-avatar>
                <a-typography-text>{{ record.name }}</a-typography-text>
              </a-space>
            </template>
            <template v-else-if="column.key === 'time'">
              <a-typography-text type="secondary" :style="{ fontSize: '12px' }">
                {{ record.time }}
              </a-typography-text>
            </template>
            <template v-else-if="column.key === 'status'">
              <a-badge :status="mineStatusBadge(record.status)" :text="record.status" />
            </template>
            <template v-else-if="column.key === 'action'">
              <a-button type="link" size="small" class="row-actions">查看详情</a-button>
            </template>
          </template>
        </a-table>
      </a-card>
    </div>

    <div v-else key="apply" class="tab-pane">
      <a-row :gutter="[12, 12]" class="apply-kpis">
        <a-col v-for="kpi in applyKpis" :key="kpi.label" :xs="12" :md="6">
          <a-card :body-style="{ padding: '16px 20px' }" class="apply-kpi-card">
            <a-statistic
              :title="kpi.label"
              :value="kpi.value"
              suffix="件"
              :value-style="{ fontSize: '28px', fontWeight: 600, color: kpi.color }"
            >
              <template #prefix>
                <component :is="kpi.icon" class="kpi-icon" :style="{ color: kpi.color }" />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>

      <a-divider orientation="left" class="section-divider">
        <a-space :size="8">
          <span>02 申请记录</span>
          <a-tag :bordered="false">我发起的</a-tag>
        </a-space>
      </a-divider>

      <a-card :body-style="{ padding: 0 }" class="table-card">
        <a-form layout="inline" class="filter-bar">
          <a-form-item label="关键字">
            <a-input
              v-model:value="applyKeyword"
              placeholder="申请标题或编号..."
              allow-clear
              style="width: 220px"
            />
          </a-form-item>
          <a-form-item label="状态">
            <a-select
              v-model:value="applyStatus"
              :options="applyStatusOptions"
              style="width: 144px"
            />
          </a-form-item>
          <a-form-item label="时间">
            <a-date-picker v-model:value="applyDate" style="width: 160px" />
          </a-form-item>
          <a-form-item class="filter-actions">
            <a-space :size="8">
              <a-button type="primary">查询</a-button>
              <a-button @click="resetApplyFilters">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>

        <a-table
          :columns="applyColumns"
          :data-source="filteredApplyRows"
          :pagination="applyPagination"
          :row-key="row => row.reqId"
          size="middle"
          class="content-table apply-table"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'reqId'">
              <a-typography-text class="req-id">{{ record.reqId }}</a-typography-text>
            </template>
            <template v-else-if="column.key === 'title'">
              <a-typography-text strong>{{ record.title }}</a-typography-text>
            </template>
            <template v-else-if="column.key === 'type'">
              <a-tag color="blue" :bordered="false">{{ record.type }}</a-tag>
            </template>
            <template v-else-if="column.key === 'time'">
              <a-typography-text type="secondary" :style="{ fontSize: '12px' }">
                {{ record.time }}
              </a-typography-text>
            </template>
            <template v-else-if="column.key === 'status'">
              <a-badge :status="applyStatusBadge(record.status)" :text="record.statusShort" />
              <a-typography-text type="secondary" class="status-sub">
                {{ record.statusLabel }}
              </a-typography-text>
            </template>
            <template v-else-if="column.key === 'action'">
              <a-space :size="0" class="row-actions">
                <a-button type="link" size="small">详情</a-button>
                <a-button v-if="record.canRecall" type="link" size="small" danger>撤回</a-button>
                <a-button v-else-if="record.canResubmit" type="link" size="small">重新发起</a-button>
              </a-space>
            </template>
          </template>
        </a-table>
      </a-card>

      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="12">
          <a-alert
            type="info"
            message="申请须知"
            description="所有权限申请均需经过部门领导初审，如涉及敏感数据访问，还需通过安全委员会会签。申请通过后系统将自动下发权限。"
            :show-icon="true"
          />
        </a-col>
        <a-col :xs="24" :md="12">
          <a-alert
            type="warning"
            message="最近操作"
            description="您于 2023.10.24 · 14:20 发起“数据权限”申请，当前审批中。"
            :show-icon="true"
          />
        </a-col>
      </a-row>
    </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  PlusOutlined,
  ReloadOutlined,
  CalendarOutlined,
} from '@ant-design/icons-vue'

const activeTab = ref('mine')
const filterStatus = ref('')
const applyKeyword = ref('')
const applyStatus = ref('')
const applyDate = ref(null)

const primaryStatisticStyle = {
  fontSize: '22px',
  fontWeight: 600,
  color: 'rgb(var(--color-primary))',
}

const successStatisticStyle = {
  fontSize: '22px',
  fontWeight: 600,
  color: 'rgb(var(--color-success))',
}

const approvalTabOptions = [
  { value: 'mine',  label: '我的审批 24' },
  { value: 'apply', label: '我的申请 163' },
]

const mineStatusOptions = [
  { label: '全部', value: '' },
  { label: '审批中', value: '审批中' },
  { label: '通过', value: '通过' },
  { label: '驳回', value: '驳回' },
]

const applyStatusOptions = [
  { label: '全部', value: '' },
  { label: '审批中', value: '审批中' },
  { label: '已通过', value: '已通过' },
  { label: '已驳回', value: '已驳回' },
  { label: '草稿', value: '草稿' },
]

const mineColumns = [
  { key: 'title', title: '标题', dataIndex: 'title', minWidth: 240 },
  { key: 'name', title: '申请人', dataIndex: 'name', width: 150 },
  { key: 'dept', title: '部门', dataIndex: 'dept', minWidth: 180 },
  { key: 'time', title: '提交时间', dataIndex: 'time', width: 170 },
  { key: 'status', title: '状态', dataIndex: 'status', width: 110 },
  { key: 'action', title: '操作', width: 110, align: 'right' },
]

const applyColumns = [
  { key: 'reqId', title: '编号', dataIndex: 'reqId', width: 150 },
  { key: 'title', title: '标题', dataIndex: 'title', minWidth: 240 },
  { key: 'project', title: '所属资源', dataIndex: 'project', minWidth: 170 },
  { key: 'type', title: '类型', dataIndex: 'type', width: 110 },
  { key: 'time', title: '提交时间', dataIndex: 'time', width: 170 },
  { key: 'status', title: '状态', dataIndex: 'status', width: 150 },
  { key: 'handler', title: '处理人', dataIndex: 'handler', minWidth: 150 },
  { key: 'action', title: '操作', width: 160, align: 'right' },
]

const mineData = ref([
  {
    id: 'REQ-20231124-001',
    title: '关于“智慧交通”标签库的扩展申请',
    name: '张建设',
    dept: '大数据局 / 交通科',
    time: '2023-11-24 10:24',
    status: '审批中',
  },
  {
    id: 'REQ-20231123-014',
    title: '人口普查底层数据标签同步请求',
    name: '李晓芳',
    dept: '民政局 / 社会事务中心',
    time: '2023-11-23 16:45',
    status: '通过',
  },
  {
    id: 'REQ-20231122-088',
    title: '公共卫生安全指数标签公开授权',
    name: '王志强',
    dept: '卫健委 / 应急办',
    time: '2023-11-22 09:12',
    status: '驳回',
  },
  {
    id: 'REQ-20231121-022',
    title: '“数字乡村”地理空间标签批量更新',
    name: '陈思进',
    dept: '农业农村局',
    time: '2023-11-21 14:30',
    status: '审批中',
  },
])

const filteredMineRows = computed(() =>
  mineData.value.filter(row => !filterStatus.value || row.status === filterStatus.value)
)

const mineStatusBadge = (status) => ({
  审批中: 'processing',
  通过: 'success',
  驳回: 'error',
}[status] || 'default')

const applyData = ref([
  {
    reqId: 'REQ20231024001',
    title: '政务人口基础数据库访问权限申请',
    project: '智慧城市一期项目',
    type: '数据权限',
    time: '2023-10-24 14:20',
    status: 'pending',
    statusShort: '审批中',
    statusLabel: '部门领导审批中',
    handler: '张晓峰 · 技术部',
    canRecall: true,
    canResubmit: false,
  },
  {
    reqId: 'REQ20231023015',
    title: '教育资源主题库标签共享申请',
    project: '教育厅公共平台',
    type: '标签共享',
    time: '2023-10-23 09:12',
    status: 'approved',
    statusShort: '已通过',
    statusLabel: '已通过',
    handler: '系统自动执行',
    canRecall: false,
    canResubmit: false,
  },
  {
    reqId: 'REQ20231022089',
    title: '数据质量规则审批发布申请',
    project: '交通流量监控系统',
    type: '发布审批',
    time: '2023-10-22 17:45',
    status: 'rejected',
    statusShort: '已驳回',
    statusLabel: '驳回，待修改',
    handler: '李志勤 · 合规部',
    canRecall: false,
    canResubmit: true,
  },
  {
    reqId: 'REQ20231020112',
    title: 'API 接口调用权限申请（外部系统）',
    project: '第三方协作网关',
    type: '数据权限',
    time: '2023-10-20 11:30',
    status: 'approved',
    statusShort: '已通过',
    statusLabel: '已通过',
    handler: '王绍班 · 安全组',
    canRecall: false,
    canResubmit: false,
  },
  {
    reqId: 'REQ20231019004',
    title: '历史数据归档存储空间扩容申请',
    project: '数据湖底座',
    type: '资源扩容',
    time: '2023-10-19 10:05',
    status: 'pending',
    statusShort: '审批中',
    statusLabel: '财务部会签中',
    handler: '赵明昊 · 财务科',
    canRecall: true,
    canResubmit: false,
  },
])

const filteredApplyRows = computed(() =>
  applyData.value.filter(row => {
    const keyword = applyKeyword.value.trim()
    const matchKeyword = !keyword || row.title.includes(keyword) || row.reqId.includes(keyword)
    const matchStatus = !applyStatus.value || row.statusShort === applyStatus.value
    return matchKeyword && matchStatus
  })
)

const applyStatusBadge = (status) => ({
  pending: 'processing',
  approved: 'success',
  rejected: 'error',
}[status] || 'default')

const minePagination = {
  pageSize: 10,
  total: 148,
  showSizeChanger: false,
  showQuickJumper: true,
  showTotal: t => `共 ${t} 条`,
}

const applyPagination = {
  pageSize: 10,
  total: 163,
  showSizeChanger: false,
  showQuickJumper: true,
  showTotal: t => `共 ${t} 条`,
}

const applyKpis = [
  {
    label: '待处理',
    value: 12,
    icon: ClockCircleOutlined,
    color: 'rgb(var(--color-warning))',
  },
  {
    label: '已通过',
    value: 148,
    icon: CheckCircleOutlined,
    color: 'rgb(var(--color-success))',
  },
  {
    label: '驳回需改',
    value: 3,
    icon: ExclamationCircleOutlined,
    color: 'rgb(var(--color-danger))',
  },
  {
    label: '总申请',
    value: 163,
    icon: FileTextOutlined,
    color: 'rgb(var(--color-primary))',
  },
]

const resetApplyFilters = () => {
  applyKeyword.value = ''
  applyStatus.value = ''
  applyDate.value = null
}
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
}

.page-title {
  margin: 0 0 4px !important;
}

/* Segmented tab switcher */
.tab-switcher {
  display: flex;
  justify-content: flex-start;
}

.tab-switcher :deep(.ant-segmented) {
  padding: 4px;
}

/* Tab pane wrapper (Transition single-root requirement) */
.tab-pane {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Tab fade transition */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.tab-switcher :deep(.ant-segmented-item) {
  padding: 0 4px;
  min-width: 140px;
  text-align: center;
}

.tab-switcher :deep(.ant-segmented-item-label) {
  font-weight: 500;
}

.tab-switcher :deep(.ant-segmented-item-selected) {
  box-shadow: 0 2px 8px rgba(17, 56, 224, 0.12);
}

:global(.dark) .tab-switcher :deep(.ant-segmented-item-selected) {
  box-shadow: 0 2px 8px rgba(91, 141, 239, 0.18);
}

.export-col {
  display: flex;
  justify-content: flex-end;
}

.notice-card {
  height: 100%;
  background: rgb(var(--color-primary));
  border-color: rgb(var(--color-primary));
}

:global(.dark) .notice-card {
  background: rgb(var(--color-primary-container));
  border-color: rgb(var(--color-primary-container));
}

.notice-card :deep(.ant-card-body) {
  height: 100%;
}

.notice-label,
.notice-title,
.notice-time {
  color: rgb(var(--color-on-primary));
}

:global(.dark) .notice-label,
:global(.dark) .notice-title,
:global(.dark) .notice-time {
  color: rgb(var(--color-on-primary-container));
}

.notice-label {
  opacity: 0.82;
  font-size: 12px;
}

.notice-title {
  display: block;
  font-size: 17px;
  line-height: 1.5;
}

.notice-time {
  opacity: 0.78;
  font-size: 12px;
}

.section-divider {
  margin: 0;
}

.table-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

:global(.dark) .table-toolbar {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.date-window {
  padding: 4px 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}

:global(.dark) .date-window {
  border-color: rgba(255, 255, 255, 0.12);
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

.mine-table :deep(.ant-table-tbody > tr) .row-actions,
.apply-table :deep(.ant-table-tbody > tr) .row-actions {
  opacity: 0;
  transition: opacity 0.15s;
}

.mine-table :deep(.ant-table-tbody > tr:hover) .row-actions,
.apply-table :deep(.ant-table-tbody > tr:hover) .row-actions {
  opacity: 1;
}

.record-id,
.status-sub {
  display: block;
  margin-top: 4px;
  font-size: 11px;
}

.record-id,
.req-id {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
}

.req-id {
  color: rgb(var(--color-primary));
  font-size: 12px;
}

.content-table :deep(.ant-table-pagination) {
  padding: 16px 20px;
  margin: 0;
}

.apply-kpi-card {
  height: 100%;
}

.kpi-icon {
  margin-right: 6px;
  opacity: 0.82;
}

.filter-bar {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  row-gap: 12px;
}

:global(.dark) .filter-bar {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.filter-actions {
  margin-left: auto;
  margin-right: 0 !important;
}

@media (max-width: 768px) {
  .export-col {
    justify-content: flex-start;
  }

  .filter-bar :deep(.ant-form-item) {
    width: 100%;
  }

  .filter-bar :deep(.ant-form-item-control),
  .filter-bar :deep(.ant-picker),
  .filter-bar :deep(.ant-input),
  .filter-bar :deep(.ant-select) {
    width: 100% !important;
  }
}
</style>
