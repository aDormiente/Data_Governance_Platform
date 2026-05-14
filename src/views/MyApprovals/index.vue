<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span>工作台</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">{{ activeTab === 'mine' ? '我的审批' : '我的申请' }}</span>
        <span class="opacity-40">/</span>
        <span class="opacity-60">待办</span>
      </div>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="font-display text-[34px] font-semibold tracking-tight text-on-surface leading-[1.05]">{{ activeTab === 'mine' ? '我的审批' : '我的申请' }}</h1>
          <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">{{ activeTab === 'mine' ? '查看与处理待我审批的事项，跟踪历史决策记录。' : '管理我发起的申请，跟踪流程进度与最新动态。' }}</p>
        </div>
        <div class="flex items-end gap-3">
          <div class="flex border border-outline-variant">
            <button
              v-for="(tab, i) in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'text-[12px] px-4 py-2 transition-colors',
                i > 0 ? 'border-l border-outline-variant' : '',
                activeTab === tab.key
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              ]"
            >{{ tab.label }}</button>
          </div>
          <button v-if="activeTab === 'apply'" class="text-[12px] px-3 py-2 bg-primary text-on-primary flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <span class="material-symbols-outlined" style="font-size: 14px">add</span>
            发起申请
          </button>
        </div>
      </div>
    </div>

    <!-- ========== MINE TAB ========== -->
    <template v-if="activeTab === 'mine'">
      <!-- Stats strip -->
      <div class="grid grid-cols-12 gap-6 mb-6">
        <div class="col-span-12 md:col-span-8 border border-outline-variant bg-surface-container-lowest p-6 relative">
          <span class="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"></span>
          <p class="font-mono text-[11px] tracking-wider text-on-surface-variant mb-3">当前审批效率分析</p>
          <div class="flex items-end gap-8 flex-wrap">
            <div>
              <p class="font-mono text-[48px] font-semibold text-on-surface tabular-nums tracking-tight leading-none">24</p>
              <p class="font-mono text-[11px] tracking-wider text-on-surface-variant mt-1">待我处理</p>
            </div>
            <div class="pb-1">
              <p class="font-mono text-[22px] font-semibold tabular-nums text-success leading-none">98.2<span class="text-[14px] text-on-surface-variant">%</span></p>
              <p class="font-mono text-[11px] tracking-wider text-on-surface-variant mt-1">通过率</p>
            </div>
            <div class="pb-1">
              <p class="font-mono text-[22px] font-semibold tabular-nums text-primary leading-none">1.2<span class="text-[14px] text-on-surface-variant">h</span></p>
              <p class="font-mono text-[11px] tracking-wider text-on-surface-variant mt-1">平均耗时</p>
            </div>
            <div class="ml-auto">
              <button class="text-[12px] px-3 py-1.5 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5">
                导出统计
                <span class="material-symbols-outlined" style="font-size: 14px">download</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-4 border border-outline-variant bg-primary text-on-primary p-6 flex flex-col justify-between">
          <div>
            <p class="font-mono text-[11px] tracking-wider opacity-80 mb-2">系统公告</p>
            <h3 class="font-display text-[17px] font-semibold leading-tight">V2.4 审批流引擎性能升级已完成</h3>
          </div>
          <div class="flex items-center justify-between font-mono text-[11px] tracking-wider opacity-80">
            <span>2023.11.20 · 14:00</span>
            <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
          </div>
        </div>
      </div>

      <!-- Mine table -->
      <div class="tt-rule mb-3">
        <span>01&nbsp;&nbsp;待审批列表</span>
        <span class="tt-rule-sub">待处理</span>
      </div>
      <div class="border border-outline-variant bg-surface-container-lowest">
        <div class="px-4 py-3 border-b border-outline-variant flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex items-center gap-2 border border-outline-variant px-2.5 py-1.5">
              <span class="font-mono text-[10px] tracking-wider text-on-surface-variant">状态</span>
              <select v-model="filterStatus" class="text-[12px] bg-transparent border-0 text-on-surface focus:outline-none">
                <option value="">全部</option>
                <option value="审批中">审批中</option>
                <option value="通过">通过</option>
                <option value="驳回">驳回</option>
              </select>
            </div>
            <div class="flex items-center gap-2 border border-outline-variant px-2.5 py-1.5">
              <span class="font-mono text-[10px] tracking-wider text-on-surface-variant">时段</span>
              <span class="text-[12px] tracking-wider text-on-surface">近 7 天</span>
              <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 12px">calendar_today</span>
            </div>
          </div>
          <button class="text-on-surface-variant hover:text-primary transition-colors p-1.5" title="刷新">
            <span class="material-symbols-outlined" style="font-size: 16px">refresh</span>
          </button>
        </div>

        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-outline-variant">
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">标题</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">申请人</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">部门</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">提交时间</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">状态</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filteredMineRows" :key="row.id" class="tt-row border-b border-outline-variant/60 cursor-pointer group">
              <td class="px-4 py-3.5">
                <p class="text-[13px] font-semibold text-on-surface">{{ row.title }}</p>
                <p class="font-mono text-[10px] text-on-surface-variant tracking-wider mt-0.5">{{ row.id }}</p>
              </td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 bg-surface-container-high flex items-center justify-center text-[10px] font-semibold text-on-surface">{{ row.name[0] }}</span>
                  <span class="text-[12px] text-on-surface">{{ row.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3.5 text-[12px] text-on-surface-variant">{{ row.dept }}</td>
              <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tabular-nums tracking-wider">{{ row.time.replace(/-/g, '.') }}</td>
              <td class="px-4 py-3.5">
                <span class="status-pill" :class="mineStatusColor(row.status)">{{ row.status }}</span>
              </td>
              <td class="px-4 py-3.5 text-right">
                <button class="text-[12px] text-primary hover:underline tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">查看详情 ›</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="px-4 py-2.5 border-t border-outline-variant flex justify-between items-center font-mono text-[11px] text-on-surface-variant tracking-wider">
          <span>显示 01-{{ String(filteredMineRows.length).padStart(2, '0') }} / 共 148 条</span>
          <div class="flex items-center gap-1">
            <button class="tt-kbd opacity-50">←</button>
            <span class="px-2 text-on-surface">1</span>
            <button class="tt-kbd hover:border-primary hover:text-primary">2</button>
            <button class="tt-kbd hover:border-primary hover:text-primary">3</button>
            <button class="tt-kbd hover:border-primary hover:text-primary">→</button>
          </div>
        </div>
      </div>
    </template>

    <!-- ========== APPLY TAB ========== -->
    <template v-else>
      <!-- KPI strip -->
      <div class="grid grid-cols-2 md:grid-cols-4 border border-outline-variant divide-x divide-outline-variant bg-surface-container-lowest mb-6">
        <div v-for="(k, i) in applyKpis" :key="k.label" class="px-5 py-4 relative">
          <span class="absolute left-0 top-0 bottom-0 w-[3px]" :class="k.bar"></span>
          <div class="flex items-center justify-between mb-2">
            <span class="font-mono text-[11px] tracking-wider text-on-surface-variant">{{ k.label }}</span>
            <span class="material-symbols-outlined opacity-50" :class="k.iconColor" style="font-size: 14px">{{ k.icon }}</span>
          </div>
          <p class="font-mono text-[28px] font-semibold tabular-nums leading-none tracking-tight text-on-surface">{{ k.value }}<span class="text-[12px] text-on-surface-variant ml-1">件</span></p>
        </div>
      </div>

      <!-- Filter -->
      <div class="border border-outline-variant bg-surface-container-lowest p-5 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="font-mono text-[10px] tracking-wider text-on-surface-variant block mb-1">[01]&nbsp;关键词</label>
            <input v-model="applyKeyword" class="w-full bg-surface-container-lowest border border-outline-variant py-2 px-2.5 text-[12px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-colors" placeholder="申请标题或编号..." type="text" />
          </div>
          <div>
            <label class="font-mono text-[10px] tracking-wider text-on-surface-variant block mb-1">[02]&nbsp;状态</label>
            <select v-model="applyStatus" class="w-full bg-surface-container-lowest border border-outline-variant py-2 px-2.5 text-[12px] text-on-surface focus:outline-none focus:border-primary">
              <option value="">全部</option>
              <option value="审批中">审批中</option>
              <option value="已通过">已通过</option>
              <option value="已驳回">已驳回</option>
              <option value="草稿">草稿</option>
            </select>
          </div>
          <div>
            <label class="font-mono text-[10px] tracking-wider text-on-surface-variant block mb-1">[03]&nbsp;时间</label>
            <input class="w-full bg-surface-container-lowest border border-outline-variant py-2 px-2.5 text-[12px] text-on-surface focus:outline-none focus:border-primary" type="date" />
          </div>
          <div class="flex items-end gap-2">
            <button class="flex-1 text-[12px] bg-primary text-on-primary py-2 hover:opacity-90 transition-opacity font-semibold">查询</button>
            <button @click="applyKeyword = ''; applyStatus = ''" class="text-[12px] px-3 py-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">重置</button>
          </div>
        </div>
      </div>

      <!-- Apply Table -->
      <div class="tt-rule mb-3">
        <span>02&nbsp;&nbsp;申请记录</span>
        <span class="tt-rule-sub">我发起的</span>
      </div>
      <div class="border border-outline-variant bg-surface-container-lowest">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-outline-variant">
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">申请编号</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">申请标题</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">所属资源</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">类型</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">提交时间</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">流程状态</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">处理人</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filteredApplyRows" :key="row.reqId" class="tt-row border-b border-outline-variant/60">
              <td class="px-4 py-3.5 font-mono text-[11px] text-primary tracking-wider">{{ row.reqId }}</td>
              <td class="px-4 py-3.5 text-[13px] font-semibold text-on-surface">{{ row.title }}</td>
              <td class="px-4 py-3.5 text-[12px] text-on-surface-variant">{{ row.project }}</td>
              <td class="px-4 py-3.5">
                <span class="tt-tag">{{ row.type }}</span>
              </td>
              <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tabular-nums tracking-wider">{{ row.time.replace(/-/g, '.') }}</td>
              <td class="px-4 py-3.5">
                <span class="status-pill" :class="applyStatusColor(row.status)">{{ row.statusShort }}</span>
                <p class="text-[11px] text-on-surface-variant tracking-wider mt-0.5">{{ row.statusLabel }}</p>
              </td>
              <td class="px-4 py-3.5 text-[12px] text-on-surface">{{ row.handler }}</td>
              <td class="px-4 py-3.5 text-right">
                <div class="flex justify-end gap-3 text-[12px] tracking-wider">
                  <button class="text-primary hover:underline">详情</button>
                  <button v-if="row.canRecall" class="text-danger hover:underline">撤回</button>
                  <button v-else-if="row.canResubmit" class="text-primary hover:underline">重新发起</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="px-4 py-2.5 border-t border-outline-variant flex justify-between items-center font-mono text-[11px] text-on-surface-variant tracking-wider">
          <span>显示 01-{{ String(filteredApplyRows.length).padStart(2, '0') }} / 共 163 条</span>
          <div class="flex items-center gap-1">
            <button class="tt-kbd opacity-50">←</button>
            <span class="px-2 text-on-surface">1</span>
            <button class="tt-kbd hover:border-primary hover:text-primary">2</button>
            <button class="tt-kbd hover:border-primary hover:text-primary">3</button>
            <span class="text-on-surface-variant px-1">…</span>
            <button class="tt-kbd hover:border-primary hover:text-primary">17</button>
            <button class="tt-kbd hover:border-primary hover:text-primary">→</button>
            <div class="ml-3 flex items-center gap-1.5">
              <span>跳至</span>
              <input class="w-10 h-6 text-center bg-surface-container-lowest border border-outline-variant text-on-surface font-mono text-[11px] focus:outline-none focus:border-primary" type="text" value="1" />
            </div>
          </div>
        </div>
      </div>

      <!-- Helper boxes -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border border-outline-variant bg-surface-container-lowest p-4 flex gap-3 relative">
          <span class="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"></span>
          <span class="material-symbols-outlined text-primary flex-shrink-0" style="font-size: 18px">info</span>
          <div>
            <p class="font-mono text-[11px] tracking-wider text-primary mb-1">申请须知</p>
            <p class="text-[12px] text-on-surface-variant leading-relaxed">所有权限申请均需经过部门领导初审，如涉及敏感数据访问，还需通过安全委员会会签。申请通过后系统将自动下发权限。</p>
          </div>
        </div>
        <div class="border border-outline-variant bg-surface-container-lowest p-4 flex gap-3 relative">
          <span class="absolute left-0 top-0 bottom-0 w-[3px] bg-warning"></span>
          <span class="material-symbols-outlined text-warning flex-shrink-0" style="font-size: 18px">history</span>
          <div>
            <p class="font-mono text-[11px] tracking-wider text-warning mb-1">最近操作</p>
            <p class="text-[12px] text-on-surface-variant leading-relaxed">您于 <span class="font-mono">2023.10.24 · 14:20</span> 发起"数据权限"申请，当前 <span class="font-mono font-semibold text-on-surface">审批中</span>。</p>
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

const mineData = ref([
  { id: 'REQ-20231124-001', title: '关于"智慧交通"标签库的扩展申请', name: '张建设', dept: '大数据局 / 交通科', time: '2023-11-24 10:24', status: '审批中' },
  { id: 'REQ-20231123-014', title: '人口普查底层数据标签同步请求', name: '李晓芳', dept: '民政局 / 社会事务中心', time: '2023-11-23 16:45', status: '通过' },
  { id: 'REQ-20231122-088', title: '公共卫生安全指数标签公开授权', name: '王志强', dept: '卫健委 / 应急办', time: '2023-11-22 09:12', status: '驳回' },
  { id: 'REQ-20231121-022', title: '"数字乡村"地理空间标签批量更新', name: '陈思进', dept: '农业农村局', time: '2023-11-21 14:30', status: '审批中' },
])

const filteredMineRows = computed(() =>
  mineData.value.filter(r => !filterStatus.value || r.status === filterStatus.value)
)

const mineStatusColor = (s) => ({
  '审批中': 'text-primary',
  '通过': 'text-success',
  '驳回': 'text-danger',
}[s] || 'text-on-surface-variant')

const applyData = ref([
  { reqId: 'REQ20231024001', title: '政务人口基础数据库访问权限申请', project: '智慧城市一期项目', type: '数据权限', time: '2023-10-24 14:20', status: 'pending',  statusShort: '审批中',     statusLabel: '部门领导审批中', handler: '张晓峰 · 技术部', canRecall: true,  canResubmit: false },
  { reqId: 'REQ20231023015', title: '教育资源主题库标签共享申请',         project: '教育厅公共平台',   type: '标签共享', time: '2023-10-23 09:12', status: 'approved', statusShort: '已通过',     statusLabel: '已通过',           handler: '系统自动执行',     canRecall: false, canResubmit: false },
  { reqId: 'REQ20231022089', title: '数据质量规则审批发布申请',             project: '交通流量监控系统', type: '发布审批', time: '2023-10-22 17:45', status: 'rejected', statusShort: '已驳回',     statusLabel: '驳回，待修改',     handler: '李志勇 · 合规部',   canRecall: false, canResubmit: true  },
  { reqId: 'REQ20231020112', title: 'API 接口调用权限申请（外部系统）',    project: '第三方协作网关',   type: '数据权限', time: '2023-10-20 11:30', status: 'approved', statusShort: '已通过',     statusLabel: '已通过',           handler: '王珊珊 · 安全组',   canRecall: false, canResubmit: false },
  { reqId: 'REQ20231019004', title: '历史数据归档存储空间扩容申请',         project: '数据湖底座',       type: '资源扩容', time: '2023-10-19 10:05', status: 'pending',  statusShort: '审批中',     statusLabel: '财务部会签中',     handler: '赵明明 · 财务科',   canRecall: true,  canResubmit: false },
])

const filteredApplyRows = computed(() =>
  applyData.value.filter(r => {
    const kw = applyKeyword.value
    const matchKw = !kw || r.title.includes(kw) || r.reqId.includes(kw)
    const matchStatus = !applyStatus.value || r.statusLabel.includes(applyStatus.value)
    return matchKw && matchStatus
  })
)

const applyStatusColor = (s) => ({
  'pending':  'text-warning',
  'approved': 'text-success',
  'rejected': 'text-danger',
}[s] || 'text-on-surface-variant')

const applyKpis = [
  { label: '待处理', value: '12',  icon: 'pending_actions',     iconColor: 'text-warning', bar: 'bg-warning' },
  { label: '已通过', value: '148', icon: 'check_circle',         iconColor: 'text-success', bar: 'bg-success' },
  { label: '驳回需改', value: '3', icon: 'error_outline',        iconColor: 'text-danger',  bar: 'bg-danger' },
  { label: '总申请', value: '163', icon: 'format_list_bulleted', iconColor: 'text-on-surface-variant', bar: 'bg-primary' },
]
</script>
