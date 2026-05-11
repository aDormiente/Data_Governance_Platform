<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-end">
      <div>
        <nav class="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <span>标签管理</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span class="text-primary font-medium">标签编辑中心</span>
        </nav>
        <h2 class="text-2xl font-bold tracking-tight text-slate-900">编辑标签 - 企业信用等级</h2>
        <p class="text-on-surface-variant mt-1 text-sm">编辑标签基本属性及管理关联点位</p>
      </div>
      <div class="flex gap-3">
        <button
          @click="cancel"
          class="px-5 py-2 bg-white border border-outline-variant text-on-surface-variant rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-surface-container-low transition-all"
        >
          <span class="material-symbols-outlined" style="font-size: 16px">close</span>
          取消
        </button>
        <button
          @click="save"
          class="px-5 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          <span class="material-symbols-outlined" style="font-size: 16px">check</span>
          确认保存
        </button>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-12 gap-6">

      <!-- LEFT COLUMN -->
      <div class="lg:col-span-8">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">

          <!-- Step Tab Navigation -->
          <div class="flex border-b border-surface-container-low bg-surface-container-low/30 px-6">
            <button
              v-for="tab in steps"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'py-4 px-6 text-sm font-medium transition-colors relative flex items-center gap-2',
                activeTab === tab.key
                  ? 'font-bold text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              ]"
            >
              <span
                :class="[
                  'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0',
                  activeTab === tab.key
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-high text-on-surface-variant'
                ]"
              >{{ tab.key }}</span>
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab 01: 基本信息编辑 -->
          <div v-if="activeTab === '01'" class="p-8">
            <div class="grid grid-cols-2 gap-x-6 gap-y-6">

              <!-- 标签名称 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">
                  标签名称
                  <span class="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-slate-900"
                />
              </div>

              <!-- 创建人 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">创建人</label>
                <input
                  type="text"
                  value="系统管理员 (Admin)"
                  disabled
                  class="bg-surface-container-low/60 border-none rounded-lg px-4 py-2.5 text-sm w-full text-on-surface-variant cursor-not-allowed opacity-70"
                />
              </div>

              <!-- 标签分类 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">标签分类</label>
                <select
                  v-model="form.category"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-slate-900"
                >
                  <option value="信用评估">信用评估</option>
                  <option value="人口数据">人口数据</option>
                  <option value="政务业务">政务业务</option>
                  <option value="环境监测">环境监测</option>
                </select>
              </div>

              <!-- 更新周期 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">
                  更新周期
                  <span class="text-red-500 ml-0.5">*</span>
                </label>
                <select
                  v-model="form.cycle"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-slate-900"
                >
                  <option value="实时同步">实时同步</option>
                  <option value="每天更新">按天</option>
                  <option value="每周更新">按周</option>
                  <option value="每月更新">按月</option>
                </select>
              </div>

              <!-- 创建理由 -->
              <div class="flex flex-col gap-1.5 col-span-2">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">
                  创建理由
                  <span class="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  v-model="form.reason"
                  rows="5"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-slate-900 resize-none leading-relaxed"
                ></textarea>
              </div>

              <!-- 标签描述 -->
              <div class="flex flex-col gap-1.5 col-span-2">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">标签描述</label>
                <textarea
                  v-model="form.desc"
                  rows="3"
                  placeholder="请输入标签描述（选填）..."
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-slate-900 resize-none leading-relaxed placeholder:text-on-surface-variant/50"
                ></textarea>
              </div>

            </div>
          </div>

          <!-- Tab 02: 下属点位管理 -->
          <div v-if="activeTab === '02'" class="p-6">

            <!-- Header Row -->
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary" style="font-size: 18px">pin_drop</span>
                <span class="text-sm font-bold text-slate-900">当前已关联</span>
                <span class="text-primary font-black text-base">42</span>
                <span class="text-sm font-bold text-slate-900">个点位</span>
              </div>
              <div class="flex gap-3">
                <button
                  :class="[
                    'px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 border transition-colors',
                    selectedPoints.length > 0
                      ? 'border-red-200 text-red-600 bg-red-50 hover:bg-red-100'
                      : 'border-outline-variant text-on-surface-variant bg-white hover:bg-surface-container-low'
                  ]"
                >
                  <span class="material-symbols-outlined" style="font-size: 15px">remove_circle_outline</span>
                  批量移除
                  <span v-if="selectedPoints.length > 0" class="ml-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-black">{{ selectedPoints.length }}</span>
                </button>
                <button class="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-90 transition-all">
                  <span class="material-symbols-outlined" style="font-size: 15px">add_location_alt</span>
                  添加点位
                </button>
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto rounded-lg border border-outline-variant/20">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-surface-container-low/60">
                    <th class="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        class="rounded border-outline-variant accent-primary w-4 h-4"
                        :checked="selectedPoints.length === pointData.length"
                        @change="toggleAll"
                      />
                    </th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">点位名称</th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">地理位置</th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">运行状态</th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">更新时间</th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-surface-container-low">
                  <tr
                    v-for="row in pointData"
                    :key="row.id"
                    class="hover:bg-surface-container-low/40 transition-colors group"
                    :class="selectedPoints.includes(row.id) ? 'bg-primary-fixed/30' : ''"
                  >
                    <td class="px-4 py-4">
                      <input
                        type="checkbox"
                        class="rounded border-outline-variant accent-primary w-4 h-4"
                        :value="row.id"
                        v-model="selectedPoints"
                      />
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center shrink-0">
                          <span class="material-symbols-outlined text-on-primary-fixed-variant" style="font-size: 15px">sensors</span>
                        </div>
                        <div>
                          <p class="text-sm font-semibold text-slate-900">{{ row.name }}</p>
                          <p class="text-[10px] text-on-surface-variant font-mono">{{ row.id }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex items-center gap-1.5 text-sm text-on-surface-variant">
                        <span class="material-symbols-outlined" style="font-size: 14px">location_on</span>
                        <span>{{ row.location }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <span
                        :class="[
                          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold',
                          row.status === '正常运行'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        ]"
                      >
                        <span
                          :class="[
                            'w-1.5 h-1.5 rounded-full',
                            row.status === '正常运行' ? 'bg-emerald-500' : 'bg-amber-500'
                          ]"
                        ></span>
                        {{ row.status }}
                      </span>
                    </td>
                    <td class="px-4 py-4 text-sm text-on-surface-variant">{{ row.updated }}</td>
                    <td class="px-4 py-4 text-right">
                      <button class="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 ml-auto">
                        <span class="material-symbols-outlined" style="font-size: 14px">link_off</span>
                        移除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="mt-4 flex items-center justify-between">
              <div class="text-sm text-on-surface-variant">
                显示 <span class="font-bold text-slate-900">1 - 3</span> / 共 <span class="font-bold text-slate-900">42</span> 个点位
              </div>
              <div class="flex gap-2 items-center">
                <button class="p-1.5 border border-outline-variant/30 rounded-lg hover:bg-surface-container-low text-on-surface-variant opacity-50" disabled>
                  <span class="material-symbols-outlined" style="font-size: 15px">chevron_left</span>
                </button>
                <button class="px-3 py-1 bg-primary text-white rounded-lg text-sm font-bold">1</button>
                <button class="px-3 py-1 border border-outline-variant/30 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-low">2</button>
                <button class="px-3 py-1 border border-outline-variant/30 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-low">3</button>
                <span class="text-on-surface-variant text-sm">…</span>
                <button class="px-3 py-1 border border-outline-variant/30 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-low">14</button>
                <button class="p-1.5 border border-outline-variant/30 rounded-lg hover:bg-surface-container-low text-on-surface-variant">
                  <span class="material-symbols-outlined" style="font-size: 15px">chevron_right</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="lg:col-span-4 flex flex-col gap-5">

        <!-- Change Log Card -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">

          <!-- Card Title -->
          <div class="px-6 py-4 border-b border-surface-container-low flex items-center gap-2">
            <span
              class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black bg-surface-container-high text-on-surface-variant shrink-0"
            >03</span>
            <span class="text-sm font-bold text-slate-900">更改日志</span>
          </div>

          <div class="p-5 flex flex-col gap-5">

            <!-- Pending Changes -->
            <div>
              <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3 mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-amber-600" style="font-size: 17px">warning_amber</span>
                <span class="text-xs font-bold text-amber-700">当前未保存的变更</span>
              </div>

              <div class="space-y-3">

                <!-- Change: 更新周期 -->
                <div class="flex flex-col gap-1.5 p-3 bg-surface-container-low/60 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">更新周期</span>
                    <span class="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">已修改</span>
                  </div>
                  <div class="flex items-center gap-2 flex-wrap mt-0.5">
                    <span class="text-sm text-on-surface-variant line-through decoration-red-400">实时同步</span>
                    <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 14px">arrow_forward</span>
                    <span class="text-sm font-semibold text-emerald-700">每周更新</span>
                  </div>
                </div>

                <!-- Change: 创建理由 -->
                <div class="flex flex-col gap-1.5 p-3 bg-surface-container-low/60 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">创建理由</span>
                    <span class="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">已修改</span>
                  </div>
                  <p class="text-xs text-on-surface-variant leading-relaxed mt-0.5 line-clamp-2">内容已更新，保存后生效。</p>
                </div>

              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-surface-container-low"></div>

            <!-- Historical Changes -->
            <div>
              <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-4">历史变更记录</p>
              <div class="relative pl-5">
                <div class="absolute left-1.5 top-1 bottom-1 w-px bg-outline-variant/40"></div>

                <!-- Timeline Item 1 -->
                <div class="relative mb-5">
                  <div class="absolute -left-[14px] top-1 w-2.5 h-2.5 rounded-full bg-primary-fixed border-2 border-primary shrink-0"></div>
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-bold text-primary">昨天 16:20</span>
                      <span class="text-[10px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded font-medium">系统管理员</span>
                    </div>
                    <p class="text-xs text-slate-900 font-medium">关联了 12 个新增点位</p>
                  </div>
                </div>

                <!-- Timeline Item 2 -->
                <div class="relative">
                  <div class="absolute -left-[14px] top-1 w-2.5 h-2.5 rounded-full bg-surface-container-high border-2 border-outline-variant/60 shrink-0"></div>
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-bold text-on-surface-variant">2023-10-24 14:30</span>
                      <span class="text-[10px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded font-medium">系统管理员</span>
                    </div>
                    <p class="text-xs text-slate-900 font-medium">初始化标签</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- Compliance Note -->
        <div class="bg-primary-fixed rounded-xl p-5 flex items-start gap-3" style="border: 1px solid #afc6ff30">
          <div class="w-9 h-9 rounded-lg bg-on-primary-fixed-variant/10 flex items-center justify-center shrink-0 mt-0.5">
            <span class="material-symbols-outlined text-on-primary-fixed-variant" style="font-size: 20px">policy</span>
          </div>
          <div>
            <p class="text-xs font-bold text-on-primary-fixed-variant mb-1">审核说明</p>
            <p class="text-xs text-on-primary-fixed-variant/80 leading-relaxed">本次修改将进入审核队列，审核通过后生效。</p>
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

const steps = [
  { key: '01', label: '基本信息编辑' },
  { key: '02', label: '下属点位管理' },
]

const form = ref({
  name: '企业信用等级',
  category: '信用评估',
  cycle: '每周更新',
  reason: '为实现企业分级分类监管，根据纳税、社保、诉讼等多维度数据，构建企业信用综合评价体系，提升审批效率。',
  desc: '',
})

const selectedPoints = ref([])

const pointData = ref([
  { id: 'P-100249', name: '政务大厅 A1 采集终端', location: '高新区创业大道 188号', status: '正常运行', updated: '2023-10-25 09:12' },
  { id: 'P-100255', name: '智慧社区数据中继点', location: '西湖区曙光路 12号', status: '正常运行', updated: '2023-10-25 09:10' },
  { id: 'P-100281', name: '金融服务中心传感器', location: '滨江区江南大道 300号', status: '维护中', updated: '2023-10-24 18:45' },
])

const toggleAll = (e) => {
  if (e.target.checked) {
    selectedPoints.value = pointData.value.map(p => p.id)
  } else {
    selectedPoints.value = []
  }
}

const save = () => router.push('/tag-management/detail/1')
const cancel = () => router.push('/tag-management/detail/1')
</script>
