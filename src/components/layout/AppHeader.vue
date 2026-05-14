<template>
  <header class="fixed top-0 right-0 left-64 h-16 bg-surface-container-lowest/75 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-8 z-40">
    <div class="flex items-center gap-8">
      <div class="flex items-baseline gap-2.5">
        <span class="font-display text-[20px] font-extrabold text-on-surface tracking-tight">标签中心</span>
        <span class="text-[10px] font-num text-outline uppercase tracking-[0.18em]">/ TAG&nbsp;HUB</span>
      </div>
      <nav class="hidden md:flex items-center gap-1">
        <a class="px-3 py-1.5 rounded-md text-on-surface-variant hover:text-primary hover:bg-primary-fixed/60 transition-all text-sm font-medium cursor-pointer">工作台</a>
        <a class="px-3 py-1.5 rounded-md text-on-surface-variant hover:text-primary hover:bg-primary-fixed/60 transition-all text-sm font-medium cursor-pointer">系统设置</a>
        <a class="px-3 py-1.5 rounded-md text-on-surface-variant hover:text-primary hover:bg-primary-fixed/60 transition-all text-sm font-medium cursor-pointer">操作手册</a>
      </nav>
    </div>

    <div class="flex items-center gap-3">
      <div class="relative">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" style="font-size: 18px">search</span>
        <input
          class="pl-10 pr-12 py-2 bg-surface-container-low/70 border border-outline-variant/30 rounded-full text-sm w-72 text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
          placeholder="全域搜索…"
          type="text"
        />
        <kbd class="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-num text-outline bg-surface-container border border-outline-variant/30 rounded">⌘K</kbd>
      </div>
      <div class="flex items-center gap-1 pl-3 border-l border-outline-variant/30">
        <button class="relative w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-danger shadow-[0_0_0_2px_rgb(var(--color-surface-container-lowest))]"></span>
        </button>
        <button class="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
          <span class="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </div>
  </header>
</template>
