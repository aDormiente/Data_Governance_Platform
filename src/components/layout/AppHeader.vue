<template>
  <header class="fixed top-0 right-0 left-64 h-16 bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-sm flex justify-between items-center px-8 z-40">
    <div class="flex items-center gap-8">
      <span class="text-xl font-black text-slate-900 tracking-tight">标签中心</span>
      <nav class="hidden md:flex items-center gap-6">
        <a class="text-slate-500 hover:text-blue-500 transition-all text-sm cursor-pointer">工作台</a>
        <a class="text-slate-500 hover:text-blue-500 transition-all text-sm cursor-pointer">系统设置</a>
        <a class="text-slate-500 hover:text-blue-500 transition-all text-sm cursor-pointer">操作手册</a>
      </nav>
    </div>

    <div class="flex items-center gap-4">
      <div class="relative">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style="font-size: 18px">search</span>
        <input
          class="pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          placeholder="全域搜索..."
          type="text"
        />
      </div>
      <div class="flex items-center gap-1 border-l border-slate-100 ml-1 pl-4">
        <button class="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full transition-all">
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <button class="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full transition-all">
          <span class="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </div>
  </header>
</template>
