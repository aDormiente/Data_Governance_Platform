<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-end">
      <div>
        <nav class="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <span>政务数据治理</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span class="text-primary font-medium">标签管理</span>
        </nav>
        <h2 class="text-2xl font-bold tracking-tight text-slate-900">标签资源体系管理</h2>
        <p class="text-on-surface-variant mt-1 text-sm">对全域政务数据标签进行生命周期管理及点位映射维护</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-surface-container-high text-primary rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all">
          <span class="material-symbols-outlined" style="font-size: 16px">download</span>
          导出数据
        </button>
        <button
          @click="router.push('/tag-management/create')"
          class="px-5 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          <span class="material-symbols-outlined" style="font-size: 16px">add</span>
          新建标签
        </button>
      </div>
    </div>

    <!-- Tab Structure -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
      <!-- Tabs Header -->
      <div class="flex border-b border-surface-container-low px-6 bg-surface-container-low/30">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'py-4 px-6 text-sm font-medium transition-colors relative',
            activeTab === tab.key
              ? 'font-bold text-primary border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-primary'
          ]"
        >{{ tab.label }}</button>
      </div>

      <!-- ===== TAG LIST TAB ===== -->
      <template v-if="activeTab === 'tags'">
        <div class="p-6 border-b border-surface-container-low bg-white/50 flex flex-wrap items-end justify-between gap-4">
          <div class="flex gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">状态筛选</label>
              <select v-model="filterStatus" class="bg-surface-container-low border-none rounded-lg text-sm px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">全部状态</option>
                <option value="已发布">已发布</option>
                <option value="草稿">草稿</option>
                <option value="已禁用">已禁用</option>
                <option value="待审核">待审核</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">标签类型</label>
              <select v-model="filterType" class="bg-surface-container-low border-none rounded-lg text-sm px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">全部类型</option>
                <option value="基础标签">基础标签</option>
                <option value="算法标签">算法标签</option>
                <option value="业务标签">业务标签</option>
              </select>
            </div>
          </div>
          <div class="flex items-center bg-surface-container-low rounded-lg px-3 py-2 w-72">
            <span class="material-symbols-outlined text-on-surface-variant mr-2" style="font-size: 18px">search</span>
            <input v-model="searchText" class="bg-transparent border-none text-sm w-full focus:outline-none" placeholder="搜索标签名称或描述..." type="text" />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/20">
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">标签名称</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">类型</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">标签描述</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">关联点位</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">创建时间</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">状态</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low text-right">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr v-for="row in filteredData" :key="row.id" class="hover:bg-surface-container-low/40 transition-colors group cursor-pointer" @click="router.push(`/tag-management/detail/${row.id}`)">
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="row.type === '业务标签' ? 'bg-orange-100 text-tertiary' : 'bg-blue-100 text-primary'">
                      <span class="material-symbols-outlined" style="font-size: 18px; font-variation-settings: 'FILL' 1">{{ row.type === '业务标签' ? 'pending_actions' : 'sell' }}</span>
                    </div>
                    <span class="font-semibold text-slate-900">{{ row.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" :class="typeClass(row.type)">{{ row.type }}</span>
                </td>
                <td class="px-6 py-5 text-on-surface-variant text-sm max-w-xs truncate">{{ row.desc }}</td>
                <td class="px-6 py-5">
                  <span class="text-sm font-medium text-primary bg-primary/5 px-2 py-1 rounded">{{ row.count }} 个点位</span>
                </td>
                <td class="px-6 py-5 text-on-surface-variant text-sm">{{ row.created }}</td>
                <td class="px-6 py-5">
                  <span class="flex items-center gap-1.5 text-xs font-bold" :class="statusTextClass(row.status)">
                    <span class="w-1.5 h-1.5 rounded-full" :class="statusDotClass(row.status)"></span>
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-6 py-5 text-right" @click.stop>
                  <div class="flex justify-end gap-4">
                    <button @click="router.push(`/tag-management/detail/${row.id}`)" class="text-primary hover:underline text-sm font-medium">查看</button>
                    <button @click="router.push(`/tag-management/edit/${row.id}`)" class="text-primary hover:underline text-sm font-medium">编辑</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-6 py-4 bg-surface-container-low/10 flex items-center justify-between border-t border-surface-container-low">
          <div class="text-sm text-on-surface-variant">
            显示 <span class="font-bold">1 - {{ filteredData.length }}</span> / 共 <span class="font-bold">24</span> 条数据
          </div>
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
      </template>

      <!-- ===== POINT LIST TAB ===== -->
      <template v-if="activeTab === 'points'">
        <div class="p-6 border-b border-surface-container-low bg-white/50 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center bg-surface-container-low rounded-lg px-3 py-2 w-60">
              <span class="material-symbols-outlined text-on-surface-variant mr-2" style="font-size: 18px">search</span>
              <input v-model="pointSearch" class="bg-transparent border-none text-sm w-full focus:outline-none" placeholder="输入名称搜索..." type="text" />
            </div>
            <select v-model="pointTagFilter" class="bg-surface-container-low border-none rounded-lg text-sm px-4 py-2 w-36 focus:outline-none">
              <option value="">全部标签</option>
              <option value="交通流量">交通流量</option>
              <option value="人脸识别">人脸识别</option>
              <option value="环境监测">环境监测</option>
            </select>
            <button @click="pointSearch = ''; pointTagFilter = ''; pointStatusFilter = '全部'" class="px-3 py-2 text-sm text-on-surface-variant hover:text-primary border border-outline-variant/30 rounded-lg transition-colors">重置</button>
            <button class="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90">查询</button>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-on-surface-variant mr-1">状态:</span>
            <button
              v-for="s in ['全部', '在线', '离线', '故障']"
              :key="s"
              @click="pointStatusFilter = s"
              :class="[
                'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                pointStatusFilter === s ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              ]"
            >{{ s }}</button>
            <button
              @click="router.push('/tag-management/point/new')"
              class="ml-3 px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg text-sm font-medium flex items-center gap-1.5 shadow-sm shadow-primary/20 hover:opacity-90 transition-all"
            >
              <span class="material-symbols-outlined" style="font-size: 16px">add_location_alt</span>
              新建点位
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/20">
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">点位名称</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">所属标签</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">地理位置</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">状态</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low">更新时间</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low text-right">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr
                v-for="p in filteredPoints"
                :key="p.id"
                class="hover:bg-surface-container-low/40 transition-colors group cursor-pointer"
                @click="router.push(`/tag-management/point/${p.id}`)"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-surface-container-high rounded-lg flex items-center justify-center">
                      <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 16px">location_on</span>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-slate-900">{{ p.name }}</p>
                      <p class="text-[10px] font-mono text-on-surface-variant">{{ p.pid }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs bg-primary/5 text-primary px-2 py-1 rounded font-medium">{{ p.tag }}</span>
                </td>
                <td class="px-6 py-4 text-sm font-mono text-on-surface-variant">{{ p.coord }}</td>
                <td class="px-6 py-4">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border" :class="pointStatusClass(p.status)">
                    <span class="w-1.5 h-1.5 rounded-full" :class="pointStatusDot(p.status)"></span>
                    {{ p.status }}
                  </div>
                </td>
                <td class="px-6 py-4 text-xs text-on-surface-variant font-mono">{{ p.updated }}</td>
                <td class="px-6 py-4 text-right" @click.stop>
                  <div class="flex justify-end gap-3">
                    <button @click="router.push(`/tag-management/point/${p.id}`)" class="text-primary text-xs font-bold hover:underline">查看详情</button>
                    <button class="text-on-surface-variant text-xs font-bold hover:text-primary hover:underline">关联标签</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-6 py-4 bg-surface-container-low/10 flex items-center justify-between border-t border-surface-container-low">
          <p class="text-sm text-on-surface-variant">共 <span class="font-bold">1,248</span> 条记录，每页 10 条</p>
          <div class="flex gap-2 items-center">
            <button class="p-2 border border-outline-variant/30 rounded-lg hover:bg-white text-on-surface-variant opacity-50" disabled>
              <span class="material-symbols-outlined" style="font-size: 16px">chevron_left</span>
            </button>
            <button class="px-3 py-1 bg-primary text-white rounded-lg text-sm font-bold">1</button>
            <button class="px-3 py-1 border border-outline-variant/30 rounded-lg text-sm font-medium hover:bg-white">2</button>
            <button class="px-3 py-1 border border-outline-variant/30 rounded-lg text-sm font-medium hover:bg-white">3</button>
            <span class="text-on-surface-variant text-sm px-1">...</span>
            <button class="px-3 py-1 border border-outline-variant/30 rounded-lg text-sm font-medium hover:bg-white">125</button>
            <button class="p-2 border border-outline-variant/30 rounded-lg hover:bg-white text-on-surface-variant">
              <span class="material-symbols-outlined" style="font-size: 16px">chevron_right</span>
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Bottom Insights (tags tab only) -->
    <div v-if="activeTab === 'tags'" class="mt-8 grid grid-cols-12 gap-6">
      <div class="col-span-12 lg:col-span-8 bg-white p-6 rounded-xl border border-outline-variant/15" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-bold text-lg flex items-center gap-2">
            <span class="w-1 h-5 bg-primary rounded-full"></span>
            数据采集趋势
          </h3>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-surface-container-low text-[10px] font-bold rounded text-primary">最近7天</span>
            <span class="px-2 py-1 text-[10px] font-medium text-on-surface-variant cursor-pointer hover:text-primary">最近30天</span>
          </div>
        </div>
        <div class="h-40 w-full bg-surface-container-low/50 rounded-lg relative overflow-hidden flex items-end px-8 gap-3">
          <div v-for="(h, i) in [30, 45, 65, 55, 85, 95, 75]" :key="i"
            class="flex-1 rounded-t-sm transition-all"
            :class="i === 5 ? 'bg-primary' : i === 6 ? 'bg-primary/80' : `bg-primary/${20 + i * 10}`"
            :style="{ height: h + '%' }"
          ></div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div class="bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl text-white shadow-lg">
          <h3 class="font-bold mb-4 opacity-90">标签覆盖率统计</h3>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs">政务核心数据覆盖</span>
            <span class="text-xl font-black">94.2%</span>
          </div>
          <div class="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div class="bg-white h-full" style="width: 94%"></div>
          </div>
          <p class="mt-4 text-[10px] opacity-70 leading-relaxed">相比上月提升了 2.4%，当前共有 1,284 个活跃标签服务于 42 个政府部门。</p>
        </div>

        <div class="bg-white p-6 rounded-xl border border-outline-variant/15 flex-1" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <h3 class="font-bold mb-4 text-slate-900 flex items-center gap-2">
            <span class="w-1 h-4 bg-tertiary rounded-full"></span>
            待办提醒
          </h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3 p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-tertiary" style="font-size: 20px">notification_important</span>
              <div>
                <p class="text-sm font-bold">5个点位更新失败</p>
                <p class="text-[10px] text-on-surface-variant">所属：自然资源局基础地理库</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-blue-500" style="font-size: 20px">info</span>
              <div>
                <p class="text-sm font-bold">标签审核通过</p>
                <p class="text-[10px] text-on-surface-variant">"智慧环保-噪声监测"已上线</p>
              </div>
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
const activeTab = ref('tags')
const searchText = ref('')
const filterStatus = ref('')
const filterType = ref('')
const pointSearch = ref('')
const pointTagFilter = ref('')
const pointStatusFilter = ref('全部')

const tabs = [
  { key: 'tags', label: '标签列表' },
  { key: 'points', label: '点位列表' },
]

const tableData = ref([
  { id: 1, name: '企业信用等级', type: '算法标签', desc: '基于工商、税务及诉讼数据综合评定', count: '12', created: '2023-10-24 14:30', status: '已发布' },
  { id: 2, name: '人口年龄分布', type: '基础标签', desc: '各行政区域常住人口年龄层统计数据', count: '85', created: '2023-11-02 09:15', status: '已发布' },
  { id: 3, name: '医保异地结算', type: '业务标签', desc: '异地医疗保险结算行为分析标签', count: '0', created: '2023-11-15 16:45', status: '待审核' },
  { id: 4, name: '能耗监测(工业)', type: '基础标签', desc: '主要工业园区用电、用气实时监测', count: '244', created: '2023-11-20 10:00', status: '已发布' },
])

const pointData = ref([
  { id: 1, pid: 'P-100249', name: '政务大厅 A1 采集终端', tag: '交通流量', coord: '116.48, 39.91', status: '在线', updated: '2024-05-20 14:30:05' },
  { id: 2, pid: 'P-100255', name: '市政广场-南门感应器', tag: '人脸识别', coord: '116.40, 39.90', status: '离线', updated: '2024-05-19 09:12:44' },
  { id: 3, pid: 'P-100281', name: '滨江公园-水质监测点', tag: '环境监测', coord: '116.32, 39.85', status: '故障', updated: '2024-05-20 16:55:12' },
  { id: 4, pid: 'P-100312', name: '西直门立交-西北角', tag: '交通流量', coord: '116.35, 39.94', status: '在线', updated: '2024-05-20 17:10:00' },
])

const filteredData = computed(() =>
  tableData.value.filter(item => {
    const matchSearch = !searchText.value || item.name.includes(searchText.value) || item.desc.includes(searchText.value)
    const matchStatus = !filterStatus.value || item.status === filterStatus.value
    const matchType = !filterType.value || item.type === filterType.value
    return matchSearch && matchStatus && matchType
  })
)

const filteredPoints = computed(() =>
  pointData.value.filter(p => {
    const matchSearch = !pointSearch.value || p.name.includes(pointSearch.value)
    const matchTag = !pointTagFilter.value || p.tag === pointTagFilter.value
    const matchStatus = pointStatusFilter.value === '全部' || p.status === pointStatusFilter.value
    return matchSearch && matchTag && matchStatus
  })
)

const typeClass = (type) => ({
  '算法标签': 'bg-secondary-container text-on-secondary-container',
  '基础标签': 'bg-blue-100 text-blue-700',
  '业务标签': 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
}[type] || 'bg-slate-100 text-slate-600')

const statusTextClass = (status) => ({
  '已发布': 'text-green-600',
  '待审核': 'text-tertiary',
  '草稿': 'text-on-surface-variant',
  '已禁用': 'text-slate-400',
}[status] || 'text-on-surface-variant')

const statusDotClass = (status) => ({
  '已发布': 'bg-green-600',
  '待审核': 'bg-tertiary',
  '草稿': 'bg-slate-400',
  '已禁用': 'bg-slate-300',
}[status] || 'bg-slate-300')

const pointStatusClass = (s) => ({
  '在线': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  '离线': 'bg-slate-100 text-slate-500 border-slate-200',
  '故障': 'bg-red-50 text-red-600 border-red-100',
}[s] || 'bg-slate-100 text-slate-500 border-slate-200')

const pointStatusDot = (s) => ({
  '在线': 'bg-emerald-500',
  '离线': 'bg-slate-400',
  '故障': 'bg-red-500',
}[s] || 'bg-slate-400')
</script>
