<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>数据</a-breadcrumb-item>
      <a-breadcrumb-item><a @click.prevent="router.push('/tag-management')">标签管理</a></a-breadcrumb-item>
      <a-breadcrumb-item>标签详情</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">企业信用等级</a-typography-title>
        <a-typography-text type="secondary">
          企业信用评价维度的标签定义与关联点位。整合工商、税务、司法多维数据。
        </a-typography-text>
      </div>
      <a-space :size="10">
        <a-button>导出数据</a-button>
        <a-button type="primary" @click="router.push(`/tag-management/edit/${route.params.id || 1}`)">
          <template #icon><EditOutlined /></template>
          编辑标签
        </a-button>
      </a-space>
    </div>

    <a-row :gutter="[16, 16]">
      <a-col :xs="24">
        <a-card title="01 基本信息" :body-style="{ padding: '16px' }">
          <template #extra>
            <a-tag color="green">正式发布</a-tag>
          </template>

          <a-row :gutter="[24, 16]">
            <a-col :xs="24" :md="12" :lg="6">
              <div class="info-field">
                <a-typography-text type="secondary" class="field-label">标签名称</a-typography-text>
                <a-typography-text strong>企业信用等级</a-typography-text>
              </div>
            </a-col>
            <a-col :xs="24" :md="12" :lg="6">
              <div class="info-field">
                <a-typography-text type="secondary" class="field-label">创建时间</a-typography-text>
                <a-typography-text>2023-10-24 14:30</a-typography-text>
              </div>
            </a-col>
            <a-col :xs="24" :md="12" :lg="6">
              <div class="info-field">
                <a-typography-text type="secondary" class="field-label">创建人</a-typography-text>
                <a-space :size="8">
                  <a-avatar :size="20">管</a-avatar>
                  <a-typography-text>系统管理员</a-typography-text>
                </a-space>
              </div>
            </a-col>
            <a-col :xs="24" :md="12" :lg="6">
              <div class="info-field">
                <a-typography-text type="secondary" class="field-label">更新周期</a-typography-text>
                <a-typography-text>实时同步</a-typography-text>
              </div>
            </a-col>
            <a-col :xs="24">
              <a-card type="inner" :body-style="{ padding: '12px 16px' }">
                <div class="info-field">
                  <a-typography-text type="secondary" class="field-label">创建理由</a-typography-text>
                  <a-typography-text>
                    用于评估全域企业信用风险，整合工商、税务、司法等多维数据进行综合评分，为政务扶持政策精准推送及风险预警提供数据支撑。
                  </a-typography-text>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="16">
        <a-card title="02 下属点位" :body-style="{ padding: 0 }" class="section-card">
          <template #extra>
            <a-space :size="8">
              <a-button type="text" size="small" aria-label="刷新">
                <template #icon><ReloadOutlined /></template>
              </a-button>
              <a-typography-text type="secondary">共 42 个关联点位</a-typography-text>
            </a-space>
          </template>

          <a-table
            :columns="pointColumns"
            :data-source="pointData"
            :pagination="false"
            :row-key="record => record.id"
            :custom-row="pointRowClickHandler"
            :scroll="{ x: 720 }"
            size="middle"
            class="content-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <a-space :size="12">
                  <a-avatar shape="square" :size="32" :style="{ background: 'rgba(17, 56, 224, 0.08)', color: '#1138e0' }">
                    <template #icon><EnvironmentOutlined /></template>
                  </a-avatar>
                  <div>
                    <a-typography-text strong :style="{ display: 'block' }">{{ record.name }}</a-typography-text>
                    <a-typography-text type="secondary" :style="{ fontSize: '11px', fontFamily: 'IBM Plex Mono, ui-monospace, monospace' }">{{ record.id }}</a-typography-text>
                  </div>
                </a-space>
              </template>
              <template v-else-if="column.key === 'location'">
                <a-typography-text type="secondary">{{ record.location }}</a-typography-text>
              </template>
              <template v-else-if="column.key === 'status'">
                <a-badge :status="pointStatusBadge(record.status)" :text="record.status" />
              </template>
              <template v-else-if="column.key === 'updated'">
                <a-typography-text type="secondary">{{ record.updated }}</a-typography-text>
              </template>
            </template>
          </a-table>

          <div class="card-footer">
            <a-button type="link" @click="router.push('/tag-management')">查看全部点位</a-button>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="8">
        <a-card title="03 更改日志" :body-style="{ padding: '16px' }" class="section-card">
          <a-timeline>
            <a-timeline-item
              v-for="log in logData"
              :key="log.id"
              :color="logTimelineColor(log.tag)"
            >
              <div class="timeline-entry">
                <a-space :size="8" align="center">
                  <a-tag :color="logTagColor(log.tag)">{{ log.tag }}</a-tag>
                  <a-typography-text type="secondary" class="log-time">{{ log.time }}</a-typography-text>
                </a-space>
                <a-typography-text strong class="log-action">{{ log.action }}</a-typography-text>
                <a-typography-text type="secondary" class="log-operator">{{ log.operator }}</a-typography-text>
              </div>
            </a-timeline-item>
          </a-timeline>

          <div class="log-footer">
            <a-button type="link">查看完整历史日志</a-button>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24">
        <a-card :body-style="{ padding: '16px' }">
          <a-row :gutter="[16, 16]" align="stretch">
            <a-col :xs="24" :md="8">
              <div class="insight-panel insight-activity">
                <a-typography-title :level="5" class="insight-title">标签活跃度</a-typography-title>
                <a-statistic :value="8400" suffix="/次" />
                <a-typography-text type="secondary" class="insight-desc">
                  过去 24 小时数据调用频率
                </a-typography-text>
              </div>
            </a-col>
            <a-col :xs="24" :md="16">
              <div class="insight-panel">
                <a-typography-title :level="5" class="insight-title">标签数据关联分布</a-typography-title>
                <a-list :data-source="distributionData" :split="false" size="small" class="distribution-list">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-typography-text class="distribution-time">{{ item.label }}</a-typography-text>
                      <div class="distribution-progress">
                        <a-progress :percent="item.percent" :show-info="false" size="small" />
                      </div>
                      <a-typography-text type="secondary" class="distribution-percent">
                        {{ item.percent }}%
                      </a-typography-text>
                    </a-list-item>
                  </template>
                </a-list>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EditOutlined, ReloadOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()

const pointData = ref([
  { id: 'P-100249', pid: '100249', name: '政务大厅 A1 采集终端', location: '高新区创业大道 188号', status: '正常运行', updated: '2023-10-25 09:12' },
  { id: 'P-100255', pid: '100255', name: '智慧社区数据中继点', location: '西湖区曙光路 12号', status: '正常运行', updated: '2023-10-25 09:10' },
  { id: 'P-100281', pid: '100281', name: '金融服务中心传感器', location: '滨江区江南大道 300号', status: '维护中', updated: '2023-10-24 18:45' },
])

const logData = ref([
  { id: 1, time: '10 分钟前', tag: '修改', action: '更新了创建理由中的业务逻辑描述', operator: '李瑞康 (安全员)' },
  { id: 2, time: '昨天 16:20', tag: '修改', action: '关联了 12 个新增地理点位', operator: '系统管理员' },
  { id: 3, time: '2023-10-24 14:30', tag: '新建', action: '初始化标签定义及评分权重设置', operator: '系统管理员' },
])

const barHeights = ref([18, 22, 30, 28, 20, 35, 55, 72, 88, 95, 85, 78, 90, 100, 92, 80, 70, 60, 50, 45, 38, 30, 25, 20])

const pointColumns = [
  { key: 'name', title: '点位名称', minWidth: 220 },
  { key: 'location', title: '地理位置', minWidth: 180 },
  { key: 'status', title: '运行状态', width: 120 },
  { key: 'updated', title: '更新时间', width: 160 },
]

const timeSegments = [
  '00:00–04:00',
  '04:00–08:00',
  '08:00–12:00',
  '12:00–16:00',
  '16:00–20:00',
  '20:00–24:00',
]

const pointRowClickHandler = (record) => ({
  onClick: () => router.push(`/tag-management/point/${record.pid}`),
  style: { cursor: 'pointer' },
})

const pointStatusBadge = (status) => ({
  正常运行: 'success',
  维护中: 'warning',
}[status] || 'default')

const logTimelineColor = (tag) => ({
  修改: 'blue',
  新建: 'green',
}[tag] || 'gray')

const logTagColor = (tag) => ({
  修改: 'blue',
  新建: 'green',
}[tag] || 'default')

const distributionData = computed(() =>
  timeSegments.map((label, index) => {
    const values = barHeights.value.slice(index * 4, index * 4 + 4)
    const percent = Math.round(values.reduce((total, value) => total + value, 0) / values.length)
    return { label, percent }
  })
)
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

.crumb a {
  color: inherit;
  opacity: 0.7;
}

.crumb a:hover {
  color: rgb(var(--color-primary));
  opacity: 1;
}

.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.page-title {
  margin: 0 0 4px !important;
}

.section-card {
  height: 100%;
}

.info-field,
.point-name,
.timeline-entry {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label,
.code-text,
.log-time,
.log-operator,
.distribution-time,
.distribution-percent {
  font-size: 12px;
}

.code-text {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
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

.card-footer {
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

:global(.dark) .card-footer {
  border-top-color: rgba(255, 255, 255, 0.08);
}

.log-action,
.log-operator {
  display: block;
}

.log-footer {
  margin-top: 8px;
}

.insight-panel {
  height: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.015);
}

:global(.dark) .insight-panel {
  background: rgba(255, 255, 255, 0.025);
}

.insight-activity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.insight-title {
  margin: 0 0 8px !important;
}

.insight-desc {
  margin-top: 8px;
}

.distribution-list :deep(.ant-list-item) {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
}

.distribution-time {
  width: 96px;
  flex-shrink: 0;
}

.distribution-progress {
  flex: 1;
  min-width: 0;
}

.distribution-progress :deep(.ant-progress) {
  margin: 0;
  line-height: 1;
}

.distribution-percent {
  width: 44px;
  flex-shrink: 0;
  text-align: right;
}
</style>
