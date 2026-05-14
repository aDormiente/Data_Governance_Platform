<template>
  <header class="fixed top-0 right-0 left-64 h-14 bg-surface border-b border-outline-variant flex justify-between items-center px-6 z-40">
    <!-- Zone path -->
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-2">
        <span class="text-primary font-mono text-[14px] font-semibold leading-none">▎</span>
        <span class="font-display text-[14px] font-semibold tracking-tight text-on-surface">{{ zone }}</span>
        <span v-if="subzone" class="font-mono text-[11px] text-on-surface-variant tracking-wider">/&nbsp;{{ subzone }}</span>
      </div>
      <span class="font-mono text-[11px] text-on-surface-variant tracking-wider">{{ nowStr }}</span>
    </div>

    <!-- Right cluster -->
    <div class="flex items-center gap-2">
      <div class="relative">
        <span class="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-[12px] text-primary leading-none pointer-events-none">&gt;</span>
        <input
          class="pl-7 pr-12 py-1.5 bg-surface-container-lowest border border-outline-variant text-[12px] w-72 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary transition-colors"
          placeholder="全域搜索..."
          type="text"
        />
        <kbd class="tt-kbd absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex">/</kbd>
      </div>

      <div class="flex items-center pl-3 ml-1 border-l border-outline-variant gap-1">
        <button class="relative w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title="通知">
          <span class="material-symbols-outlined" style="font-size: 19px">notifications</span>
          <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger"></span>
        </button>
        <button class="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title="帮助">
          <span class="material-symbols-outlined" style="font-size: 19px">help_outline</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const zoneMap = {
  '/tag-governance': { zone: '标签治理', subzone: '总览' },
  '/tag-management': { zone: '标签管理', subzone: '编目' },
  '/fusion-search':  { zone: '融合搜索', subzone: '检索' },
  '/my-approvals':   { zone: '我的审批', subzone: '待办' },
  '/branch-topics':  { zone: '分支主题', subzone: '索引' },
}

const matchedZone = computed(() => {
  const key = Object.keys(zoneMap).find(k => route.path.startsWith(k))
  return key ? zoneMap[key] : { zone: '标签中枢', subzone: '' }
})
const zone = computed(() => matchedZone.value.zone)
const subzone = computed(() => matchedZone.value.subzone)

const nowStr = ref('')
let timer = null
const pad = (n) => String(n).padStart(2, '0')
const tick = () => {
  const d = new Date()
  nowStr.value = `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>
