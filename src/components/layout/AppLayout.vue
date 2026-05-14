<template>
  <div class="relative">
    <AppSidebar />
    <AppHeader />
    <main class="ml-64 pt-14 min-h-screen">
      <div class="px-8 py-6 max-w-[1600px] mx-auto">
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
  transition: opacity 0.12s linear;
}
.view-enter-from,
.view-leave-to {
  opacity: 0;
}
</style>
