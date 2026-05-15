<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>数据</a-breadcrumb-item>
      <a-breadcrumb-item><a @click.prevent="router.push('/branch-topics')">标签共享</a></a-breadcrumb-item>
      <a-breadcrumb-item>新建集合</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">新建标签集合</a-typography-title>
        <a-typography-text type="secondary">
          创建并配置数据标签的共享属性与使用权限。
        </a-typography-text>
      </div>
      <a-space :size="10">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="submit">
          <template #icon><CheckCircleOutlined /></template>
          确认创建
        </a-button>
      </a-space>
    </div>

    <a-form
      ref="formRef"
      layout="vertical"
      :model="form"
      :rules="rules"
      class="collection-form"
    >
      <a-card title="01 基本信息" class="section-card" :body-style="{ padding: '20px' }">
        <a-form-item label="标签集合名称" name="name" class="field-main">
          <a-input
            v-model:value="form.name"
            placeholder="请输入集合名称，例如：季度财务分析标签组"
            allow-clear
          />
        </a-form-item>

        <a-form-item label="关联标签" name="tags" class="field-main">
          <a-select
            v-model:value="form.tags"
            mode="tags"
            show-search
            :options="filteredSuggestions"
            :filter-option="filterOption"
            option-filter-prop="label"
            placeholder="搜索并添加标签..."
            @search="tagSearch = $event"
            @change="tagSearch = ''"
          />
        </a-form-item>

        <a-form-item label="共享描述" name="description" class="field-large">
          <a-textarea
            v-model:value="form.description"
            :rows="4"
            placeholder="请详细说明该标签集合的应用场景、数据来源及共享目的..."
          />
        </a-form-item>
      </a-card>

      <a-card title="02 权限配置" class="section-card" :body-style="{ padding: '20px' }">
        <a-form-item label="管线单位权限" name="unit">
          <a-radio-group v-model:value="form.unit">
            <a-radio value="all">全部单位</a-radio>
            <a-radio value="self">本单位（默认）</a-radio>
          </a-radio-group>
          <a-typography-text type="secondary" class="unit-hint">
            选择"全部单位"将使该集合在全系统的标签中心可见。
          </a-typography-text>
        </a-form-item>

        <a-form-item label="使用权限" name="usage" class="usage-form-item">
          <a-radio-group v-model:value="form.usage" class="usage-group">
            <a-row :gutter="16">
              <a-col :xs="24" :md="12">
                <a-card
                  class="usage-card"
                  :class="{ 'usage-card-active': form.usage === 'view' }"
                  :body-style="{ padding: '16px' }"
                  @click="form.usage = 'view'"
                >
                  <a-radio value="view">
                    <span class="usage-title">只共享</span>
                  </a-radio>
                  <a-typography-paragraph class="usage-desc">
                    其他单位仅可查看并应用该标签，无法修改标签定义。
                  </a-typography-paragraph>
                </a-card>
              </a-col>

              <a-col :xs="24" :md="12">
                <a-card
                  class="usage-card"
                  :class="{ 'usage-card-active': form.usage === 'edit' }"
                  :body-style="{ padding: '16px' }"
                  @click="form.usage = 'edit'"
                >
                  <a-radio value="edit">
                    <span class="usage-title">共享及编辑</span>
                  </a-radio>
                  <a-typography-paragraph class="usage-desc">
                    授权单位可对集合内的标签进行二次编辑与更新维护。
                  </a-typography-paragraph>
                </a-card>
              </a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>
      </a-card>
    </a-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircleOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const formRef = ref()
const tagSearch = ref('')

const form = ref({
  name: '',
  tags: ['核心企业', '信用等级A', '高新产业'],
  description: '',
  unit: 'self',
  usage: 'view',
})

const suggestions = ['制造业重点监测', '外资背景', '纳税百强', '高新技术企业', '上市公司', '出口贸易']

const filteredSuggestions = computed(() => {
  const q = tagSearch.value.trim().toLowerCase()
  return suggestions
    .filter(s => !form.value.tags.includes(s))
    .filter(s => !q || s.toLowerCase().includes(q))
    .map(s => ({ label: s, value: s }))
})

const filterOption = (input, option) =>
  String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())

const rules = {
  name: [{ required: true, message: '请输入集合名称', trigger: 'blur' }],
  tags: [{ required: true, type: 'array', message: '请选择关联标签', trigger: 'change' }],
}

const submit = async () => {
  try {
    await formRef.value?.validate()
    router.push('/branch-topics')
  } catch {
    // antd form displays field-level validation messages
  }
}

const cancel = () => router.push('/branch-topics')
</script>

<style scoped>
.page {
  --primary-color: #1138e0;
  --border-soft: rgba(0, 0, 0, 0.06);
  --usage-active-bg: rgba(17, 56, 224, 0.05);
  --usage-desc-color: rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

:global(.dark) .page {
  --primary-color: #6d8cff;
  --border-soft: rgba(255, 255, 255, 0.08);
  --usage-active-bg: rgba(109, 140, 255, 0.12);
  --usage-desc-color: rgba(255, 255, 255, 0.58);
}

.crumb {
  font-size: 12px;
}

.crumb a {
  color: inherit;
  opacity: 0.7;
}

.crumb a:hover {
  color: rgb(var(--color-primary));
  opacity: 1;
}

.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.page-title {
  margin: 0 0 4px !important;
}

.collection-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 960px;
}

.section-card :deep(.ant-card-head-title) {
  font-weight: 600;
}

.field-main {
  max-width: 640px;
}

.field-large {
  max-width: 720px;
  margin-bottom: 0;
}

.unit-hint {
  display: block;
  margin-top: 8px;
  font-size: 12px;
}

.usage-form-item {
  margin-bottom: 0;
}

.usage-group {
  width: 100%;
}

.usage-card {
  height: 100%;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.usage-card-active {
  border-color: var(--primary-color) !important;
  background: var(--usage-active-bg);
}

.usage-title {
  font-weight: 600;
}

.usage-desc {
  margin: 8px 0 0 24px !important;
  color: var(--usage-desc-color);
  font-size: 12px;
  line-height: 1.7;
}
</style>
