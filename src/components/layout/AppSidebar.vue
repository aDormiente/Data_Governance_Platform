<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col z-50">
    <!-- Brand -->
    <div class="px-5 pt-5 pb-4 border-b border-outline-variant">
      <div class="flex items-center gap-3">
        <div class="relative w-9 h-9 bg-primary flex items-center justify-center text-on-primary font-mono font-bold text-[13px] tracking-tight flex-shrink-0 select-none">
          政
        </div>
        <div class="min-w-0">
          <h1 class="font-display text-[15px] font-semibold text-on-surface leading-tight truncate">政务数据治理</h1>
          <p class="text-[9px] font-mono text-on-surface-variant mt-0.5 tracking-widest">标签中枢&nbsp;·&nbsp;v2.4</p>
        </div>
      </div>
    </div>

    <!-- Status row -->
    <div class="px-5 py-3 border-b border-outline-variant flex items-center justify-between">
      <span class="tt-live">运行中</span>
      <span class="font-mono text-[10px] text-on-surface-variant tracking-wider">{{ uptime }}</span>
    </div>

    <!-- Nav -->
    <nav class="flex-1 pt-4 pb-2 overflow-y-auto">
      <p class="tt-h px-5 mb-2"><span class="tt-h-primary">»</span>&nbsp;&nbsp;主导航</p>
      <div class="space-y-0">
        <router-link
          v-for="(item, idx) in navItems"
          :key="item.path"
          :to="item.path"
          custom
          v-slot="{ isActive, navigate }"
        >
          <a
            @click="navigate"
            :class="[
              'group relative flex items-center gap-3 pl-5 pr-4 py-2.5 text-sm cursor-pointer select-none border-l-[3px] transition-colors',
              isActive
                ? 'border-primary bg-surface-container-low text-on-surface font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            <span class="font-mono text-[10px] text-on-surface-variant w-5 flex-shrink-0">{{ String(idx + 1).padStart(2, '0') }}</span>
            <span
              class="material-symbols-outlined flex-shrink-0"
              :style="isActive ? 'font-variation-settings: &quot;FILL&quot; 1, &quot;wght&quot; 500; font-size: 18px' : 'font-size: 18px'"
            >{{ item.icon }}</span>
            <span class="flex-1 truncate">{{ item.label }}</span>
            <span
              v-if="isActive"
              class="font-mono text-[10px] text-primary"
            >当前</span>
          </a>
        </router-link>
      </div>

      <p class="tt-h px-5 mt-6 mb-2"><span class="tt-h-primary">»</span>&nbsp;&nbsp;辅助</p>
      <div class="space-y-0">
        <a class="flex items-center gap-3 pl-5 pr-4 py-2.5 text-sm cursor-pointer border-l-[3px] border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors">
          <span class="font-mono text-[10px] text-on-surface-variant w-5">06</span>
          <span class="material-symbols-outlined" style="font-size: 18px">settings</span>
          <span class="flex-1">系统设置</span>
        </a>
        <a class="flex items-center gap-3 pl-5 pr-4 py-2.5 text-sm cursor-pointer border-l-[3px] border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors">
          <span class="font-mono text-[10px] text-on-surface-variant w-5">07</span>
          <span class="material-symbols-outlined" style="font-size: 18px">menu_book</span>
          <span class="flex-1">操作手册</span>
        </a>
      </div>
    </nav>

    <!-- Theme toggle (segmented) -->
    <div class="px-4 pb-3 pt-2">
      <p class="tt-h mb-2 px-1">外观</p>
      <div class="grid grid-cols-2 border border-outline-variant">
        <button
          @click="theme.set('light')"
          :class="[
            'flex items-center justify-center gap-1.5 py-2 text-[12px] transition-colors',
            theme.mode === 'light'
              ? 'bg-primary text-on-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
          ]"
        >
          <span class="material-symbols-outlined" style="font-size: 14px">light_mode</span>
          亮色
        </button>
        <button
          @click="theme.set('dark')"
          :class="[
            'flex items-center justify-center gap-1.5 py-2 text-[12px] border-l border-outline-variant transition-colors',
            theme.mode === 'dark'
              ? 'bg-primary text-on-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
          ]"
        >
          <span class="material-symbols-outlined" style="font-size: 14px">dark_mode</span>
          暗色
        </button>
      </div>
    </div>

    <!-- User block -->
    <div class="px-4 pb-4">
      <div class="border border-outline-variant px-3 py-2.5 flex items-center gap-3">
        <div class="w-8 h-8 bg-on-surface text-surface flex items-center justify-center font-semibold text-[12px] flex-shrink-0 select-none">管</div>
        <div class="overflow-hidden flex-1">
          <p class="text-[12px] font-semibold text-on-surface truncate leading-tight">系统管理员</p>
          <p class="text-[10px] text-on-surface-variant font-mono mt-0.5 tracking-wider">登录&nbsp;·&nbsp;{{ loginTime }}</p>
        </div>
        <button class="text-on-surface-variant hover:text-primary transition-colors" aria-label="更多">
          <span class="material-symbols-outlined" style="font-size: 16px">more_horiz</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../../stores/theme'

const theme = useThemeStore()

const navItems = [
  { path: '/tag-governance', label: '标签治理', icon: 'monitoring' },
  { path: '/tag-management', label: '标签管理', icon: 'inventory_2' },
  { path: '/fusion-search', label: '融合搜索', icon: 'manage_search' },
  { path: '/my-approvals', label: '我的审批', icon: 'fact_check' },
  { path: '/branch-topics', label: '分支主题', icon: 'hub' },
]

const now = new Date()
const loginTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

const uptime = ref('')
let timer = null
const startedAt = Date.now()
const updateUptime = () => {
  const ms = Date.now() - startedAt
  const s = Math.floor(ms / 1000)
  const hh = String(Math.floor(s / 3600)).padStart(2, '0')
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  uptime.value = `${hh}:${mm}:${ss}`
}
onMounted(() => {
  updateUptime()
  timer = setInterval(updateUptime, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>
