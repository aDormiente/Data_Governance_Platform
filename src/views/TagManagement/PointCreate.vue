<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>数据</a-breadcrumb-item>
      <a-breadcrumb-item><a @click.prevent="router.push('/tag-management')">标签管理</a></a-breadcrumb-item>
      <a-breadcrumb-item>新建点位</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">新建点位</a-typography-title>
        <a-typography-text type="secondary">
          录入新的物理点位信息及与标签的映射关系，提交后将进入运维校验流程。
        </a-typography-text>
      </div>
      <a-space :size="10">
        <a-button @click="router.push('/tag-management')">取消</a-button>
        <a-button type="primary" :loading="submitting" @click="handleSubmit">
          <template #icon><CheckOutlined /></template>
          提交创建
        </a-button>
      </a-space>
    </div>

    <a-row :gutter="16" align="top">
      <!-- ===== Left: 基本信息 ===== -->
      <a-col :xs="24" :lg="14">
        <a-card title="基本信息" :body-style="{ padding: '20px 24px 4px' }">
          <a-form
            ref="formRef"
            :model="form"
            :rules="rules"
            layout="vertical"
          >
            <a-row :gutter="16">
              <a-col :xs="24" :sm="12">
                <a-form-item label="点位名称" name="name">
                  <a-input v-model:value="form.name" allow-clear placeholder="如：朝阳路交叉口监控 01" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="12">
                <a-form-item label="点位编号">
                  <a-input
                    value="保存后自动生成"
                    :disabled="true"
                    class="mono-input"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="16">
              <a-col :xs="24" :sm="12">
                <a-form-item label="经度" name="lng">
                  <a-input
                    v-model:value="form.lng"
                    placeholder="例: 116.4074"
                    class="mono-input"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="12">
                <a-form-item label="纬度" name="lat">
                  <a-input
                    v-model:value="form.lat"
                    placeholder="例: 39.9042"
                    class="mono-input"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item label="安装位置" name="location">
              <a-input v-model:value="form.location" allow-clear placeholder="北京市..." />
            </a-form-item>

            <a-row :gutter="16">
              <a-col :xs="24" :sm="12">
                <a-form-item label="设备状态" name="status">
                  <a-select v-model:value="form.status" :options="statusOptions" placeholder="选择设备状态" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="12">
                <a-form-item label="所属部门" name="department">
                  <a-select v-model:value="form.department" :options="departmentOptions" placeholder="选择所属部门" allow-clear />
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item label="点位描述">
              <a-textarea
                v-model:value="form.desc"
                :rows="3"
                :maxlength="200"
                show-count
                placeholder="描述该点位的位置特征、用途、覆盖范围"
              />
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>

      <!-- ===== Right: 关联标签 + 提交流程 ===== -->
      <a-col :xs="24" :lg="10">
        <a-space direction="vertical" :size="16" style="width:100%">
          <a-card title="关联标签" :body-style="{ padding: '20px 24px' }">
            <a-form-item label="选择要关联的标签">
              <a-select
                v-model:value="form.tags"
                mode="multiple"
                :options="tagOptions"
                placeholder="搜索并添加标签..."
              />
            </a-form-item>
            <a-alert
              show-icon
              type="info"
              message="关联后该点位会出现在所选标签的下属点位列表中。"
              style="margin-top: 8px; border-radius: 6px;"
            />
          </a-card>

          <a-card title="提交后的流程" :body-style="{ padding: '8px 0' }">
            <a-steps
              :current="0"
              direction="vertical"
              size="small"
              :items="steps"
              class="flow-steps"
            />
          </a-card>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const formRef = ref()
const submitting = ref(false)

const form = ref({
  name: '',
  lng: '',
  lat: '',
  location: '',
  status: undefined,
  department: undefined,
  desc: '',
  tags: [],
})

const rules = {
  name: [
    { required: true, message: '请输入点位名称', trigger: 'blur' },
    { min: 2, max: 40, message: '长度应在 2-40 个字符之间', trigger: 'blur' },
  ],
  lng: [
    { required: true, message: '请输入经度', trigger: 'blur' },
    { pattern: /^-?\d+(\.\d+)?$/, message: '经度需为有效数字', trigger: 'blur' },
  ],
  lat: [
    { required: true, message: '请输入纬度', trigger: 'blur' },
    { pattern: /^-?\d+(\.\d+)?$/, message: '纬度需为有效数字', trigger: 'blur' },
  ],
  location: [{ required: true, message: '请输入安装位置', trigger: 'blur' }],
  status: [{ required: true, message: '请选择设备状态', trigger: 'change' }],
}

const statusOptions = [
  { label: '在线',   value: '在线' },
  { label: '离线',   value: '离线' },
  { label: '故障',   value: '故障' },
  { label: '维护中', value: '维护中' },
]

const departmentOptions = [
  { label: '城市管理指挥中心', value: '城市管理指挥中心' },
  { label: '公安交管支队',     value: '公安交管支队' },
  { label: '环保监测中心',     value: '环保监测中心' },
  { label: '政务服务管理局',   value: '政务服务管理局' },
]

const tagOptions = [
  { label: '智慧交通', value: '智慧交通' },
  { label: '环境监测', value: '环境监测' },
  { label: '城市安防', value: '城市安防' },
  { label: '人脸识别', value: '人脸识别' },
  { label: '热力感知', value: '热力感知' },
]

const steps = [
  { title: '提交审核', description: '由数据治理组复核坐标与点位名称合法性' },
  { title: '运维校验', description: '检查物理设备连通性与数据采集能力' },
  { title: '发布上线', description: '通过后纳入点位编目并关联至所选标签' },
]

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      message.success('已提交，进入审核流程')
      router.push('/tag-management')
    }, 600)
  } catch {
    message.warning('请完善必填项')
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.crumb {
  font-size: 12px;
}

.crumb a {
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.15s, color 0.15s;
}

.crumb a:hover {
  opacity: 1;
  color: rgb(var(--color-primary));
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

/* Mono input for 经度 / 纬度 / 编号 */
.mono-input :deep(input) {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  letter-spacing: 0.02em;
}

/* Steps */
.flow-steps {
  padding: 0 24px;
}

.flow-steps :deep(.ant-steps-item-title) {
  font-size: 13px;
  font-weight: 600;
}

.flow-steps :deep(.ant-steps-item-description) {
  font-size: 12px !important;
  max-width: 100% !important;
}
</style>
