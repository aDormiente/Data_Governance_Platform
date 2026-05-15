<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div>
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span class="cursor-pointer hover:text-primary transition-colors" @click="router.push('/tag-management')">标签管理</span>
        <span class="opacity-40">/</span>
        <span>点位</span>
        <span class="opacity-40">/</span>
        <span class="text-primary">P-100249</span>
      </div>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="font-display text-[30px] font-semibold tracking-tight text-on-surface leading-[1.05]">朝阳区大屯路南口视频感知点</h1>
          <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">视频感知点位详情 · 查看运行状态与关联标签。</p>
        </div>
        <div class="flex gap-2 items-center">
          <button class="text-[12px] px-3 py-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">导出报告</button>
          <button
            @click="router.push(`/tag-management/point/edit/${route.params.id || 1}`)"
            class="text-[12px] px-3 py-2 bg-primary text-on-primary flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span class="material-symbols-outlined" style="font-size: 14px">edit</span>
            编辑点位
          </button>
        </div>
      </div>
    </div>

    <!-- Section 01: 基本信息 -->
    <section class="bg-surface-container-lowest border border-outline-variant p-6 relative overflow-hidden">
      <div class="absolute left-0 top-6 w-1 h-6 bg-primary rounded-r-full"></div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold text-on-surface flex items-center pl-4">
          01 基本信息
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-6">
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-1">点位名称</label>
            <div class="text-base font-bold text-on-surface">朝阳区大屯路南口视频感知点</div>
          </div>
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-1">资源编号</label>
            <div class="text-sm font-mono text-primary bg-primary-fixed/30 px-2 py-1 rounded inline-block w-fit">RES-ZH-2023-08942</div>
          </div>
        </div>
        <div class="space-y-6">
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-1">所属组织</label>
            <div class="text-sm font-semibold text-on-surface">北京市公安局 / 朝阳分局 / 治安支队</div>
          </div>
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-1">经纬度</label>
            <div class="flex items-center text-sm font-bold text-on-surface">
              <span class="material-symbols-outlined text-primary mr-1" style="font-size: 18px">location_on</span>
              116.418, 40.002
            </div>
          </div>
        </div>
        <div class="flex flex-col h-full justify-between">
          <div class="flex flex-col">
            <label class="text-xs font-medium text-on-surface-variant mb-2">能力</label>
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
            <span class="absolute bottom-2 right-2 bg-surface-container-lowest px-2 py-1 rounded text-[10px] font-bold shadow-sm">查看地图</span>
          </div>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- Section 02: 关联标签 -->
      <section class="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 relative h-full">
        <div class="absolute left-0 top-6 w-1 h-6 bg-primary rounded-r-full"></div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold text-on-surface flex items-center pl-4">
            02 关联标签
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
      <section class="bg-surface-container-lowest border border-outline-variant p-6 relative h-full">
        <div class="absolute left-0 top-6 w-1 h-6 bg-primary rounded-r-full"></div>
        <h2 class="text-lg font-bold text-on-surface flex items-center pl-4 mb-6">
          03 工作日志
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
        <div class="text-[10px] font-bold text-on-surface-variant uppercase mb-1">在线率</div>
        <div class="text-xl font-black text-primary">99.8%</div>
      </div>
      <div class="p-4 bg-surface-container rounded-xl">
        <div class="text-[10px] font-bold text-on-surface-variant uppercase mb-1">预警频次</div>
        <div class="text-xl font-black text-tertiary">14 <span class="text-xs font-medium">/ 30天</span></div>
      </div>
      <div class="p-4 bg-surface-container rounded-xl">
        <div class="text-[10px] font-bold text-on-surface-variant uppercase mb-1">维护记录</div>
        <div class="text-xl font-black text-on-surface">3 <span class="text-xs font-medium text-on-surface-variant">次</span></div>
      </div>
      <div class="p-4 bg-surface-container rounded-xl">
        <div class="text-[10px] font-bold text-on-surface-variant uppercase mb-1">关联工单</div>
        <div class="text-xl font-black text-on-surface">0 <span class="text-xs font-medium text-on-surface-variant">活跃</span></div>
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
  { id: 1, name: '高危重点区域', chipClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', taggedBy: '张建国', taggedAt: '2023-11-20 14:30' },
  { id: 2, name: '交通枢纽核心', chipClass: 'bg-primary-fixed text-on-primary-fixed-variant', taggedBy: '李明华', taggedAt: '2023-11-18 09:12' },
  { id: 3, name: '三级常态化监控', chipClass: 'bg-secondary-fixed text-on-secondary-fixed-variant', taggedBy: '系统自动', taggedAt: '2023-10-01 00:00' },
])

const workLogs = ref([
  { id: 1, action: '打标签', operator: '张建国', time: '2023-11-20 14:30:21', dotClass: 'border-primary', note: '基于Q4评估结果打标高危区域标签。' },
  { id: 2, action: '删除标签', operator: '王晓伟', time: '2023-11-19 16:45:00', dotClass: 'border-outline-variant' },
  { id: 3, action: '打标签', operator: '李明华', time: '2023-11-18 09:12:44', dotClass: 'border-primary' },
  { id: 4, action: '点位初始化', operator: '系统管理员', time: '2023-10-01 00:00:00', dotClass: 'border-primary' },
])
</script>
