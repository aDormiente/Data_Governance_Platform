<template>
  <div class="pb-24">
    <!-- Breadcrumb & Header -->
    <div class="mb-8">
      <nav class="flex items-center space-x-2 text-sm mb-3">
        <span class="text-on-surface-variant">数据中心</span>
        <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 14px">chevron_right</span>
        <span class="text-on-surface-variant">分支主题</span>
        <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 14px">chevron_right</span>
        <span class="text-primary font-medium">新建标签集合</span>
      </nav>
      <h2 class="text-2xl font-bold text-on-surface tracking-tight">新建标签集合</h2>
      <p class="text-on-surface-variant mt-1 text-sm">创建并配置数据标签的共享属性与使用权限</p>
    </div>

    <form class="space-y-8 max-w-5xl">
      <!-- Section 01: 基本信息 -->
      <section class="bg-surface-container-lowest p-8 rounded-lg border-l-4 border-primary shadow-sm">
        <div class="flex items-center mb-6">
          <span class="text-primary font-bold text-xl mr-3 opacity-20 italic">01</span>
          <h3 class="text-lg font-bold text-on-surface">基本信息</h3>
        </div>
        <div class="grid grid-cols-1 gap-y-8">
          <!-- 标签集合名称 -->
          <div class="max-w-2xl">
            <label class="block text-sm font-semibold text-on-surface mb-2">
              标签集合名称 <span class="text-error">*</span>
            </label>
            <input
              v-model="form.name"
              class="w-full px-4 py-2.5 bg-surface-container-low border-none rounded focus:ring-2 focus:ring-primary-container text-sm transition-all"
              placeholder="请输入集合名称，例如：季度财务分析标签组"
              type="text"
            />
          </div>

          <!-- 关联标签 -->
          <div class="max-w-2xl">
            <label class="block text-sm font-semibold text-on-surface mb-2">
              关联标签 <span class="text-error">*</span>
            </label>
            <div class="relative">
              <div class="w-full min-h-[44px] px-4 py-2 bg-surface-container-low border-none rounded flex flex-wrap gap-2 items-center">
                <span
                  v-for="(tag, i) in form.tags"
                  :key="tag"
                  class="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-xs flex items-center"
                >
                  {{ tag }}
                  <button
                    type="button"
                    @click="form.tags.splice(i, 1)"
                    class="ml-1 material-symbols-outlined leading-none"
                    style="font-size: 14px"
                  >close</button>
                </span>
                <input
                  v-model="tagInput"
                  @keyup.enter="addTag"
                  class="bg-transparent border-none focus:ring-0 p-0 text-sm flex-1 min-w-[120px]"
                  placeholder="搜索并添加标签..."
                  type="text"
                />
              </div>
              <!-- Suggestions -->
              <div v-if="tagInput || showSuggestions" class="absolute w-full mt-1 bg-surface-container-lowest shadow-xl rounded-lg border border-outline-variant/30 z-10 overflow-hidden">
                <div class="p-2 border-b border-surface-container-low bg-surface-container-low text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">常用推荐</div>
                <div class="p-1">
                  <div
                    v-for="s in filteredSuggestions"
                    :key="s"
                    @click="form.tags.push(s); tagInput = ''"
                    class="px-3 py-2 text-sm hover:bg-secondary-container/30 cursor-pointer rounded transition-colors"
                  >{{ s }}</div>
                  <div v-if="filteredSuggestions.length === 0" class="px-3 py-2 text-xs text-on-surface-variant italic">没有匹配项，回车直接添加</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 共享描述 -->
          <div class="max-w-3xl">
            <label class="block text-sm font-semibold text-on-surface mb-2">共享描述</label>
            <textarea
              v-model="form.description"
              class="w-full px-4 py-2.5 bg-surface-container-low border-none rounded focus:ring-2 focus:ring-primary-container text-sm transition-all resize-none"
              placeholder="请详细说明该标签集合的应用场景、数据来源及共享目的..."
              rows="4"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Section 02: 权限配置 -->
      <section class="bg-surface-container-lowest p-8 rounded-lg border-l-4 border-primary shadow-sm">
        <div class="flex items-center mb-6">
          <span class="text-primary font-bold text-xl mr-3 opacity-20 italic">02</span>
          <h3 class="text-lg font-bold text-on-surface">权限配置</h3>
        </div>
        <div class="space-y-10">
          <!-- 管线单位权限 -->
          <div>
            <label class="block text-sm font-semibold text-on-surface mb-4">管线单位权限</label>
            <div class="flex space-x-8">
              <label class="flex items-center group cursor-pointer">
                <div class="relative flex items-center justify-center">
                  <input
                    v-model="form.unit"
                    value="all"
                    class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-outline-variant checked:border-primary transition-all"
                    name="unit"
                    type="radio"
                  />
                  <div class="absolute h-2.5 w-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span class="ml-3 text-sm text-on-surface">全部单位</span>
              </label>
              <label class="flex items-center group cursor-pointer">
                <div class="relative flex items-center justify-center">
                  <input
                    v-model="form.unit"
                    value="self"
                    class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-outline-variant checked:border-primary transition-all"
                    name="unit"
                    type="radio"
                  />
                  <div class="absolute h-2.5 w-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span class="ml-3 text-sm text-on-surface">本单位（默认）</span>
              </label>
            </div>
            <p class="mt-2 text-xs text-outline">选择"全部单位"将使该集合在全系统的标签中心可见。</p>
          </div>

          <!-- 使用权限 -->
          <div>
            <label class="block text-sm font-semibold text-on-surface mb-4">使用权限</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              <label
                class="relative flex p-4 border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low"
                :class="form.usage === 'view' ? 'border-primary bg-primary/5' : 'border-outline-variant/30'"
              >
                <input
                  v-model="form.usage"
                  value="view"
                  class="peer sr-only"
                  name="usage"
                  type="radio"
                />
                <div class="flex-1">
                  <p class="text-sm font-bold text-on-surface">只共享</p>
                  <p class="text-xs text-on-surface-variant mt-1">其他单位仅可查看并应用该标签，无法修改标签定义。</p>
                </div>
                <div class="flex items-center justify-center">
                  <div class="h-5 w-5 rounded-full border border-outline-variant flex items-center justify-center" :class="form.usage === 'view' ? 'border-primary' : ''">
                    <div class="h-2.5 w-2.5 rounded-full bg-primary" :class="form.usage === 'view' ? 'opacity-100' : 'opacity-0'"></div>
                  </div>
                </div>
              </label>
              <label
                class="relative flex p-4 border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low"
                :class="form.usage === 'edit' ? 'border-primary bg-primary/5' : 'border-outline-variant/30'"
              >
                <input
                  v-model="form.usage"
                  value="edit"
                  class="peer sr-only"
                  name="usage"
                  type="radio"
                />
                <div class="flex-1">
                  <p class="text-sm font-bold text-on-surface">共享及编辑</p>
                  <p class="text-xs text-on-surface-variant mt-1">授权单位可对集合内的标签进行二次编辑与更新维护。</p>
                </div>
                <div class="flex items-center justify-center">
                  <div class="h-5 w-5 rounded-full border border-outline-variant flex items-center justify-center" :class="form.usage === 'edit' ? 'border-primary' : ''">
                    <div class="h-2.5 w-2.5 rounded-full bg-primary" :class="form.usage === 'edit' ? 'opacity-100' : 'opacity-0'"></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>
    </form>

    <!-- Sticky Footer Action Bar -->
    <div class="fixed bottom-0 right-0 left-64 h-20 bg-white border-t border-outline-variant/20 flex items-center justify-end px-12 space-x-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <button
        @click="cancel"
        class="px-8 py-2.5 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
      >
        取消
      </button>
      <button
        @click="submit"
        class="px-8 py-2.5 bg-primary text-white rounded text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center"
      >
        <span class="material-symbols-outlined mr-2" style="font-size: 16px; font-variation-settings: 'FILL' 1;">check_circle</span>
        确认创建
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tagInput = ref('')
const showSuggestions = ref(false)

const form = ref({
  name: '',
  tags: ['核心企业', '信用等级A', '高新产业'],
  description: '',
  unit: 'self',
  usage: 'view',
})

const suggestions = ['制造业重点监测', '外资背景', '纳税百强', '高新技术企业', '上市公司', '出口贸易']

const filteredSuggestions = computed(() => {
  const q = tagInput.value.trim().toLowerCase()
  return suggestions
    .filter(s => !form.value.tags.includes(s))
    .filter(s => !q || s.toLowerCase().includes(q))
})

const addTag = () => {
  const v = tagInput.value.trim()
  if (v && !form.value.tags.includes(v)) form.value.tags.push(v)
  tagInput.value = ''
}

const submit = () => router.push('/branch-topics')
const cancel = () => router.push('/branch-topics')
</script>
