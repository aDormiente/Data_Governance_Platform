<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest/95 backdrop-blur-xl border-r border-outline-variant/40 flex flex-col z-50">
    <!-- Brand -->
    <div class="px-6 pt-6 pb-5 border-b border-outline-variant/30">
      <div class="flex items-center gap-3">
        <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary shadow-lg shadow-primary/25 flex-shrink-0">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1; font-size: 22px">account_balance</span>
          <span class="absolute inset-0 rounded-xl ring-1 ring-on-primary/20 pointer-events-none"></span>
        </div>
        <div class="min-w-0">
          <h1 class="font-display text-[15px] font-extrabold text-on-surface leading-tight tracking-tight truncate">政务数据治理</h1>
          <p class="text-[9px] font-num text-outline mt-0.5 uppercase tracking-[0.18em]">V2.4 · AUTH FRAMEWORK</p>
        </div>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-4 pt-5 pb-2 overflow-y-auto">
      <p class="px-3 mb-2 text-[10px] font-bold text-outline uppercase tracking-[0.18em]">主导航</p>
      <div class="space-y-0.5">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          custom
          v-slot="{ isActive, navigate }"
        >
          <a
            @click="navigate"
            :class="[
              'group relative flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer select-none',
              isActive
                ? 'bg-primary-fixed text-on-primary-fixed-variant font-semibold shadow-sm shadow-primary/10'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            <!-- Active accent bar (vertical) -->
            <span
              v-if="isActive"
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[6px] w-1 h-5 rounded-full bg-gradient-to-b from-primary to-primary-container"
            ></span>

            <span
              class="material-symbols-outlined transition-all"
              :style="isActive ? 'font-variation-settings: &quot;FILL&quot; 1, &quot;wght&quot; 500; font-size: 20px' : 'font-size: 20px'"
            >{{ item.icon }}</span>
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="isActive"
              class="material-symbols-outlined text-primary/60"
              style="font-size: 14px"
            >arrow_forward</span>
          </a>
        </router-link>
      </div>
    </nav>

    <!-- Theme toggle -->
    <div class="px-4 pb-3">
      <button
        @click="theme.toggle()"
        class="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container transition-all"
        :aria-label="theme.mode === 'dark' ? '切换为亮色主题' : '切换为暗色主题'"
      >
        <span class="flex items-center gap-2.5 text-xs font-semibold text-on-surface-variant">
          <span
            class="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
            :class="theme.mode === 'dark' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-warning-container text-on-warning-container'"
          >
            <span class="material-symbols-outlined" style="font-size: 16px">{{ theme.mode === 'dark' ? 'dark_mode' : 'light_mode' }}</span>
          </span>
          <span class="flex flex-col items-start leading-tight">
            <span class="text-[10px] uppercase tracking-widest text-outline">外观</span>
            <span class="text-[12px] text-on-surface font-bold">{{ theme.mode === 'dark' ? '暗色' : '亮色' }}</span>
          </span>
        </span>
        <span
          class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0"
          :class="theme.mode === 'dark' ? 'bg-primary' : 'bg-outline-variant'"
        >
          <span
            class="absolute h-3.5 w-3.5 rounded-full bg-surface-container-lowest shadow transition-transform duration-300"
            :class="theme.mode === 'dark' ? 'translate-x-[1.125rem]' : 'translate-x-[0.1875rem]'"
          ></span>
        </span>
      </button>
    </div>

    <!-- User card -->
    <div class="px-4 pb-4">
      <div class="relative p-3 bg-gradient-to-br from-surface-container to-surface-container-high rounded-xl border border-outline-variant/20 overflow-hidden">
        <span class="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-primary/5 dark:bg-primary/10 blur-2xl pointer-events-none"></span>
        <div class="relative flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary text-sm font-bold flex-shrink-0 shadow-md shadow-primary/30">管</div>
          <div class="overflow-hidden flex-1">
            <p class="text-[13px] font-bold text-on-surface truncate leading-tight">系统管理员</p>
            <p class="text-[10px] text-on-surface-variant font-num mt-0.5">LOGIN · {{ loginTime }}</p>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant/60 hover:text-primary cursor-pointer transition-colors" style="font-size: 18px">more_horiz</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useThemeStore } from '../../stores/theme'

const theme = useThemeStore()

const navItems = [
  { path: '/tag-governance', label: '标签治理', icon: 'analytics' },
  { path: '/tag-management', label: '标签管理', icon: 'database' },
  { path: '/fusion-search', label: '融合搜索', icon: 'manage_search' },
  { path: '/my-approvals', label: '我的审批', icon: 'fact_check' },
  { path: '/branch-topics', label: '分支主题', icon: 'hub' },
]

const now = new Date()
const loginTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
</script>
