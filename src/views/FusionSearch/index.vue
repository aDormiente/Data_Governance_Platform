<template>
  <div class="page fusion-page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>工作台</a-breadcrumb-item>
      <a-breadcrumb-item>融合检索</a-breadcrumb-item>
    </a-breadcrumb>

    <section class="hero-section">
      <div class="hero-copy">
        <a-typography-title :level="2" class="hero-title">融合检索中心</a-typography-title>
        <a-typography-text type="secondary">
          跨源、跨域、全维度的政务数据智能化搜索
        </a-typography-text>
      </div>

      <a-input-group compact class="search-group">
        <a-select
          v-model:value="searchCategory"
          :options="categoryOptions"
          class="search-category"
        />
        <a-input
          v-model:value="searchInput"
          class="search-input"
          placeholder="输入关键字，如：民生保障、网格编码、高新产业园..."
          @press-enter="handleSearch"
        >
          <template #prefix><SearchOutlined /></template>
        </a-input>
        <a-button type="primary" class="search-button" @click="handleSearch">检索</a-button>
      </a-input-group>

      <a-space class="hot-searches" :size="8" wrap>
        <a-typography-text type="secondary">热门搜索:</a-typography-text>
        <a-tag
          v-for="tag in hotTags"
          :key="tag"
          color="blue"
          :bordered="false"
          class="hot-tag"
          @click="searchInput = tag"
        >
          {{ tag }}
        </a-tag>
      </a-space>
    </section>

    <a-row :gutter="[24, 16]">
      <a-col :xs="24" :lg="16">
        <div class="result-head">
          <a-space :size="8">
            <a-typography-text strong>检索结果</a-typography-text>
            <a-typography-text type="secondary">({{ resultCards.length }} 条)</a-typography-text>
          </a-space>
          <a-radio-group v-model:value="sortMode" size="small" button-style="solid">
            <a-radio-button value="relevance">按相关度</a-radio-button>
            <a-radio-button value="time">按时间</a-radio-button>
          </a-radio-group>
        </div>

        <a-space direction="vertical" :size="12" class="result-list">
          <a-card
            v-for="row in resultCards"
            :key="row.id"
            hoverable
            :body-style="{ padding: '18px 20px' }"
            class="result-card"
            @click="goResult(row)"
          >
            <div class="result-card-head">
              <a-space :size="12" align="start">
                <a-avatar
                  shape="square"
                  :size="40"
                  :class="row.type === '点位' ? 'point-avatar' : 'tag-avatar'"
                >
                  <template #icon>
                    <EnvironmentOutlined v-if="row.type === '点位'" />
                    <TagOutlined v-else />
                  </template>
                </a-avatar>
                <div>
                  <a-typography-text strong class="result-title">{{ row.title }}</a-typography-text>
                  <a-typography-text type="secondary" class="result-subtitle">
                    {{ row.subtitle }}
                  </a-typography-text>
                </div>
              </a-space>
              <a-tag :color="row.type === '点位' ? 'orange' : 'blue'" :bordered="false">
                {{ row.type }}
              </a-tag>
            </div>

            <a-typography-paragraph class="result-desc">
              {{ row.desc }}
            </a-typography-paragraph>

            <div class="result-foot">
              <a-space :size="16" wrap>
                <a-typography-text type="secondary" class="meta-text">
                  <CalendarOutlined />
                  {{ row.updated }}
                </a-typography-text>
                <a-typography-text type="secondary" class="meta-text">
                  <LinkOutlined v-if="row.type === '点位'" />
                  <EyeOutlined v-else />
                  {{ row.meta }}
                </a-typography-text>
              </a-space>
              <a-button type="link" size="small" @click.stop="goResult(row)">
                {{ row.type === '点位' ? '地图追踪' : '详情入口' }}
                <template #icon>
                  <CompassOutlined v-if="row.type === '点位'" />
                  <ArrowRightOutlined v-else />
                </template>
              </a-button>
            </div>
          </a-card>
        </a-space>

        <div class="pagination-wrap">
          <a-pagination simple :current="1" :page-size="10" :total="30" />
        </div>
      </a-col>

      <a-col :xs="24" :lg="8">
        <a-space direction="vertical" :size="16" class="side-stack">
          <a-card :body-style="{ padding: '16px 20px 20px' }">
            <template #title>
              <a-space :size="8">
                <BulbOutlined />
                <span>检索洞察</span>
              </a-space>
            </template>
            <a-typography-paragraph type="secondary" class="insight-copy">
              基于您近期的搜索记录，为您推荐关联性较高的点位及标签资产。
            </a-typography-paragraph>
            <a-list :data-source="recommendations" :split="false" size="small">
              <template #renderItem="{ item }">
                <a-list-item class="recommendation-item">
                  <a-typography-text>{{ item }}</a-typography-text>
                  <template #extra>
                    <a-button type="link" size="small">
                      <template #icon><ArrowRightOutlined /></template>
                    </a-button>
                  </template>
                </a-list-item>
              </template>
            </a-list>
          </a-card>

          <a-card title="全域数据概览" :body-style="{ padding: '16px 20px 20px' }">
            <a-row :gutter="16">
              <a-col :span="12">
                <a-statistic
                  title="标签总数"
                  :value="15920"
                  :value-style="statisticPrimaryStyle"
                />
              </a-col>
              <a-col :span="12">
                <a-statistic
                  title="活跃点位"
                  :value="8432"
                  :value-style="statisticTertiaryStyle"
                />
              </a-col>
            </a-row>

            <a-divider class="trend-divider" />
            <a-typography-text strong>近7日检索趋势</a-typography-text>
            <a-list :data-source="trendData" :split="false" size="small" class="trend-list">
              <template #renderItem="{ item }">
                <a-list-item class="trend-item">
                  <a-typography-text type="secondary" class="trend-day">{{ item.day }}</a-typography-text>
                  <div class="trend-progress">
                    <a-progress
                      :percent="item.value"
                      :show-info="false"
                      size="small"
                      stroke-color="rgb(var(--color-primary))"
                    />
                  </div>
                  <a-typography-text class="trend-value">{{ item.value }}%</a-typography-text>
                </a-list-item>
              </template>
            </a-list>
          </a-card>

          <a-card hoverable class="gis-card" :body-style="{ padding: '28px 20px' }" @click="openGis">
            <div class="gis-content">
              <EnvironmentOutlined class="gis-icon" />
              <a-typography-text strong class="gis-title">查看地理信息系统 (GIS)</a-typography-text>
              <a-typography-text type="secondary">
                实时覆盖 52 街道，1,204 个网格
              </a-typography-text>
            </div>
          </a-card>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRightOutlined,
  BulbOutlined,
  CalendarOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  LinkOutlined,
  SearchOutlined,
  TagOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()

const searchInput = ref('')
const searchCategory = ref('')
const sortMode = ref('relevance')

const categoryOptions = [
  { label: '全类别', value: '' },
  { label: '标签', value: 'tag' },
  { label: '点位', value: 'point' },
]

const hotTags = ['智慧交通', '人口老龄化', '社区服务', '营商环境']
const recommendations = ['营商环境监测大屏', '全市应急广播分布']
const barHeights = ref([45, 60, 50, 75, 90, 70, 100])

const trendData = computed(() => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '今日']
  return barHeights.value.map((value, index) => ({
    day: days[index],
    value,
  }))
})

const statisticPrimaryStyle = {
  fontSize: '24px',
  fontWeight: 600,
  color: 'rgb(var(--color-primary))',
}

const statisticTertiaryStyle = {
  fontSize: '24px',
  fontWeight: 600,
  color: 'rgb(var(--color-tertiary))',
}

const handleSearch = () => {}

const goResult = (result) => {
  if (result.type === '点位') {
    router.push(`/tag-management/point/${result.id}`)
  } else {
    router.push(`/tag-management/detail/${result.id}`)
  }
}

const openGis = () => {}

const resultCards = ref([
  {
    id: 1,
    type: '标签',
    title: '民生保障关键绩效指标',
    subtitle: '所属分类：社会管理 / 民生服务',
    desc: '该标签融合了全市民政局、社保局及街道办的动态数据，用于评估特定网格内的民生兜底保障覆盖率及执行效率，支持年度、季度多维分析。',
    meta: '12.4k 次引用',
    updated: '2023-11-24',
  },
  {
    id: 2,
    type: '点位',
    title: '高新南区人才公寓（试点点位）',
    subtitle: '地理坐标：114.05, 22.54 | 运维部门：市住建局',
    desc: '位于科技园中心地带的保障性租赁住房示范点，集成了物联网感应器及智能通行标签，是城市治理中“人房匹配”的核心观测点。',
    meta: '关联数据源：4个',
    updated: '2023-11-22',
  },
  {
    id: 3,
    type: '标签',
    title: '企业信用等级综合评价',
    subtitle: '所属分类：产业发展 / 市场监管',
    desc: '根据税务、工商、环保及司法执行等多维度数据实时加权计算生成的企业画像标签，用于信贷评估与政府补贴筛选。',
    meta: '已核验',
    updated: '2023-11-20',
  },
])
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

.hero-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 16px 0 8px;
}

.hero-copy {
  text-align: center;
}

.hero-title {
  margin: 0 0 4px !important;
}

.search-group {
  display: flex !important;
  width: min(100%, 860px);
}

.search-category {
  width: 128px;
  flex: 0 0 128px;
}

.search-input {
  flex: 1 1 auto;
  min-width: 0;
}

.search-button {
  width: 96px;
  flex: 0 0 96px;
}

.hot-searches {
  justify-content: center;
}

.hot-tag {
  cursor: pointer;
}

.result-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.result-list,
.side-stack {
  width: 100%;
}

.result-card {
  cursor: pointer;
}

.result-card-head,
.result-foot {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.result-title {
  display: block;
  font-size: 15px;
}

.result-subtitle {
  display: block;
  margin-top: 2px;
  font-size: 12px;
}

.result-desc {
  margin: 14px 0 16px !important;
  color: rgba(0, 0, 0, 0.64);
  line-height: 1.7;
}

:global(.dark) .result-desc {
  color: rgba(255, 255, 255, 0.68);
}

.meta-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.tag-avatar {
  background: rgba(17, 56, 224, 0.08);
  color: rgb(var(--color-primary));
}

.point-avatar {
  background: rgba(250, 140, 22, 0.12);
  color: rgb(var(--color-tertiary));
}

:global(.dark) .tag-avatar {
  background: rgba(91, 141, 239, 0.18);
}

:global(.dark) .point-avatar {
  background: rgba(250, 162, 110, 0.18);
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  padding-top: 16px;
}

.insight-copy {
  margin-bottom: 8px !important;
}

.recommendation-item {
  padding: 8px 0 !important;
}

.trend-divider {
  margin: 16px 0 12px;
}

.trend-list {
  margin-top: 8px;
}

.trend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 0 !important;
}

.trend-day {
  width: 40px;
  flex: 0 0 40px;
  font-size: 12px;
}

.trend-progress {
  flex: 1 1 auto;
  min-width: 0;
}

.trend-progress :deep(.ant-progress) {
  margin: 0;
  line-height: 1;
}

.trend-value {
  width: 42px;
  flex: 0 0 42px;
  text-align: right;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.gis-card {
  cursor: pointer;
}

.gis-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.gis-icon {
  color: rgb(var(--color-primary));
  font-size: 80px;
  opacity: 0.24;
}

.gis-title {
  display: block;
}

@media (max-width: 640px) {
  .search-group {
    flex-wrap: wrap;
  }

  .search-category,
  .search-button {
    flex: 1 1 100%;
    width: 100%;
  }

  .search-input {
    flex-basis: 100%;
  }
}
</style>
