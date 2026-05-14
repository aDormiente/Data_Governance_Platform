<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-end">
      <div>
        <nav class="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <span>数据中心</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span class="text-primary font-medium">分支主题</span>
        </nav>
        <h2 class="text-2xl font-bold tracking-tight text-on-surface">分支主题中心</h2>
        <p class="text-on-surface-variant mt-1 text-sm">围绕主题构建标签集合，并面向政务内网与跨部门提供数据共享与API接口</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-surface-container-high text-primary rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all">
          <span class="material-symbols-outlined" style="font-size: 16px">monitoring</span>
          运行日志
        </button>
        <button class="px-5 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
          <span class="material-symbols-outlined" style="font-size: 16px">add</span>
          新建共享
        </button>
      </div>
    </div>

    <!-- Bento Action Cards -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <!-- New Tag Card -->
      <div
        @click="router.push('/tag-management/create')"
        class="group relative overflow-hidden bg-surface-container-lowest rounded-xl p-8 border-l-4 border-primary transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
      >
        <div class="flex justify-between items-start mb-6">
          <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-transform group-hover:scale-110">
            <span class="material-symbols-outlined" style="font-size: 30px">add_circle</span>
          </div>
          <span class="text-[10px] font-bold text-primary px-2 py-1 bg-primary/5 rounded">快捷入口</span>
        </div>
        <h3 class="text-xl font-bold mb-2 text-on-surface">新建标签</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6">基于全域数据源，快速定义语义化标签，支持多维属性配置与血缘追踪。</p>
        <button class="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all">
          立即开启
          <span class="material-symbols-outlined" style="font-size: 16px">arrow_forward</span>
        </button>
        <div class="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
          <span class="material-symbols-outlined text-on-surface" style="font-size: 144px">label</span>
        </div>
      </div>

      <!-- New Tag Set Card (TODO: 等 CollectionCreate.vue 就绪后绑定) -->
      <div
        @click="router.push('/branch-topics/collection/create')"
        class="group relative overflow-hidden bg-surface-container-lowest rounded-xl p-8 border-l-4 border-tertiary transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-tertiary/5 cursor-pointer"
      >
        <div class="flex justify-between items-start mb-6">
          <div class="w-14 h-14 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary transition-transform group-hover:scale-110">
            <span class="material-symbols-outlined" style="font-size: 30px">category</span>
          </div>
          <span class="text-[10px] font-bold text-tertiary px-2 py-1 bg-tertiary/5 rounded">聚合分析</span>
        </div>
        <h3 class="text-xl font-bold mb-2 text-on-surface">新建标签集合</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6">将关联业务标签进行逻辑分组，构建领域模型，提升跨部门数据共享效率。</p>
        <button class="flex items-center gap-2 text-tertiary font-bold text-sm group-hover:gap-4 transition-all">
          创建集合
          <span class="material-symbols-outlined" style="font-size: 16px">arrow_forward</span>
        </button>
        <div class="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
          <span class="material-symbols-outlined text-on-surface" style="font-size: 144px">collections_bookmark</span>
        </div>
      </div>

      <!-- API Sharing Center Card -->
      <div class="group relative overflow-hidden bg-gradient-to-br from-primary to-primary-container text-white rounded-xl p-8 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 cursor-pointer">
        <div class="flex justify-between items-start mb-6">
          <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
            <span class="material-symbols-outlined" style="font-size: 30px; font-variation-settings: 'FILL' 1;">hub</span>
          </div>
          <span class="text-[10px] font-bold text-white/80 px-2 py-1 bg-white/10 rounded">核心服务</span>
        </div>
        <h3 class="text-xl font-bold mb-2">API共享中心</h3>
        <p class="text-white/80 text-sm leading-relaxed mb-6">标准化数据接口交付，实时监控调用链路，确保政务数据流通的安全合规。</p>
        <button class="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
          访问中心
          <span class="material-symbols-outlined" style="font-size: 16px">arrow_forward</span>
        </button>
        <div class="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
          <span class="material-symbols-outlined" style="font-size: 160px">api</span>
        </div>
      </div>
    </section>

    <!-- API List Table Section -->
    <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm mb-8">
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-3">
          <div class="w-1 bg-primary h-6 rounded-full"></div>
          <h2 class="text-lg font-bold text-on-surface">活跃API服务列表</h2>
        </div>
        <div class="flex gap-2">
          <button class="px-4 py-1.5 text-xs font-bold bg-secondary-container text-on-secondary-container rounded hover:bg-surface-container-high transition-colors">导出报表</button>
          <button class="px-4 py-1.5 text-xs font-bold bg-primary text-white rounded hover:opacity-90 transition-opacity">批量授权</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-on-surface-variant border-b border-outline-variant/10">
              <th class="pb-4 font-bold text-xs uppercase tracking-wider pl-4">接口名称</th>
              <th class="pb-4 font-bold text-xs uppercase tracking-wider">所属分类</th>
              <th class="pb-4 font-bold text-xs uppercase tracking-wider text-right">累计调用次数</th>
              <th class="pb-4 font-bold text-xs uppercase tracking-wider text-center">当前状态</th>
              <th class="pb-4 font-bold text-xs uppercase tracking-wider">最后更新</th>
              <th class="pb-4 font-bold text-xs uppercase tracking-wider pr-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-container-low">
            <tr v-for="row in filteredApis" :key="row.id" class="hover:bg-surface-container-low transition-colors group">
              <td class="py-5 pl-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded bg-primary/5 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined" style="font-size: 18px">{{ row.icon }}</span>
                  </div>
                  <span class="font-bold text-sm text-on-surface">{{ row.name }}</span>
                </div>
              </td>
              <td class="py-5 text-sm text-on-surface-variant">{{ row.category }}</td>
              <td class="py-5 text-right font-mono font-bold text-sm">{{ row.calls }}</td>
              <td class="py-5 text-center">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold" :class="apiStatusClass(row.status)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="apiStatusDotClass(row.status)"></span>
                  {{ row.status }}
                </span>
              </td>
              <td class="py-5 text-xs text-on-surface-variant">{{ row.updated }}</td>
              <td class="py-5 pr-4 text-right">
                <button class="text-primary hover:underline text-xs font-bold">详情</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="mt-8 flex justify-between items-center px-2">
        <p class="text-xs text-on-surface-variant">显示 1 到 {{ filteredApis.length }} 共 24 条数据</p>
        <div class="flex items-center gap-1">
          <button class="p-1 rounded hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined" style="font-size: 16px">chevron_left</span></button>
          <button class="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high text-xs transition-colors">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high text-xs transition-colors">3</button>
          <button class="p-1 rounded hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined" style="font-size: 16px">chevron_right</span></button>
        </div>
      </div>
    </section>

    <!-- Bottom Asymmetric Insight: 安全看板 + 帮助中心 -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 bg-surface-container-low rounded-xl p-8 relative overflow-hidden group">
        <div class="relative z-10">
          <h3 class="text-lg font-bold mb-4 text-on-surface">共享安全看板</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="kpi in kpiCards" :key="kpi.label" class="bg-white/60 backdrop-blur p-4 rounded-lg">
              <p class="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{{ kpi.label }}</p>
              <p class="text-2xl font-black" :class="kpi.valueClass">{{ kpi.value }}</p>
            </div>
          </div>
        </div>
        <div class="absolute top-0 right-0 h-full w-1/2 opacity-10 group-hover:scale-105 transition-transform duration-700 pointer-events-none flex items-center justify-end">
          <span class="material-symbols-outlined text-primary" style="font-size: 220px">security</span>
        </div>
      </div>
      <div class="bg-surface-container-highest rounded-xl p-8 flex flex-col justify-center border border-white/40">
        <h4 class="text-sm font-bold mb-2 text-on-surface">帮助中心</h4>
        <p class="text-xs text-on-surface-variant leading-relaxed mb-4">遇到API调用异常或权限申请问题？查看最新的开发者指南或联系技术支持。</p>
        <div class="space-y-2">
          <a
            v-for="item in helpItems"
            :key="item.title"
            class="flex items-center gap-2 text-xs font-bold text-primary group cursor-pointer"
          >
            <span class="material-symbols-outlined" style="font-size: 16px">{{ item.icon }}</span>
            {{ item.title }}
            <span class="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity" style="font-size: 12px">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchText = ref('')
const filterStatus = ref('')

const apiData = ref([
  { id: 1, name: 'GetResidentProfileByTag_V1', icon: 'code', category: '人口基础库', calls: '128,492', status: '运行中', updated: '2023-11-24 14:20' },
  { id: 2, name: 'EnterpriseRiskScore_Query', icon: 'api', category: '营商环境', calls: '45,012', status: '运行中', updated: '2023-11-25 09:15' },
  { id: 3, name: 'UrbanTrafficDensity_Stream', icon: 'webhook', category: '智慧城市', calls: '2,104,855', status: '维护中', updated: '2023-11-23 23:45' },
  { id: 4, name: 'LandUseCertificate_Verify', icon: 'terminal', category: '自然资源', calls: '8,331', status: '运行中', updated: '2023-11-25 11:02' },
  { id: 5, name: 'SocialSecurityStatus_Batch', icon: 'safety_check', category: '社会保障', calls: '0', status: '已禁用', updated: '2023-11-20 16:30' },
])

const filteredApis = computed(() =>
  apiData.value.filter(item => {
    const matchSearch = !searchText.value || item.name.includes(searchText.value)
    const matchStatus = !filterStatus.value || item.status === filterStatus.value
    return matchSearch && matchStatus
  })
)

const apiStatusClass = (status) => ({
  '运行中': 'bg-green-50 text-green-700',
  '维护中': 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  '已禁用': 'bg-slate-100 text-slate-500',
}[status] || 'bg-slate-100 text-slate-500')

const apiStatusDotClass = (status) => ({
  '运行中': 'bg-green-500',
  '维护中': 'bg-tertiary',
  '已禁用': 'bg-slate-400',
}[status] || 'bg-slate-400')

const kpiCards = [
  { label: '接口告警', value: '0', valueClass: 'text-error' },
  { label: '平均耗时', value: '12ms', valueClass: 'text-primary' },
  { label: '今日流量', value: '1.2GB', valueClass: 'text-on-surface' },
  { label: '成功率', value: '99.9%', valueClass: 'text-green-600' },
]

const helpItems = [
  { title: '开发文档', icon: 'description' },
  { title: '联调支持', icon: 'support_agent' },
]
</script>
