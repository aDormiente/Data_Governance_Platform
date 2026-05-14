<template>
  <div class="max-w-6xl mx-auto space-y-10">
    <!-- 01 Search Center -->
    <section>
      <div class="flex items-center gap-3 mb-6">
        <span class="bg-primary text-white text-xs font-black px-2 py-1 rounded">01</span>
        <h2 class="text-xl font-bold tracking-tight text-on-surface">搜索中心 / SEARCH CENTER</h2>
      </div>
      <div class="bg-white p-6 rounded shadow-sm flex flex-col md:flex-row gap-4 items-stretch border-l-4 border-primary">
        <div class="relative flex-1 flex items-center bg-surface-container-low rounded border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <!-- Type Filter Dropdown -->
          <div class="flex items-center px-4 border-r border-outline-variant/30 h-full">
            <select v-model="searchCategory" class="bg-transparent border-none text-sm font-bold text-on-surface focus:ring-0 cursor-pointer pr-8 py-4">
              <option value="">全部类别</option>
              <option value="tag">标签</option>
              <option value="point">点位</option>
              <option value="安全">公共安全</option>
              <option value="政务">政务服务</option>
            </select>
          </div>
          <div class="relative flex-1">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
            <input
              v-model="searchInput"
              class="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 rounded font-medium text-on-surface placeholder:text-outline-variant"
              placeholder="输入关键词、单位名称或地理编码..."
              type="text"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>
        <button
          @click="handleSearch"
          class="bg-primary text-white px-10 py-4 rounded font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-md active:scale-[0.98]"
        >
          搜索
        </button>
        <div class="flex items-center bg-surface-container-low p-1 rounded">
          <button
            @click="viewMode = 'list'"
            :class="[
              'px-4 py-3 rounded flex items-center gap-2 text-sm transition-colors',
              viewMode === 'list' ? 'bg-white shadow-sm text-primary font-bold' : 'text-on-surface-variant font-medium hover:text-primary'
            ]"
          >
            <span class="material-symbols-outlined">list</span>
            列表模式
          </button>
          <button
            @click="viewMode = 'map'"
            :class="[
              'px-4 py-3 rounded flex items-center gap-2 text-sm transition-colors',
              viewMode === 'map' ? 'bg-white shadow-sm text-primary font-bold' : 'text-on-surface-variant font-medium hover:text-primary'
            ]"
          >
            <span class="material-symbols-outlined">map</span>
            地图模式
          </button>
        </div>
      </div>
    </section>

    <!-- 02 Search Results -->
    <section>
      <div class="flex items-center gap-3 mb-6">
        <span class="bg-primary text-white text-xs font-black px-2 py-1 rounded">02</span>
        <h2 class="text-xl font-bold tracking-tight text-on-surface">搜索结果 / SEARCH RESULTS</h2>
      </div>

      <!-- Matched Tags -->
      <div class="bg-surface-container-low p-6 rounded-lg mb-6">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">匹配标签 / MATCHED TAGS</span>
          <button @click="matchedTags = []" class="text-xs text-primary font-bold hover:underline">清除全部</button>
        </div>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="(t, i) in matchedTags"
            :key="t"
            class="bg-white px-4 py-2 rounded-full border border-outline-variant/30 flex items-center gap-3 shadow-sm"
          >
            <span class="text-sm font-bold text-on-surface">{{ t }}</span>
            <button @click="matchedTags.splice(i, 1)" class="material-symbols-outlined text-outline cursor-pointer hover:text-error" style="font-size: 16px">close</button>
          </div>
          <span v-if="matchedTags.length === 0" class="text-xs text-on-surface-variant italic">暂无匹配标签</span>
        </div>
      </div>

      <!-- Data Points List -->
      <div class="bg-white rounded overflow-hidden shadow-sm border-l-4 border-primary">
        <table class="w-full text-left border-collapse">
          <thead class="bg-surface-container-low">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">点位/标签名称</th>
              <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">所属机构</th>
              <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">地理位置</th>
              <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">当前状态</th>
              <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">更新时间</th>
              <th class="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-container-low">
            <tr
              v-for="row in resultCards"
              :key="row.id"
              @click="goResult(row)"
              class="hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <span class="p-2 rounded-lg" :class="row.type === '点位' ? 'bg-tertiary-fixed text-tertiary' : 'bg-primary-fixed text-primary'">
                    <span class="material-symbols-outlined" style="font-size: 18px">{{ row.type === '点位' ? 'location_on' : 'label' }}</span>
                  </span>
                  <div>
                    <p class="font-bold text-on-surface">{{ row.title }}</p>
                    <p class="text-[11px] text-on-surface-variant">{{ row.subtitle }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-on-surface-variant">{{ row.org }}</td>
              <td class="px-6 py-4 text-on-surface-variant text-sm">{{ row.location }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold" :class="row.statusClass">
                  <span class="w-1.5 h-1.5 rounded-full" :class="row.statusDotClass"></span>
                  {{ row.statusLabel }}
                </span>
              </td>
              <td class="px-6 py-4 text-outline text-sm">{{ row.updated }}</td>
              <td class="px-6 py-4 text-right" @click.stop>
                <div class="flex items-center justify-end gap-4">
                  <button
                    @click="goResult(row)"
                    class="text-primary hover:text-primary-container font-semibold text-sm transition-colors"
                  >查看详情</button>
                  <span class="w-px h-3 bg-outline-variant"></span>
                  <button
                    @click="goResult(row)"
                    class="text-primary hover:text-primary-container font-semibold text-sm flex items-center gap-1 transition-colors"
                  >
                    <span class="material-symbols-outlined" style="font-size: 18px">{{ row.type === '点位' ? 'location_on' : 'open_in_new' }}</span>
                    {{ row.type === '点位' ? '地图查看' : '打开标签' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-surface-container-low px-6 py-4 flex items-center justify-between border-t border-outline-variant/10">
          <span class="text-sm text-on-surface-variant font-medium">显示 1 到 {{ resultCards.length }} 共 24 条结果</span>
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 text-outline hover:bg-white disabled:opacity-50" disabled>
              <span class="material-symbols-outlined" style="font-size: 18px">chevron_left</span>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold shadow-sm">1</button>
            <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 text-on-surface text-xs font-bold hover:bg-white hover:border-primary hover:text-primary transition-all">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 text-on-surface text-xs font-bold hover:bg-white hover:border-primary hover:text-primary transition-all">3</button>
            <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 text-on-surface hover:bg-white hover:border-primary hover:text-primary transition-all">
              <span class="material-symbols-outlined" style="font-size: 18px">chevron_right</span>
            </button>
          </div>
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
    id: 1,
    type: '点位',
    title: '朝阳区核心枢纽 A1',
    subtitle: 'ID: P-100249',
    org: '北京市大数据管理局',
    location: '北京市朝阳区建国门外大街',
    statusLabel: '正常运行',
    statusClass: 'bg-emerald-50 text-emerald-700',
    statusDotClass: 'bg-emerald-500',
    updated: '2023-10-24 14:32',
  },
  {
    id: 2,
    type: '点位',
    title: '海淀科技园监控点 B04',
    subtitle: 'ID: P-100255',
    org: '中关村管委会',
    location: '北京市海淀区中关村南大街',
    statusLabel: '维护中',
    statusClass: 'bg-amber-50 text-amber-700',
    statusDotClass: 'bg-amber-500',
    updated: '2023-10-24 12:15',
  },
  {
    id: 3,
    type: '标签',
    title: '企业信用等级',
    subtitle: 'ENTERPRISE_CREDIT',
    org: '通州区政府',
    location: '北京市通州区运河东大街',
    statusLabel: '已发布',
    statusClass: 'bg-emerald-50 text-emerald-700',
    statusDotClass: 'bg-emerald-500',
    updated: '2023-10-24 09:00',
  },
  {
    id: 4,
    type: '点位',
    title: '东城区历史风貌保护区 Z1',
    subtitle: 'ID: P-100312',
    org: '东城区规划局',
    location: '北京市东城区东华门街道',
    statusLabel: '高风险警报',
    statusClass: 'bg-red-50 text-red-700',
    statusDotClass: 'bg-red-500',
    updated: '2023-10-24 15:45',
  },
])
</script>
