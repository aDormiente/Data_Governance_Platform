<template>
  <div class="max-w-6xl mx-auto">
    <!-- Hero Search -->
    <section class="mb-10">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-black text-slate-900 mb-2 tracking-tight">融合检索中心</h2>
        <p class="text-on-surface-variant">跨源、跨域、全维度的政务数据智能化搜索</p>
      </div>

      <!-- Search Bar -->
      <div class="relative bg-white p-2 rounded-2xl shadow-xl flex items-center gap-2" style="box-shadow: 0 8px 40px rgba(0,87,194,0.08)">
        <div class="flex items-center bg-surface-container-low rounded-xl px-4 py-2 ml-1">
          <select v-model="searchCategory" class="bg-transparent border-none text-sm font-bold text-primary focus:outline-none cursor-pointer">
            <option value="">全类别</option>
            <option value="tag">标签</option>
            <option value="point">点位</option>
          </select>
        </div>
        <div class="flex-1 flex items-center px-4">
          <span class="material-symbols-outlined text-outline mr-3" style="font-size: 20px">search</span>
          <input
            v-model="searchInput"
            class="w-full bg-transparent border-none text-slate-900 text-base focus:outline-none placeholder:text-outline-variant"
            placeholder="输入关键字，如：民生保障、网格编码、高新产业园..."
            type="text"
            @keyup.enter="handleSearch"
          />
        </div>
        <button
          @click="handleSearch"
          class="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
        >检索</button>
      </div>

      <!-- Hot Searches -->
      <div class="mt-4 flex flex-wrap gap-2 justify-center">
        <span class="text-xs text-on-surface-variant mr-1 flex items-center">热门搜索:</span>
        <button
          v-for="tag in hotSearches"
          :key="tag"
          @click="searchInput = tag"
          class="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs hover:bg-surface-container-high transition-colors"
        >{{ tag }}</button>
      </div>
    </section>

    <!-- Results Section -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left: Result Cards -->
      <div class="lg:col-span-8 space-y-4">
        <div class="flex items-center justify-between mb-4 px-1">
          <h3 class="text-lg font-bold flex items-center gap-2">
            <span class="w-1 h-5 bg-primary rounded-full"></span>
            检索结果 <span class="text-sm font-normal text-on-surface-variant">(1,284条)</span>
          </h3>
          <div class="flex gap-4 text-xs font-medium text-on-surface-variant">
            <button class="hover:text-primary underline decoration-primary/30 text-primary">按相关度</button>
            <button class="hover:text-primary">按时间</button>
          </div>
        </div>

        <div
          v-for="result in resultCards"
          :key="result.id"
          class="group bg-white p-6 rounded-xl hover:bg-surface-container-low transition-all duration-300 cursor-pointer"
          style="box-shadow: 0 4px 20px rgba(0,21,41,0.04)"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-3">
              <span class="p-2 rounded-lg" :class="result.type === '点位' ? 'bg-tertiary-fixed text-tertiary' : 'bg-blue-50 text-primary'">
                <span class="material-symbols-outlined" style="font-size: 20px">{{ result.type === '点位' ? 'location_on' : 'label' }}</span>
              </span>
              <div>
                <h4 class="text-base font-bold group-hover:text-primary transition-colors">{{ result.title }}</h4>
                <p class="text-xs text-on-surface-variant">{{ result.subtitle }}</p>
              </div>
            </div>
            <span class="px-2 py-1 text-[10px] font-bold rounded uppercase" :class="result.type === '点位' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' : 'bg-primary-fixed text-on-primary-fixed-variant'">
              {{ result.type }}
            </span>
          </div>
          <p class="text-sm text-on-surface-variant leading-relaxed mb-4">{{ result.desc }}</p>
          <div class="flex items-center justify-between">
            <div class="flex gap-4">
              <span v-for="meta in result.meta" :key="meta" class="flex items-center text-xs text-outline">
                <span class="material-symbols-outlined mr-1" style="font-size: 14px">{{ meta.icon }}</span>
                {{ meta.text }}
              </span>
            </div>
            <button class="text-primary text-xs font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
              {{ result.type === '点位' ? '地图追踪' : '详情入口' }}
              <span class="material-symbols-outlined" style="font-size: 16px">{{ result.type === '点位' ? 'map' : 'chevron_right' }}</span>
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center pt-4">
          <nav class="flex gap-2">
            <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
              <span class="material-symbols-outlined" style="font-size: 16px">chevron_left</span>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary text-sm">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary text-sm">3</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
              <span class="material-symbols-outlined" style="font-size: 16px">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Right: Insights Sidebar -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Search Insights -->
        <div class="bg-surface-container-high p-6 rounded-2xl border-l-4 border-primary">
          <h5 class="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 20px">lightbulb</span>
            检索洞察
          </h5>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-4">基于您近期的搜索记录，为您推荐关联性较高的点位及标签资产。</p>
          <div class="space-y-2">
            <div v-for="item in insights" :key="item" class="flex items-center justify-between p-3 bg-white/60 rounded-xl hover:bg-white transition-colors cursor-pointer group">
              <span class="text-xs font-medium">{{ item }}</span>
              <span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors" style="font-size: 14px">open_in_new</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <h5 class="font-bold text-slate-900 mb-6">全域数据概览</h5>
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
        </div>

        <!-- Search History -->
        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <h5 class="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 18px">history</span>
            最近搜索
          </h5>
          <div class="space-y-2">
            <div v-for="item in historyList" :key="item" class="flex items-center justify-between text-sm py-1.5 cursor-pointer hover:text-primary transition-colors group">
              <span class="text-on-surface-variant group-hover:text-primary">{{ item }}</span>
              <span class="material-symbols-outlined text-outline" style="font-size: 14px">north_west</span>
            </div>
          </div>
          <button class="mt-4 text-xs text-outline hover:text-primary transition-colors">清空历史记录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchInput = ref('')
const searchCategory = ref('')

const hotSearches = ['智慧交通', '人口老龄化', '社区服务', '营商环境']
const insights = ['营商环境监测大屏', '全市应急广播分布', '医疗资源地图']
const historyList = ['省发改委 审批公示', '高标准农田 矢量图层', 'API文档：企业画像V2']

const handleSearch = () => {}

const resultCards = [
  {
    id: 1,
    type: '标签',
    title: '民生保障关键绩效指标',
    subtitle: '所属分类：社会管理 / 民生服务',
    desc: '该标签融合了全市民政局、社保局及街道办的动态数据，用于评估特定网格内的民生兜底保障覆盖率及执行效率，支持年度、季度多维分析。',
    meta: [{ icon: 'update', text: '2023-11-24' }, { icon: 'visibility', text: '12.4k' }],
  },
  {
    id: 2,
    type: '点位',
    title: '高新南区人才公寓（试点点位）',
    subtitle: '地理坐标：114.05, 22.54 | 运维部门：市住建局',
    desc: '位于科技园中心地带的保障性租赁住房示范点，集成了物联网感应器及智能通行标签，是城市治理中"人房匹配"的核心观测点。',
    meta: [{ icon: 'link', text: '关联数据源：4个' }, { icon: 'signal_cellular_alt', text: '信号优良' }],
  },
  {
    id: 3,
    type: '标签',
    title: '企业信用等级综合评价',
    subtitle: '所属分类：产业发展 / 市场监管',
    desc: '根据税务、工商、环保及司法执行等多维度数据实时加权计算生成的企业画像标签，用于信贷评估与政府补贴筛选。',
    meta: [{ icon: 'update', text: '2023-11-20' }, { icon: 'verified_user', text: '已核验' }],
  },
]
</script>
