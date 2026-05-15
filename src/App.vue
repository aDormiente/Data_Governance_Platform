<template>
  <a-config-provider :theme="antdTheme" :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { theme as antTheme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

const antdTheme = computed(() => ({
  algorithm: themeStore.mode === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#1138e0',
    borderRadius: 6,
    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif",
  },
}))
</script>
