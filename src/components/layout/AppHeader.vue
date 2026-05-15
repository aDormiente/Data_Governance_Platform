<template>
  <div class="header-root">
    <!-- Zone path -->
    <div class="header-left">
      <span class="zone-bar"></span>
      <span class="zone-name">{{ zone }}</span>
      <a-divider type="vertical" />
      <span v-if="subzone" class="zone-sub">{{ subzone }}</span>
      <span class="zone-time">{{ nowStr }}</span>
    </div>

    <!-- Right cluster -->
    <div class="header-right">
      <a-input-search
        v-model:value="searchValue"
        placeholder="全域搜索…"
        style="width: 280px"
        allow-clear
      />

      <a-divider type="vertical" style="height: 24px; margin: 0 4px" />

      <a-tooltip placement="bottom" title="通知">
        <a-badge dot>
          <a-button type="text" shape="circle">
            <template #icon><BellOutlined /></template>
          </a-button>
        </a-badge>
      </a-tooltip>

      <a-tooltip placement="bottom" title="帮助">
        <a-button type="text" shape="circle">
          <template #icon><QuestionCircleOutlined /></template>
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  BellOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()
const searchValue = ref('')

const zoneMap = {
  '/tag-governance': { zone: '标签治理', subzone: '总览' },
  '/tag-management': { zone: '标签管理', subzone: '编目' },
  '/fusion-search':  { zone: '融合检索', subzone: '检索' },
  '/my-approvals':   { zone: '我的审批', subzone: '待办' },
  '/branch-topics':  { zone: '标签共享', subzone: '索引' },
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

<style scoped>
.header-root {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.zone-bar {
  width: 3px;
  height: 16px;
  background: #1138e0;
  border-radius: 1.5px;
}

.zone-name {
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.01em;
}

.zone-sub {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
  opacity: 0.55;
  letter-spacing: 0.08em;
}

.zone-time {
  margin-left: 16px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
  opacity: 0.5;
  letter-spacing: 0.04em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
