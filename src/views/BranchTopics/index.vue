<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span>数据</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">标签共享</span>
        <span class="opacity-40">/</span>
        <span class="opacity-60">索引</span>
      </div>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="font-display text-[34px] font-semibold tracking-tight text-on-surface leading-[1.05]">标签共享中心</h1>
          <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">围绕主题构建标签集合，面向政务内网与跨部门提供数据共享与 API 接口。</p>
        </div>
        <div class="flex gap-2 items-center">
          <button class="text-[12px] px-3 py-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5">
            <span class="material-symbols-outlined" style="font-size: 14px">monitoring</span>
            运行日志
          </button>
          <button
            @click="router.push('/branch-topics/collection/create')"
            class="text-[12px] px-3 py-2 bg-primary text-on-primary flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span class="material-symbols-outlined" style="font-size: 14px">add</span>
            新建共享
          </button>
        </div>
      </div>
    </div>

    <!-- 3 Action Cards -->
    <div class="tt-rule mb-3">
      <span>01&nbsp;&nbsp;操作入口</span>
      <span class="tt-rule-sub">快捷动作</span>
    </div>
    <section class="grid grid-cols-1 md:grid-cols-3 border border-outline-variant divide-x divide-outline-variant bg-surface-container-lowest mb-8">
      <!-- New Tag -->
      <div
        @click="router.push('/tag-management/create')"
        class="group relative p-6 cursor-pointer tt-card-hover transition-colors border-l-[3px] border-primary"
      >
        <div class="flex items-center justify-between mb-5">
          <span class="font-mono text-[10px] tracking-wider text-on-surface-variant">A · 快捷入口</span>
          <span class="material-symbols-outlined text-primary opacity-70" style="font-size: 18px">add_circle</span>
        </div>
        <h3 class="font-display text-[18px] font-semibold mb-2 text-on-surface tracking-tight">新建标签</h3>
        <p class="text-on-surface-variant text-[12px] leading-relaxed mb-5">基于全域数据源，快速定义语义化标签，支持多维属性配置与血缘追踪。</p>
        <div class="text-[12px] tracking-wider text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
          立即开启
          <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
        </div>
      </div>

      <!-- New Tag Set -->
      <div
        @click="router.push('/branch-topics/collection/create')"
        class="group relative p-6 cursor-pointer tt-card-hover transition-colors border-l-[3px] border-tertiary"
      >
        <div class="flex items-center justify-between mb-5">
          <span class="font-mono text-[10px] tracking-wider text-on-surface-variant">B · 聚合分析</span>
          <span class="material-symbols-outlined text-tertiary opacity-70" style="font-size: 18px">category</span>
        </div>
        <h3 class="font-display text-[18px] font-semibold mb-2 text-on-surface tracking-tight">新建标签集合</h3>
        <p class="text-on-surface-variant text-[12px] leading-relaxed mb-5">将关联业务标签进行逻辑分组，构建领域模型，提升跨部门数据共享效率。</p>
        <div class="text-[12px] tracking-wider text-tertiary flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
          创建集合
          <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
        </div>
      </div>

      <!-- API Hub (hero, inverted) -->
      <div class="group relative p-6 cursor-pointer bg-primary text-on-primary border-l-[3px] border-on-primary/40 transition-opacity hover:opacity-95">
        <div class="flex items-center justify-between mb-5">
          <span class="font-mono text-[10px] tracking-wider opacity-80">C · 核心服务</span>
          <span class="material-symbols-outlined opacity-90" style="font-size: 18px">hub</span>
        </div>
        <h3 class="font-display text-[18px] font-semibold mb-2 tracking-tight">API 共享中心</h3>
        <p class="text-on-primary/85 text-[12px] leading-relaxed mb-5">标准化数据接口交付，实时监控调用链路，确保政务数据流通的安全合规。</p>
        <div class="text-[12px] tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
          访问中心
          <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
        </div>
      </div>
    </section>

    <!-- API Table -->
    <div class="tt-rule mb-3">
      <span>02&nbsp;&nbsp;活跃 API 服务</span>
      <span class="tt-rule-sub">在线接口</span>
    </div>
    <section class="border border-outline-variant bg-surface-container-lowest mb-8">
      <div class="px-4 py-3 border-b border-outline-variant flex items-center justify-between gap-3">
        <div class="flex items-center gap-2 flex-1">
          <span class="font-mono text-[11px] text-primary">&gt;</span>
          <input
            v-model="searchText"
            class="flex-1 bg-transparent border-0 text-[12px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0"
            placeholder="按接口名称筛选..."
            type="text"
          />
          <span class="font-mono text-[10px] text-on-surface-variant tracking-wider">{{ filteredApis.length }}/24</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="text-[12px] px-3 py-1.5 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">导出报表</button>
          <button class="text-[12px] px-3 py-1.5 bg-primary text-on-primary hover:opacity-90 transition-opacity">批量授权</button>
        </div>
      </div>
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-outline-variant">
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">接口名称</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">所属分类</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right">累计调用</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">状态</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">最后更新</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filteredApis" :key="row.id" class="tt-row border-b border-outline-variant/60 cursor-pointer">
            <td class="px-4 py-3.5">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-primary" style="font-size: 14px">{{ row.icon }}</span>
                <span class="font-mono text-[12px] font-semibold text-on-surface">{{ row.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3.5 text-[12px] text-on-surface-variant">{{ row.category }}</td>
            <td class="px-4 py-3.5 text-right font-mono text-[12px] font-semibold tabular-nums text-on-surface">{{ row.calls }}</td>
            <td class="px-4 py-3.5">
              <span class="status-pill" :class="apiStatusColor(row.status)">{{ row.status }}</span>
            </td>
            <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tabular-nums tracking-wider">{{ row.updated.replace(/-/g, '.').slice(0, 16) }}</td>
            <td class="px-4 py-3.5 text-right">
              <button class="text-[12px] text-primary hover:underline tracking-wider">详情 ›</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="px-4 py-2.5 border-t border-outline-variant flex justify-between items-center font-mono text-[11px] text-on-surface-variant tracking-wider">
        <span>显示 01-{{ String(filteredApis.length).padStart(2, '0') }} / 共 24 个接口</span>
        <div class="flex items-center gap-1">
          <button class="tt-kbd opacity-50">←</button>
          <span class="px-2 text-on-surface">1</span>
          <button class="tt-kbd hover:border-primary hover:text-primary">2</button>
          <button class="tt-kbd hover:border-primary hover:text-primary">3</button>
          <button class="tt-kbd hover:border-primary hover:text-primary">→</button>
        </div>
      </div>
    </section>

    <!-- Bottom -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <div class="tt-rule mb-3">
          <span>03&nbsp;&nbsp;共享安全看板</span>
          <span class="tt-rule-sub">运行指标</span>
        </div>
        <div class="border border-outline-variant bg-surface-container-lowest">
          <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-outline-variant">
            <div v-for="kpi in kpiCards" :key="kpi.label" class="relative px-5 py-5">
              <span class="absolute left-0 top-0 bottom-0 w-[3px]" :class="kpi.barClass"></span>
              <p class="font-mono text-[11px] tracking-wider text-on-surface-variant mb-2">{{ kpi.label }}</p>
              <p class="font-mono text-[26px] font-semibold tabular-nums leading-none tracking-tight" :class="kpi.valueClass">{{ kpi.value }}</p>
              <p class="mt-2 font-mono text-[11px] text-on-surface-variant tracking-wider">{{ kpi.sub }}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="tt-rule mb-3">
          <span>04&nbsp;&nbsp;帮助中心</span>
          <span class="tt-rule-sub">支持</span>
        </div>
        <div class="border border-outline-variant bg-surface-container-lowest p-5">
          <p class="text-[12px] text-on-surface-variant leading-relaxed mb-4">
            遇到 API 调用异常或权限申请问题？查看最新开发者指南或联系技术支持。
          </p>
          <div class="space-y-0 border-t border-outline-variant">
            <a
              v-for="item in helpItems"
              :key="item.title"
              class="flex items-center gap-2.5 py-2.5 border-b border-outline-variant text-on-surface group cursor-pointer hover:text-primary transition-colors"
            >
              <span class="material-symbols-outlined" style="font-size: 16px">{{ item.icon }}</span>
              <span class="text-[12px] tracking-wider flex-1">{{ item.title }}</span>
              <span class="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity" style="font-size: 14px">open_in_new</span>
            </a>
          </div>
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
  { id: 1, name: 'GetResidentProfileByTag_V1',    icon: 'code',         category: '人口基础库', calls: '128,492',  status: '运行中', updated: '2023-11-24 14:20' },
  { id: 2, name: 'EnterpriseRiskScore_Query',      icon: 'api',          category: '营商环境',   calls: '45,012',   status: '运行中', updated: '2023-11-25 09:15' },
  { id: 3, name: 'UrbanTrafficDensity_Stream',     icon: 'webhook',      category: '智慧城市',   calls: '2,104,855',status: '维护中', updated: '2023-11-23 23:45' },
  { id: 4, name: 'LandUseCertificate_Verify',      icon: 'terminal',     category: '自然资源',   calls: '8,331',    status: '运行中', updated: '2023-11-25 11:02' },
  { id: 5, name: 'SocialSecurityStatus_Batch',     icon: 'safety_check', category: '社会保障',   calls: '0',        status: '已禁用', updated: '2023-11-20 16:30' },
])

const filteredApis = computed(() =>
  apiData.value.filter(item => {
    const matchSearch = !searchText.value || item.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchStatus = !filterStatus.value || item.status === filterStatus.value
    return matchSearch && matchStatus
  })
)

const apiStatusColor = (status) => ({
  '运行中': 'text-success',
  '维护中': 'text-warning',
  '已禁用': 'text-on-surface-variant',
}[status] || 'text-on-surface-variant')

const kpiCards = [
  { label: '接口告警', value: '0',     sub: '近 24 小时',     valueClass: 'text-success',   barClass: 'bg-success' },
  { label: '平均耗时', value: '12ms',  sub: '近 1 小时 P50',  valueClass: 'text-on-surface',barClass: 'bg-primary' },
  { label: '今日流量', value: '1.2GB', sub: '较 7 日均值 +8%', valueClass: 'text-on-surface',barClass: 'bg-primary' },
  { label: '成功率',   value: '99.9%', sub: '▲ 较上周 +0.1pt', valueClass: 'text-success',  barClass: 'bg-success' },
]

const helpItems = [
  { title: '开发文档', icon: 'description' },
  { title: '联调支持', icon: 'support_agent' },
  { title: '故障申报', icon: 'report' },
]
</script>
