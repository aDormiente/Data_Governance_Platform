<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>政务数据治理</a-breadcrumb-item>
      <a-breadcrumb-item>标签管理</a-breadcrumb-item>
      <a-breadcrumb-item>{{ activeTab === 'tags' ? '标签列表' : '点位列表' }}</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">标签资源体系管理</a-typography-title>
        <a-typography-text type="secondary">
          对全域政务数据标签进行生命周期管理及点位映射维护，所有变更进入审计流程。
        </a-typography-text>
      </div>
      <a-space :size="10">
        <a-button>
          <template #icon><DownloadOutlined /></template>
          导出数据
        </a-button>
        <a-button type="primary" @click="router.push('/tag-management/create')">
          <template #icon><PlusOutlined /></template>
          新建标签
        </a-button>
      </a-space>
    </div>

    <a-card :body-style="{ padding: 0 }" class="main-card">
      <a-tabs v-model:active-key="activeTab" class="tag-tabs">
        <a-tab-pane key="tags" tab="标签列表">
          <a-form layout="inline" class="filter-bar">
            <a-form-item label="状态筛选">
              <a-select
                v-model:value="filterStatus"
                :options="statusOptions"
                placeholder="全部状态"
                allow-clear
                style="width: 160px"
              />
            </a-form-item>
            <a-form-item label="标签类型">
              <a-select
                v-model:value="filterType"
                :options="typeOptions"
                placeholder="全部类型"
                allow-clear
                style="width: 160px"
              />
            </a-form-item>
            <a-form-item class="filter-search">
              <a-input
                v-model:value="searchText"
                placeholder="搜索标签名称或描述..."
                allow-clear
                style="width: 320px"
              >
                <template #prefix><SearchOutlined style="opacity:.5" /></template>
              </a-input>
            </a-form-item>
          </a-form>

          <a-table
            :columns="tagColumns"
            :data-source="filteredTags"
            :pagination="tagPagination"
            :row-key="r => r.id"
            :custom-row="tagRowClickHandler"
            size="middle"
            class="content-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <a-space :size="12">
                  <a-avatar
                    shape="square"
                    :size="32"
                    :style="{ background: typeIconBg(record.type), color: typeIconColor(record.type) }"
                  >
                    <template #icon><component :is="typeIcon(record.type)" /></template>
                  </a-avatar>
                  <a-typography-text strong>{{ record.name }}</a-typography-text>
                </a-space>
              </template>
              <template v-else-if="column.key === 'type'">
                <a-tag :color="typeTagColor(record.type)">{{ record.type }}</a-tag>
              </template>
              <template v-else-if="column.key === 'desc'">
                <a-typography-text type="secondary" :style="{ fontSize: '12px' }">{{ record.desc }}</a-typography-text>
              </template>
              <template v-else-if="column.key === 'count'">
                <a-tag v-if="record.count !== '0'" color="blue" :bordered="false">{{ record.count }} 个点位</a-tag>
                <a-tag v-else :bordered="false">0 个点位</a-tag>
              </template>
              <template v-else-if="column.key === 'created'">
                <a-typography-text type="secondary" :style="{ fontSize: '12px' }">{{ record.created }}</a-typography-text>
              </template>
              <template v-else-if="column.key === 'status'">
                <a-badge :status="statusBadge(record.status)" :text="record.status" />
              </template>
              <template v-else-if="column.key === 'action'">
                <a-space :size="0">
                  <a-button type="link" size="small" @click.stop="router.push(`/tag-management/detail/${record.id}`)">查看</a-button>
                  <a-button type="link" size="small" @click.stop="router.push(`/tag-management/edit/${record.id}`)">编辑</a-button>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-tab-pane>

        <a-tab-pane key="points" tab="点位列表">
          <a-form layout="inline" class="filter-bar filter-bar-points">
            <a-form-item label="搜索点位">
              <a-input
                v-model:value="pointSearch"
                placeholder="输入点位名称或编号"
                allow-clear
                style="width: 240px"
              >
                <template #prefix><EnvironmentOutlined style="opacity:.5" /></template>
              </a-input>
            </a-form-item>
            <a-form-item label="所属标签">
              <a-select
                v-model:value="pointTagFilter"
                :options="pointTagOptions"
                placeholder="全部标签"
                allow-clear
                style="width: 180px"
              />
            </a-form-item>
            <a-form-item label="运行状态">
              <a-radio-group v-model:value="pointStatusFilter" button-style="solid">
                <a-radio-button v-for="s in pointStates" :key="s" :value="s">{{ s }}</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item class="filter-reset">
              <a-button @click="resetPointFilters">
                <template #icon><FilterOutlined /></template>
                重置
              </a-button>
            </a-form-item>
          </a-form>

          <a-table
            :columns="pointColumns"
            :data-source="filteredPoints"
            :pagination="pointPagination"
            :row-key="r => r.id"
            :row-selection="{ type: 'checkbox' }"
            :custom-row="pointRowClickHandler"
            size="middle"
            class="content-table point-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <a-space :size="12">
                  <a-avatar
                    shape="square"
                    :size="32"
                    style="background: rgba(17, 56, 224, 0.08); color: #1138e0"
                  >
                    <template #icon><component :is="record.icon || VideoCameraOutlined" /></template>
                  </a-avatar>
                  <div>
                    <a-typography-text strong :style="{ display: 'block' }">{{ record.name }}</a-typography-text>
                    <a-typography-text type="secondary" :style="{ fontSize: '11px' }">ID: {{ record.pid }}</a-typography-text>
                  </div>
                </a-space>
              </template>
              <template v-else-if="column.key === 'tag'">
                <a-space :size="4" wrap>
                  <a-tag color="blue" :bordered="false">{{ record.tag }}</a-tag>
                  <a-tag v-if="record.level" :bordered="false">{{ record.level }}</a-tag>
                </a-space>
              </template>
              <template v-else-if="column.key === 'coord'">
                <a-space :size="6">
                  <EnvironmentOutlined :style="{ color: '#1138e0', fontSize: '13px' }" />
                  <a-typography-text type="secondary" :style="{ fontSize: '12px' }">{{ record.coord }}</a-typography-text>
                </a-space>
              </template>
              <template v-else-if="column.key === 'status'">
                <a-badge :status="pointStatusBadge(record.status)" :text="record.status" />
              </template>
              <template v-else-if="column.key === 'updated'">
                <a-typography-text type="secondary" :style="{ fontSize: '12px' }">{{ record.updated }}</a-typography-text>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-space :size="0" class="row-actions">
                  <a-tooltip title="编辑">
                    <a-button type="text" size="small" @click.stop="router.push(`/tag-management/point/edit/${record.id}`)">
                      <template #icon><EditOutlined /></template>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip title="地图定位">
                    <a-button type="text" size="small" @click.stop>
                      <template #icon><CompassOutlined /></template>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip title="删除">
                    <a-button type="text" size="small" danger @click.stop>
                      <template #icon><DeleteOutlined /></template>
                    </a-button>
                  </a-tooltip>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- ===== Insights for TAGS tab ===== -->
    <a-row v-if="activeTab === 'tags'" :gutter="16" class="insights">
      <a-col :xs="24" :lg="16">
        <a-card title="数据采集趋势" :body-style="{ padding: '16px 20px 20px' }">
          <template #extra>
            <a-radio-group v-model:value="trendRange" size="small" button-style="solid">
              <a-radio-button value="7">最近 7 天</a-radio-button>
              <a-radio-button value="30">最近 30 天</a-radio-button>
              <a-radio-button value="90">最近 90 天</a-radio-button>
            </a-radio-group>
          </template>

          <a-list :data-source="barData" :split="false" size="small" class="trend-list">
            <template #renderItem="{ item }">
              <a-list-item class="trend-item">
                <a-typography-text class="trend-day">{{ item.day }}</a-typography-text>
                <div class="trend-bar">
                  <a-progress
                    :percent="item.h"
                    :show-info="false"
                    :stroke-color="item.h >= 90 ? '#1138e0' : 'rgba(17, 56, 224, 0.45)'"
                    size="small"
                  />
                </div>
                <a-statistic
                  :value="item.value"
                  :precision="1"
                  suffix="k"
                  :value-style="{ fontSize: '13px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }"
                  class="trend-value"
                />
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="8">
        <a-space direction="vertical" :size="16" style="width:100%">
          <a-card title="标签覆盖率统计" :body-style="{ padding: '20px' }">
            <a-statistic
              title="政务核心数据覆盖"
              :value="94.2"
              :precision="1"
              suffix="%"
              :value-style="{ fontSize: '28px', fontWeight: 600, color: '#1138e0', letterSpacing: '-0.02em' }"
            />
            <a-progress
              :percent="94.2"
              :show-info="false"
              stroke-color="#1138e0"
              size="small"
              style="margin-top: 4px"
            />
            <a-typography-paragraph :style="{ margin: '12px 0 0', fontSize: '12px', lineHeight: 1.6 }">
              <a-typography-text type="success" strong>
                <ArrowUpOutlined /> 2.4%
              </a-typography-text>
              <a-typography-text type="secondary"> 较上月。当前共有 </a-typography-text>
              <a-typography-text strong>1,284</a-typography-text>
              <a-typography-text type="secondary"> 个活跃标签，服务于 </a-typography-text>
              <a-typography-text strong>42</a-typography-text>
              <a-typography-text type="secondary"> 个政府部门。</a-typography-text>
            </a-typography-paragraph>
          </a-card>

          <a-card title="待办提醒" :body-style="{ padding: '0' }">
            <a-list :data-source="todos" :split="true">
              <template #renderItem="{ item }">
                <a-list-item class="todo-item">
                  <a-list-item-meta>
                    <template #avatar>
                      <a-avatar
                        shape="square"
                        :size="32"
                        :style="{ background: item.iconBg, color: item.iconColor }"
                      >
                        <template #icon><component :is="item.icon" /></template>
                      </a-avatar>
                    </template>
                    <template #title>
                      <a-typography-text strong>{{ item.title }}</a-typography-text>
                    </template>
                    <template #description>
                      <a-typography-text type="secondary" :style="{ fontSize: '11px' }">{{ item.sub }}</a-typography-text>
                    </template>
                  </a-list-item-meta>
                  <template #extra>
                    <a-tag :color="item.tagColor" :bordered="false">{{ item.tagLabel }}</a-tag>
                  </template>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </a-space>
      </a-col>
    </a-row>

    <!-- ===== Bento KPI for POINTS tab ===== -->
    <a-row v-if="activeTab === 'points'" :gutter="16" class="insights">
      <a-col v-for="kpi in pointKpis" :key="kpi.label" :xs="12" :md="6">
        <a-card :body-style="{ padding: '20px' }" class="kpi-card">
          <a-statistic
            :title="kpi.label"
            :value="kpi.value"
            :value-style="{ fontSize: '28px', fontWeight: 600, color: kpi.color, letterSpacing: '-0.02em' }"
          >
            <template #suffix>
              <component :is="kpi.icon" :style="{ color: kpi.color, opacity: 0.35, fontSize: '18px', marginLeft: '8px' }" />
            </template>
          </a-statistic>
          <a-typography-text
            :type="kpi.textType"
            :style="{ fontSize: '12px', display: 'block', marginTop: '8px' }"
            :strong="kpi.deltaStrong"
          >
            <component :is="kpi.deltaIcon" v-if="kpi.deltaIcon" />
            {{ kpi.delta }}
          </a-typography-text>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  CompassOutlined,
  VideoCameraOutlined,
  TagOutlined,
  ApiOutlined,
  AreaChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  WifiOutlined,
  WarningOutlined,
  GlobalOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()
const activeTab = ref('tags')

const searchText = ref('')
const filterStatus = ref()
const filterType = ref()
const pointSearch = ref('')
const pointTagFilter = ref()
const pointStatusFilter = ref('全部')
const trendRange = ref('7')

const pointStates = ['全部', '在线', '离线', '故障']

const statusOptions = [
  { label: '已发布', value: '已发布' },
  { label: '草稿',   value: '草稿' },
  { label: '已禁用', value: '已禁用' },
  { label: '待审核', value: '待审核' },
]

const typeOptions = [
  { label: '基础标签', value: '基础标签' },
  { label: '算法标签', value: '算法标签' },
  { label: '业务标签', value: '业务标签' },
]

const pointTagOptions = [
  { label: '交通流量', value: '交通流量' },
  { label: '人脸识别', value: '人脸识别' },
  { label: '环境监测', value: '环境监测' },
]

const tagData = ref([
  { id: 1, name: '企业信用等级',   type: '算法标签', desc: '基于工商、税务及诉讼数据综合评定',   count: '12',  created: '2023-10-24 14:30', status: '已发布' },
  { id: 2, name: '人口年龄分布',   type: '基础标签', desc: '各行政区域常住人口年龄层统计数据',   count: '85',  created: '2023-11-02 09:15', status: '已发布' },
  { id: 3, name: '医保异地结算',   type: '业务标签', desc: '异地医疗保险结算行为分析标签',       count: '0',   created: '2023-11-15 16:45', status: '待审核' },
  { id: 4, name: '能耗监测(工业)', type: '基础标签', desc: '主要工业园区用电、用气实时监测',    count: '244', created: '2023-11-20 10:00', status: '已发布' },
])

const filteredTags = computed(() =>
  tagData.value.filter(item => {
    const matchSearch = !searchText.value || item.name.includes(searchText.value) || item.desc.includes(searchText.value)
    const matchStatus = !filterStatus.value || item.status === filterStatus.value
    const matchType = !filterType.value || item.type === filterType.value
    return matchSearch && matchStatus && matchType
  })
)

const tagColumns = [
  { key: 'name',    title: '标签名称', minWidth: 220 },
  { key: 'type',    title: '类型',     width: 100 },
  { key: 'desc',    title: '标签描述', ellipsis: true },
  { key: 'count',   title: '关联点位', width: 120 },
  { key: 'created', title: '创建时间', width: 150 },
  { key: 'status',  title: '状态',     width: 100 },
  { key: 'action',  title: '操作',     width: 130, align: 'right' },
]

const tagPagination = {
  pageSize: 10,
  total: 24,
  showSizeChanger: false,
  showTotal: t => `共 ${t} 条`,
}

const tagRowClickHandler = (record) => ({
  onClick: () => router.push(`/tag-management/detail/${record.id}`),
  style: 'cursor: pointer',
})

const typeIcon = (type) => ({
  '算法标签': ApiOutlined,
  '基础标签': TagOutlined,
  '业务标签': AreaChartOutlined,
}[type] || TagOutlined)

const typeIconBg = (type) => ({
  '算法标签': 'rgba(17, 56, 224, 0.08)',
  '基础标签': 'rgba(17, 56, 224, 0.08)',
  '业务标签': 'rgba(250, 140, 22, 0.1)',
}[type] || 'rgba(0,0,0,0.04)')

const typeIconColor = (type) => ({
  '算法标签': '#1138e0',
  '基础标签': '#1138e0',
  '业务标签': '#fa8c16',
}[type] || '#1138e0')

const typeTagColor = (type) => ({
  '算法标签': 'blue',
  '基础标签': 'cyan',
  '业务标签': 'orange',
}[type] || 'default')

const statusBadge = (status) => ({
  '已发布': 'success',
  '待审核': 'warning',
  '草稿':   'default',
  '已禁用': 'default',
}[status] || 'default')

// Points
const pointData = ref([
  { id: 1, pid: 'PT-20231012-001', name: '朝阳路交叉口监控 01',    tag: '智慧交通', level: '一级点位', coord: '北京市朝阳区朝阳路 12.4, 116.5', status: '在线', updated: '2023-11-24 14:20:11', icon: VideoCameraOutlined },
  { id: 2, pid: 'PT-20231015-042', name: '奥体公园 PM2.5 监测仪',  tag: '环境监测', level: '',         coord: '北京市朝阳区奥体公园北区',     status: '故障', updated: '2023-11-24 12:45:30', icon: AreaChartOutlined },
  { id: 3, pid: 'PT-20231102-089', name: '三里屯商圈网关 05',     tag: '城市安防', level: '重点监控', coord: '北京市朝阳区三里屯路 3.1, 116.4', status: '离线', updated: '2023-11-23 09:12:00', icon: ApiOutlined },
  { id: 4, pid: 'PT-20231105-112', name: '望京西园人脸识别门禁',  tag: '城市安防', level: '',         coord: '北京市朝阳区望京街道',          status: '故障', updated: '2023-11-24 16:55:04', icon: VideoCameraOutlined },
])

const filteredPoints = computed(() =>
  pointData.value.filter(p => {
    const matchSearch = !pointSearch.value || p.name.includes(pointSearch.value) || p.pid.toLowerCase().includes(pointSearch.value.toLowerCase())
    const matchTag = !pointTagFilter.value || p.tag === pointTagFilter.value
    const matchStatus = pointStatusFilter.value === '全部' || p.status === pointStatusFilter.value
    return matchSearch && matchTag && matchStatus
  })
)

const pointColumns = [
  { key: 'name',    title: '点位名称', minWidth: 260 },
  { key: 'tag',     title: '所属标签', width: 200 },
  { key: 'coord',   title: '地理位置', minWidth: 220 },
  { key: 'status',  title: '状态',     width: 110 },
  { key: 'updated', title: '更新时间', width: 160 },
  { key: 'action',  title: '操作',     width: 130, align: 'right' },
]

const pointPagination = {
  pageSize: 10,
  total: 1248,
  showSizeChanger: false,
  showQuickJumper: true,
  showTotal: t => `共 ${t} 条`,
}

const pointRowClickHandler = (record) => ({
  onClick: () => router.push(`/tag-management/point/${record.id}`),
  style: 'cursor: pointer',
})

const resetPointFilters = () => {
  pointSearch.value = ''
  pointTagFilter.value = undefined
  pointStatusFilter.value = '全部'
}

const pointStatusBadge = (s) => ({
  '在线': 'success',
  '离线': 'default',
  '故障': 'error',
}[s] || 'default')

const pointKpis = [
  { label: '点位总数', value: '1,248', delta: '较昨日 +12',  color: '#1138e0', icon: GlobalOutlined,  deltaIcon: ArrowUpOutlined,   textType: 'success', deltaStrong: true },
  { label: '在线点位', value: '1,182', delta: '在线率 94.7%', color: '#52c41a', icon: WifiOutlined,    deltaIcon: null,              textType: 'secondary', deltaStrong: false },
  { label: '异常点位', value: '24',    delta: '需要立即处理', color: '#ff4d4f', icon: WarningOutlined, deltaIcon: ArrowDownOutlined, textType: 'danger',  deltaStrong: true },
  { label: '覆盖区域', value: '16',    delta: '全区主要街道', color: '#faad14', icon: CompassOutlined, deltaIcon: null,              textType: 'secondary', deltaStrong: false },
]

const barData = [
  { day: '周一', h: 30, value: 1.2 },
  { day: '周二', h: 45, value: 1.8 },
  { day: '周三', h: 65, value: 2.6 },
  { day: '周四', h: 55, value: 2.2 },
  { day: '周五', h: 85, value: 3.4 },
  { day: '周六', h: 95, value: 3.8 },
  { day: '周日', h: 75, value: 3.0 },
]

const todos = [
  { title: '5 个点位更新失败', sub: '来源 · 自然资源局基础地理库', icon: ExclamationCircleOutlined, iconBg: 'rgba(255, 77, 79, 0.1)',  iconColor: '#ff4d4f', tagColor: 'red',   tagLabel: '紧急' },
  { title: '标签审核通过',     sub: '智慧环保 · 噪声监测',         icon: CheckCircleOutlined,        iconBg: 'rgba(82, 196, 26, 0.1)',  iconColor: '#52c41a', tagColor: 'green', tagLabel: '通过' },
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
}

.page-title {
  margin: 0 0 4px !important;
}

/* Tabs nav padding */
.main-card :deep(.ant-tabs-nav) {
  margin: 0;
  padding: 0 24px;
}

/* Filter bar inside tab */
.filter-bar {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  row-gap: 12px;
}

.filter-bar-points {
  background: rgba(0, 0, 0, 0.015);
}

:global(.dark) .filter-bar {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .filter-bar-points {
  background: rgba(255, 255, 255, 0.025);
}

.filter-search,
.filter-reset {
  margin-left: auto;
  margin-right: 0 !important;
}

/* Table tweaks */
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

.content-table :deep(.ant-table-pagination) {
  padding: 16px 24px;
  margin: 0;
}

/* Row actions hover */
.point-table :deep(.ant-table-tbody > tr) .row-actions {
  opacity: 0;
  transition: opacity 0.15s;
}

.point-table :deep(.ant-table-tbody > tr:hover) .row-actions {
  opacity: 1;
}

/* Trend list */
.trend-list :deep(.ant-list-item) {
  padding: 6px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.trend-day {
  width: 40px;
  flex-shrink: 0;
  font-size: 12px;
  opacity: 0.7;
}

.trend-bar {
  flex: 1;
  min-width: 0;
}

.trend-bar :deep(.ant-progress) {
  margin: 0;
  line-height: 1;
}

.trend-value {
  width: 60px;
  text-align: right;
  flex-shrink: 0;
}

.trend-value :deep(.ant-statistic-content) {
  justify-content: flex-end;
}

/* KPI card */
.kpi-card :deep(.ant-statistic-title) {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.65;
  margin-bottom: 6px;
}

.kpi-card :deep(.ant-statistic-content) {
  align-items: center;
}

/* Todo */
.todo-item {
  padding: 14px 20px !important;
}
</style>
