<template>
  <div>
    <div class="mb-8 flex justify-between items-end">
      <div>
        <nav class="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <span>标签管理</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span class="text-primary font-medium">标签详情</span>
        </nav>
        <div class="flex items-center gap-3 mb-1">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900">标签详情 - 企业信用等级</h2>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            正式发布
          </span>
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold tracking-wide">
            V2.4.0 权威版本
          </span>
        </div>
        <p class="text-on-surface-variant text-sm">查看及管理企业信用评价维度的标签定义与关联点位</p>
        <div class="flex items-center gap-0 mt-3 text-xs text-on-surface-variant flex-wrap">
          <span>创建时间: <span class="font-semibold text-slate-700">2023-10-24 14:30</span></span>
          <span class="mx-3 text-outline-variant">|</span>
          <span>创建人: <span class="font-semibold text-slate-700">系统管理员</span></span>
          <span class="mx-3 text-outline-variant">|</span>
          <span>更新周期: <span class="font-semibold text-slate-700">实时同步</span></span>
          <span class="mx-3 text-outline-variant">|</span>
          <span>规则配置: <span class="font-semibold text-emerald-600">已启用</span></span>
        </div>
      </div>
      <div class="flex gap-3 items-center shrink-0">
        <button class="px-4 py-2 bg-surface-container-high text-primary rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all">
          <span class="material-symbols-outlined" style="font-size: 16px">download</span>
          导出数据
        </button>
        <button
          @click="router.push('/tag-management/edit/1')"
          class="px-5 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          <span class="material-symbols-outlined" style="font-size: 16px">edit</span>
          编辑标签
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <div class="bg-white rounded-xl overflow-hidden" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <div class="flex items-center gap-2 px-6 pt-5 pb-4 border-b border-surface-container-low bg-surface-container-low/20">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              ]"
            >
              <span class="font-mono text-[11px] tracking-widest" :class="activeTab === tab.key ? 'opacity-70' : 'opacity-50'">{{ tab.key }}</span>
              {{ tab.label }}
              <span
                v-if="tab.badge"
                :class="[
                  'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                  activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                ]"
              >{{ tab.badge }}</span>
            </button>
          </div>

          <div class="p-6">
            <div v-if="activeTab === '01'">
              <div class="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <div>
                  <p class="text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-1.5">标签名称</p>
                  <p class="text-sm font-semibold text-slate-900">企业信用等级</p>
                </div>
                <div>
                  <p class="text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-1.5">英文标识</p>
                  <p class="text-sm font-semibold text-slate-900 font-mono">ENTERPRISE_CREDIT</p>
                </div>
                <div>
                  <p class="text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-1.5">标签分类</p>
                  <p class="text-sm font-semibold text-slate-900">信用评估</p>
                </div>
                <div>
                  <p class="text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-1.5">更新周期</p>
                  <p class="text-sm font-semibold text-slate-900">实时同步</p>
                </div>
              </div>
              <div class="pt-5 border-t border-surface-container-low">
                <p class="text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-2">创建理由</p>
                <p class="text-sm font-semibold text-slate-900 leading-relaxed">用于评估全域企业信用风险，整合工商、税务、司法等多维数据进行综合评分，为政务扶持政策精准推送及风险预警提供数据支撑。</p>
              </div>
            </div>

            <div v-if="activeTab === '02'">
              <div class="flex items-center justify-between mb-5">
                <p class="text-sm font-bold text-slate-900">共 <span class="text-primary">42</span> 个关联点位</p>
                <button class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  查看全部点位
                  <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
                </button>
              </div>
              <div class="overflow-x-auto rounded-lg border border-surface-container-low">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-surface-container-low/40">
                      <th class="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">点位名称</th>
                      <th class="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">地理位置</th>
                      <th class="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">运行状态</th>
                      <th class="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">更新时间</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-surface-container-low">
                    <tr v-for="point in pointData" :key="point.id" class="hover:bg-surface-container-low/30 transition-colors">
                      <td class="px-4 py-4">
                        <p class="text-sm font-semibold text-slate-900">{{ point.name }}</p>
                        <p class="text-[10px] font-mono text-on-surface-variant mt-0.5">{{ point.id }}</p>
                      </td>
                      <td class="px-4 py-4 text-sm text-on-surface-variant">{{ point.location }}</td>
                      <td class="px-4 py-4">
                        <span class="flex items-center gap-1.5 text-xs font-bold" :class="point.statusColor">
                          <span class="w-1.5 h-1.5 rounded-full" :class="point.dotColor"></span>
                          {{ point.status }}
                        </span>
                      </td>
                      <td class="px-4 py-4 text-sm text-on-surface-variant">{{ point.updated }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-if="activeTab === '03'">
              <div class="relative pl-5">
                <div class="absolute left-1.5 top-2 bottom-8 border-l-2 border-surface-container-low"></div>
                <div class="space-y-7">
                  <div v-for="log in logData" :key="log.id" class="relative flex gap-4">
                    <div class="absolute -left-5 top-1 w-3 h-3 rounded-full border-2 border-white" :class="log.dotColor" style="margin-left: -5px"></div>
                    <div class="flex-1 bg-surface-container-low/30 rounded-xl p-4 border border-surface-container-low">
                      <div class="flex items-start justify-between mb-1.5">
                        <p class="text-sm font-semibold text-slate-900">{{ log.action }}</p>
                        <span class="text-[10px] text-on-surface-variant whitespace-nowrap ml-4">{{ log.time }}</span>
                      </div>
                      <p class="text-xs text-on-surface-variant">{{ log.operator }} <span class="text-outline-variant mx-1">·</span> {{ log.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6 text-center">
                <button class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
                  <span class="material-symbols-outlined" style="font-size: 14px">history</span>
                  查看完整历史日志
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 flex flex-col gap-6">
        <div class="bg-white rounded-xl p-6" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <h3 class="font-bold text-slate-900 mb-5 flex items-center gap-2">
            <span class="w-1 h-5 bg-primary rounded-full"></span>
            标签数据关联分布图
          </h3>
          <div class="flex items-center justify-center mb-5">
            <div class="relative w-44 h-44">
              <svg viewBox="0 0 160 160" class="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="56" fill="none" stroke="#d6e4ef" stroke-width="20" />
                <circle cx="80" cy="80" r="56" fill="none" stroke="#afc6ff" stroke-width="20"
                  stroke-dasharray="351.86"
                  stroke-dashoffset="0"
                  stroke-linecap="butt" />
                <circle cx="80" cy="80" r="56" fill="none" stroke="#006ef2" stroke-width="20"
                  stroke-dasharray="351.86"
                  stroke-dashoffset="298.08"
                  stroke-linecap="butt" />
                <circle cx="80" cy="80" r="56" fill="none" stroke="#0057c2" stroke-width="20"
                  stroke-dasharray="351.86"
                  stroke-dashoffset="200.56"
                  stroke-linecap="butt" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[11px] text-on-surface-variant font-medium">关联数据源</span>
                <span class="text-2xl font-black text-slate-900 leading-tight">18个</span>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <div v-for="item in donutLegend" :key="item.label" class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-sm" :style="{ backgroundColor: item.color }"></span>
                <span class="text-on-surface-variant">{{ item.label }}</span>
              </div>
              <span class="font-bold text-slate-900">{{ item.pct }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <h3 class="font-bold text-slate-900 flex items-center gap-2">
            <span class="w-1 h-5 bg-tertiary rounded-full"></span>
            标签活跃度
          </h3>
          <p class="text-xs text-on-surface-variant mt-0.5 mb-5">过去 24 小时数据调用频率</p>
          <div class="flex items-end gap-1 h-24">
            <div
              v-for="(h, i) in barHeights"
              :key="i"
              class="flex-1 rounded-t-sm"
              :style="{ height: h + '%', backgroundColor: `rgba(0,87,194,${0.25 + (h / 100) * 0.75})` }"
            ></div>
          </div>
          <div class="flex justify-between text-[10px] text-on-surface-variant mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
          <div class="mt-4 pt-4 border-t border-surface-container-low">
            <p class="text-xs text-on-surface-variant">峰值</p>
            <p class="text-lg font-bold text-primary mt-0.5">2,840 <span class="text-sm font-medium text-on-surface-variant">次/小时</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeTab = ref('01')

const tabs = [
  { key: '01', label: '基本信息' },
  { key: '02', label: '下属点位', badge: '42' },
  { key: '03', label: '更改日志' },
]

const pointData = ref([
  {
    id: 'ID: P-100249',
    name: '政务大厅 A1 采集终端',
    location: '高新区创业大道 188号',
    status: '正常运行',
    statusColor: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    updated: '2023-10-25 09:12',
  },
  {
    id: 'ID: P-100255',
    name: '智慧社区数据中继点',
    location: '西湖区曙光路 12号',
    status: '正常运行',
    statusColor: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    updated: '2023-10-25 09:10',
  },
  {
    id: 'ID: P-100281',
    name: '金融服务中心传感器',
    location: '滨江区江南大道 300号',
    status: '维护中',
    statusColor: 'text-amber-600',
    dotColor: 'bg-amber-400',
    updated: '2023-10-24 18:45',
  },
])

const logData = ref([
  {
    id: 1,
    time: '10分钟前',
    action: '更新了创建理由中的业务逻辑描述',
    operator: '李瑞康',
    role: '安全员',
    dotColor: 'bg-amber-400',
  },
  {
    id: 2,
    time: '昨天 16:20',
    action: '关联了 12 个新增地理点位',
    operator: '系统管理员',
    role: '管理员',
    dotColor: 'bg-blue-500',
  },
  {
    id: 3,
    time: '2023-10-24 14:30',
    action: '初始化标签定义及评分权重设置',
    operator: '系统管理员',
    role: '管理员',
    dotColor: 'bg-emerald-500',
  },
])

const donutLegend = ref([
  { label: '工商数据', pct: '35%', color: '#0057c2' },
  { label: '税务数据', pct: '28%', color: '#006ef2' },
  { label: '司法数据', pct: '22%', color: '#afc6ff' },
  { label: '其他',     pct: '15%', color: '#d6e4ef' },
])

const barHeights = ref([18, 22, 30, 28, 20, 35, 55, 72, 88, 95, 85, 78, 90, 100, 92, 80, 70, 60, 50, 45, 38, 30, 25, 20])
</script>
