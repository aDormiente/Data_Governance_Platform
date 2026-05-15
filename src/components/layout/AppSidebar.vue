<template>
  <div class="sider-root">
    <!-- Brand -->
    <div class="sider-brand">
      <div class="brand-mark">政</div>
      <div class="brand-text">
        <div class="brand-title">政务数据治理</div>
        <div class="brand-sub">标签中枢 · v2.4</div>
      </div>
    </div>

    <!-- Status row -->
    <div class="sider-status">
      <a-badge status="success" />
      <span class="status-label">运行中</span>
      <span class="status-uptime">{{ uptime }}</span>
    </div>

    <!-- Nav -->
    <div class="sider-nav">
      <a-menu
        :selected-keys="selectedKeys"
        mode="inline"
        :theme="theme.mode === 'dark' ? 'dark' : 'light'"
        @click="onMenuClick"
      >
        <a-menu-item-group title="主导航">
          <a-menu-item v-for="it in navItems" :key="it.path">
            <template #icon><component :is="it.icon" /></template>
            {{ it.label }}
          </a-menu-item>
        </a-menu-item-group>

        <a-menu-divider />

        <a-menu-item-group title="辅助">
          <a-menu-item v-for="it in auxItems" :key="it.path" disabled>
            <template #icon><component :is="it.icon" /></template>
            {{ it.label }}
          </a-menu-item>
        </a-menu-item-group>
      </a-menu>
    </div>

    <!-- Footer: theme toggle + user -->
    <div class="sider-footer">
      <div class="footer-label">外观</div>
      <a-radio-group
        :value="theme.mode"
        button-style="solid"
        size="small"
        class="theme-toggle"
      >
        <a-radio-button value="light" @click="(e) => theme.set('light', e)">亮色</a-radio-button>
        <a-radio-button value="dark" @click="(e) => theme.set('dark', e)">暗色</a-radio-button>
      </a-radio-group>

      <div class="user-block">
        <a-avatar :size="32" style="background:#1138e0;flex-shrink:0">管</a-avatar>
        <div class="user-meta">
          <div class="user-name">系统管理员</div>
          <div class="user-login">登录 · {{ loginTime }}</div>
        </div>
        <a-button type="text" size="small" shape="circle">
          <template #icon><MoreOutlined /></template>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  FundOutlined,
  DatabaseOutlined,
  SearchOutlined,
  AuditOutlined,
  ApiOutlined,
  SettingOutlined,
  BookOutlined,
  MoreOutlined,
} from '@ant-design/icons-vue'
import { useThemeStore } from '../../stores/theme'

const router = useRouter()
const route = useRoute()
const theme = useThemeStore()

const navItems = [
  { path: '/tag-governance', label: '标签治理', icon: FundOutlined },
  { path: '/tag-management', label: '标签管理', icon: DatabaseOutlined },
  { path: '/fusion-search',  label: '融合检索', icon: SearchOutlined },
  { path: '/my-approvals',   label: '我的审批', icon: AuditOutlined },
  { path: '/branch-topics',  label: '标签共享', icon: ApiOutlined },
]

const auxItems = [
  { path: 'settings', label: '系统设置', icon: SettingOutlined },
  { path: 'manual',   label: '操作手册', icon: BookOutlined },
]

const selectedKeys = computed(() => {
  const match = navItems.find(it => route.path.startsWith(it.path))
  return match ? [match.path] : []
})

const onMenuClick = ({ key }) => {
  if (key && typeof key === 'string' && key.startsWith('/')) router.push(key)
}

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

<style scoped>
.sider-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
}

.sider-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px 14px;
}

.brand-mark {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #1138e0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.brand-text {
  min-width: 0;
  flex: 1;
}

.brand-title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-sub {
  font-size: 10px;
  letter-spacing: 0.12em;
  opacity: 0.55;
  margin-top: 3px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
}

.sider-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

:global(.dark) .sider-status {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.status-label {
  font-size: 12px;
  font-weight: 500;
}

.status-uptime {
  margin-left: auto;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
  opacity: 0.6;
  letter-spacing: 0.05em;
}

.sider-nav {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}

.sider-nav :deep(.ant-menu) {
  border-inline-end: none !important;
  background: transparent !important;
}

.sider-footer {
  padding: 12px 16px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

:global(.dark) .sider-footer {
  border-top-color: rgba(255, 255, 255, 0.08);
}

.footer-label {
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-bottom: 8px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
}

.theme-toggle {
  display: flex;
  width: 100%;
}

.theme-toggle :deep(.ant-radio-button-wrapper) {
  flex: 1;
  text-align: center;
}

.user-block {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-top: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

:global(.dark) .user-block {
  border-color: rgba(255, 255, 255, 0.1);
}

.user-meta {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
}

.user-login {
  font-size: 10px;
  opacity: 0.55;
  margin-top: 2px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  letter-spacing: 0.05em;
}
</style>
