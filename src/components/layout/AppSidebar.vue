<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-slate-100 flex flex-col z-50">
    <div class="p-6">
      <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 flex-shrink-0">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1; font-size: 22px">account_balance</span>
        </div>
        <div>
          <h1 class="text-base font-bold text-slate-900 leading-tight">政务数据治理平台</h1>
          <p class="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest">V2.4 权威智能框架</p>
        </div>
      </div>

      <nav class="space-y-1">
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
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 cursor-pointer select-none',
              isActive
                ? 'bg-blue-50 text-blue-700 font-semibold border-r-4 border-blue-600'
                : 'text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 hover:translate-x-1'
            ]"
          >
            <span class="material-symbols-outlined" :style="isActive ? 'font-variation-settings: &quot;FILL&quot; 1' : ''">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </nav>
    </div>

    <div class="mt-auto p-4 mx-3 mb-4 bg-slate-100 rounded-xl">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">管</div>
        <div class="overflow-hidden">
          <p class="text-sm font-bold text-slate-900 truncate">系统管理员</p>
          <p class="text-xs text-slate-500">最后登录: {{ loginTime }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
const navItems = [
  { path: '/tag-governance', label: '标签治理', icon: 'analytics' },
  { path: '/tag-management', label: '标签管理', icon: 'database' },
  { path: '/fusion-search', label: '融合搜索', icon: 'manage_search' },
  { path: '/my-approvals', label: '我的审批', icon: 'fact_check' },
  { path: '/branch-topics', label: '分支主题', icon: 'hub' },
]

const now = new Date()
const loginTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
</script>
