<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-end">
      <div>
        <nav class="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <span>数据共享</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span class="text-primary font-medium">标签共享中心</span>
        </nav>
        <h2 class="text-2xl font-bold tracking-tight text-slate-900">标签共享中心</h2>
        <p class="text-on-surface-variant mt-1 text-sm">面向政务内网及跨部门数据交换的标签共享与API接口管理</p>
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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Card 1 -->
      <div class="bg-white rounded-xl p-6 border-l-4 border-primary hover:shadow-md transition-all cursor-pointer group" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2.5 bg-primary-fixed rounded-xl">
            <span class="material-symbols-outlined text-primary" style="font-size: 24px">sell</span>
          </div>
          <span class="text-[10px] font-bold bg-primary-fixed text-on-primary-fixed-variant px-2 py-1 rounded-full">1,284 个</span>
        </div>
        <h3 class="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">新建标签共享</h3>
        <p class="text-xs text-on-surface-variant leading-relaxed">将现有标签发布为共享资源，支持跨部门访问授权与调用审计</p>
        <div class="mt-4 flex items-center text-primary text-xs font-bold gap-1 group-hover:gap-2 transition-all">
          <span>立即配置</span>
          <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-xl p-6 border-l-4 border-tertiary hover:shadow-md transition-all cursor-pointer group" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2.5 bg-tertiary-fixed rounded-xl">
            <span class="material-symbols-outlined text-tertiary" style="font-size: 24px">folder_special</span>
          </div>
          <span class="text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-1 rounded-full">42 个集合</span>
        </div>
        <h3 class="font-bold text-slate-900 mb-1 group-hover:text-tertiary transition-colors">新建标签集合</h3>
        <p class="text-xs text-on-surface-variant leading-relaxed">将多个关联标签组合成集合包，实现批量订阅与一体化分发</p>
        <div class="mt-4 flex items-center text-tertiary text-xs font-bold gap-1 group-hover:gap-2 transition-all">
          <span>创建集合</span>
          <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-gradient-to-br from-primary to-primary-container rounded-xl p-6 text-white hover:opacity-95 transition-all cursor-pointer group shadow-lg shadow-primary/20">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2.5 bg-white/20 rounded-xl">
            <span class="material-symbols-outlined text-white" style="font-size: 24px">api</span>
          </div>
          <span class="text-[10px] font-bold bg-white/20 text-white px-2 py-1 rounded-full">RESTful</span>
        </div>
        <h3 class="font-bold mb-1">API 共享中心</h3>
        <p class="text-xs opacity-80 leading-relaxed">通过标准化 API 接口对外提供标签数据服务，支持 Token 鉴权与流量管控</p>
        <div class="mt-4 flex items-center text-white text-xs font-bold gap-1 group-hover:gap-2 transition-all opacity-90">
          <span>进入中心</span>
          <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
        </div>
      </div>
    </div>

    <!-- API Service Table -->
    <div class="bg-white rounded-xl overflow-hidden mb-8" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
      <div class="p-6 border-b border-surface-container-low flex items-center justify-between">
        <h3 class="font-bold text-slate-900 flex items-center gap-2">
          <span class="w-1 h-5 bg-primary rounded-full"></span>
          活跃 API 服务列表
        </h3>
        <div class="flex gap-3 items-center">
          <div class="flex items-center bg-surface-container-low rounded-lg px-3 py-1.5">
            <span class="material-symbols-outlined text-on-surface-variant mr-2" style="font-size: 16px">search</span>
            <input v-model="searchText" class="bg-transparent border-none text-sm w-48 focus:outline-none" placeholder="搜索接口名称..." />
          </div>
          <div class="flex items-center bg-surface-container-low rounded-lg px-3 py-1.5">
            <span class="text-xs text-on-surface-variant mr-2">状态:</span>
            <select v-model="filterStatus" class="bg-transparent border-none text-xs font-bold focus:outline-none">
              <option value="">全部</option>
              <option value="运行中">运行中</option>
              <option value="维护中">维护中</option>
              <option value="已禁用">已禁用</option>
            </select>
          </div>
        </div>
      </div>

      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-container-low/40">
            <th class="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">接口名称</th>
            <th class="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">所属分类</th>
            <th class="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">累计调用</th>
            <th class="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">当前状态</th>
            <th class="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">最后更新</th>
            <th class="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-container-low">
          <tr v-for="row in filteredApis" :key="row.id" class="hover:bg-surface-container-low/30 transition-colors group">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-primary-fixed rounded-lg flex items-center justify-center">
                  <span class="material-symbols-outlined text-primary" style="font-size: 16px">api</span>
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">{{ row.name }}</p>
                  <p class="text-[10px] text-on-surface-variant font-mono">{{ row.endpoint }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="text-xs bg-surface-container-low text-on-surface-variant px-2 py-1 rounded font-medium">{{ row.category }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm font-bold text-slate-900">{{ row.calls }}</span>
              <span class="text-[10px] text-on-surface-variant ml-1">次</span>
            </td>
            <td class="px-6 py-4">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border" :class="apiStatusClass(row.status)">
                <span class="w-1.5 h-1.5 rounded-full" :class="apiStatusDotClass(row.status)"></span>
                {{ row.status }}
              </div>
            </td>
            <td class="px-6 py-4 text-xs text-on-surface-variant font-mono">{{ row.updated }}</td>
            <td class="px-6 py-4 text-right">
              <button class="text-primary text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">详情</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="px-6 py-4 bg-surface-container-low/10 flex items-center justify-between border-t border-surface-container-low">
        <p class="text-xs text-on-surface-variant">显示 1 - {{ filteredApis.length }} / 共 <span class="font-bold">36</span> 条记录</p>
        <div class="flex gap-2">
          <button class="p-2 border border-outline-variant/30 rounded-lg hover:bg-white text-on-surface-variant opacity-50" disabled>
            <span class="material-symbols-outlined" style="font-size: 16px">chevron_left</span>
          </button>
          <button class="px-3 py-1 bg-primary text-white rounded-lg text-sm font-bold">1</button>
          <button class="px-3 py-1 border border-outline-variant/30 rounded-lg text-sm font-medium hover:bg-white">2</button>
          <button class="px-3 py-1 border border-outline-variant/30 rounded-lg text-sm font-medium hover:bg-white">3</button>
          <button class="p-2 border border-outline-variant/30 rounded-lg hover:bg-white text-on-surface-variant">
            <span class="material-symbols-outlined" style="font-size: 16px">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom: Security Dashboard + Help -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Security KPI Cards -->
      <div class="lg:col-span-8 bg-white rounded-xl p-6" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-bold text-slate-900 flex items-center gap-2">
            <span class="w-1 h-5 bg-tertiary rounded-full"></span>
            安全监控看板
          </h3>
          <span class="text-[10px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            系统运行正常
          </span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="kpi in kpiCards" :key="kpi.label" class="p-4 bg-surface-container-low/60 rounded-xl">
            <div class="flex items-center justify-between mb-3">
              <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 18px">{{ kpi.icon }}</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="kpi.tagClass">{{ kpi.tag }}</span>
            </div>
            <p class="text-xl font-black" :class="kpi.valueClass">{{ kpi.value }}</p>
            <p class="text-[10px] text-on-surface-variant mt-1">{{ kpi.label }}</p>
          </div>
        </div>

        <!-- Mini Chart Placeholder -->
        <div class="mt-6">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-on-surface-variant">近7日 API 调用趋势</span>
            <span class="text-[10px] text-outline">次/天</span>
          </div>
          <div class="h-24 w-full bg-surface-container-low/50 rounded-xl relative overflow-hidden flex items-end px-6 gap-2">
            <div v-for="(h, i) in [40, 60, 50, 80, 70, 90, 85]" :key="i"
              class="flex-1 rounded-t-sm"
              :class="i >= 5 ? 'bg-primary' : 'bg-primary/30'"
              :style="{ height: h + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Help Center Card -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <div class="bg-white rounded-xl p-6 flex-1" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 20px">help_center</span>
            快速帮助
          </h3>
          <div class="space-y-3">
            <div v-for="item in helpItems" :key="item.title" class="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer group">
              <span class="material-symbols-outlined mt-0.5 flex-shrink-0" :class="item.iconClass" style="font-size: 18px">{{ item.icon }}</span>
              <div>
                <p class="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{{ item.title }}</p>
                <p class="text-[10px] text-on-surface-variant mt-0.5">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-tertiary to-tertiary-container rounded-xl p-6 text-white shadow-lg">
          <p class="text-xs opacity-80 mb-1">合规提示</p>
          <h4 class="font-bold leading-tight mb-3">数据共享需符合《政务数据安全管理办法》相关规定</h4>
          <div class="flex items-center justify-between text-[10px] opacity-70">
            <span>点击查看完整合规指南</span>
            <span class="material-symbols-outlined" style="font-size: 16px">arrow_forward</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchText = ref('')
const filterStatus = ref('')

const apiData = ref([
  { id: 1, name: '民生保障评估接口', endpoint: '/api/v2/livelihood/assessment', category: '社会管理', calls: '248,412', status: '运行中', updated: '2023-11-24 09:30' },
  { id: 2, name: '企业信用查询接口', endpoint: '/api/v2/enterprise/credit', category: '市场监管', calls: '92,087', status: '运行中', updated: '2023-11-23 17:12' },
  { id: 3, name: '人口年龄分布接口', endpoint: '/api/v1/population/age', category: '人口基础', calls: '61,340', status: '维护中', updated: '2023-11-21 14:00' },
  { id: 4, name: '地理空间编码服务', endpoint: '/api/v3/geo/encoding', category: '空间地理', calls: '185,900', status: '运行中', updated: '2023-11-24 08:45' },
  { id: 5, name: '智慧交通流量接口', endpoint: '/api/v2/traffic/flow', category: '城市治理', calls: '34,210', status: '已禁用', updated: '2023-11-18 11:20' },
])

const filteredApis = computed(() =>
  apiData.value.filter(item => {
    const matchSearch = !searchText.value || item.name.includes(searchText.value) || item.endpoint.includes(searchText.value)
    const matchStatus = !filterStatus.value || item.status === filterStatus.value
    return matchSearch && matchStatus
  })
)

const apiStatusClass = (status) => ({
  '运行中': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  '维护中': 'bg-amber-50 text-amber-700 border-amber-100',
  '已禁用': 'bg-slate-100 text-slate-500 border-slate-200',
}[status] || 'bg-slate-100 text-slate-500 border-slate-200')

const apiStatusDotClass = (status) => ({
  '运行中': 'bg-emerald-500',
  '维护中': 'bg-amber-500',
  '已禁用': 'bg-slate-400',
}[status] || 'bg-slate-400')

const kpiCards = [
  { label: '接口告警', value: '2', icon: 'warning', tag: '待处理', tagClass: 'bg-red-100 text-red-600', valueClass: 'text-red-500' },
  { label: '平均耗时', value: '86ms', icon: 'speed', tag: '优良', tagClass: 'bg-green-100 text-green-700', valueClass: 'text-slate-900' },
  { label: '今日流量', value: '12.4k', icon: 'data_usage', tag: '+8.2%', tagClass: 'bg-blue-100 text-blue-700', valueClass: 'text-primary' },
  { label: '成功率', value: '99.7%', icon: 'verified', tag: '正常', tagClass: 'bg-emerald-100 text-emerald-700', valueClass: 'text-emerald-600' },
]

const helpItems = [
  { title: 'API 接入文档', desc: '查看接口鉴权与调用规范', icon: 'description', iconClass: 'text-primary' },
  { title: '申请共享权限', desc: '跨部门数据访问授权流程', icon: 'verified_user', iconClass: 'text-tertiary' },
  { title: '故障排查指南', desc: '常见接口异常解决方案', icon: 'build_circle', iconClass: 'text-on-surface-variant' },
]
</script>
