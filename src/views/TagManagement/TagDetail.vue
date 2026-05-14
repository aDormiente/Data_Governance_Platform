<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span class="cursor-pointer hover:text-primary transition-colors" @click="router.push('/tag-management')">标签管理</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">详情</span>
        <span class="opacity-40">/</span>
        <span class="text-primary">T-100312</span>
      </div>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="font-display text-[30px] font-semibold tracking-tight text-on-surface leading-[1.05]">企业信用等级</h1>
          <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">企业信用评价维度的标签定义与关联点位。整合工商、税务、司法多维数据。</p>
        </div>
        <div class="flex gap-2 items-center">
          <button class="text-[12px] px-3 py-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">导出数据</button>
          <button
            @click="router.push(`/tag-management/edit/${route.params.id || 1}`)"
            class="text-[12px] px-3 py-2 bg-primary text-on-primary flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span class="material-symbols-outlined" style="font-size: 14px">edit</span>
            编辑标签
          </button>
        </div>
      </div>
    </div>

    <!-- Bento Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!-- 01 基本信息 (Full Width) -->
      <section class="col-span-12 bg-surface-container-lowest border border-outline-variant border-l-4 border-primary">
        <div class="px-6 py-4 border-b border-surface-container-low flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 20px">info</span>
            <h3 class="font-bold text-on-surface">01 基本信息</h3>
          </div>
          <span class="text-xs px-2 py-1 bg-secondary-container text-on-secondary-container rounded font-medium">正式发布</span>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-1">
            <label class="text-xs text-on-surface-variant font-medium uppercase tracking-wider">标签名称</label>
            <p class="text-on-surface font-semibold">企业信用等级</p>
          </div>
          <div class="space-y-1">
            <label class="text-xs text-on-surface-variant font-medium uppercase tracking-wider">创建时间</label>
            <p class="text-on-surface">2023-10-24 14:30</p>
          </div>
          <div class="space-y-1">
            <label class="text-xs text-on-surface-variant font-medium uppercase tracking-wider">创建人</label>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-full bg-primary-fixed flex items-center justify-center text-[10px] text-primary font-bold">管</div>
              <p class="text-on-surface">系统管理员</p>
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-xs text-on-surface-variant font-medium uppercase tracking-wider">更新周期</label>
            <p class="text-on-surface">实时同步</p>
          </div>
          <div class="col-span-full space-y-1 bg-surface-container-low p-4 rounded-lg">
            <label class="text-xs text-on-surface-variant font-medium uppercase tracking-wider">创建理由</label>
            <p class="text-sm text-on-surface leading-relaxed">用于评估全域企业信用风险，整合工商、税务、司法等多维数据进行综合评分，为政务扶持政策精准推送及风险预警提供数据支撑。</p>
          </div>
        </div>
      </section>

      <!-- 02 下属点位 (8 cols) -->
      <section class="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant">
        <div class="px-6 py-4 border-b border-surface-container-low flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 20px">hub</span>
            <h3 class="font-bold text-on-surface">02 下属点位</h3>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-1 hover:bg-surface-container-low rounded transition-colors">
              <span class="material-symbols-outlined text-outline" style="font-size: 18px">refresh</span>
            </button>
            <span class="text-xs text-on-surface-variant">共 42 个关联点位</span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-surface-container-low/40 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                <th class="px-6 py-3">点位名称</th>
                <th class="px-6 py-3">地理位置</th>
                <th class="px-6 py-3">运行状态</th>
                <th class="px-6 py-3">更新时间</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr
                v-for="p in pointData"
                :key="p.id"
                class="hover:bg-surface-container-low/30 transition-colors group cursor-pointer"
                @click="router.push(`/tag-management/point/${p.pid}`)"
              >
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-on-surface">{{ p.name }}</span>
                    <span class="text-[11px] text-outline">ID: {{ p.id }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-on-surface-variant">{{ p.location }}</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium" :class="p.statusBg">
                    <span class="w-1.5 h-1.5 rounded-full" :class="p.dotColor"></span>
                    {{ p.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-on-surface-variant">{{ p.updated }}</td>
              </tr>
            </tbody>
          </table>
          <div class="px-6 py-4 flex justify-end">
            <button @click="router.push('/tag-management')" class="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              查看全部点位
              <span class="material-symbols-outlined" style="font-size: 14px">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 03 更改日志 (4 cols) -->
      <section class="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant overflow-hidden flex flex-col">
        <div class="px-6 py-4 border-b border-surface-container-low bg-surface-container-lowest flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 20px">history</span>
            <h3 class="font-bold text-on-surface">03 更改日志</h3>
          </div>
        </div>
        <div class="p-6 flex-1 overflow-y-auto">
          <div class="relative space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-low">
            <div
              v-for="log in logData"
              :key="log.id"
              class="relative pl-8 group"
            >
              <div
                class="absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-on-primary shadow-sm"
                :class="log.dotBg"
                :style="log.id === 1 ? 'box-shadow: 0 0 0 2px rgb(217 226 255)' : ''"
              ></div>
              <div class="bg-surface-container-low p-3 rounded-lg group-hover:bg-surface-container transition-all">
                <div class="flex justify-between items-start mb-1">
                  <span class="text-xs font-bold px-1.5 py-0.5 rounded" :class="log.tagClass">{{ log.tag }}</span>
                  <span class="text-[10px] text-on-surface-variant">{{ log.time }}</span>
                </div>
                <p class="text-xs text-on-surface font-medium">{{ log.action }}</p>
                <div class="mt-2 flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-surface-variant"></div>
                  <span class="text-[11px] text-on-secondary-container">{{ log.operator }}</span>
                </div>
              </div>
            </div>
          </div>
          <button class="w-full mt-6 py-2 text-xs text-on-surface-variant hover:text-primary border border-dashed border-outline-variant rounded-lg transition-all hover:border-primary">查看完整历史日志</button>
        </div>
      </section>

      <!-- Data Insights (Full Width Bottom) -->
      <section class="col-span-12 bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-8 border-t border-surface-container-low">
        <div class="w-full md:w-1/3 flex flex-col justify-center items-center text-center p-6 bg-surface-container-low rounded-xl">
          <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-on-primary shadow-lg mb-4">
            <span class="material-symbols-outlined" style="font-size: 32px">monitoring</span>
          </div>
          <h4 class="font-bold text-on-surface">标签活跃度</h4>
          <p class="text-xs text-on-surface-variant mt-1">过去 24 小时数据调用频率</p>
          <div class="mt-4 text-3xl font-extrabold text-primary">8.4k <span class="text-xs font-normal text-on-surface-variant">/次</span></div>
        </div>
        <div class="w-full md:w-2/3 rounded-xl relative overflow-hidden bg-surface-container-low/50 p-6">
          <p class="text-sm font-medium text-on-surface-variant mb-3 text-center">标签数据关联分布</p>
          <div class="flex items-end gap-1 h-32">
            <div
              v-for="(h, i) in barHeights"
              :key="i"
              class="flex-1 rounded-t-sm transition-all hover:opacity-80"
              :style="{ height: h + '%', backgroundColor: `rgba(0,87,194,${0.25 + (h / 100) * 0.75})` }"
            ></div>
          </div>
          <div class="flex justify-between text-[10px] text-on-surface-variant mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pointData = ref([
  { id: 'P-100249', pid: '100249', name: '政务大厅 A1 采集终端', location: '高新区创业大道 188号', status: '正常运行', statusBg: 'bg-success-container text-on-success-container', dotColor: 'bg-success', updated: '2023-10-25 09:12' },
  { id: 'P-100255', pid: '100255', name: '智慧社区数据中继点', location: '西湖区曙光路 12号', status: '正常运行', statusBg: 'bg-success-container text-on-success-container', dotColor: 'bg-success', updated: '2023-10-25 09:10' },
  { id: 'P-100281', pid: '100281', name: '金融服务中心传感器', location: '滨江区江南大道 300号', status: '维护中', statusBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', dotColor: 'bg-tertiary', updated: '2023-10-24 18:45' },
])

const logData = ref([
  { id: 1, time: '10 分钟前', tag: '修改', action: '更新了创建理由中的业务逻辑描述', operator: '李瑞康 (安全员)', dotBg: 'bg-primary', tagClass: 'text-primary bg-primary-fixed' },
  { id: 2, time: '昨天 16:20', tag: '修改', action: '关联了 12 个新增地理点位', operator: '系统管理员', dotBg: 'bg-primary-fixed-dim', tagClass: 'text-primary bg-primary-fixed' },
  { id: 3, time: '2023-10-24 14:30', tag: '新建', action: '初始化标签定义及评分权重设置', operator: '系统管理员', dotBg: 'bg-success/80', tagClass: 'text-on-success-container bg-success-container' },
])

const barHeights = ref([18, 22, 30, 28, 20, 35, 55, 72, 88, 95, 85, 78, 90, 100, 92, 80, 70, 60, 50, 45, 38, 30, 25, 20])
</script>
