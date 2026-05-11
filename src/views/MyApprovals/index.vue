<template>
  <div>
    <!-- Page Header -->
    <div class="flex justify-between items-end mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight mb-1 flex items-center">
          <span class="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
          我的审批
        </h2>
        <p class="text-on-surface-variant text-sm">管理您的标签申请记录与待处理的审批流程</p>
      </div>
      <div class="flex p-1 bg-surface-container-low rounded-xl">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-6 py-2 text-sm font-medium rounded-lg transition-all',
            activeTab === tab.key
              ? 'bg-white text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-primary'
          ]"
        >{{ tab.label }}</button>
      </div>
    </div>

    <!-- Stats Bento Grid -->
    <div class="grid grid-cols-12 gap-6 mb-8">
      <div class="col-span-8 bg-white rounded-xl p-6 relative overflow-hidden group border border-transparent hover:border-outline-variant/10 transition-all" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
        <div class="flex justify-between relative z-10">
          <div>
            <p class="text-sm text-on-surface-variant mb-4">当前审批效率分析</p>
            <div class="flex items-end gap-8">
              <div>
                <span class="text-4xl font-black text-slate-900">24</span>
                <span class="text-xs text-on-surface-variant ml-1">待我处理</span>
              </div>
              <div class="pb-1">
                <span class="text-lg font-bold text-tertiary">98.2%</span>
                <span class="text-[10px] text-on-surface-variant ml-1">平均通过率</span>
              </div>
              <div class="pb-1">
                <span class="text-lg font-bold text-primary">1.2h</span>
                <span class="text-[10px] text-on-surface-variant ml-1">平均耗时</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-between items-end">
            <span class="material-symbols-outlined text-primary-container opacity-20 text-4xl">speed</span>
            <button class="text-xs bg-primary-container text-on-primary-container px-3 py-1.5 rounded-lg flex items-center font-bold gap-1">
              导出统计报表
              <span class="material-symbols-outlined" style="font-size: 14px">download</span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-4 bg-gradient-to-br from-primary to-primary-container rounded-xl p-6 text-white flex flex-col justify-between shadow-lg shadow-primary/20">
        <div>
          <p class="text-xs opacity-80 mb-1">系统公告</p>
          <h3 class="text-lg font-bold leading-tight">V2.4 版本审批流引擎已完成性能升级</h3>
        </div>
        <div class="flex items-center justify-between text-[10px] opacity-70">
          <span>2023-11-20 14:00</span>
          <span class="material-symbols-outlined" style="font-size: 16px">arrow_forward</span>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl overflow-hidden shadow-sm" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
      <!-- Table Controls -->
      <div class="p-5 flex items-center justify-between bg-surface-container-low/30">
        <div class="flex gap-3">
          <div class="flex items-center bg-white rounded-lg px-3 py-1.5 border border-outline-variant/20">
            <span class="text-xs text-on-surface-variant mr-2">状态筛选:</span>
            <select v-model="filterStatus" class="text-xs font-bold border-none p-0 focus:outline-none bg-transparent">
              <option value="">全部状态</option>
              <option value="审批中">审批中</option>
              <option value="通过">通过</option>
              <option value="驳回">驳回</option>
            </select>
          </div>
          <div class="flex items-center bg-white rounded-lg px-3 py-1.5 border border-outline-variant/20">
            <span class="text-xs text-on-surface-variant mr-2">申请时间:</span>
            <span class="text-xs font-bold">最近7天</span>
            <span class="material-symbols-outlined ml-2 text-outline" style="font-size: 14px">calendar_today</span>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
            <span class="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </div>

      <!-- Table -->
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-container-low/50">
            <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">标题</th>
            <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">申请人</th>
            <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">部门</th>
            <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">申请时间</th>
            <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">审批状态</th>
            <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-container-low">
          <tr v-for="row in filteredRows" :key="row.id" class="hover:bg-surface-container-low transition-colors group">
            <td class="px-6 py-4">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-900">{{ row.title }}</span>
                <span class="text-[10px] text-on-surface-variant">{{ row.id }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container mr-2">{{ row.name[0] }}</div>
                <span class="text-sm text-slate-900">{{ row.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-xs text-on-surface-variant">{{ row.dept }}</td>
            <td class="px-6 py-4 text-xs text-on-surface-variant font-mono">{{ row.time }}</td>
            <td class="px-6 py-4">
              <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border" :class="statusClass(row.status)">
                <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(row.status)"></span>
                {{ row.status }}
              </div>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-primary text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">查看详情</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="p-6 flex items-center justify-between border-t border-surface-container-low">
        <p class="text-xs text-on-surface-variant">显示 1 到 {{ filteredRows.length }} 共 148 条记录</p>
        <div class="flex gap-2">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <span class="material-symbols-outlined" style="font-size: 16px">chevron_left</span>
          </button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low text-xs font-bold">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low text-xs font-bold">3</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <span class="material-symbols-outlined" style="font-size: 16px">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('mine')
const filterStatus = ref('')

const tabs = [
  { key: 'mine', label: '我的审批' },
  { key: 'apply', label: '我的申请' },
]

const tableData = ref([
  { id: 'REQ-20231124-001', title: '关于"智慧交通"标签库的扩展申请', name: '张建设', dept: '大数据局 / 交通科', time: '2023-11-24 10:24', status: '审批中' },
  { id: 'REQ-20231123-014', title: '人口普查底层数据标签同步请求', name: '李晓芳', dept: '民政局 / 社会事务中心', time: '2023-11-23 16:45', status: '通过' },
  { id: 'REQ-20231122-088', title: '公共卫生安全指数标签公开授权', name: '王志强', dept: '卫健委 / 应急办', time: '2023-11-22 09:12', status: '驳回' },
  { id: 'REQ-20231121-022', title: '"数字乡村"地理空间标签批量更新', name: '陈思进', dept: '农业农村局', time: '2023-11-21 14:30', status: '审批中' },
])

const filteredRows = computed(() =>
  tableData.value.filter(r => !filterStatus.value || r.status === filterStatus.value)
)

const statusClass = (status) => ({
  '审批中': 'bg-blue-50 text-blue-700 border-blue-100',
  '通过': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  '驳回': 'bg-red-50 text-red-700 border-red-100',
}[status] || 'bg-slate-50 text-slate-600 border-slate-200')

const statusDotClass = (status) => ({
  '审批中': 'bg-blue-600',
  '通过': 'bg-emerald-600',
  '驳回': 'bg-red-600',
}[status] || 'bg-slate-400')
</script>
