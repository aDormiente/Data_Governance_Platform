<template>
  <div>
    <div class="mb-8 flex justify-between items-end">
      <div>
        <nav class="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
          <span>标签管理</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span>融合检索</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span class="text-primary font-medium">点位详情</span>
        </nav>
        <div class="flex items-center gap-4 mb-2">
          <div class="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl shrink-0">
            <span class="material-symbols-outlined" style="font-size: 24px">videocam</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">点位：ZX-00829-北京西路</h2>
            <p class="text-on-surface-variant text-sm mt-0.5">ZX-00829 智能监控球机 · CAM-BJ-2023-00829</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 mt-3">
          <span
            v-for="tag in tags"
            :key="tag"
            class="inline-flex items-center bg-secondary-container text-on-secondary-container rounded-full px-3 py-0.5 text-xs font-medium"
          >{{ tag }}</span>
        </div>
      </div>
      <div class="flex gap-3 items-center shrink-0">
        <button class="px-4 py-2 bg-surface-container-high text-primary rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all">
          <span class="material-symbols-outlined" style="font-size: 16px">print</span>
          打印报告
        </button>
        <button class="px-5 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
          <span class="material-symbols-outlined" style="font-size: 16px">edit</span>
          编辑点位信息
        </button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 shrink-0">
          <span class="material-symbols-outlined text-emerald-500" style="font-size: 20px">favorite</span>
        </div>
        <div>
          <div class="text-sm font-bold text-slate-800 leading-tight">运行正常</div>
          <div class="text-xs text-on-surface-variant mt-0.5">设备状态</div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-fixed shrink-0">
          <span class="material-symbols-outlined text-primary" style="font-size: 20px">wifi</span>
        </div>
        <div>
          <div class="text-sm font-bold text-slate-800 leading-tight">2023-11-24 14:15</div>
          <div class="text-xs text-on-surface-variant mt-0.5">最后心跳</div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 shrink-0">
          <span class="material-symbols-outlined text-amber-500" style="font-size: 20px">warning</span>
        </div>
        <div>
          <div class="text-sm font-bold text-slate-800 leading-tight">12 · 高优: 4</div>
          <div class="text-xs text-on-surface-variant mt-0.5">待处理故障</div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-fixed shrink-0">
          <span class="material-symbols-outlined text-primary" style="font-size: 20px">pie_chart</span>
        </div>
        <div>
          <div class="text-sm font-bold text-slate-800 leading-tight">94.2%</div>
          <div class="text-xs text-on-surface-variant mt-0.5">在线率</div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <div class="bg-white rounded-xl overflow-hidden" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <div class="flex items-center gap-2 px-6 pt-5 pb-4 border-b border-surface-container-low bg-surface-container-low/20">
            <button
              v-for="tab in tabList"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-bold transition-all',
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:text-primary'
              ]"
            >{{ tab.label }}</button>
          </div>

          <div class="p-6">
            <div v-if="activeTab === '01'">
              <div class="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <div class="text-xs text-on-surface-variant mb-1 font-medium">设备编号</div>
                  <div class="text-sm font-mono text-slate-800 font-semibold">CAM-BJ-2023-00829</div>
                </div>
                <div>
                  <div class="text-xs text-on-surface-variant mb-1 font-medium">所属部门</div>
                  <div class="text-sm text-slate-800">城市管理指挥中心 / 交通管控组</div>
                </div>
                <div class="col-span-2">
                  <div class="text-xs text-on-surface-variant mb-1 font-medium">安装位置</div>
                  <div class="text-sm text-slate-800">北京市朝阳区北京西路128号十字路口</div>
                </div>
                <div>
                  <div class="text-xs text-on-surface-variant mb-1 font-medium">设备状态</div>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    运行正常
                  </span>
                </div>
                <div>
                  <div class="text-xs text-on-surface-variant mb-1 font-medium">安装日期</div>
                  <div class="text-sm text-slate-800">2023-05-14 10:22:15</div>
                </div>
                <div>
                  <div class="text-xs text-on-surface-variant mb-1 font-medium">运维厂商</div>
                  <div class="text-sm text-slate-800">中兴通讯政务服务部</div>
                </div>
                <div>
                  <div class="text-xs text-on-surface-variant mb-1 font-medium">地理坐标</div>
                  <div class="text-sm text-slate-800 font-mono">经度: 116.4074 &nbsp;|&nbsp; 纬度: 39.9042</div>
                </div>
              </div>

              <div class="my-6 border-t border-surface-container-low"></div>

              <div>
                <div class="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary" style="font-size: 16px">memory</span>
                  算力支撑
                </div>
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between items-center mb-1 text-xs">
                      <span class="text-on-surface-variant font-medium">带宽占用</span>
                      <span class="font-bold text-primary">78%</span>
                    </div>
                    <div class="h-2 rounded-full bg-surface-container-low overflow-hidden">
                      <div class="h-full rounded-full bg-primary transition-all" style="width: 78%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1 text-xs">
                      <span class="text-on-surface-variant font-medium">存储余量</span>
                      <span class="font-bold text-tertiary">1.2 TB / 4 TB</span>
                    </div>
                    <div class="h-2 rounded-full bg-surface-container-low overflow-hidden">
                      <div class="h-full rounded-full bg-tertiary transition-all" style="width: 30%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === '02'">
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <input
                  v-model="tagSearch"
                  type="text"
                  placeholder="输入名称搜索..."
                  class="flex-1 min-w-0 bg-surface-container-low rounded-lg px-4 py-2 text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/50"
                />
                <select
                  v-model="tagFilter"
                  class="bg-surface-container-low border-none rounded-lg text-sm px-4 py-2 w-36 focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface-variant"
                >
                  <option value="">全部标签</option>
                  <option value="交通流量">交通流量</option>
                  <option value="人脸识别">人脸识别</option>
                  <option value="环境监测">环境监测</option>
                </select>
                <button
                  @click="tagSearch = ''; tagFilter = ''; statusFilter = '全部'"
                  class="px-4 py-2 text-sm text-on-surface-variant bg-surface-container-low rounded-lg hover:bg-surface-container-high transition-all font-medium"
                >重置</button>
                <button class="px-4 py-2 text-sm text-white bg-primary rounded-lg hover:opacity-90 transition-all font-medium shadow-sm shadow-primary/20">查询</button>
              </div>

              <div class="flex items-center gap-2 mb-5">
                <button
                  v-for="f in statusFilters"
                  :key="f"
                  @click="statusFilter = f"
                  :class="[
                    'px-4 py-1.5 rounded-full text-xs font-semibold transition-all',
                    statusFilter === f
                      ? 'bg-primary text-white shadow-sm shadow-primary/20'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                  ]"
                >{{ f }}</button>
              </div>

              <div class="overflow-x-auto rounded-xl border border-surface-container-low">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="bg-surface-container-low/60 text-on-surface-variant text-xs font-bold uppercase tracking-wide">
                      <th class="text-left px-4 py-3 font-semibold">点位名称</th>
                      <th class="text-left px-4 py-3 font-semibold">所属标签</th>
                      <th class="text-left px-4 py-3 font-semibold">地理位置</th>
                      <th class="text-left px-4 py-3 font-semibold">状态</th>
                      <th class="text-left px-4 py-3 font-semibold">更新时间</th>
                      <th class="text-left px-4 py-3 font-semibold">操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-surface-container-low">
                    <tr
                      v-for="row in tableData"
                      :key="row.id"
                      class="hover:bg-surface-container-low/30 transition-colors"
                    >
                      <td class="px-4 py-3 font-medium text-slate-800">{{ row.name }}</td>
                      <td class="px-4 py-3">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-medium">{{ row.tag }}</span>
                      </td>
                      <td class="px-4 py-3 font-mono text-xs text-on-surface-variant">{{ row.coord }}</td>
                      <td class="px-4 py-3">
                        <span :class="['inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold', statusClass(row.status)]">
                          <span :class="['w-1.5 h-1.5 rounded-full', statusDotClass(row.status)]"></span>
                          {{ row.status }}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-xs text-on-surface-variant font-mono">{{ row.updated }}</td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-2">
                          <button class="text-xs text-primary hover:underline font-medium">查看详情</button>
                          <span class="text-outline-variant">|</span>
                          <button class="text-xs text-primary hover:underline font-medium">关联标签</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-6">
                <div class="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-primary" style="font-size: 14px">label</span>
                  常用标签库 <span class="text-on-surface-variant font-normal">(快速添加)</span>
                </div>
                <div class="flex flex-wrap gap-2 mb-5">
                  <button
                    v-for="qt in quickTags"
                    :key="qt"
                    class="inline-flex items-center gap-1 bg-surface-container-low hover:bg-primary-fixed text-on-surface-variant hover:text-on-primary-fixed-variant cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all"
                  >
                    <span class="material-symbols-outlined" style="font-size: 12px">add</span>
                    {{ qt }}
                  </button>
                </div>
                <button class="w-full py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                  <span class="material-symbols-outlined" style="font-size: 16px">add_circle</span>
                  添加标签
                </button>
              </div>
            </div>

            <div v-if="activeTab === '03'">
              <div class="relative ml-3 border-l-2 border-surface-container-low pl-6 space-y-8">
                <div class="relative">
                  <span class="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white shadow-sm"></span>
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-mono">今天 09:45</span>
                  </div>
                  <div class="text-sm font-bold text-slate-800 mb-1">设备例行巡检完成</div>
                  <div class="text-xs text-on-surface-variant leading-relaxed mb-2">对摄像头云台进行了清理和角度校准，各项参数指标正常，信号强度稳定。</div>
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-medium">
                    <span class="material-symbols-outlined" style="font-size: 10px">person</span>
                    操作人：张伟 (运维组)
                  </span>
                </div>

                <div class="relative">
                  <span class="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-mono">昨天 02:00</span>
                  </div>
                  <div class="text-sm font-bold text-slate-800 mb-1">固件版本自动升级</div>
                  <div class="text-xs text-on-surface-variant leading-relaxed">系统自动推送 V2.4.1 补丁，主要修复了弱光环境下边缘模糊的识别问题。</div>
                </div>

                <div class="relative">
                  <span class="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-sm"></span>
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-mono">2023-10-24 15:30</span>
                  </div>
                  <div class="text-sm font-bold text-slate-800 mb-1">标签变动记录</div>
                  <div class="text-xs text-on-surface-variant leading-relaxed">
                    添加了标签
                    <span class="inline-flex items-center mx-0.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-medium">高流量区域</span>
                    和
                    <span class="inline-flex items-center mx-0.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-medium">重点监控</span>。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-5">
        <div class="bg-white rounded-xl p-6" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <div class="flex items-start justify-between mb-1">
            <div>
              <div class="text-3xl font-black text-primary tracking-tight leading-none">94.2%</div>
              <div class="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
                <span class="material-symbols-outlined" style="font-size: 12px">arrow_upward</span>
                2.1% 环比上月
              </div>
            </div>
            <div class="text-xs text-on-surface-variant font-medium text-right">
              <div class="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-0.5">在线率分析</div>
              近7日趋势
            </div>
          </div>

          <div class="flex items-end gap-1.5 mt-5 mb-3 h-16">
            <div
              v-for="(bar, i) in onlineRateBars"
              :key="i"
              :style="{ height: bar.pct + '%' }"
              :class="[
                'flex-1 rounded-t-sm transition-all',
                i >= 4 ? 'bg-primary' : 'bg-primary-fixed'
              ]"
              :title="bar.label"
            ></div>
          </div>
          <div class="flex justify-between text-[10px] text-on-surface-variant/70 mb-4">
            <span v-for="(bar, i) in onlineRateBars" :key="i">{{ bar.day }}</span>
          </div>

          <div class="pt-3 border-t border-surface-container-low">
            <span class="text-xs text-on-surface-variant flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary" style="font-size: 13px">category</span>
              已覆盖 42 个行业分类
            </span>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6" style="box-shadow: 0 4px 20px rgba(0,21,41,0.05)">
          <div class="flex items-center justify-between mb-4">
            <div class="text-sm font-bold text-slate-800">标签覆盖率</div>
            <span class="text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-medium">Coverage</span>
          </div>

          <div class="text-2xl font-black text-tertiary tracking-tight leading-none mb-2">88.5%</div>
          <div class="h-2 rounded-full bg-surface-container-low overflow-hidden mb-5">
            <div class="h-full rounded-full bg-tertiary transition-all" style="width: 88.5%"></div>
          </div>

          <div class="space-y-4">
            <div v-for="item in coverageItems" :key="item.label">
              <div class="flex justify-between items-center mb-1 text-xs">
                <span class="text-on-surface-variant font-medium">{{ item.label }}</span>
                <span class="font-bold text-slate-700">{{ item.pct }}%</span>
              </div>
              <div class="h-1.5 rounded-full bg-surface-container-low overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  :class="item.color"
                  :style="{ width: item.pct + '%' }"
                ></div>
              </div>
            </div>
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
const statusFilter = ref('全部')
const searchText = ref('')
const tagSearch = ref('')
const tagFilter = ref('')

const tabList = [
  { key: '01', label: '01 基本信息' },
  { key: '02', label: '02 关联标签' },
  { key: '03', label: '03 工作日志' },
]

const tags = ['交通枢纽', '全天候监控', '重点单位周边', '人流密集区', '4K极清', '朝阳区核心地段']
const quickTags = ['违停抓拍', '东城区政务区', '积水监测', 'AI识别', '商业街区', '夜间照明差']
const statusFilters = ['全部', '在线', '离线', '故障']

const tableData = ref([
  { id: 1, name: '朝阳路-01号摄像头', tag: '交通流量', coord: '116.48, 39.91', status: '在线', updated: '2024-05-20 14:30:05' },
  { id: 2, name: '市政广场-南门感应器', tag: '人脸识别', coord: '116.40, 39.90', status: '离线', updated: '2024-05-19 09:12:44' },
  { id: 3, name: '滨江公园-水质监测点', tag: '环境监测', coord: '116.32, 39.85', status: '故障', updated: '2024-05-20 16:55:12' },
  { id: 4, name: '西直门立交-西北角', tag: '交通流量', coord: '116.35, 39.94', status: '在线', updated: '2024-05-20 17:10:00' },
])

const statusClass = (s) => ({
  '在线': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  '离线': 'bg-slate-100 text-slate-500 border-slate-200',
  '故障': 'bg-red-50 text-red-600 border-red-100',
}[s] || '')

const statusDotClass = (s) => ({
  '在线': 'bg-emerald-500',
  '离线': 'bg-slate-400',
  '故障': 'bg-red-500',
}[s] || '')

const onlineRateBars = [
  { day: '5/4', pct: 88, label: '88%' },
  { day: '5/5', pct: 91, label: '91%' },
  { day: '5/6', pct: 85, label: '85%' },
  { day: '5/7', pct: 94, label: '94%' },
  { day: '5/8', pct: 92, label: '92%' },
  { day: '5/9', pct: 96, label: '96%' },
  { day: '5/10', pct: 94, label: '94%' },
]

const coverageItems = [
  { label: '交通类标签', pct: 95, color: 'bg-primary' },
  { label: '安防类标签', pct: 88, color: 'bg-tertiary' },
  { label: '环境类标签', pct: 72, color: 'bg-amber-400' },
]
</script>
