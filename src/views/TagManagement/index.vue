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
        <div class="p-5 bg-surface-container-low/30 flex flex-wrap items-end gap-6 border-b border-surface-container-low">
          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">搜索点位</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" style="font-size: 18px">location_on</span>
              <input v-model="pointSearch" class="pl-9 pr-4 py-2 bg-surface-container-lowest border-none rounded-md text-sm w-64 focus:ring-1 focus:ring-primary/30" placeholder="输入点位名称或编号" type="text" />
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">所属标签</label>
            <select v-model="pointTagFilter" class="pl-3 pr-8 py-2 bg-surface-container-lowest border-none rounded-md text-sm w-48 focus:ring-1 focus:ring-primary/30 appearance-none">
              <option value="">全部标签</option>
              <option value="交通流量">交通流量</option>
              <option value="人脸识别">人脸识别</option>
              <option value="环境监测">环境监测</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">运行状态</label>
            <div class="flex gap-1 bg-surface-container-highest p-1 rounded-md">
              <button
                v-for="s in ['全部', '在线', '离线', '故障']"
                :key="s"
                @click="pointStatusFilter = s"
                :class="[
                  'px-3 py-1 text-xs font-medium rounded transition-all',
                  pointStatusFilter === s ? 'bg-surface-container-lowest shadow-sm text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-lowest/60'
                ]"
              >{{ s }}</button>
            </div>
          </div>
          <button @click="pointSearch = ''; pointTagFilter = ''; pointStatusFilter = '全部'" class="px-3 py-2 text-sm text-on-surface-variant hover:text-primary border border-outline-variant/30 rounded-md transition-colors">重置</button>
          <button class="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-md hover:bg-primary-container transition-colors">
            <span class="material-symbols-outlined">filter_list</span>
          </button>
          <div class="ml-auto">
            <button
              @click="router.push('/tag-management/point/new')"
              class="px-5 py-2 bg-gradient-to-b from-primary-container to-primary text-white font-bold rounded-lg shadow-lg shadow-primary/10 hover:shadow-primary/20 active:opacity-90 transition-all text-sm flex items-center gap-2"
            >
              <span class="material-symbols-outlined" style="font-size: 18px">add</span>
              新增点位
            </button>
          </div>
        </div>

        <div class="overflow-x-auto bg-surface-container-lowest">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low">
                <th class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest w-12 text-center">
                  <input type="checkbox" class="rounded border-outline-variant text-primary focus:ring-primary" />
                </th>
                <th class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">点位名称</th>
                <th class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">所属标签</th>
                <th class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">地理位置</th>
                <th class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">状态</th>
                <th class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">更新时间</th>
                <th class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr
                v-for="p in filteredPoints"
                :key="p.id"
                class="group hover:bg-surface-container-low transition-colors cursor-pointer"
                @click="router.push(`/tag-management/point/${p.id}`)"
              >
                <td class="px-6 py-4 text-center" @click.stop>
                  <input type="checkbox" class="rounded border-outline-variant text-primary focus:ring-primary" />
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-primary-fixed rounded flex items-center justify-center text-primary">
                      <span class="material-symbols-outlined" style="font-size: 20px">videocam</span>
                    </div>
                    <div>
                      <div class="text-sm font-bold text-on-surface">{{ p.name }}</div>
                      <div class="text-[10px] text-on-surface-variant font-medium">ID: {{ p.pid }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span class="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold rounded-sm">{{ p.tag }}</span>
                    <span v-if="p.level" class="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-bold rounded-sm">{{ p.level }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-1.5 text-on-surface-variant">
                    <span class="material-symbols-outlined text-primary" style="font-size: 16px">location_on</span>
                    <span class="text-xs">{{ p.coord }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full" :class="pointStatusDot(p.status)"></span>
                    <span class="text-xs font-bold" :class="pointStatusText(p.status)">{{ p.status }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-xs text-on-surface-variant">{{ p.updated }}</td>
                <td class="px-6 py-4 text-right" @click.stop>
                  <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      @click="router.push(`/tag-management/point/edit/${p.id}`)"
                      class="p-1.5 text-primary hover:bg-primary-fixed rounded transition-colors"
                      title="编辑"
                    >
                      <span class="material-symbols-outlined" style="font-size: 18px">edit</span>
                    </button>
                    <button
                      @click="router.push(`/tag-management/point/${p.id}`)"
                      class="p-1.5 text-primary hover:bg-primary-fixed rounded transition-colors"
                      title="查看详情"
                    >
                      <span class="material-symbols-outlined" style="font-size: 18px">visibility</span>
                    </button>
                    <button class="p-1.5 text-primary hover:bg-primary-fixed rounded transition-colors" title="地图定位">
                      <span class="material-symbols-outlined" style="font-size: 18px">map</span>
                    </button>
                    <button class="p-1.5 text-error hover:bg-error-container/30 rounded transition-colors" title="删除">
                      <span class="material-symbols-outlined" style="font-size: 18px">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-6 py-4 flex items-center justify-between border-t border-surface-container-low bg-surface-container-low/30">
          <div class="text-xs text-on-surface-variant font-medium">
            显示第 <span class="text-primary font-bold">1-10</span> 条，共 <span class="text-on-surface font-bold">1,248</span> 条记录
          </div>
          <div class="flex items-center gap-1">
            <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors">
              <span class="material-symbols-outlined" style="font-size: 18px">chevron_left</span>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
            <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high text-xs font-medium text-on-surface-variant">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high text-xs font-medium text-on-surface-variant">3</button>
            <span class="px-1 text-outline">...</span>
            <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high text-xs font-medium text-on-surface-variant">125</button>
            <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors">
              <span class="material-symbols-outlined" style="font-size: 18px">chevron_right</span>
            </button>
            <div class="ml-4 flex items-center gap-2">
              <span class="text-[11px] text-on-surface-variant">跳至</span>
              <input class="w-10 h-7 text-center text-xs bg-surface-container-lowest border border-outline-variant/30 rounded focus:ring-1 focus:ring-primary/30" type="text" value="1" />
              <span class="text-[11px] text-on-surface-variant">页</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Bottom KPI Cards (points tab only) -->
    <div v-if="activeTab === 'points'" class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-surface-container-lowest p-5 rounded-xl border-l-4 border-primary">
        <div class="flex justify-between items-start mb-3">
          <span class="text-[11px] font-bold text-on-surface-variant uppercase">点位总数</span>
          <span class="material-symbols-outlined text-primary/40">location_on</span>
        </div>
        <div class="text-2xl font-bold text-on-surface">1,248</div>
        <div class="mt-1 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
          <span class="material-symbols-outlined" style="font-size: 12px">trending_up</span>
          较昨日 +12
        </div>
      </div>
      <div class="bg-surface-container-lowest p-5 rounded-xl border-l-4 border-emerald-500">
        <div class="flex justify-between items-start mb-3">
          <span class="text-[11px] font-bold text-on-surface-variant uppercase">在线点位</span>
          <span class="material-symbols-outlined text-emerald-500/40">wifi</span>
        </div>
        <div class="text-2xl font-bold text-on-surface">1,182</div>
        <div class="mt-1 text-[10px] text-on-surface-variant font-medium">在线率 94.7%</div>
      </div>
      <div class="bg-surface-container-lowest p-5 rounded-xl border-l-4 border-rose-500">
        <div class="flex justify-between items-start mb-3">
          <span class="text-[11px] font-bold text-on-surface-variant uppercase">异常点位</span>
          <span class="material-symbols-outlined text-rose-500/40">warning</span>
        </div>
        <div class="text-2xl font-bold text-on-surface">24</div>
        <div class="mt-1 text-[10px] text-rose-600 font-bold flex items-center gap-1">需要立即处理</div>
      </div>
      <div class="bg-surface-container-lowest p-5 rounded-xl border-l-4 border-amber-500">
        <div class="flex justify-between items-start mb-3">
          <span class="text-[11px] font-bold text-on-surface-variant uppercase">覆盖区域</span>
          <span class="material-symbols-outlined text-amber-500/40">map</span>
        </div>
        <div class="text-2xl font-bold text-on-surface">16</div>
        <div class="mt-1 text-[10px] text-on-surface-variant font-medium">全区主要街道覆盖</div>
      </div>
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
  { id: 1, pid: 'P-100249', name: '政务大厅 A1 采集终端', tag: '交通流量', level: '一级点位', coord: '116.48, 39.91', status: '在线', updated: '2024-05-20 14:30:05' },
  { id: 2, pid: 'P-100255', name: '市政广场-南门感应器', tag: '人脸识别', level: '', coord: '116.40, 39.90', status: '离线', updated: '2024-05-19 09:12:44' },
  { id: 3, pid: 'P-100281', name: '滨江公园-水质监测点', tag: '环境监测', level: '重点监控', coord: '116.32, 39.85', status: '故障', updated: '2024-05-20 16:55:12' },
  { id: 4, pid: 'P-100312', name: '西直门立交-西北角', tag: '交通流量', level: '', coord: '116.35, 39.94', status: '在线', updated: '2024-05-20 17:10:00' },
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
  '故障': 'bg-rose-500',
}[s] || 'bg-slate-400')

const pointStatusText = (s) => ({
  '在线': 'text-emerald-600',
  '离线': 'text-slate-500',
  '故障': 'text-rose-600',
}[s] || 'text-on-surface-variant')
</script>
