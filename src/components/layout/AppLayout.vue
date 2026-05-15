<template>
  <a-layout class="app-shell">
    <a-layout-sider
      :width="240"
      :theme="themeStore.mode === 'dark' ? 'dark' : 'light'"
      class="app-sider"
    >
      <AppSidebar />
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="app-header">
        <AppHeader />
      </a-layout-header>

      <a-layout-content class="app-content">
        <div
          class="app-content-inner"
          style="padding: 16px;"
        >
          <router-view v-slot="{ Component, route }">
            <transition name="view" mode="out-in">
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { useThemeStore } from '../../stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.app-sider {
  position: sticky;
  top: 0;
  height: 100vh;
  border-inline-end: 1px solid rgba(0, 0, 0, 0.06);
}

:global(.dark) .app-sider {
  border-inline-end: 1px solid rgba(255, 255, 255, 0.08);
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0 24px;
  height: 56px;
  line-height: normal;
  background: rgb(var(--color-surface-container-lowest));
  border-block-end: 1px solid rgba(0, 0, 0, 0.06);
}

:global(.dark) .app-header {
  border-block-end: 1px solid rgba(255, 255, 255, 0.08);
}

.app-content {
  padding: 0;
}

.view-enter-active,
.view-leave-active {
  transition: opacity 0.18s ease;
}
.view-enter-from,
.view-leave-to {
  opacity: 0;
}
</style>
