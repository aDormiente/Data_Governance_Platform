<template>
  <div>
    <AppSidebar />
    <AppHeader />
    <main class="ml-64 pt-16 min-h-screen bg-surface">
      <div class="p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
</script>
