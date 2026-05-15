<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>数据</a-breadcrumb-item>
      <a-breadcrumb-item><a @click.prevent="router.push('/tag-management')">标签管理</a></a-breadcrumb-item>
      <a-breadcrumb-item>编辑点位</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">编辑点位 · {{ form.name }}</a-typography-title>
        <a-typography-text type="secondary">编辑点位基本信息及调整关联标签。</a-typography-text>
      </div>
      <a-space :size="8">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="save">保存</a-button>
      </a-space>
    </div>

    <a-row :gutter="16">
      <a-col :xs="24" :lg="16">
        <a-card :body-style="{ padding: '16px 20px 20px' }">
          <a-tabs v-model:active-key="activeTab" class="edit-tabs">
            <a-tab-pane key="01" tab="01 基本信息编辑">
              <a-form layout="vertical" :model="form">
                <a-row :gutter="[24, 0]">
                  <a-col :xs="24" :md="12">
                    <a-form-item label="点位名称" name="name" required>
                      <a-input v-model:value="form.name" />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :md="12">
                    <a-form-item label="点位编号" name="pid">
                      <a-input
                        :value="form.pid"
                        :disabled="true"
                        :style="{ fontFamily: 'IBM Plex Mono, monospace' }"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :md="12">
                    <a-form-item label="经度" name="lng" required>
                      <a-input
                        v-model:value="form.lng"
                        placeholder="例: 116.4074"
                        :style="{ fontFamily: 'IBM Plex Mono, monospace' }"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :md="12">
                    <a-form-item label="纬度" name="lat" required>
                      <a-input
                        v-model:value="form.lat"
                        placeholder="例: 39.9042"
                        :style="{ fontFamily: 'IBM Plex Mono, monospace' }"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="安装位置" name="location" required>
                      <a-input v-model:value="form.location" />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :md="12">
                    <a-form-item label="设备状态" name="status" required>
                      <a-select v-model:value="form.status" :options="statusOptions" />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :md="12">
                    <a-form-item label="所属部门" name="department">
                      <a-select v-model:value="form.department" :options="departmentOptions" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="点位描述" name="desc">
                      <a-textarea
                        v-model:value="form.desc"
                        :rows="3"
                        placeholder="请输入点位描述（选填）..."
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-tab-pane>

            <a-tab-pane key="02" tab="02 关联标签管理">
              <div class="link-toolbar">
                <div class="link-summary">
                  <a-typography-text>当前已关联</a-typography-text>
                  <a-typography-text strong>{{ linkedTags.length }}</a-typography-text>
                  <a-typography-text>个标签</a-typography-text>
                </div>
                <a-space :size="8" class="link-actions">
                  <a-badge :count="selectedTagIds.length">
                    <a-button :disabled="!selectedTagIds.length">
                      <template #icon><DeleteOutlined /></template>
                      批量移除
                    </a-button>
                  </a-badge>
                  <a-button type="primary">
                    <template #icon><PlusOutlined /></template>
                    添加标签
                  </a-button>
                </a-space>
              </div>

              <a-table
                class="content-table"
                :columns="tagColumns"
                :data-source="linkedTags"
                :pagination="false"
                :row-key="record => record.id"
                :row-selection="{ selectedRowKeys: selectedTagIds, onChange: handleSelectionChange }"
                size="middle"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'name'">
                    <a-space :size="12">
                      <a-avatar shape="square" :size="32" class="tag-avatar">
                        <template #icon><TagOutlined /></template>
                      </a-avatar>
                      <a-typography-text strong>{{ record.name }}</a-typography-text>
                    </a-space>
                  </template>
                  <template v-else-if="column.key === 'category'">
                    <a-tag color="blue" :bordered="false">{{ record.category }}</a-tag>
                  </template>
                  <template v-else-if="column.key === 'linkedAt'">
                    <a-typography-text type="secondary" :style="{ fontSize: '12px' }">
                      {{ record.linkedAt }}
                    </a-typography-text>
                  </template>
                  <template v-else-if="column.key === 'action'">
                    <a-button class="row-actions" type="link" size="small" danger>移除</a-button>
                  </template>
                </template>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="8">
        <a-space direction="vertical" :size="16" class="side-stack">
          <a-card title="03 更改日志" :body-style="{ padding: '16px' }">
            <a-space direction="vertical" :size="16" class="side-stack">
              <a-alert type="warning" :message="'当前未保存的变更'" :show-icon="true" />

              <div class="change-detail">
                <div class="change-row">
                  <a-typography-text type="secondary">设备状态</a-typography-text>
                  <a-space :size="8">
                    <a-typography-text delete>在线</a-typography-text>
                    <ArrowRightOutlined />
                    <a-typography-text type="success" strong>{{ form.status }}</a-typography-text>
                  </a-space>
                </div>
              </div>

              <a-divider />

              <div>
                <a-typography-text strong>历史变更记录</a-typography-text>
                <a-timeline class="history-timeline">
                  <a-timeline-item>
                    <a-space direction="vertical" :size="2">
                      <a-typography-text type="secondary" :style="{ fontFamily: 'IBM Plex Mono, monospace' }">
                        昨天 16:20
                      </a-typography-text>
                      <a-typography-text>系统管理员 / 关联了 2 个新标签</a-typography-text>
                    </a-space>
                  </a-timeline-item>
                  <a-timeline-item>
                    <a-space direction="vertical" :size="2">
                      <a-typography-text type="secondary" :style="{ fontFamily: 'IBM Plex Mono, monospace' }">
                        2023-05-14 10:22
                      </a-typography-text>
                      <a-typography-text>系统管理员 / 初始化点位</a-typography-text>
                    </a-space>
                  </a-timeline-item>
                </a-timeline>
              </div>
            </a-space>
          </a-card>

          <a-card :body-style="{ padding: '16px' }">
            <a-alert
              type="info"
              message="审核说明"
              description="本次修改将进入审核队列，审核通过后生效。"
              :show-icon="true"
            />
          </a-card>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowRightOutlined,
  DeleteOutlined,
  PlusOutlined,
  TagOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()

const activeTab = ref('01')

const form = ref({
  name: 'ZX-00829-北京西路',
  pid: `P-${route.params.id || '100249'}`,
  lng: '116.4074',
  lat: '39.9042',
  location: '北京市朝阳区北京西路128号十字路口',
  status: '在线',
  department: '城市管理指挥中心',
  desc: '',
})

const statusOptions = [
  { label: '在线', value: '在线' },
  { label: '离线', value: '离线' },
  { label: '故障', value: '故障' },
  { label: '维护中', value: '维护中' },
]

const departmentOptions = [
  { label: '城市管理指挥中心', value: '城市管理指挥中心' },
  { label: '公安交管支队', value: '公安交管支队' },
  { label: '环保监测中心', value: '环保监测中心' },
  { label: '政务服务管理局', value: '政务服务管理局' },
]

const selectedTagIds = ref([])

const linkedTags = ref([
  { id: 1, name: '交通流量', category: '交通监测', linkedAt: '2023-05-14 10:22' },
  { id: 2, name: '高流量区域', category: '交通监测', linkedAt: '2023-10-24 15:30' },
  { id: 3, name: '重点监控', category: '安防监测', linkedAt: '2023-10-24 15:30' },
])

const tagColumns = [
  { key: 'name', dataIndex: 'name', title: '标签名称', minWidth: 180 },
  { key: 'category', dataIndex: 'category', title: '所属分类', width: 140 },
  { key: 'linkedAt', dataIndex: 'linkedAt', title: '关联时间', width: 180 },
  { key: 'action', title: '操作', width: 90, align: 'right' },
]

const handleSelectionChange = (keys) => {
  selectedTagIds.value = keys
}

const save = () => router.push(`/tag-management/point/${route.params.id || '1'}`)
const cancel = () => router.push(`/tag-management/point/${route.params.id || '1'}`)
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

.edit-tabs {
  width: 100%;
}

.link-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.link-summary {
  display: flex;
  align-items: center;
  gap: 4px;
}

.side-stack {
  width: 100%;
}

.change-detail {
  padding: 12px 0;
}

.change-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.history-timeline {
  margin-top: 16px;
}

.tag-avatar {
  color: #1138e0;
  background: rgba(17, 56, 224, 0.08);
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

:global(.dark) .tag-avatar {
  color: #85a5ff;
  background: rgba(255, 255, 255, 0.1);
}
</style>
