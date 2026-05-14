<template>
  <div class="space-y-8">
    <!-- Page Header & Breadcrumbs -->
    <div class="flex items-end justify-between">
      <div>
        <nav class="flex items-center text-xs text-on-surface-variant mb-2 space-x-2">
          <span>数据中心</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span>点位管理</span>
          <span class="material-symbols-outlined" style="font-size: 12px">chevron_right</span>
          <span class="text-primary font-medium">点位详情</span>
        </nav>
        <h1 class="text-2xl font-extrabold text-on-surface tracking-tight">
          点位详情
          <span class="ml-2 text-sm font-normal text-on-surface-variant tracking-normal">Point Specification Details</span>
        </h1>
      </div>
      <div class="flex space-x-3">
        <button class="px-4 py-2 bg-surface-container-high text-primary rounded-lg text-sm font-semibold hover:brightness-95 transition-all">
          导出报告
        </button>
        <button
          @click="router.push(`/tag-management/point/edit/${route.params.id || 1}`)"
          class="px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          <span class="material-symbols-outlined" style="font-size: 16px">edit</span>
          编辑点位信息
        </button>
      </div>
    </div>

    <!-- Section 01: 基本信息 -->
    <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm relative overflow-hidden">
      <div class="absolute left-0 top-6 w-1 h-6 bg-primary rounded-r-full"></div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold text-on-surface flex items-center pl-4">
          01 基本信息
          <span class="ml-2 text-[10px] text-on-surface-variant font-medium bg-secondary-container px-2 py-0.5 rounded-full uppercase">Basic Info</span>
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-6">
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-1">点位名称 (Display Name)</label>
            <div class="text-base font-bold text-on-surface">朝阳区大屯路南口视频感知点</div>
          </div>
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-1">资源编号 (Resource ID)</label>
            <div class="text-sm font-mono text-primary bg-primary-fixed/30 px-2 py-1 rounded inline-block w-fit">RES-ZH-2023-08942</div>
          </div>
        </div>
        <div class="space-y-6">
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-1">所属组织 (Organization)</label>
            <div class="text-sm font-semibold text-on-surface">北京市公安局 / 朝阳分局 / 治安支队</div>
          </div>
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-1">经纬度 (Coordinates)</label>
            <div class="flex items-center text-sm font-bold text-on-surface">
              <span class="material-symbols-outlined text-primary mr-1" style="font-size: 18px">location_on</span>
              116.418, 40.002
            </div>
          </div>
        </div>
        <div class="flex flex-col h-full justify-between">
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-2">能力 (Capabilities)</label>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="cap in capabilities"
                :key="cap"
                class="px-3 py-1 bg-surface-container-low text-primary text-xs font-bold rounded-full"
              >{{ cap }}</span>
            </div>
          </div>
          <div class="mt-4 h-24 w-full rounded-xl overflow-hidden border border-outline-variant/20 relative group bg-surface-container-low flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 group-hover:opacity-0 transition-opacity"></div>
            <span class="material-symbols-outlined text-primary/30" style="font-size: 56px">map</span>
            <span class="absolute bottom-2 right-2 bg-surface-container-lowest px-2 py-1 rounded text-[10px] font-bold shadow-sm">View Map</span>
          </div>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- Section 02: 关联标签 -->
      <section class="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-sm relative h-full">
        <div class="absolute left-0 top-6 w-1 h-6 bg-primary rounded-r-full"></div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold text-on-surface flex items-center pl-4">
            02 关联标签
            <span class="ml-2 text-[10px] text-on-surface-variant font-medium bg-secondary-container px-2 py-0.5 rounded-full uppercase">Associated Tags</span>
          </h2>
          <button class="text-xs font-bold text-primary flex items-center hover:underline">
            <span class="material-symbols-outlined mr-1" style="font-size: 16px">add_circle</span>
            增加标签
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th class="px-4 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider rounded-l-lg">序号</th>
                <th class="px-4 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">标签名称</th>
                <th class="px-4 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">打标人</th>
                <th class="px-4 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-right">打标时间</th>
                <th class="px-4 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-right rounded-r-lg">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/10">
              <tr v-for="(tag, i) in associatedTags" :key="tag.id" class="hover:bg-surface-container-low transition-colors group">
                <td class="px-4 py-4 text-sm font-medium text-on-surface-variant">{{ String(i + 1).padStart(2, '0') }}</td>
                <td class="px-4 py-4">
                  <span class="px-2 py-0.5 text-[11px] font-bold rounded" :class="tag.chipClass">{{ tag.name }}</span>
                </td>
                <td class="px-4 py-4 text-sm text-on-surface">{{ tag.taggedBy }}</td>
                <td class="px-4 py-4 text-sm text-on-surface-variant text-right font-mono">{{ tag.taggedAt }}</td>
                <td class="px-4 py-4 text-right">
                  <button class="text-error hover:text-error-container text-xs font-bold transition-colors">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 03: 工作日志 -->
      <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm relative h-full">
        <div class="absolute left-0 top-6 w-1 h-6 bg-primary rounded-r-full"></div>
        <h2 class="text-lg font-bold text-on-surface flex items-center pl-4 mb-6">
          03 工作日志
          <span class="ml-2 text-[10px] text-on-surface-variant font-medium bg-secondary-container px-2 py-0.5 rounded-full uppercase">Work Log</span>
        </h2>
        <div class="relative pl-6 border-l border-outline-variant/30 space-y-8">
          <div v-for="log in workLogs" :key="log.id" class="relative">
            <div
              class="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-surface-container-lowest"
              :class="log.dotClass"
            ></div>
            <div class="text-xs font-bold text-on-surface mb-1">{{ log.action }}</div>
            <div class="text-sm font-medium text-on-surface">{{ log.operator }}</div>
            <div class="text-[10px] font-mono text-on-surface-variant mt-1">{{ log.time }}</div>
            <div v-if="log.note" class="mt-2 text-[11px] p-2 bg-surface-container-low rounded italic text-on-secondary-container">
              "{{ log.note }}"
            </div>
          </div>
        </div>
        <div class="mt-8 pt-4 border-t border-outline-variant/20 flex justify-center">
          <button class="text-[10px] font-extrabold text-on-primary-fixed-variant tracking-widest uppercase hover:brightness-75 transition-all">
            查看完整日志
          </button>
        </div>
      </section>
    </div>

    <!-- Auxiliary Data Overview (Bento Style) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="p-4 bg-surface-container rounded-xl">
        <div class="text-[10px] font-bold text-on-surface-variant uppercase mb-1">在线率 (Uptime)</div>
        <div class="text-xl font-black text-primary">99.8%</div>
      </div>
      <div class="p-4 bg-surface-container rounded-xl">
        <div class="text-[10px] font-bold text-on-surface-variant uppercase mb-1">预警频次 (Alerts)</div>
        <div class="text-xl font-black text-tertiary">14 <span class="text-xs font-medium">/ 30d</span></div>
      </div>
      <div class="p-4 bg-surface-container rounded-xl">
        <div class="text-[10px] font-bold text-on-surface-variant uppercase mb-1">维护记录 (Maintenance)</div>
        <div class="text-xl font-black text-on-surface">3 <span class="text-xs font-medium text-on-surface-variant">Times</span></div>
      </div>
      <div class="p-4 bg-surface-container rounded-xl">
        <div class="text-[10px] font-bold text-on-surface-variant uppercase mb-1">关联工单 (Work Orders)</div>
        <div class="text-xl font-black text-on-surface">0 <span class="text-xs font-medium text-on-surface-variant">Active</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const capabilities = ['4K视频流', '人脸识别', '车辆结构化', '热力感知']

const associatedTags = ref([
  { id: 1, name: '高危重点区域', chipClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', taggedBy: '张建国 (Zhang J.)', taggedAt: '2023-11-20 14:30' },
  { id: 2, name: '交通枢纽核心', chipClass: 'bg-primary-fixed text-on-primary-fixed-variant', taggedBy: '李明华 (Li M.)', taggedAt: '2023-11-18 09:12' },
  { id: 3, name: '三级常态化监控', chipClass: 'bg-secondary-fixed text-on-secondary-fixed-variant', taggedBy: '系统自动 (System)', taggedAt: '2023-10-01 00:00' },
])

const workLogs = ref([
  { id: 1, action: '打标签 (Tag Applied)', operator: '张建国 (Zhang J.)', time: '2023-11-20 14:30:21', dotClass: 'border-primary', note: 'Added high-risk area tag based on Q4 assessment.' },
  { id: 2, action: '删除标签 (Tag Removed)', operator: '王晓伟 (Wang X.)', time: '2023-11-19 16:45:00', dotClass: 'border-outline-variant' },
  { id: 3, action: '打标签 (Tag Applied)', operator: '李明华 (Li M.)', time: '2023-11-18 09:12:44', dotClass: 'border-primary' },
  { id: 4, action: '点位初始化 (Point Init)', operator: '系统管理员 (SuperAdmin)', time: '2023-10-01 00:00:00', dotClass: 'border-primary' },
])
</script>
