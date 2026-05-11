<template>
  <div>
    <!-- Breadcrumb & Title -->
    <div class="mb-8">
      <nav class="flex items-center gap-2 text-on-surface-variant text-xs font-bold mb-2">
        <span>治理平台</span>
        <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
        <span class="text-primary">标签治理概览</span>
      </nav>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">标签治理概览</h1>
    </div>

    <!-- 6 Stat Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <div
        v-for="(card, i) in statCards"
        :key="card.label"
        class="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3"
        :style="i === 0 ? 'box-shadow: 0 8px 24px rgba(0,87,194,0.06); border-left: 3px solid #0057c2' : 'box-shadow: 0 8px 24px rgba(0,87,194,0.06)'"
      >
        <div class="flex justify-between items-start">
          <span class="bg-primary-fixed p-2 rounded-lg text-primary">
            <span class="material-symbols-outlined" style="font-size: 20px">{{ card.icon }}</span>
          </span>
          <span class="text-[10px] font-bold text-on-primary-fixed-variant bg-primary-fixed px-2 py-0.5 rounded">{{ card.percent }}</span>
        </div>
        <div>
          <p class="text-on-surface-variant text-xs mb-1">{{ card.label }}</p>
          <p class="text-2xl font-bold text-slate-900">{{ card.value.toLocaleString() }} <span class="text-xs font-normal text-on-surface-variant">点位</span></p>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: Table (8 cols) -->
      <div class="lg:col-span-8 bg-white rounded-xl shadow-sm p-6" style="box-shadow: 0 8px 24px rgba(0,87,194,0.06)">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-base font-bold text-slate-900">子标签明细</h3>
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
            <button class="bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 hover:opacity-90 transition-all">
              <span class="material-symbols-outlined" style="font-size: 16px">add</span>
              新增标签
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
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="row in filteredTableData"
                :key="row.id"
                class="hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <td class="px-4 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full flex-shrink-0" :style="{ background: row.color }"></div>
                    <span class="text-sm font-bold text-slate-900">{{ row.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-on-surface-variant">{{ row.category }}</td>
                <td class="px-4 py-4 text-sm font-bold text-slate-900">{{ row.count }}</td>
                <td class="px-4 py-4">
                  <span
                    class="px-2 py-0.5 rounded text-[10px] font-bold"
                    :class="statusClass(row.status)"
                  >{{ row.status }}</span>
                </td>
                <td class="px-4 py-4 text-right">
                  <button class="text-primary hover:underline text-sm font-bold">详情</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-between items-center text-xs text-on-surface-variant">
          <span>显示第 1 至 {{ filteredTableData.length }} 条，共 142 条记录</span>
          <div class="flex gap-1">
            <button class="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container-high transition-colors">上一页</button>
            <button class="px-2 py-1 rounded bg-primary text-white font-bold">1</button>
            <button class="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container-high transition-colors">2</button>
            <button class="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container-high transition-colors">3</button>
            <button class="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container-high transition-colors">下一页</button>
          </div>
        </div>
      </div>

      <!-- Right: Charts (4 cols) -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <!-- Donut Chart Card -->
        <div class="bg-white rounded-xl shadow-sm p-6" style="box-shadow: 0 8px 24px rgba(0,87,194,0.06)">
          <h3 class="text-base font-bold text-slate-900 mb-6">标签分布占比</h3>
          <div class="relative w-48 h-48 mx-auto mb-6">
            <svg class="transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#0057c2" stroke-dasharray="150 251.2" stroke-width="20" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#006ef2" stroke-dasharray="80 251.2" stroke-dashoffset="-150" stroke-width="20" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#afc6ff" stroke-dasharray="40 251.2" stroke-dashoffset="-230" stroke-width="20" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#d6e4ef" stroke-dasharray="21.2 251.2" stroke-dashoffset="-270" stroke-width="20" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <p class="text-xs text-on-surface-variant font-bold">总计点位</p>
              <p class="text-xl font-bold text-slate-900">58,669</p>
            </div>
          </div>
          <div class="space-y-3">
            <div v-for="item in legendItems" :key="item.label" class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-sm flex-shrink-0" :style="{ background: item.color }"></span>
                <span class="text-sm text-on-surface-variant">{{ item.label }}</span>
              </div>
              <span class="text-sm font-bold">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- Progress Card -->
        <div class="bg-white rounded-xl shadow-sm p-6 flex-1" style="box-shadow: 0 8px 24px rgba(0,87,194,0.06)">
          <h3 class="text-base font-bold text-slate-900 mb-6">治理进展详情</h3>
          <div class="space-y-5">
            <div v-for="item in progressItems" :key="item.label">
              <div class="flex justify-between text-xs mb-2">
                <span class="text-on-surface-variant">{{ item.label }}</span>
                <span class="font-bold text-primary">{{ item.value }}%</span>
              </div>
              <div class="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div class="bg-primary h-full rounded-full" :style="{ width: item.value + '%' }"></div>
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
  '已完成': 'bg-green-100 text-green-700',
  '待审核': 'bg-amber-100 text-amber-700',
  '已停用': 'bg-slate-100 text-slate-500',
}[status] || 'bg-slate-100 text-slate-500')

const legendItems = [
  { label: '空间地理', value: '41.2%', color: '#0057c2' },
  { label: '人口基础', value: '21.8%', color: '#006ef2' },
  { label: '法人单位', value: '14.4%', color: '#afc6ff' },
  { label: '其他类型', value: '22.6%', color: '#d6e4ef' },
]

const progressItems = [
  { label: '数据标准化', value: 85 },
  { label: '关联映射', value: 62 },
  { label: '质量核查', value: 48 },
]
</script>
