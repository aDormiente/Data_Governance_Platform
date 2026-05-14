<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex items-end justify-between gap-6 flex-wrap">
      <div>
        <nav class="flex items-center gap-1.5 text-[11px] font-num text-outline uppercase tracking-[0.18em] mb-3">
          <span>GOVERN</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span class="text-primary">OVERVIEW</span>
        </nav>
        <h1 class="font-display text-[28px] font-extrabold text-on-surface tracking-tight leading-none">标签治理概览</h1>
        <p class="text-sm text-on-surface-variant mt-2">实时洞察全域标签的标准化、关联与质量进展。</p>
      </div>
      <div class="flex items-center gap-2 text-xs text-on-surface-variant">
        <span class="status-pill text-success">数据流就绪</span>
        <span class="font-num text-outline">最近同步 · 14:32</span>
      </div>
    </div>

    <!-- 6 Stat Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <div
        v-for="(card, i) in statCards"
        :key="card.label"
        class="kpi-card"
        :class="i === 0 ? 'border-l-[3px] border-primary' : ''"
      >
        <div class="flex justify-between items-start mb-3">
          <span class="w-9 h-9 bg-primary-fixed rounded-lg flex items-center justify-center text-on-primary-fixed-variant">
            <span class="material-symbols-outlined" style="font-size: 18px; font-variation-settings: 'FILL' 1">{{ card.icon }}</span>
          </span>
          <span class="text-[10px] font-num font-bold text-on-primary-fixed-variant bg-primary-fixed/70 px-2 py-0.5 rounded-md">{{ card.percent }}</span>
        </div>
        <p class="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{{ card.label }}</p>
        <p class="font-display text-[26px] font-extrabold text-on-surface tabular-nums leading-none tracking-tight">
          {{ card.value.toLocaleString() }}<span class="text-[11px] font-normal text-on-surface-variant ml-1.5 align-middle">点位</span>
        </p>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: Table (8 cols) -->
      <div class="lg:col-span-8 bento-card p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="flex items-center gap-3 font-display text-base font-bold text-on-surface">
            <span class="section-num text-xl">01</span>
            子标签明细
          </h3>
          <div class="flex gap-2">
            <div class="relative">
              <input
                v-model="searchText"
                class="pl-9 pr-4 py-1.5 text-sm bg-surface-container-low border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-56"
                placeholder="搜索标签名称..."
                type="text"
              />
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style="font-size: 16px">search</span>
            </div>
            <button
              @click="router.push('/tag-management/create')"
              class="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 hover:opacity-90 transition-all"
            >
              <span class="material-symbols-outlined" style="font-size: 16px">add</span>
              新建标签
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider font-bold">
                <th class="px-4 py-3 rounded-l-lg">标签名称</th>
                <th class="px-4 py-3">所属分类</th>
                <th class="px-4 py-3">覆盖数量</th>
                <th class="px-4 py-3">治理状态</th>
                <th class="px-4 py-3 rounded-r-lg text-right">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/30">
              <tr
                v-for="row in filteredTableData"
                :key="row.id"
                class="hover:bg-surface-container-low transition-colors cursor-pointer"
                @click="router.push(`/tag-management/detail/${row.id}`)"
              >
                <td class="px-4 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full flex-shrink-0" :style="{ background: row.color }"></div>
                    <span class="text-sm font-bold text-on-surface">{{ row.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-on-surface-variant">{{ row.category }}</td>
                <td class="px-4 py-4 text-sm font-bold text-on-surface">{{ row.count }}</td>
                <td class="px-4 py-4">
                  <span
                    class="px-2 py-0.5 rounded text-[10px] font-bold"
                    :class="statusClass(row.status)"
                  >{{ row.status }}</span>
                </td>
                <td class="px-4 py-4 text-right" @click.stop>
                  <button
                    @click="router.push(`/tag-management/detail/${row.id}`)"
                    class="text-primary hover:underline text-sm font-bold"
                  >详情</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-between items-center text-xs text-on-surface-variant">
          <span>显示第 1 至 {{ filteredTableData.length }} 条，共 142 条记录</span>
          <div class="flex gap-1">
            <button class="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container-high transition-colors">上一页</button>
            <button class="px-2 py-1 rounded bg-primary text-on-primary font-bold">1</button>
            <button class="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container-high transition-colors">2</button>
            <button class="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container-high transition-colors">3</button>
            <button class="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container-high transition-colors">下一页</button>
          </div>
        </div>
      </div>

      <!-- Right: Charts (4 cols) -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <!-- Donut Chart Card -->
        <div class="bento-card p-6">
          <h3 class="flex items-center gap-3 font-display text-base font-bold text-on-surface mb-6">
            <span class="section-num text-xl">02</span>
            标签分布占比
          </h3>
          <div class="relative w-48 h-48 mx-auto mb-6">
            <svg class="transform -rotate-90" viewBox="0 0 100 100">
              <circle class="stroke-primary" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="150 251.2" stroke-width="20" />
              <circle class="stroke-primary-container" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="80 251.2" stroke-dashoffset="-150" stroke-width="20" />
              <circle class="stroke-primary-fixed-dim" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="40 251.2" stroke-dashoffset="-230" stroke-width="20" />
              <circle class="stroke-outline-variant" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="21.2 251.2" stroke-dashoffset="-270" stroke-width="20" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <p class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">总计点位</p>
              <p class="font-display text-2xl font-extrabold text-on-surface tabular-nums tracking-tight">58,669</p>
            </div>
          </div>
          <div class="space-y-3">
            <div v-for="item in legendItems" :key="item.label" class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-sm flex-shrink-0" :class="item.swatch"></span>
                <span class="text-sm text-on-surface-variant">{{ item.label }}</span>
              </div>
              <span class="text-sm font-bold text-on-surface">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- Progress Card -->
        <div class="bento-card p-6 flex-1">
          <h3 class="flex items-center gap-3 font-display text-base font-bold text-on-surface mb-6">
            <span class="section-num text-xl">03</span>
            治理进展详情
          </h3>
          <div class="space-y-5">
            <div v-for="item in progressItems" :key="item.label">
              <div class="flex justify-between items-baseline text-xs mb-2">
                <span class="text-on-surface-variant font-medium">{{ item.label }}</span>
                <span class="font-num font-bold text-primary tabular-nums">{{ item.value }}<span class="text-[10px] text-outline">%</span></span>
              </div>
              <div class="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-700" :style="{ width: item.value + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="mt-6 p-4 bg-primary-fixed rounded-xl border border-primary-fixed-dim">
            <div class="flex gap-3">
              <span class="material-symbols-outlined text-primary" style="font-size: 18px; flex-shrink: 0">info</span>
              <p class="text-xs text-on-primary-fixed-variant leading-relaxed">
                当前治理任务运行正常，本周已完成 <span class="font-bold">12</span> 个新标签的标准化治理，质量达标率提升了 <span class="font-bold">4.2%</span>。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchText = ref('')

const statCards = [
  { label: '人口基础标签', value: 12840, percent: '24%', icon: 'person' },
  { label: '法人单位标签', value: 8421, percent: '18%', icon: 'domain' },
  { label: '空间地理标签', value: 24190, percent: '32%', icon: 'location_on' },
  { label: '电子证照标签', value: 6720, percent: '12%', icon: 'credit_card' },
  { label: '资产资源标签', value: 4388, percent: '9%', icon: 'inventory_2' },
  { label: '社会信用标签', value: 2110, percent: '5%', icon: 'shield' },
]

const tableData = ref([
  { id: 1, name: '常住人口标识', category: '人口基础标签', count: '12,045', status: '治理中', color: '#0057c2' },
  { id: 2, name: '企业纳税等级', category: '法人单位标签', count: '5,412', status: '治理中', color: '#0057c2' },
  { id: 3, name: '街道行政编码', category: '空间地理标签', count: '22,100', status: '已完成', color: '#16a34a' },
  { id: 4, name: '高新技术企业', category: '法人单位标签', count: '3,200', status: '治理中', color: '#0057c2' },
  { id: 5, name: '医疗机构许可证', category: '电子证照标签', count: '1,250', status: '待审核', color: '#d97706' },
])

const filteredTableData = computed(() =>
  tableData.value.filter(item => !searchText.value || item.name.includes(searchText.value))
)

const statusClass = (status) => ({
  '治理中': 'bg-primary-fixed text-on-primary-fixed-variant',
  '已完成': 'bg-success-container text-on-success-container',
  '待审核': 'bg-warning-container text-on-warning-container',
  '已停用': 'bg-surface-container text-on-surface-variant',
}[status] || 'bg-surface-container text-on-surface-variant')

const legendItems = [
  { label: '空间地理', value: '41.2%', swatch: 'bg-primary' },
  { label: '人口基础', value: '21.8%', swatch: 'bg-primary-container' },
  { label: '法人单位', value: '14.4%', swatch: 'bg-primary-fixed-dim' },
  { label: '其他类型', value: '22.6%', swatch: 'bg-outline-variant' },
]

const progressItems = [
  { label: '数据标准化', value: 85 },
  { label: '关联映射', value: 62 },
  { label: '质量核查', value: 48 },
]
</script>
