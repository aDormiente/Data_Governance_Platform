<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span>工作台</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">融合检索</span>
      </div>
    </div>

    <!-- Hero Search Section -->
    <section class="mb-10">
      <div class="text-center mb-8">
        <h2 class="font-display text-[34px] font-semibold tracking-tight text-on-surface leading-[1.05] mb-2">融合检索中心</h2>
        <p class="text-[13px] text-on-surface-variant">跨源、跨域、全维度的政务数据智能化搜索</p>
      </div>

      <!-- Search Bar -->
      <div class="relative bg-surface-container-lowest p-2 rounded-2xl border border-outline-variant flex items-center gap-2">
        <div class="flex items-center bg-surface-container-low rounded-xl px-4 py-2.5 ml-1">
          <select v-model="searchCategory" class="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer focus:outline-none">
            <option value="">全类别</option>
            <option value="tag">标签</option>
            <option value="point">点位</option>
          </select>
        </div>
        <div class="flex-1 flex items-center px-4">
          <span class="material-symbols-outlined text-outline mr-3" style="font-size: 20px">search</span>
          <input
            v-model="searchInput"
            class="w-full bg-transparent border-none text-on-surface placeholder:text-on-surface-variant/60 text-[15px] focus:outline-none focus:ring-0"
            placeholder="输入关键字，如：民生保障、网格编码、高新产业园..."
            type="text"
            @keyup.enter="handleSearch"
          />
        </div>
        <button
          @click="handleSearch"
          class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
        >检索</button>
      </div>

      <!-- Hot Tags -->
      <div class="mt-4 flex flex-wrap gap-2 justify-center">
        <span class="text-xs text-on-surface-variant mr-2 flex items-center">热门搜索:</span>
        <button
          v-for="tag in hotTags"
          :key="tag"
          @click="searchInput = tag"
          class="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs hover:bg-surface-container-high transition-colors"
        >{{ tag }}</button>
      </div>
    </section>

    <!-- Results Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left: Result Cards -->
      <div class="lg:col-span-8 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-base font-bold flex items-center gap-2">
            <span class="w-1 h-5 bg-primary rounded-full inline-block"></span>
            检索结果
            <span class="text-sm font-normal text-on-surface-variant">({{ resultCards.length }} 条)</span>
          </h3>
          <div class="flex gap-4 text-xs font-medium text-on-surface-variant">
            <button class="hover:text-primary underline decoration-primary/30">按相关度</button>
            <button class="hover:text-primary">按时间</button>
          </div>
        </div>

        <div
          v-for="row in resultCards"
          :key="row.id"
          class="group bg-surface-container-lowest p-6 rounded-xl hover:bg-surface-container-low transition-all duration-300 border border-outline-variant cursor-pointer"
          @click="goResult(row)"
        >
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <span
                class="p-2 rounded-lg flex-shrink-0"
                :class="row.type === '点位' ? 'bg-tertiary-fixed text-tertiary' : 'bg-primary-fixed text-primary'"
              >
                <span class="material-symbols-outlined" style="font-size: 20px">{{ row.type === '点位' ? 'location_on' : 'label' }}</span>
              </span>
              <div>
                <h4 class="text-base font-bold group-hover:text-primary transition-colors">{{ row.title }}</h4>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ row.subtitle }}</p>
              </div>
            </div>
            <span
              class="px-2 py-1 text-[10px] font-bold rounded uppercase flex-shrink-0 ml-4"
              :class="row.type === '点位' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' : 'bg-primary-fixed text-on-primary-fixed-variant'"
            >{{ row.type }}</span>
          </div>
          <p class="text-sm text-on-surface-variant leading-relaxed mb-4">{{ row.desc }}</p>
          <div class="flex items-center justify-between">
            <div class="flex gap-4">
              <span class="flex items-center text-[11px] text-outline gap-1">
                <span class="material-symbols-outlined" style="font-size: 14px">update</span>
                {{ row.updated }}
              </span>
              <span class="flex items-center text-[11px] text-outline gap-1">
                <span class="material-symbols-outlined" style="font-size: 14px">{{ row.type === '点位' ? 'link' : 'visibility' }}</span>
                {{ row.meta }}
              </span>
            </div>
            <button class="text-primary text-xs font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all" @click.stop="goResult(row)">
              {{ row.type === '点位' ? '地图追踪' : '详情入口' }}
              <span class="material-symbols-outlined" style="font-size: 14px">{{ row.type === '点位' ? 'map' : 'chevron_right' }}</span>
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center pt-4">
          <nav class="flex gap-2">
            <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary">
              <span class="material-symbols-outlined" style="font-size: 16px">chevron_left</span>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-sm">1</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary text-sm">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary text-sm">3</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary">
              <span class="material-symbols-outlined" style="font-size: 16px">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Right: Insights & Stats -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Search Insights -->
        <div class="bg-surface-container-high p-6 rounded-2xl border-l-4 border-primary">
          <h5 class="font-bold text-on-surface mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 20px">lightbulb</span>
            检索洞察
          </h5>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-4">基于您近期的搜索记录，为您推荐关联性较高的点位及标签资产。</p>
          <div class="space-y-3">
            <div
              v-for="rec in recommendations"
              :key="rec"
              class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer group"
            >
              <span class="text-xs font-medium">{{ rec }}</span>
              <span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors" style="font-size: 14px">open_in_new</span>
            </div>
          </div>
        </div>

        <!-- Stats Overview -->
        <div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
          <h5 class="font-bold text-on-surface mb-5">全域数据概览</h5>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-4 bg-surface-container-low rounded-xl">
              <p class="text-xs text-on-surface-variant mb-1">标签总数</p>
              <p class="text-xl font-black text-primary">15,920</p>
            </div>
            <div class="text-center p-4 bg-surface-container-low rounded-xl">
              <p class="text-xs text-on-surface-variant mb-1">活跃点位</p>
              <p class="text-xl font-black text-tertiary">8,432</p>
            </div>
          </div>
          <div class="mt-5">
            <p class="text-[10px] text-on-surface-variant mb-2 text-center tracking-wider">近7日检索趋势</p>
            <div class="flex items-end gap-1 h-20">
              <div
                v-for="(h, i) in barHeights"
                :key="i"
                class="flex-1 rounded-t transition-all hover:opacity-80"
                :style="{ height: h + '%', backgroundColor: `rgba(0,87,194,${0.25 + (h / 100) * 0.75})` }"
              ></div>
            </div>
            <div class="flex justify-between text-[10px] text-on-surface-variant mt-1">
              <span>周一</span><span>周三</span><span>周五</span><span>今日</span>
            </div>
          </div>
        </div>

        <!-- GIS Map Placeholder -->
        <div class="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden cursor-pointer group">
          <div class="h-48 bg-gradient-to-br from-primary/10 via-surface-container-low to-tertiary/10 flex items-center justify-center relative">
            <span class="material-symbols-outlined text-primary/20" style="font-size: 80px">map</span>
            <div class="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent flex flex-col justify-end p-4">
              <p class="text-on-primary text-xs font-bold">查看地理信息系统 (GIS)</p>
              <p class="text-on-primary/70 text-[10px]">实时覆盖 52 个街道，1,204 个网格</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchInput = ref('')
const searchCategory = ref('')

const hotTags = ['智慧交通', '人口老龄化', '社区服务', '营商环境']
const recommendations = ['营商环境监测大屏', '全市应急广播分布']
const barHeights = ref([45, 60, 50, 75, 90, 70, 100])

const handleSearch = () => {}

const goResult = (result) => {
  if (result.type === '点位') {
    router.push(`/tag-management/point/${result.id}`)
  } else {
    router.push(`/tag-management/detail/${result.id}`)
  }
}

const resultCards = ref([
  {
    id: 1, type: '标签',
    title: '民生保障关键绩效指标',
    subtitle: '所属分类：社会管理 / 民生服务',
    desc: '该标签融合了全市民政局、社保局及街道办的动态数据，用于评估特定网格内的民生兜底保障覆盖率及执行效率，支持年度、季度多维分析。',
    meta: '12.4k 次引用',
    updated: '2023-11-24',
  },
  {
    id: 2, type: '点位',
    title: '高新南区人才公寓（试点点位）',
    subtitle: '地理坐标：114.05, 22.54 | 运维部门：市住建局',
    desc: '位于科技园中心地带的保障性租赁住房示范点，集成了物联网感应器及智能通行标签，是城市治理中"人房匹配"的核心观测点。',
    meta: '关联数据源：4个',
    updated: '2023-11-22',
  },
  {
    id: 3, type: '标签',
    title: '企业信用等级综合评价',
    subtitle: '所属分类：产业发展 / 市场监管',
    desc: '根据税务、工商、环保及司法执行等多维度数据实时加权计算生成的企业画像标签，用于信贷评估与政府补贴筛选。',
    meta: '已核验',
    updated: '2023-11-20',
  },
])
</script>
