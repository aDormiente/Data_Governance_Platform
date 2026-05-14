<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span>数据</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">标签管理</span>
        <span class="opacity-40">/</span>
        <span class="opacity-60">{{ activeTab === 'tags' ? '编目' : '点位' }}</span>
      </div>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="font-display text-[34px] font-semibold tracking-tight text-on-surface leading-[1.05]">标签资源体系管理</h1>
          <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">对全域政务数据标签进行生命周期管理及点位映射维护。所有变更将进入审计流程。</p>
        </div>
        <div class="flex gap-2 items-center">
          <button class="text-[12px] px-3 py-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5">
            <span class="material-symbols-outlined" style="font-size: 14px">download</span>
            导出
          </button>
          <button
            @click="router.push('/tag-management/create')"
            class="text-[12px] px-3 py-2 bg-primary text-on-primary flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span class="material-symbols-outlined" style="font-size: 14px">add</span>
            新建标签
          </button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-outline-variant mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'px-5 py-3 text-[13px] border-b-2 transition-colors -mb-px',
          activeTab === tab.key
            ? 'border-primary text-primary font-semibold'
            : 'border-transparent text-on-surface-variant hover:text-on-surface'
        ]"
      ><span class="font-mono text-[10px] text-on-surface-variant/70 mr-1.5">{{ tab.code }}</span>{{ tab.label }}</button>
      <div class="flex-1 border-b-2 border-transparent"></div>
      <div class="flex items-center font-mono text-[10px] text-on-surface-variant tracking-wider pr-1">
        <span class="tt-kbd mr-1">Tab</span>
        <span>切换</span>
      </div>
    </div>

    <!-- ===== TAG LIST TAB ===== -->
    <template v-if="activeTab === 'tags'">
      <div class="border border-outline-variant bg-surface-container-lowest">
        <!-- Filter strip -->
        <div class="border-b border-outline-variant px-4 py-3 flex flex-wrap items-end justify-between gap-4">
          <div class="flex flex-wrap items-end gap-3">
            <div class="flex flex-col gap-1">
              <label class="font-mono text-[10px] tracking-wider text-on-surface-variant">[01]&nbsp;状态</label>
              <select v-model="filterStatus" class="text-[12px] bg-surface-container-lowest border border-outline-variant text-on-surface px-2.5 py-1.5 w-36 focus:outline-none focus:border-primary">
                <option value="">全部状态</option>
                <option value="已发布">已发布</option>
                <option value="草稿">草稿</option>
                <option value="已禁用">已禁用</option>
                <option value="待审核">待审核</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="font-mono text-[10px] tracking-wider text-on-surface-variant">[02]&nbsp;类型</label>
              <select v-model="filterType" class="text-[12px] bg-surface-container-lowest border border-outline-variant text-on-surface px-2.5 py-1.5 w-36 focus:outline-none focus:border-primary">
                <option value="">全部类型</option>
                <option value="基础标签">基础标签</option>
                <option value="算法标签">算法标签</option>
                <option value="业务标签">业务标签</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 border border-outline-variant px-2.5 py-1.5 w-72 focus-within:border-primary transition-colors">
            <span class="font-mono text-[11px] text-primary">&gt;</span>
            <input v-model="searchText" class="bg-transparent border-0 text-[12px] w-full text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0" placeholder="搜索标签名称或描述..." type="text" />
            <kbd class="tt-kbd">/</kbd>
          </div>
        </div>

        <!-- Table -->
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-outline-variant">
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">编号</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">标签名称</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">类型</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">描述</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right">关联点位</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">创建</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">状态</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in filteredData"
              :key="row.id"
              class="tt-row border-b border-outline-variant/60 cursor-pointer"
              @click="router.push(`/tag-management/detail/${row.id}`)"
            >
              <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tracking-wider">T-{{ String(100200 + row.id).padStart(6, '0') }}</td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2.5">
                  <span class="w-1.5 h-1.5 flex-shrink-0" :class="row.type === '业务标签' ? 'bg-tertiary' : row.type === '算法标签' ? 'bg-primary-container' : 'bg-primary'"></span>
                  <span class="text-[13px] font-semibold text-on-surface">{{ row.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3.5">
                <span class="tt-tag" :class="typeTagClass(row.type)">{{ row.type }}</span>
              </td>
              <td class="px-4 py-3.5 text-[12px] text-on-surface-variant max-w-xs truncate">{{ row.desc }}</td>
              <td class="px-4 py-3.5 text-right font-mono text-[12px] font-semibold tabular-nums text-on-surface">{{ row.count }}</td>
              <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tracking-wider">{{ row.created.replace(/-/g, '.').slice(0, 10) }}</td>
              <td class="px-4 py-3.5">
                <span class="status-pill" :class="statusColor(row.status)">{{ row.status }}</span>
              </td>
              <td class="px-4 py-3.5 text-right" @click.stop>
                <div class="flex justify-end gap-3 text-[12px] tracking-wider">
                  <button @click="router.push(`/tag-management/detail/${row.id}`)" class="text-primary hover:underline">详情</button>
                  <button @click="router.push(`/tag-management/edit/${row.id}`)" class="text-on-surface-variant hover:text-primary">编辑</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="px-4 py-2.5 border-t border-outline-variant flex items-center justify-between font-mono text-[11px] text-on-surface-variant tracking-wider">
          <span>显示 01-{{ String(filteredData.length).padStart(2, '0') }} / 共 24 条</span>
          <div class="flex items-center gap-1">
            <button class="tt-kbd opacity-50 cursor-not-allowed" disabled>←</button>
            <span class="px-2 text-on-surface">1</span>
            <button class="tt-kbd hover:border-primary hover:text-primary">2</button>
            <button class="tt-kbd hover:border-primary hover:text-primary">3</button>
            <button class="tt-kbd hover:border-primary hover:text-primary">→</button>
          </div>
        </div>
      </div>
    </template>

    <!-- ===== POINT LIST TAB ===== -->
    <template v-if="activeTab === 'points'">
      <div class="border border-outline-variant bg-surface-container-lowest">
        <!-- Filter strip -->
        <div class="border-b border-outline-variant px-4 py-3 flex flex-wrap items-end gap-3">
          <div class="flex flex-col gap-1">
            <label class="font-mono text-[10px] tracking-wider text-on-surface-variant">[01]&nbsp;点位编号</label>
            <div class="flex items-center gap-2 border border-outline-variant px-2.5 py-1.5 w-56 focus-within:border-primary transition-colors">
              <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 14px">location_on</span>
              <input v-model="pointSearch" class="bg-transparent border-0 text-[12px] w-full text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0" placeholder="名称或编号 P-xxxxxx" type="text" />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="font-mono text-[10px] tracking-wider text-on-surface-variant">[02]&nbsp;所属标签</label>
            <select v-model="pointTagFilter" class="text-[12px] bg-surface-container-lowest border border-outline-variant text-on-surface px-2.5 py-1.5 w-44 focus:outline-none focus:border-primary">
              <option value="">全部标签</option>
              <option value="交通流量">交通流量</option>
              <option value="人脸识别">人脸识别</option>
              <option value="环境监测">环境监测</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="font-mono text-[10px] tracking-wider text-on-surface-variant">[03]&nbsp;运行状态</label>
            <div class="flex border border-outline-variant">
              <button
                v-for="s in pointStates"
                :key="s"
                @click="pointStatusFilter = s"
                :class="[
                  'px-3 py-1.5 text-[12px] transition-colors border-r border-outline-variant last:border-r-0',
                  pointStatusFilter === s
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                ]"
              >{{ s }}</button>
            </div>
          </div>
          <button @click="pointSearch = ''; pointTagFilter = ''; pointStatusFilter = '全部'" class="text-[12px] text-on-surface-variant hover:text-primary px-3 py-1.5 border border-outline-variant hover:border-primary transition-colors">重置</button>
          <div class="ml-auto self-end">
            <button
              @click="router.push('/tag-management/point/new')"
              class="text-[12px] px-3 py-2 bg-primary text-on-primary flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <span class="material-symbols-outlined" style="font-size: 14px">add</span>
              新增点位
            </button>
          </div>
        </div>

        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-outline-variant">
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold w-10 text-center">
                <input type="checkbox" class="accent-primary" />
              </th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">编号</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">点位名称</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">所属标签</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">坐标</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">状态</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">更新时间</th>
              <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in filteredPoints"
              :key="p.id"
              class="tt-row group border-b border-outline-variant/60 cursor-pointer"
              @click="router.push(`/tag-management/point/${p.id}`)"
            >
              <td class="px-4 py-3.5 text-center" @click.stop>
                <input type="checkbox" class="accent-primary" />
              </td>
              <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tracking-wider">{{ p.pid }}</td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2.5">
                  <span class="material-symbols-outlined text-primary" style="font-size: 16px">videocam</span>
                  <span class="text-[13px] font-semibold text-on-surface">{{ p.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3.5">
                <div class="flex flex-wrap gap-1">
                  <span class="tt-tag tt-tag-primary">{{ p.tag }}</span>
                  <span v-if="p.level" class="tt-tag">{{ p.level }}</span>
                </div>
              </td>
              <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tabular-nums tracking-wider">{{ p.coord }}</td>
              <td class="px-4 py-3.5">
                <span class="status-pill" :class="pointStatusColor(p.status)">{{ p.status }}</span>
              </td>
              <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tabular-nums tracking-wider">{{ p.updated.replace(/-/g, '.').slice(0, 16) }}</td>
              <td class="px-4 py-3.5 text-right" @click.stop>
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="router.push(`/tag-management/point/edit/${p.id}`)" class="text-on-surface-variant hover:text-primary" title="编辑">
                    <span class="material-symbols-outlined" style="font-size: 16px">edit</span>
                  </button>
                  <button @click="router.push(`/tag-management/point/${p.id}`)" class="text-on-surface-variant hover:text-primary" title="查看详情">
                    <span class="material-symbols-outlined" style="font-size: 16px">visibility</span>
                  </button>
                  <button class="text-on-surface-variant hover:text-primary" title="地图定位">
                    <span class="material-symbols-outlined" style="font-size: 16px">map</span>
                  </button>
                  <button class="text-on-surface-variant hover:text-danger" title="删除">
                    <span class="material-symbols-outlined" style="font-size: 16px">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="px-4 py-2.5 border-t border-outline-variant flex items-center justify-between font-mono text-[11px] text-on-surface-variant tracking-wider">
          <span>显示 01-10 / 共 1,248 条</span>
          <div class="flex items-center gap-1">
            <button class="tt-kbd hover:border-primary hover:text-primary">←</button>
            <span class="px-2 text-on-surface">1</span>
            <button class="tt-kbd hover:border-primary hover:text-primary">2</button>
            <button class="tt-kbd hover:border-primary hover:text-primary">3</button>
            <span class="text-on-surface-variant px-1">…</span>
            <button class="tt-kbd hover:border-primary hover:text-primary">125</button>
            <button class="tt-kbd hover:border-primary hover:text-primary">→</button>
            <div class="ml-3 flex items-center gap-1.5">
              <span>跳至</span>
              <input class="w-10 h-6 text-center bg-surface-container-lowest border border-outline-variant text-on-surface font-mono text-[11px] focus:outline-none focus:border-primary" type="text" value="1" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Bottom KPI strip (points tab only) -->
    <div v-if="activeTab === 'points'" class="mt-6 grid grid-cols-2 md:grid-cols-4 border border-outline-variant divide-x divide-outline-variant bg-surface-container-lowest">
      <div v-for="(kpi, i) in pointKpis" :key="kpi.code" class="px-5 py-4 relative">
        <span v-if="i === 0" class="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"></span>
        <span v-if="i === 1" class="absolute left-0 top-0 bottom-0 w-[3px] bg-success"></span>
        <span v-if="i === 2" class="absolute left-0 top-0 bottom-0 w-[3px] bg-danger"></span>
        <span v-if="i === 3" class="absolute left-0 top-0 bottom-0 w-[3px] bg-warning"></span>
        <p class="font-mono text-[11px] tracking-wider text-on-surface-variant mb-2">{{ kpi.label }}</p>
        <p class="font-mono text-[28px] font-semibold text-on-surface tabular-nums leading-none tracking-tight">{{ kpi.value }}</p>
        <p class="mt-2.5 text-[11px] tracking-wider" :class="kpi.deltaColor">{{ kpi.delta }}</p>
      </div>
    </div>

    <!-- Bottom Insights (tags tab only) -->
    <div v-if="activeTab === 'tags'" class="mt-6 grid grid-cols-12 gap-6">
      <div class="col-span-12 lg:col-span-8">
        <div class="tt-rule mb-3">
          <span>04&nbsp;&nbsp;采集趋势</span>
          <span class="tt-rule-sub">近 7 天</span>
        </div>
        <div class="border border-outline-variant bg-surface-container-lowest p-5">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 text-[11px] tracking-wider text-on-surface-variant">
              <span class="w-2 h-2 bg-primary"></span>
              <span>每日入库记录数</span>
            </div>
            <div class="flex border border-outline-variant">
              <button class="text-[11px] tracking-wider px-2.5 py-1 bg-primary text-on-primary">近 7 天</button>
              <button class="text-[11px] tracking-wider px-2.5 py-1 border-l border-outline-variant text-on-surface-variant hover:text-on-surface transition-colors">近 30 天</button>
              <button class="text-[11px] tracking-wider px-2.5 py-1 border-l border-outline-variant text-on-surface-variant hover:text-on-surface transition-colors">近 90 天</button>
            </div>
          </div>
          <div class="h-44 w-full bg-surface-container-low/30 relative overflow-hidden flex items-end px-4 gap-2 border-l border-b border-outline-variant">
            <div v-for="(h, i) in barData" :key="i"
              class="flex-1 transition-all relative group"
              :class="i === 5 ? 'bg-primary' : 'bg-primary/40'"
              :style="{ height: h.h + '%' }"
            >
              <span class="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-on-surface-variant opacity-0 group-hover:opacity-100 tabular-nums">{{ h.v }}</span>
            </div>
          </div>
          <div class="flex justify-between mt-2 px-4 font-mono text-[10px] text-on-surface-variant tracking-wider">
            <span v-for="d in dayLabels" :key="d">{{ d }}</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div>
          <div class="tt-rule mb-3">
            <span>05&nbsp;&nbsp;覆盖率</span>
            <span class="tt-rule-sub">政务核心</span>
          </div>
          <div class="border border-outline-variant bg-surface-container-lowest p-5">
            <p class="text-[11px] tracking-wider text-on-surface-variant mb-2">政务核心数据覆盖</p>
            <p class="font-mono text-[36px] font-semibold text-on-surface tabular-nums leading-none tracking-tight">94.2<span class="text-[16px] text-on-surface-variant">%</span></p>
            <div class="mt-4 tt-bar">
              <div class="tt-bar-fill" style="width: 94%"></div>
            </div>
            <p class="mt-3 text-[11px] tracking-wider">
              <span class="tt-delta-up font-mono">▲ 2.4%</span>&nbsp;&nbsp;<span class="text-on-surface-variant">较上月</span>
            </p>
            <p class="mt-3 text-[12px] text-on-surface leading-relaxed border-t border-outline-variant pt-3">
              当前共有 <span class="font-mono font-semibold">1,284</span> 个活跃标签，服务于
              <span class="font-mono font-semibold">42</span> 个政府部门。
            </p>
          </div>
        </div>

        <div>
          <div class="tt-rule mb-3">
            <span>06&nbsp;&nbsp;待办提醒</span>
            <span class="tt-rule-sub">告警</span>
          </div>
          <div class="border border-outline-variant bg-surface-container-lowest">
            <div class="p-4 border-b border-outline-variant flex items-start gap-3 hover:bg-surface-container-low cursor-pointer transition-colors">
              <span class="material-symbols-outlined text-danger flex-shrink-0" style="font-size: 18px">notification_important</span>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-semibold text-on-surface">5 个点位更新失败</p>
                <p class="text-[11px] text-on-surface-variant mt-1 tracking-wider">来源 · 自然资源局基础地理库</p>
              </div>
              <span class="tt-tag tt-tag-danger">紧急</span>
            </div>
            <div class="p-4 flex items-start gap-3 hover:bg-surface-container-low cursor-pointer transition-colors">
              <span class="material-symbols-outlined text-success flex-shrink-0" style="font-size: 18px">check_circle</span>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-semibold text-on-surface">标签审核通过</p>
                <p class="text-[11px] text-on-surface-variant mt-1 tracking-wider">智慧环保 · 噪声监测</p>
              </div>
              <span class="tt-tag tt-tag-success">通过</span>
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
  { key: 'tags',   code: '01', label: '标签列表' },
  { key: 'points', code: '02', label: '点位列表' },
]

const pointStates = ['全部', '在线', '离线', '故障']

const tableData = ref([
  { id: 1, name: '企业信用等级', type: '算法标签', desc: '基于工商、税务及诉讼数据综合评定', count: '12', created: '2023-10-24 14:30', status: '已发布' },
  { id: 2, name: '人口年龄分布', type: '基础标签', desc: '各行政区域常住人口年龄层统计数据', count: '85', created: '2023-11-02 09:15', status: '已发布' },
  { id: 3, name: '医保异地结算', type: '业务标签', desc: '异地医疗保险结算行为分析标签', count: '0', created: '2023-11-15 16:45', status: '待审核' },
  { id: 4, name: '能耗监测(工业)', type: '基础标签', desc: '主要工业园区用电、用气实时监测', count: '244', created: '2023-11-20 10:00', status: '已发布' },
])

const pointData = ref([
  { id: 1, pid: 'P-100249', name: '政务大厅 A1 采集终端', tag: '交通流量', level: '一级', coord: '116.480, 39.910', status: '在线', updated: '2024-05-20 14:30:05' },
  { id: 2, pid: 'P-100255', name: '市政广场-南门感应器', tag: '人脸识别', level: '',     coord: '116.400, 39.900', status: '离线', updated: '2024-05-19 09:12:44' },
  { id: 3, pid: 'P-100281', name: '滨江公园-水质监测点', tag: '环境监测', level: '重点', coord: '116.320, 39.850', status: '故障', updated: '2024-05-20 16:55:12' },
  { id: 4, pid: 'P-100312', name: '西直门立交-西北角',   tag: '交通流量', level: '',     coord: '116.350, 39.940', status: '在线', updated: '2024-05-20 17:10:00' },
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
    const matchSearch = !pointSearch.value || p.name.includes(pointSearch.value) || p.pid.toLowerCase().includes(pointSearch.value.toLowerCase())
    const matchTag = !pointTagFilter.value || p.tag === pointTagFilter.value
    const matchStatus = pointStatusFilter.value === '全部' || p.status === pointStatusFilter.value
    return matchSearch && matchTag && matchStatus
  })
)

const typeTagClass = (type) => ({
  '算法标签': 'tt-tag-primary',
  '基础标签': '',
  '业务标签': 'tt-tag-warning',
}[type] || '')

const statusColor = (status) => ({
  '已发布': 'text-success',
  '待审核': 'text-warning',
  '草稿': 'text-on-surface-variant',
  '已禁用': 'text-on-surface-variant',
}[status] || 'text-on-surface-variant')

const pointStatusColor = (s) => ({
  '在线': 'text-success',
  '离线': 'text-on-surface-variant',
  '故障': 'text-danger',
}[s] || 'text-on-surface-variant')

const pointKpis = [
  { code: 'TOTAL',  label: '点位总数', value: '1,248', delta: '▲ +12 较昨日',  deltaColor: 'tt-delta-up' },
  { code: 'ONLINE', label: '在线点位', value: '1,182', delta: '在线率 · 94.7%', deltaColor: 'text-success' },
  { code: 'ALERT',  label: '异常点位', value: '24',    delta: '▲ 需立即处理',   deltaColor: 'tt-delta-down' },
  { code: 'AREA',   label: '覆盖区域', value: '16',    delta: '主要街道覆盖',   deltaColor: 'text-on-surface-variant' },
]

const barData = [
  { h: 30, v: '1.2k' },
  { h: 45, v: '1.8k' },
  { h: 65, v: '2.6k' },
  { h: 55, v: '2.2k' },
  { h: 85, v: '3.4k' },
  { h: 95, v: '3.8k' },
  { h: 75, v: '3.0k' },
]
const dayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
</script>
