<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span class="cursor-pointer hover:text-primary transition-colors">标签管理</span>
        <span class="opacity-40">/</span>
        <span>点位</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">编辑</span>
      </div>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="font-display text-[30px] font-semibold tracking-tight text-on-surface leading-[1.05]">编辑点位 · {{ form.name }}</h1>
          <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">编辑点位基本信息及调整关联标签。</p>
        </div>
        <div class="flex gap-2 items-center">
          <button
            @click="cancel"
            class="text-[12px] px-3 py-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined" style="font-size: 14px">close</span>
            取消
          </button>
          <button
            @click="save"
            class="text-[12px] px-3 py-2 bg-primary text-on-primary flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span class="material-symbols-outlined" style="font-size: 14px">check</span>
            保存
          </button>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-12 gap-6">

      <!-- LEFT COLUMN -->
      <div class="lg:col-span-8">
        <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden bento-shadow">

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
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                ]"
              >{{ tab.key }}</span>
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab 01: 基本信息编辑 -->
          <div v-if="activeTab === '01'" class="p-8">
            <div class="grid grid-cols-2 gap-x-6 gap-y-6">

              <!-- 点位名称 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">
                  点位名称
                  <span class="text-danger ml-0.5">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-on-surface"
                />
              </div>

              <!-- 点位编号 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">点位编号</label>
                <input
                  type="text"
                  :value="form.pid"
                  disabled
                  class="bg-surface-container-low/60 border-none rounded-lg px-4 py-2.5 text-sm w-full text-on-surface-variant cursor-not-allowed opacity-70 font-mono"
                />
              </div>

              <!-- 经度 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">
                  经度
                  <span class="text-danger ml-0.5">*</span>
                </label>
                <input
                  v-model="form.lng"
                  type="text"
                  placeholder="例: 116.4074"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-on-surface font-mono"
                />
              </div>

              <!-- 纬度 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">
                  纬度
                  <span class="text-danger ml-0.5">*</span>
                </label>
                <input
                  v-model="form.lat"
                  type="text"
                  placeholder="例: 39.9042"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-on-surface font-mono"
                />
              </div>

              <!-- 安装位置 -->
              <div class="flex flex-col gap-1.5 col-span-2">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">
                  安装位置
                  <span class="text-danger ml-0.5">*</span>
                </label>
                <input
                  v-model="form.location"
                  type="text"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-on-surface"
                />
              </div>

              <!-- 设备状态 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">
                  设备状态
                  <span class="text-danger ml-0.5">*</span>
                </label>
                <select
                  v-model="form.status"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-on-surface"
                >
                  <option value="在线">在线</option>
                  <option value="离线">离线</option>
                  <option value="故障">故障</option>
                  <option value="维护中">维护中</option>
                </select>
              </div>

              <!-- 所属部门 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">所属部门</label>
                <select
                  v-model="form.department"
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-on-surface"
                >
                  <option value="城市管理指挥中心">城市管理指挥中心</option>
                  <option value="公安交管支队">公安交管支队</option>
                  <option value="环保监测中心">环保监测中心</option>
                  <option value="政务服务管理局">政务服务管理局</option>
                </select>
              </div>

              <!-- 点位描述 -->
              <div class="flex flex-col gap-1.5 col-span-2">
                <label class="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold px-1">点位描述</label>
                <textarea
                  v-model="form.desc"
                  rows="3"
                  placeholder="请输入点位描述（选填）..."
                  class="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-on-surface resize-none leading-relaxed placeholder:text-on-surface-variant/50"
                ></textarea>
              </div>

            </div>
          </div>

          <!-- Tab 02: 关联标签管理 -->
          <div v-if="activeTab === '02'" class="p-6">

            <!-- Header Row -->
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary" style="font-size: 18px">label</span>
                <span class="text-sm font-bold text-on-surface">当前已关联</span>
                <span class="text-primary font-black text-base">{{ linkedTags.length }}</span>
                <span class="text-sm font-bold text-on-surface">个标签</span>
              </div>
              <div class="flex gap-3">
                <button
                  :class="[
                    'px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 border transition-colors',
                    selectedTagIds.length > 0
                      ? 'border-danger/30 text-danger bg-danger-container hover:bg-danger-container'
                      : 'border-outline-variant text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container-low'
                  ]"
                >
                  <span class="material-symbols-outlined" style="font-size: 15px">remove_circle_outline</span>
                  批量移除
                  <span v-if="selectedTagIds.length > 0" class="ml-1 text-xs bg-danger text-on-primary rounded-full w-4 h-4 flex items-center justify-center font-black">{{ selectedTagIds.length }}</span>
                </button>
                <button class="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-90 transition-all">
                  <span class="material-symbols-outlined" style="font-size: 15px">add</span>
                  添加标签
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
                        :checked="selectedTagIds.length === linkedTags.length && linkedTags.length > 0"
                        @change="toggleAll"
                      />
                    </th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">标签名称</th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">所属分类</th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">关联时间</th>
                    <th class="px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-surface-container-low">
                  <tr
                    v-for="row in linkedTags"
                    :key="row.id"
                    class="hover:bg-surface-container-low/40 transition-colors group"
                    :class="selectedTagIds.includes(row.id) ? 'bg-primary-fixed/30' : ''"
                  >
                    <td class="px-4 py-4">
                      <input
                        type="checkbox"
                        class="rounded border-outline-variant accent-primary w-4 h-4"
                        :value="row.id"
                        v-model="selectedTagIds"
                      />
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center shrink-0">
                          <span class="material-symbols-outlined text-on-primary-fixed-variant" style="font-size: 15px">sell</span>
                        </div>
                        <span class="text-sm font-semibold text-on-surface">{{ row.name }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-medium">{{ row.category }}</span>
                    </td>
                    <td class="px-4 py-4 text-sm text-on-surface-variant font-mono">{{ row.linkedAt }}</td>
                    <td class="px-4 py-4 text-right">
                      <button class="opacity-0 group-hover:opacity-100 transition-opacity text-danger hover:text-on-danger-container text-xs font-medium flex items-center gap-1 ml-auto">
                        <span class="material-symbols-outlined" style="font-size: 14px">link_off</span>
                        移除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="lg:col-span-4 flex flex-col gap-5">

        <!-- Change Log Card -->
        <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden bento-shadow">

          <div class="px-6 py-4 border-b border-surface-container-low flex items-center gap-2">
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black bg-surface-container-high text-on-surface-variant shrink-0">03</span>
            <span class="text-sm font-bold text-on-surface">更改日志</span>
          </div>

          <div class="p-5 flex flex-col gap-5">

            <div>
              <div class="bg-warning-container border-l-4 border-warning rounded-r-lg px-4 py-3 mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-on-warning-container" style="font-size: 17px">warning_amber</span>
                <span class="text-xs font-bold text-on-warning-container">当前未保存的变更</span>
              </div>

              <div class="space-y-3">
                <div class="flex flex-col gap-1.5 p-3 bg-surface-container-low/60 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">设备状态</span>
                    <span class="text-[10px] font-bold text-on-warning-container bg-warning-container px-2 py-0.5 rounded">已修改</span>
                  </div>
                  <div class="flex items-center gap-2 flex-wrap mt-0.5">
                    <span class="text-sm text-on-surface-variant line-through decoration-danger">在线</span>
                    <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 14px">arrow_forward</span>
                    <span class="text-sm font-semibold text-on-success-container">{{ form.status }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-surface-container-low"></div>

            <div>
              <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-4">历史变更记录</p>
              <div class="relative pl-5">
                <div class="absolute left-1.5 top-1 bottom-1 w-px bg-outline-variant/40"></div>

                <div class="relative mb-5">
                  <div class="absolute -left-[14px] top-1 w-2.5 h-2.5 rounded-full bg-primary-fixed border-2 border-primary shrink-0"></div>
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-bold text-primary">昨天 16:20</span>
                      <span class="text-[10px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded font-medium">系统管理员</span>
                    </div>
                    <p class="text-xs text-on-surface font-medium">关联了 2 个新标签</p>
                  </div>
                </div>

                <div class="relative">
                  <div class="absolute -left-[14px] top-1 w-2.5 h-2.5 rounded-full bg-surface-container-high border-2 border-outline-variant/60 shrink-0"></div>
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-bold text-on-surface-variant">2023-05-14 10:22</span>
                      <span class="text-[10px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded font-medium">系统管理员</span>
                    </div>
                    <p class="text-xs text-on-surface font-medium">初始化点位</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- Compliance Note -->
        <div class="bg-primary-fixed rounded-xl p-5 flex items-start gap-3 border border-primary-fixed-dim/20">
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
  { key: '02', label: '关联标签管理' },
]

const form = ref({
  name: 'ZX-00829-北京西路',
  pid: `P-${route.params.id || '100249'}`,
  lng: '116.4074',
  lat: '39.9042',
  location: '北京市朝阳区北京西路128号十字路口',
  status: '在线',
  department: '城市管理指挥中心',
  desc: '',
})

const selectedTagIds = ref([])

const linkedTags = ref([
  { id: 1, name: '交通流量', category: '交通监测', linkedAt: '2023-05-14 10:22' },
  { id: 2, name: '高流量区域', category: '交通监测', linkedAt: '2023-10-24 15:30' },
  { id: 3, name: '重点监控', category: '安防监测', linkedAt: '2023-10-24 15:30' },
])

const toggleAll = (e) => {
  selectedTagIds.value = e.target.checked ? linkedTags.value.map(t => t.id) : []
}

const save = () => router.push(`/tag-management/point/${route.params.id || '1'}`)
const cancel = () => router.push(`/tag-management/point/${route.params.id || '1'}`)
</script>
