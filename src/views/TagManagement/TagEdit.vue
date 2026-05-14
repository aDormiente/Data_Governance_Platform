<template>
  <div class="pb-24">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span>数据</span>
        <span class="opacity-40">/</span>
        <span class="cursor-pointer hover:text-primary transition-colors">标签管理</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">编辑</span>
      </div>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="font-display text-[30px] font-semibold tracking-tight text-on-surface leading-[1.05]">编辑标签 · {{ form.name }}</h1>
          <p class="font-mono text-[11px] text-on-surface-variant tracking-wider mt-2">最后更新 · 2024.05.20 · 14:30</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8">
      <!-- Section 01: Basic Information -->
      <section class="bg-surface-container-lowest rounded-lg p-8 shadow-sm border-l-4 border-primary">
        <div class="flex items-center gap-3 mb-8">
          <span class="text-primary font-bold text-xl leading-none">01</span>
          <h2 class="text-lg font-bold text-on-surface">基本信息编辑</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-on-surface-variant">标签名称 <span class="text-error">*</span></label>
            <input
              v-model="form.name"
              class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary transition-all"
              placeholder="请输入标签名称"
              type="text"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-on-surface-variant">创建人</label>
            <input
              class="w-full bg-surface-container-low/60 border-none rounded-lg px-4 py-3 text-outline cursor-not-allowed"
              disabled
              type="text"
              value="系统管理员 (Admin)"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-on-surface-variant">更新周期 <span class="text-error">*</span></label>
            <select
              v-model="form.cycle"
              class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary appearance-none transition-all"
            >
              <option value="每日更新">每日更新</option>
              <option value="每周更新">每周更新</option>
              <option value="每月更新">每月更新</option>
              <option value="实时触发">实时触发</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-on-surface-variant">标签分类</label>
            <select
              v-model="form.category"
              class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary appearance-none transition-all"
            >
              <option value="基础画像">基础画像</option>
              <option value="信用评估">信用评估</option>
              <option value="风险监控">风险监控</option>
            </select>
          </div>
          <div class="md:col-span-2 space-y-2">
            <label class="block text-sm font-semibold text-on-surface-variant">创建理由 <span class="text-error">*</span></label>
            <textarea
              v-model="form.reason"
              class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary transition-all"
              placeholder="描述该标签的应用场景与业务价值..."
              rows="3"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Section 02: Point Management -->
      <section class="bg-surface-container-lowest rounded-lg p-8 shadow-sm border-l-4 border-primary">
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center gap-3">
            <span class="text-primary font-bold text-xl leading-none">02</span>
            <h2 class="text-lg font-bold text-on-surface">下属点位管理</h2>
          </div>
          <div class="flex gap-3">
            <button
              :disabled="selectedPoints.length === 0"
              class="bg-secondary-container text-primary px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="material-symbols-outlined" style="font-size: 16px">delete</span>
              批量移除
              <span v-if="selectedPoints.length > 0" class="ml-1 text-xs bg-primary text-on-primary rounded-full w-5 h-5 flex items-center justify-center font-black">{{ selectedPoints.length }}</span>
            </button>
            <button class="bg-primary text-on-primary px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-container transition-all">
              <span class="material-symbols-outlined" style="font-size: 16px">add</span>
              添加点位
            </button>
          </div>
        </div>
        <div class="overflow-hidden rounded-lg">
          <table class="w-full text-left">
            <thead class="bg-surface-container-low text-on-surface-variant font-semibold text-sm">
              <tr>
                <th class="px-6 py-4">
                  <input
                    type="checkbox"
                    class="rounded border-outline-variant text-primary focus:ring-primary"
                    :checked="selectedPoints.length === pointData.length && pointData.length > 0"
                    @change="toggleAll"
                  />
                </th>
                <th class="px-6 py-4">点位名称</th>
                <th class="px-6 py-4">地理位置</th>
                <th class="px-6 py-4">运行状态</th>
                <th class="px-6 py-4">更新时间</th>
                <th class="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr v-for="row in pointData" :key="row.id" class="hover:bg-surface-container-low/50 transition-colors group">
                <td class="px-6 py-4">
                  <input
                    type="checkbox"
                    class="rounded border-outline-variant text-primary focus:ring-primary"
                    :value="row.id"
                    v-model="selectedPoints"
                  />
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center text-primary">
                      <span class="material-symbols-outlined" style="font-size: 16px">lan</span>
                    </div>
                    <span class="font-medium text-on-surface">{{ row.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-on-surface-variant">{{ row.location }}</td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    :class="row.status === '运行中' ? 'bg-success-container text-on-success-container' : 'bg-warning-container text-on-warning-container'"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="row.status === '运行中' ? 'bg-success' : 'bg-warning'"
                    ></span>
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-outline">{{ row.updated }}</td>
                <td class="px-6 py-4 text-right">
                  <button class="text-error hover:underline text-sm font-medium">移除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- Sticky Bottom Action Bar -->
    <div class="fixed bottom-0 right-0 left-64 bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.03)] px-12 py-4 flex justify-end items-center gap-4 z-40">
      <button
        @click="cancel"
        class="px-10 py-2.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low font-semibold transition-all"
      >
        取消
      </button>
      <button
        @click="save"
        class="px-10 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold shadow-lg shadow-primary/20 transition-all"
      >
        确认保存
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = ref({
  name: '企业信用等级',
  category: '信用评估',
  cycle: '每周更新',
  reason: '为实现企业分级分类监管，根据纳税、社保、诉讼等多维度数据，构建企业信用综合评价体系，提升审批效率。',
})

const selectedPoints = ref([])

const pointData = ref([
  { id: 'P-100249', name: '纳税等级数据源-A', location: '北京市/海淀区/税务局中心枢纽', status: '运行中', updated: '2024-05-20 09:00' },
  { id: 'P-100255', name: '企业社保缴纳记录', location: '上海市/浦东新区/人社厅数据节点', status: '运行中', updated: '2024-05-19 22:15' },
  { id: 'P-100281', name: '工商司法风险点位', location: '广州市/越秀区/政务大数据平台', status: '维护中', updated: '2024-05-18 16:40' },
])

const toggleAll = (e) => {
  selectedPoints.value = e.target.checked ? pointData.value.map(p => p.id) : []
}

const save = () => router.push(`/tag-management/detail/${route.params.id || 1}`)
const cancel = () => router.push(`/tag-management/detail/${route.params.id || 1}`)
</script>
