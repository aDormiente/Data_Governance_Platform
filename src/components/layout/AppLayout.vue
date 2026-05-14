<template>
  <div class="relative">
    <AppSidebar />
    <AppHeader />
    <main class="ml-64 pt-16 min-h-screen">
      <div class="px-8 py-7 max-w-[1600px] mx-auto">
        <router-view v-slot="{ Component, route }">
          <transition name="view" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
</script>

<style scoped>
.view-enter-active,
.view-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.view-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.view-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
