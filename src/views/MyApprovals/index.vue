<template>
  <div class="space-y-8">
    <!-- Page Header & Action -->
    <div class="flex justify-between items-end">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-on-surface-variant text-xs">
          <span>个人工作台</span>
          <span class="material-symbols-outlined" style="font-size: 14px">chevron_right</span>
          <span class="text-primary font-bold">{{ activeTab === 'mine' ? '我的审批' : '我的申请' }}</span>
        </div>
        <h2 class="text-2xl font-bold tracking-tight text-on-surface">{{ activeTab === 'mine' ? '我的审批' : '我的申请' }}</h2>
      </div>
      <div class="flex items-end gap-4">
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
        <button v-if="activeTab === 'apply'" class="bg-gradient-to-b from-primary-container to-primary text-white px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
          <span class="material-symbols-outlined" style="font-size: 20px">add</span>
          <span class="font-bold">发起申请</span>
        </button>
      </div>
    </div>

    <!-- ========== MINE TAB ========== -->
    <template v-if="activeTab === 'mine'">
      <!-- Stats Bento Grid -->
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-8 bg-white rounded-xl p-6 relative overflow-hidden group border border-transparent hover:border-outline-variant/10 transition-all" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div class="flex justify-between relative z-10">
            <div>
              <p class="text-sm text-on-surface-variant mb-4">当前审批效率分析</p>
              <div class="flex items-end gap-8">
                <div>
                  <span class="text-4xl font-black text-on-surface">24</span>
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
              <span class="material-symbols-outlined text-primary-container opacity-20" style="font-size: 40px">speed</span>
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

      <!-- 待审批 Table -->
      <div class="bg-white rounded-xl overflow-hidden shadow-sm" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
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
            <tr v-for="row in filteredMineRows" :key="row.id" class="hover:bg-surface-container-low transition-colors group">
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-on-surface">{{ row.title }}</span>
                  <span class="text-[10px] text-on-surface-variant">{{ row.id }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container mr-2">{{ row.name[0] }}</div>
                  <span class="text-sm text-on-surface">{{ row.name }}</span>
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

        <div class="p-6 flex items-center justify-between border-t border-surface-container-low">
          <p class="text-xs text-on-surface-variant">显示 1 到 {{ filteredMineRows.length }} 共 148 条记录</p>
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
    </template>

    <!-- ========== APPLY TAB ========== -->
    <template v-else>
      <!-- Stats Grid (4 cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_8px_24px_rgba(0,87,194,0.04)] border border-outline-variant/5">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">pending_actions</span>
            </div>
            <span class="text-xs text-primary bg-primary/5 px-2 py-1 rounded">实时更新</span>
          </div>
          <p class="text-on-surface-variant text-sm">待处理申请</p>
          <h3 class="text-3xl font-bold mt-1 text-on-surface">12 <span class="text-sm font-normal text-outline">件</span></h3>
        </div>

        <div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_8px_24px_rgba(0,87,194,0.04)] border border-outline-variant/5">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <span class="material-symbols-outlined text-emerald-600">check_circle</span>
            </div>
          </div>
          <p class="text-on-surface-variant text-sm">已通过申请</p>
          <h3 class="text-3xl font-bold mt-1 text-on-surface">148 <span class="text-sm font-normal text-outline">件</span></h3>
        </div>

        <div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_8px_24px_rgba(0,87,194,0.04)] border border-outline-variant/5">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
              <span class="material-symbols-outlined text-error">error_outline</span>
            </div>
          </div>
          <p class="text-on-surface-variant text-sm">驳回需修改</p>
          <h3 class="text-3xl font-bold mt-1 text-on-surface">3 <span class="text-sm font-normal text-outline">件</span></h3>
        </div>

        <div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_8px_24px_rgba(0,87,194,0.04)] border border-outline-variant/5">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <span class="material-symbols-outlined text-secondary">format_list_bulleted</span>
            </div>
          </div>
          <p class="text-on-surface-variant text-sm">总申请数</p>
          <h3 class="text-3xl font-bold mt-1 text-on-surface">163 <span class="text-sm font-normal text-outline">件</span></h3>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="bg-surface-container-low p-6 rounded-xl space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="space-y-2">
            <label class="text-xs font-bold text-on-surface-variant px-1">申请名称</label>
            <input v-model="applyKeyword" class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-2.5 px-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/5 transition-all outline-none" placeholder="输入关键字搜索..." type="text" />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-on-surface-variant px-1">申请状态</label>
            <select v-model="applyStatus" class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-2.5 px-4 text-sm focus:border-primary outline-none">
              <option value="">全部状态</option>
              <option value="审批中">审批中</option>
              <option value="已通过">已通过</option>
              <option value="已驳回">已驳回</option>
              <option value="草稿">草稿</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-on-surface-variant px-1">时间范围</label>
            <input class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-2.5 px-4 text-sm focus:border-primary outline-none" type="date" />
          </div>
          <div class="flex items-end gap-3">
            <button class="bg-primary text-white flex-1 py-2.5 rounded-lg font-bold hover:bg-primary-container transition-colors">查询</button>
            <button @click="applyKeyword = ''; applyStatus = ''" class="bg-surface-container-high text-on-surface-variant px-4 py-2.5 rounded-lg font-bold hover:bg-outline-variant/20 transition-colors">重置</button>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-surface-container-lowest rounded-xl shadow-[0px_8px_24px_rgba(0,87,194,0.04)] overflow-hidden border border-outline-variant/5">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase">申请编号</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase">申请名称</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase">所属项目/资源</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase">申请类型</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase">申请时间</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase">流程状态</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase">处理人</th>
                <th class="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase text-center">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/10">
              <tr v-for="row in filteredApplyRows" :key="row.reqId" class="hover:bg-surface-container-low/30 transition-colors">
                <td class="px-6 py-5 text-sm font-medium text-primary">{{ row.reqId }}</td>
                <td class="px-6 py-5 text-sm font-bold text-on-surface">{{ row.title }}</td>
                <td class="px-6 py-5 text-sm text-on-surface-variant">{{ row.project }}</td>
                <td class="px-6 py-5">
                  <span class="bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-bold px-2 py-0.5 rounded-sm">{{ row.type }}</span>
                </td>
                <td class="px-6 py-5 text-sm text-on-surface-variant">{{ row.time }}</td>
                <td class="px-6 py-5">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full" :class="applyStatusDot(row.status)"></div>
                    <span class="text-sm" :class="applyStatusText(row.status)">{{ row.statusLabel }}</span>
                  </div>
                </td>
                <td class="px-6 py-5 text-sm">{{ row.handler }}</td>
                <td class="px-6 py-5">
                  <div class="flex justify-center gap-4">
                    <button class="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">查看详情</button>
                    <button v-if="row.canRecall" class="text-error font-bold text-sm hover:underline decoration-2 underline-offset-4">撤回</button>
                    <button v-else-if="row.canResubmit" class="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">重新发起</button>
                    <span v-else class="text-outline/30 font-bold text-sm cursor-not-allowed">撤回</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-6 py-5 bg-surface-container-low/30 border-t border-outline-variant/10 flex items-center justify-between">
          <div class="text-sm text-on-surface-variant">
            显示第 <span class="font-bold text-on-surface">1</span> 到 <span class="font-bold text-on-surface">{{ filteredApplyRows.length }}</span> 条，共 <span class="font-bold text-on-surface">163</span> 条记录
          </div>
          <div class="flex items-center gap-1">
            <button class="w-9 h-9 flex items-center justify-center rounded-lg text-outline-variant hover:bg-surface-container-high transition-colors">
              <span class="material-symbols-outlined" style="font-size: 20px">chevron_left</span>
            </button>
            <button class="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
            <button class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant">2</button>
            <button class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant">3</button>
            <span class="px-2 text-outline-variant">...</span>
            <button class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant">17</button>
            <button class="w-9 h-9 flex items-center justify-center rounded-lg text-outline-variant hover:bg-surface-container-high transition-colors">
              <span class="material-symbols-outlined" style="font-size: 20px">chevron_right</span>
            </button>
            <div class="ml-4 flex items-center gap-2">
              <span class="text-sm text-on-surface-variant">跳至</span>
              <input class="w-12 h-9 text-center bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm focus:border-primary outline-none" type="text" value="1" />
              <span class="text-sm text-on-surface-variant">页</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contextual Help / Status Legend -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
        <div class="bg-primary/5 rounded-xl p-4 flex gap-4">
          <span class="material-symbols-outlined text-primary">info</span>
          <div>
            <h4 class="text-sm font-bold text-primary">申请须知</h4>
            <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
              所有权限申请均需经过部门领导初审，如涉及敏感数据访问，还需通过安全委员会会签。申请通过后系统将自动下发权限。
            </p>
          </div>
        </div>
        <div class="bg-secondary/5 rounded-xl p-4 flex gap-4">
          <span class="material-symbols-outlined text-secondary">history</span>
          <div>
            <h4 class="text-sm font-bold text-secondary">最近操作记录</h4>
            <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
              您于 2023-10-24 14:20 发起了一项"数据权限"申请，当前处于"待审批"状态。
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('mine')
const filterStatus = ref('')
const applyKeyword = ref('')
const applyStatus = ref('')

const tabs = [
  { key: 'mine', label: '我的审批' },
  { key: 'apply', label: '我的申请' },
]

// === Mine (我处理) data ===
const mineData = ref([
  { id: 'REQ-20231124-001', title: '关于"智慧交通"标签库的扩展申请', name: '张建设', dept: '大数据局 / 交通科', time: '2023-11-24 10:24', status: '审批中' },
  { id: 'REQ-20231123-014', title: '人口普查底层数据标签同步请求', name: '李晓芳', dept: '民政局 / 社会事务中心', time: '2023-11-23 16:45', status: '通过' },
  { id: 'REQ-20231122-088', title: '公共卫生安全指数标签公开授权', name: '王志强', dept: '卫健委 / 应急办', time: '2023-11-22 09:12', status: '驳回' },
  { id: 'REQ-20231121-022', title: '"数字乡村"地理空间标签批量更新', name: '陈思进', dept: '农业农村局', time: '2023-11-21 14:30', status: '审批中' },
])

const filteredMineRows = computed(() =>
  mineData.value.filter(r => !filterStatus.value || r.status === filterStatus.value)
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

// === Apply (我申请) data ===
const applyData = ref([
  { reqId: 'REQ20231024001', title: '政务人口基础数据库访问权限申请', project: '智慧城市一期项目', type: '数据权限', time: '2023-10-24 14:20', status: 'pending', statusLabel: '部门领导审批中', handler: '张晓峰 (技术部)', canRecall: true, canResubmit: false },
  { reqId: 'REQ20231023015', title: '教育资源主题库标签共享申请', project: '教育厅公共平台', type: '标签共享', time: '2023-10-23 09:12', status: 'approved', statusLabel: '已通过', handler: '系统自动执行', canRecall: false, canResubmit: false },
  { reqId: 'REQ20231022089', title: '数据质量规则审批发布申请', project: '交通流量监控系统', type: '审批发布', time: '2023-10-22 17:45', status: 'rejected', statusLabel: '驳回，待修改', handler: '李志勇 (合规部)', canRecall: false, canResubmit: true },
  { reqId: 'REQ20231020112', title: 'API接口调用权限申请 (外部系统)', project: '第三方协作网关', type: '数据权限', time: '2023-10-20 11:30', status: 'approved', statusLabel: '已通过', handler: '王珊珊 (安全组)', canRecall: false, canResubmit: false },
  { reqId: 'REQ20231019004', title: '历史数据归档存储空间扩容申请', project: '数据湖底座', type: '资源扩容', time: '2023-10-19 10:05', status: 'pending', statusLabel: '财务部会签中', handler: '赵明明 (财务科)', canRecall: true, canResubmit: false },
])

const filteredApplyRows = computed(() =>
  applyData.value.filter(r => {
    const kw = applyKeyword.value
    const matchKw = !kw || r.title.includes(kw) || r.reqId.includes(kw)
    const matchStatus = !applyStatus.value || r.statusLabel.includes(applyStatus.value)
    return matchKw && matchStatus
  })
)

const applyStatusDot = (s) => ({
  'pending': 'bg-amber-500 animate-pulse',
  'approved': 'bg-emerald-500',
  'rejected': 'bg-error',
}[s] || 'bg-slate-400')

const applyStatusText = (s) => ({
  'pending': 'text-amber-700',
  'approved': 'text-emerald-700',
  'rejected': 'text-error',
}[s] || 'text-on-surface')
</script>
