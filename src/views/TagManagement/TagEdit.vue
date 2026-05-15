<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>数据</a-breadcrumb-item>
      <a-breadcrumb-item><a @click.prevent="router.push('/tag-management')">标签管理</a></a-breadcrumb-item>
      <a-breadcrumb-item>编辑</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">编辑标签 · {{ form.name }}</a-typography-title>
        <a-typography-text type="secondary" :style="{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px' }">
          最后更新 · 2024.05.20 · 14:30
        </a-typography-text>
      </div>
      <a-space :size="8">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="save">确认保存</a-button>
      </a-space>
    </div>

    <!-- Section 01: 基本信息编辑 -->
    <a-card title="01 基本信息编辑" :body-style="{ padding: '20px 24px 4px' }">
      <a-form layout="vertical" :model="form">
        <a-row :gutter="48">
          <a-col :xs="24" :md="12">
            <a-form-item label="标签名称" required>
              <a-input v-model:value="form.name" placeholder="请输入标签名称" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item label="创建人">
              <a-input value="系统管理员 (Admin)" disabled />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item label="更新周期" required>
              <a-select v-model:value="form.cycle" :options="cycleOptions" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item label="标签分类">
              <a-select v-model:value="form.category" :options="categoryOptions" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="创建理由" required>
              <a-textarea
                v-model:value="form.reason"
                :rows="3"
                placeholder="描述该标签的应用场景与业务价值..."
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <!-- Section 02: 下属点位管理 -->
    <a-card title="02 下属点位管理" :body-style="{ padding: '16px 24px 20px' }">
      <template #extra>
        <a-space :size="8">
          <a-button :disabled="!selectedPoints.length">
            <template #icon><DeleteOutlined /></template>
            批量移除
            <a-badge
              v-if="selectedPoints.length"
              :count="selectedPoints.length"
              :number-style="{ backgroundColor: '#1138e0', marginLeft: '4px' }"
            />
          </a-button>
          <a-button type="primary">
            <template #icon><PlusOutlined /></template>
            添加点位
          </a-button>
        </a-space>
      </template>

      <a-table
        :columns="pointColumns"
        :data-source="pointData"
        :pagination="false"
        :row-key="r => r.id"
        :row-selection="{ selectedRowKeys: selectedPoints, onChange: keys => (selectedPoints = keys) }"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-space :size="10">
              <a-avatar shape="square" :size="32" :style="{ background: 'rgba(17,56,224,0.08)', color: '#1138e0' }">
                <template #icon><ApiOutlined /></template>
              </a-avatar>
              <a-typography-text strong>{{ record.name }}</a-typography-text>
            </a-space>
          </template>
          <template v-else-if="column.key === 'location'">
            <a-typography-text type="secondary">{{ record.location }}</a-typography-text>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-badge :status="record.status === '运行中' ? 'success' : 'warning'" :text="record.status" />
          </template>
          <template v-else-if="column.key === 'updated'">
            <a-typography-text type="secondary">{{ record.updated }}</a-typography-text>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button type="link" size="small" danger>移除</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DeleteOutlined,
  PlusOutlined,
  ApiOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()

const form = ref({
  name: '企业信用等级',
  category: '信用评估',
  cycle: '每周更新',
  reason: '为实现企业分级分类监管，根据纳税、社保、诉讼等多维度数据，构建企业信用综合评价体系，提升审批效率。',
})

const cycleOptions = [
  { label: '每日更新', value: '每日更新' },
  { label: '每周更新', value: '每周更新' },
  { label: '每月更新', value: '每月更新' },
  { label: '实时触发', value: '实时触发' },
]

const categoryOptions = [
  { label: '基础画像', value: '基础画像' },
  { label: '信用评估', value: '信用评估' },
  { label: '风险监控', value: '风险监控' },
]

const selectedPoints = ref([])

const pointData = ref([
  { id: 'P-100249', name: '纳税等级数据源-A', location: '北京市/海淀区/税务局中心枢纽', status: '运行中', updated: '2024-05-20 09:00' },
  { id: 'P-100255', name: '企业社保缴纳记录', location: '上海市/浦东新区/人社厅数据节点', status: '运行中', updated: '2024-05-19 22:15' },
  { id: 'P-100281', name: '工商司法风险点位', location: '广州市/越秀区/政务大数据平台', status: '维护中', updated: '2024-05-18 16:40' },
])

const pointColumns = [
  { key: 'name', title: '点位名称', minWidth: 240 },
  { key: 'location', title: '地理位置' },
  { key: 'status', title: '运行状态', width: 110 },
  { key: 'updated', title: '更新时间', width: 150 },
  { key: 'action', title: '操作', width: 80, align: 'right' },
]

const save = () => router.push(`/tag-management/detail/${route.params.id || 1}`)
const cancel = () => router.push(`/tag-management/detail/${route.params.id || 1}`)
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
  color: #1138e0;
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
</style>
