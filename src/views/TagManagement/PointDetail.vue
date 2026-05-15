<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>数据</a-breadcrumb-item>
      <a-breadcrumb-item><a @click.prevent="router.push('/tag-management')">标签管理</a></a-breadcrumb-item>
      <a-breadcrumb-item>点位详情</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">朝阳区大屯路南口视频感知点</a-typography-title>
        <a-typography-text type="secondary">视频感知点位详情 · 查看运行状态与关联标签。</a-typography-text>
      </div>
      <a-space :size="8">
        <a-button>导出报告</a-button>
        <a-button type="primary" @click="router.push(`/tag-management/point/edit/${route.params.id || 1}`)">
          <template #icon><EditOutlined /></template>
          编辑点位
        </a-button>
      </a-space>
    </div>

    <!-- Section 01: 基本信息 -->
    <a-card title="01 基本信息" :body-style="{ padding: '20px 24px' }">
      <a-row :gutter="32">
        <a-col :xs="24" :md="8">
          <div class="field">
            <a-typography-text type="secondary" class="field-label">点位名称</a-typography-text>
            <a-typography-text strong class="field-value">朝阳区大屯路南口视频感知点</a-typography-text>
          </div>
          <div class="field">
            <a-typography-text type="secondary" class="field-label">资源编号</a-typography-text>
            <a-typography-text code>RES-ZH-2023-08942</a-typography-text>
          </div>
        </a-col>
        <a-col :xs="24" :md="8">
          <div class="field">
            <a-typography-text type="secondary" class="field-label">所属组织</a-typography-text>
            <a-typography-text strong class="field-value">北京市公安局 / 朝阳分局 / 治安支队</a-typography-text>
          </div>
          <div class="field">
            <a-typography-text type="secondary" class="field-label">经纬度</a-typography-text>
            <a-space :size="6">
              <EnvironmentOutlined style="color: #1138e0" />
              <a-typography-text strong>116.418, 40.002</a-typography-text>
            </a-space>
          </div>
        </a-col>
        <a-col :xs="24" :md="8">
          <div class="field">
            <a-typography-text type="secondary" class="field-label">能力</a-typography-text>
            <a-space :size="6" wrap>
              <a-tag v-for="cap in capabilities" :key="cap" color="blue" :bordered="false">{{ cap }}</a-tag>
            </a-space>
          </div>
          <div class="map-box">
            <CompassOutlined class="map-icon" />
            <a-button type="link" size="small" class="map-link">查看地图</a-button>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-row :gutter="16" align="stretch">
      <!-- Section 02: 关联标签 -->
      <a-col :xs="24" :lg="16">
        <a-card title="02 关联标签" :body-style="{ padding: '16px 24px' }" class="full-h">
          <template #extra>
            <a-button type="link" size="small">
              <template #icon><PlusOutlined /></template>
              增加标签
            </a-button>
          </template>
          <a-table
            :columns="tagColumns"
            :data-source="associatedTags"
            :pagination="false"
            :row-key="r => r.id"
            size="middle"
            class="content-table"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'idx'">
                <a-typography-text type="secondary">{{ String(index + 1).padStart(2, '0') }}</a-typography-text>
              </template>
              <template v-else-if="column.key === 'name'">
                <a-tag :color="record.tagColor" :bordered="false">{{ record.name }}</a-tag>
              </template>
              <template v-else-if="column.key === 'taggedAt'">
                <a-typography-text type="secondary" :style="{ fontSize: '12px' }">
                  {{ record.taggedAt }}
                </a-typography-text>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button type="link" size="small" danger class="row-actions">删除</a-button>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>

      <!-- Section 03: 工作日志 -->
      <a-col :xs="24" :lg="8">
        <a-card title="03 工作日志" :body-style="{ padding: '20px 24px' }" class="full-h">
          <a-timeline>
            <a-timeline-item v-for="log in workLogs" :key="log.id" :color="log.color">
              <a-typography-text strong class="log-action">{{ log.action }}</a-typography-text>
              <a-typography-text class="log-operator">{{ log.operator }}</a-typography-text>
              <a-typography-text type="secondary" :style="{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', marginTop: '2px' }">
                {{ log.time }}
              </a-typography-text>
              <a-alert v-if="log.note" type="info" :message="log.note" style="margin-top: 8px" />
            </a-timeline-item>
          </a-timeline>
          <div class="log-footer">
            <a-button type="link" size="small">查看完整日志</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Auxiliary Data Overview -->
    <a-row :gutter="[16, 16]">
      <a-col v-for="kpi in auxKpis" :key="kpi.label" :xs="12" :md="6">
        <a-card :body-style="{ padding: '16px 20px' }">
          <a-statistic
            :title="kpi.label"
            :value="kpi.value"
            :suffix="kpi.suffix"
            :value-style="{ fontSize: '22px', fontWeight: 700, color: kpi.color }"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  EditOutlined,
  EnvironmentOutlined,
  CompassOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()

const capabilities = ['4K视频流', '人脸识别', '车辆结构化', '热力感知']

const associatedTags = ref([
  { id: 1, name: '高危重点区域', tagColor: 'orange', taggedBy: '张建国', taggedAt: '2023-11-20 14:30' },
  { id: 2, name: '交通枢纽核心', tagColor: 'blue', taggedBy: '李明华', taggedAt: '2023-11-18 09:12' },
  { id: 3, name: '三级常态化监控', tagColor: 'default', taggedBy: '系统自动', taggedAt: '2023-10-01 00:00' },
])

const tagColumns = [
  { key: 'idx', title: '序号', width: 80 },
  { key: 'name', title: '标签名称' },
  { dataIndex: 'taggedBy', title: '打标人', width: 140 },
  { key: 'taggedAt', title: '打标时间', width: 160, align: 'right' },
  { key: 'action', title: '操作', width: 80, align: 'right' },
]

const workLogs = ref([
  { id: 1, action: '打标签', operator: '张建国', time: '2023-11-20 14:30:21', color: 'blue', note: '基于Q4评估结果打标高危区域标签。' },
  { id: 2, action: '删除标签', operator: '王晓伟', time: '2023-11-19 16:45:00', color: 'gray' },
  { id: 3, action: '打标签', operator: '李明华', time: '2023-11-18 09:12:44', color: 'blue' },
  { id: 4, action: '点位初始化', operator: '系统管理员', time: '2023-10-01 00:00:00', color: 'blue' },
])

const auxKpis = [
  { label: '在线率', value: '99.8', suffix: '%', color: '#1138e0' },
  { label: '预警频次', value: 14, suffix: ' / 30天', color: '#fa8c16' },
  { label: '维护记录', value: 3, suffix: ' 次', color: 'inherit' },
  { label: '关联工单', value: 0, suffix: ' 活跃', color: 'inherit' },
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
  gap: 24px;
  flex-wrap: wrap;
}

.page-title {
  margin: 0 0 4px !important;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.field:last-child {
  margin-bottom: 0;
}

.field-label {
  font-size: 12px;
}

.field-value {
  font-size: 14px;
}

.map-box {
  margin-top: 12px;
  height: 96px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  background: rgba(17, 56, 224, 0.025);
  position: relative;
}

:global(.dark) .map-box {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(91, 141, 239, 0.05);
}

.map-icon {
  font-size: 32px;
  color: rgba(17, 56, 224, 0.3);
}

.map-link {
  padding: 0 !important;
}

.full-h {
  height: 100%;
}

.log-action {
  display: block;
  font-size: 13px;
}

.log-operator {
  display: block;
  font-size: 12px;
  margin-top: 2px;
}

.log-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  text-align: center;
}

:global(.dark) .log-footer {
  border-top-color: rgba(255, 255, 255, 0.08);
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
</style>
