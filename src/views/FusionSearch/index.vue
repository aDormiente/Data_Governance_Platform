<template>
  <div class="max-w-6xl mx-auto">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
        <span class="text-primary">»</span>
        <span>工作台</span>
        <span class="opacity-40">/</span>
        <span class="text-on-surface">融合搜索</span>
        <span class="opacity-40">/</span>
        <span class="opacity-60">检索</span>
      </div>
      <h1 class="font-display text-[34px] font-semibold tracking-tight text-on-surface leading-[1.05]">融合搜索</h1>
      <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">输入关键词、单位名称或地理编码，跨标签库与点位库进行联合检索。</p>
    </div>

    <!-- 01 Search Center -->
    <div class="tt-rule mb-3">
      <span>01&nbsp;&nbsp;搜索中心</span>
      <span class="tt-rule-sub">检索入口</span>
    </div>
    <section class="border border-outline-variant bg-surface-container-lowest mb-8">
      <div class="flex flex-col md:flex-row items-stretch">
        <!-- Type filter -->
        <div class="flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-outline-variant">
          <span class="font-mono text-[10px] tracking-wider text-on-surface-variant">范围</span>
          <select v-model="searchCategory" class="bg-transparent border-0 text-[12px] text-on-surface focus:outline-none cursor-pointer">
            <option value="">全部</option>
            <option value="tag">标签</option>
            <option value="point">点位</option>
            <option value="安全">公共安全</option>
            <option value="政务">政务服务</option>
          </select>
        </div>
        <!-- Input -->
        <div class="flex items-center gap-2 px-4 py-3 flex-1 border-b md:border-b-0 md:border-r border-outline-variant focus-within:bg-surface-container-low transition-colors">
          <span class="font-mono text-[12px] text-primary">&gt;</span>
          <input
            v-model="searchInput"
            class="flex-1 bg-transparent border-0 text-[13px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0"
            placeholder="输入关键词、单位名称或地理编码..."
            type="text"
            @keyup.enter="handleSearch"
          />
          <kbd class="tt-kbd">回车</kbd>
        </div>
        <!-- Submit -->
        <button
          @click="handleSearch"
          class="text-[12px] tracking-wider px-6 bg-primary text-on-primary font-semibold hover:opacity-90 transition-opacity"
        >执行搜索</button>
        <!-- View mode -->
        <div class="flex border-t md:border-t-0 md:border-l border-outline-variant">
          <button
            @click="viewMode = 'list'"
            :class="[
              'flex items-center gap-1.5 px-4 py-3 text-[12px] transition-colors border-r border-outline-variant',
              viewMode === 'list' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            <span class="material-symbols-outlined" style="font-size: 14px">list</span>
            列表
          </button>
          <button
            @click="viewMode = 'map'"
            :class="[
              'flex items-center gap-1.5 px-4 py-3 text-[12px] transition-colors',
              viewMode === 'map' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            <span class="material-symbols-outlined" style="font-size: 14px">map</span>
            地图
          </button>
        </div>
      </div>
    </section>

    <!-- 02 Matched Tags -->
    <div class="tt-rule mb-3">
      <span>02&nbsp;&nbsp;匹配标签</span>
      <span class="tt-rule-sub">共 {{ matchedTags.length }} 个</span>
    </div>
    <section class="border border-outline-variant bg-surface-container-lowest p-4 mb-8">
      <div class="flex items-center justify-between mb-3">
        <span class="font-mono text-[11px] tracking-wider text-on-surface-variant">已匹配 {{ matchedTags.length }} 个标签</span>
        <button @click="matchedTags = []" class="text-[12px] text-primary hover:underline">全部清除</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(t, i) in matchedTags"
          :key="t"
          class="flex items-center gap-2 px-2.5 py-1 border border-outline-variant bg-surface-container-low"
        >
          <span class="text-[12px] text-on-surface">{{ t }}</span>
          <button @click="matchedTags.splice(i, 1)" class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-danger transition-colors" style="font-size: 13px">close</button>
        </div>
        <span v-if="matchedTags.length === 0" class="text-[12px] text-on-surface-variant tracking-wider">暂无匹配，请提交检索</span>
      </div>
    </section>

    <!-- 03 Results -->
    <div class="tt-rule mb-3">
      <span>03&nbsp;&nbsp;搜索结果</span>
      <span class="tt-rule-sub">{{ resultCards.length }} / 共 24 条</span>
    </div>
    <section class="border border-outline-variant bg-surface-container-lowest overflow-hidden">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-outline-variant">
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">编号</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">名称</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">所属机构</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">坐标</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">状态</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold">更新时间</th>
            <th class="px-4 py-2.5 text-[11px] tracking-wider text-on-surface-variant font-semibold text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in resultCards"
            :key="row.id"
            @click="goResult(row)"
            class="tt-row border-b border-outline-variant/60 cursor-pointer group"
          >
            <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tracking-wider">{{ row.subtitle }}</td>
            <td class="px-4 py-3.5">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined" :class="row.type === '点位' ? 'text-tertiary' : 'text-primary'" style="font-size: 16px">
                  {{ row.type === '点位' ? 'location_on' : 'sell' }}
                </span>
                <span class="text-[13px] font-semibold text-on-surface">{{ row.title }}</span>
                <span class="tt-tag" :class="row.type === '点位' ? 'tt-tag-warning' : 'tt-tag-primary'">{{ row.type }}</span>
              </div>
            </td>
            <td class="px-4 py-3.5 text-[12px] text-on-surface-variant">{{ row.org }}</td>
            <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tracking-wider">{{ row.location }}</td>
            <td class="px-4 py-3.5">
              <span class="status-pill" :class="row.statusColor">{{ row.statusLabel }}</span>
            </td>
            <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant tabular-nums tracking-wider">{{ row.updated.replace(/-/g, '.') }}</td>
            <td class="px-4 py-3.5 text-right" @click.stop>
              <div class="flex justify-end gap-3 text-[12px] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="goResult(row)" class="text-primary hover:underline">详情</button>
                <button @click="goResult(row)" class="text-on-surface-variant hover:text-primary">{{ row.type === '点位' ? '地图' : '编辑' }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="border-t border-outline-variant px-4 py-2.5 flex justify-between items-center font-mono text-[11px] text-on-surface-variant tracking-wider">
        <span>显示 01-{{ String(resultCards.length).padStart(2, '0') }} / 共 24 条</span>
        <div class="flex items-center gap-1">
          <button class="tt-kbd opacity-50" disabled>←</button>
          <span class="px-2 text-on-surface">1</span>
          <button class="tt-kbd hover:border-primary hover:text-primary">2</button>
          <button class="tt-kbd hover:border-primary hover:text-primary">3</button>
          <button class="tt-kbd hover:border-primary hover:text-primary">→</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchInput = ref('')
const searchCategory = ref('')
const viewMode = ref('list')

const matchedTags = ref(['高风险地区', '交通管制', '重点监控单位', '实时监控'])

const handleSearch = () => {}

const goResult = (result) => {
  if (result.type === '点位') {
    router.push(`/tag-management/point/${result.id}`)
  } else {
    router.push(`/tag-management/detail/${result.id}`)
  }
}

const resultCards = ref([
  {
    id: 1, type: '点位',
    title: '朝阳区核心枢纽 A1', subtitle: 'P-100249',
    org: '北京市大数据管理局', location: '116.480, 39.910',
    statusLabel: '在线', statusColor: 'text-success',
    updated: '2023-10-24 14:32',
  },
  {
    id: 2, type: '点位',
    title: '海淀科技园监控点 B04', subtitle: 'P-100255',
    org: '中关村管委会', location: '116.310, 39.984',
    statusLabel: '维护中', statusColor: 'text-warning',
    updated: '2023-10-24 12:15',
  },
  {
    id: 3, type: '标签',
    title: '企业信用等级', subtitle: 'T-100312',
    org: '通州区政府', location: '——',
    statusLabel: '已发布', statusColor: 'text-success',
    updated: '2023-10-24 09:00',
  },
  {
    id: 4, type: '点位',
    title: '东城区历史风貌保护区 Z1', subtitle: 'P-100388',
    org: '东城区规划局', location: '116.420, 39.918',
    statusLabel: '告警', statusColor: 'text-danger',
    updated: '2023-10-24 15:45',
  },
])
</script>
