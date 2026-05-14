<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span>治理</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">总览</span>
        <span class="opacity-40">/</span>
        <span class="opacity-60">2026·Q2</span>
      </div>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="font-display text-[34px] font-semibold text-on-surface leading-[1.05] tracking-tight">标签治理概览</h1>
          <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">实时洞察全域标签的标准化、关联与质量进展。所有指标取自政务主数据通道，刷新间隔 60 秒。</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="tt-live">实时</span>
          <span class="font-mono text-[11px] text-on-surface-variant tracking-wider">最近同步&nbsp;·&nbsp;14:32:18</span>
        </div>
      </div>
    </div>

    <!-- 6 KPI strip -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-outline-variant mb-8 divide-x divide-outline-variant bg-surface-container-lowest">
      <div
        v-for="card in statCards"
        :key="card.label"
        class="relative px-4 py-3.5"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono text-[10px] tracking-wider text-on-surface-variant">{{ card.code }}</span>
          <span class="material-symbols-outlined text-on-surface-variant/60" style="font-size: 14px">{{ card.icon }}</span>
        </div>
        <p class="font-mono text-[22px] font-semibold tabular-nums text-on-surface leading-none tracking-tight">{{ card.value.toLocaleString() }}</p>
        <p class="text-[11px] text-on-surface-variant mt-1.5 truncate">{{ card.label }}</p>
        <div class="mt-2 flex items-center justify-between font-mono text-[10px] tabular-nums">
          <span class="tt-delta tt-delta-up">▲ {{ card.delta }}</span>
          <span class="text-on-surface-variant tracking-wider">{{ card.percent }}</span>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: Table -->
      <div class="lg:col-span-8">
        <div class="tt-rule mb-3">
          <span>01&nbsp;&nbsp;子标签明细</span>
          <span class="tt-rule-sub">标签记录</span>
        </div>
        <div class="border border-outline-variant bg-surface-container-lowest">
          <div class="px-4 py-3 border-b border-outline-variant flex items-center justify-between gap-3 flex-wrap">
            <div class="flex items-center gap-2 flex-1 min-w-[200px]">
              <span class="font-mono text-[11px] text-primary">&gt;</span>
              <input
                v-model="searchText"
                class="flex-1 bg-transparent border-0 text-[12px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0"
                placeholder="按标签名称筛选..."
                type="text"
              />
              <span class="font-mono text-[10px] text-on-surface-variant tracking-wider">{{ filteredTableData.length }}/142</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                class="text-[12px] px-3 py-1.5 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
              >导出&nbsp;CSV</button>
              <button
                @click="router.push('/tag-management/create')"
                class="text-[12px] px-3 py-1.5 bg-primary text-on-primary flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <span class="material-symbols-outlined" style="font-size: 14px">add</span>
                新建标签
              </button>
            </div>
          </div>

          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-outline-variant">
                <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold w-[34px]"></th>
                <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">编号</th>
                <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">名称</th>
                <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">分类</th>
                <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right">覆盖量</th>
                <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">状态</th>
                <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, idx) in filteredTableData"
                :key="row.id"
                class="tt-row border-b border-outline-variant/60 cursor-pointer"
                @click="router.push(`/tag-management/detail/${row.id}`)"
              >
                <td class="px-4 py-3 font-mono text-[10px] text-on-surface-variant tabular-nums">{{ String(idx + 1).padStart(2, '0') }}</td>
                <td class="px-4 py-3 font-mono text-[11px] text-on-surface-variant tracking-wider">T-{{ String(100200 + row.id).padStart(6, '0') }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2.5">
                    <span class="w-1.5 h-1.5 flex-shrink-0" :style="{ background: row.color }"></span>
                    <span class="text-[13px] font-semibold text-on-surface">{{ row.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-[12px] text-on-surface-variant">{{ row.category }}</td>
                <td class="px-4 py-3 text-right font-mono text-[12px] font-semibold tabular-nums text-on-surface">{{ row.count }}</td>
                <td class="px-4 py-3">
                  <span class="status-pill" :class="statusColor(row.status)">{{ row.status }}</span>
                </td>
                <td class="px-4 py-3 text-right" @click.stop>
                  <button
                    @click="router.push(`/tag-management/detail/${row.id}`)"
                    class="text-[12px] text-primary hover:underline tracking-wider"
                  >详情 ›</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="px-4 py-2.5 border-t border-outline-variant flex justify-between items-center font-mono text-[11px] text-on-surface-variant tracking-wider">
            <span>显示 01-{{ filteredTableData.length }} / 共 142 条</span>
            <div class="flex items-center gap-1">
              <button class="tt-kbd hover:border-primary hover:text-primary">←</button>
              <span class="px-2 text-on-surface">1</span>
              <button class="tt-kbd hover:border-primary hover:text-primary">2</button>
              <button class="tt-kbd hover:border-primary hover:text-primary">3</button>
              <button class="tt-kbd hover:border-primary hover:text-primary">→</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Charts -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <!-- Donut -->
        <div>
          <div class="tt-rule mb-3">
            <span>02&nbsp;&nbsp;标签分布占比</span>
            <span class="tt-rule-sub">分布</span>
          </div>
          <div class="border border-outline-variant bg-surface-container-lowest p-5">
            <div class="relative w-44 h-44 mx-auto mb-5">
              <svg class="transform -rotate-90" viewBox="0 0 100 100">
                <circle class="stroke-outline-variant" cx="50" cy="50" fill="transparent" r="40" stroke-width="14" />
                <circle class="stroke-primary" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="103.5 251.2" stroke-width="14" />
                <circle class="stroke-primary-container" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="54.8 251.2" stroke-dashoffset="-103.5" stroke-width="14" />
                <circle class="stroke-success" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="36.2 251.2" stroke-dashoffset="-158.3" stroke-width="14" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <p class="text-[10px] tracking-wider text-on-surface-variant">点位总数</p>
                <p class="font-mono text-[22px] font-semibold text-on-surface tabular-nums tracking-tight mt-0.5">58,669</p>
              </div>
            </div>
            <div class="space-y-2 border-t border-outline-variant pt-4">
              <div v-for="item in legendItems" :key="item.label" class="flex items-center justify-between text-[12px] tracking-wider">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2" :class="item.swatch"></span>
                  <span class="text-on-surface-variant">{{ item.label }}</span>
                </div>
                <span class="font-mono font-semibold tabular-nums text-on-surface">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress -->
        <div>
          <div class="tt-rule mb-3">
            <span>03&nbsp;&nbsp;治理进展详情</span>
            <span class="tt-rule-sub">进展</span>
          </div>
          <div class="border border-outline-variant bg-surface-container-lowest p-5">
            <div class="space-y-4">
              <div v-for="item in progressItems" :key="item.label">
                <div class="flex justify-between items-baseline text-[12px] mb-1.5 tracking-wider">
                  <span class="text-on-surface-variant"><span class="font-mono text-on-surface-variant/70 mr-1">{{ item.code }}&nbsp;·</span>{{ item.label }}</span>
                  <span class="font-mono font-semibold tabular-nums text-on-surface">{{ item.value }}<span class="text-[10px] text-on-surface-variant">%</span></span>
                </div>
                <div class="tt-bar">
                  <div class="tt-bar-fill" :style="{ width: item.value + '%' }"></div>
                </div>
              </div>
            </div>
            <div class="mt-5 pt-4 border-t border-outline-variant">
              <p class="font-mono text-[11px] text-primary tracking-wider mb-1.5">▲ 提示</p>
              <p class="text-[12px] text-on-surface leading-relaxed">本周完成 <span class="font-mono font-semibold">12</span> 个新标签标准化，质量达标率 +<span class="font-mono font-semibold">4.2%</span>。</p>
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
  { code: '人口',   label: '人口基础', value: 12840, percent: '24%', delta: '+312', icon: 'person' },
  { code: '法人',   label: '法人单位', value: 8421,  percent: '18%', delta: '+128', icon: 'domain' },
  { code: '地理',   label: '空间地理', value: 24190, percent: '32%', delta: '+846', icon: 'location_on' },
  { code: '证照',   label: '电子证照', value: 6720,  percent: '12%', delta:  '+92', icon: 'credit_card' },
  { code: '资产',   label: '资产资源', value: 4388,  percent:  '9%', delta:  '+48', icon: 'inventory_2' },
  { code: '信用',   label: '社会信用', value: 2110,  percent:  '5%', delta:  '+21', icon: 'shield' },
]

const tableData = ref([
  { id: 1, name: '常住人口标识', category: '人口基础标签', count: '12,045', status: '治理中', color: 'rgb(var(--color-primary))' },
  { id: 2, name: '企业纳税等级', category: '法人单位标签', count: '5,412',  status: '治理中', color: 'rgb(var(--color-primary))' },
  { id: 3, name: '街道行政编码', category: '空间地理标签', count: '22,100', status: '已完成', color: 'rgb(var(--color-success))' },
  { id: 4, name: '高新技术企业', category: '法人单位标签', count: '3,200',  status: '治理中', color: 'rgb(var(--color-primary))' },
  { id: 5, name: '医疗机构许可证', category: '电子证照标签', count: '1,250', status: '待审核', color: 'rgb(var(--color-warning))' },
])

const filteredTableData = computed(() =>
  tableData.value.filter(item => !searchText.value || item.name.includes(searchText.value))
)

const statusColor = (status) => ({
  '治理中': 'text-primary',
  '已完成': 'text-success',
  '待审核': 'text-warning',
  '已停用': 'text-on-surface-variant',
}[status] || 'text-on-surface-variant')

const legendItems = [
  { label: '空间地理',  value: '41.2%', swatch: 'bg-primary' },
  { label: '人口基础',  value: '21.8%', swatch: 'bg-primary-container' },
  { label: '法人单位',  value: '14.4%', swatch: 'bg-success' },
  { label: '其他类型',  value: '22.6%', swatch: 'bg-outline-variant' },
]

const progressItems = [
  { code: '01', label: '数据标准化', value: 85 },
  { code: '02', label: '关联映射',   value: 62 },
  { code: '03', label: '质量核查',   value: 48 },
]
</script>
