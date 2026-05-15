<template>
  <div class="page">
    <a-breadcrumb class="crumb">
      <a-breadcrumb-item>数据</a-breadcrumb-item>
      <a-breadcrumb-item><a @click.prevent="router.push('/tag-management')">标签管理</a></a-breadcrumb-item>
      <a-breadcrumb-item>新建标签</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page-head">
      <div>
        <a-typography-title :level="3" class="page-title">新建标签</a-typography-title>
        <a-typography-text type="secondary">
          通过定义基本属性与物理映射规则来创建新的治理标签，提交后将进入审计流程并由数据治理组复核。
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
      <!-- ===== Left: 基本信息 + 治理规则 ===== -->
      <a-col :xs="24" :lg="14">
        <a-space direction="vertical" :size="16" style="width:100%">
          <a-card title="基本信息" :body-style="{ padding: '20px 24px 4px' }">
            <a-form
              ref="formRef"
              :model="form"
              :rules="rules"
              layout="vertical"
            >
              <a-row :gutter="16">
                <a-col :xs="24" :sm="12">
                  <a-form-item label="标签名称" name="name">
                    <a-input v-model:value="form.name" allow-clear placeholder="如：常住人口标识" />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12">
                  <a-form-item label="英文标识" name="enId">
                    <a-input
                      v-model:value="form.enId"
                      allow-clear
                      placeholder="如：LABEL_RESIDENT_POP"
                      class="mono-input"
                    />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="16">
                <a-col :xs="24" :sm="12">
                  <a-form-item label="标签分类" name="category">
                    <a-select
                      v-model:value="form.category"
                      :options="categoryOptions"
                      placeholder="请选择分类"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12">
                  <a-form-item label="更新周期">
                    <a-radio-group v-model:value="form.cycle" button-style="solid">
                      <a-radio-button value="按天">按天</a-radio-button>
                      <a-radio-button value="按周">按周</a-radio-button>
                      <a-radio-button value="按月">按月</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-form-item label="标签描述" name="desc">
                <a-textarea
                  v-model:value="form.desc"
                  :rows="3"
                  :maxlength="200"
                  show-count
                  placeholder="描述该标签的业务含义与应用场景"
                />
              </a-form-item>
            </a-form>

            <a-alert
              show-icon
              type="info"
              message="智能预测结果"
              description="基于元数据关联度，该标签创建后预计属于「高频」级别。"
              style="margin: 4px 0 20px"
            />
          </a-card>

          <a-card title="治理规则" :body-style="{ padding: 0 }">
            <a-list :data-source="governanceRules" :split="true">
              <template #renderItem="{ item }">
                <a-list-item class="rule-item">
                  <a-list-item-meta>
                    <template #avatar>
                      <a-avatar
                        shape="square"
                        :size="36"
                        :style="{ background: 'rgba(17, 56, 224, 0.08)', color: '#1138e0' }"
                      >
                        <template #icon><component :is="item.icon" /></template>
                      </a-avatar>
                    </template>
                    <template #title>
                      <a-typography-text strong>{{ item.title }}</a-typography-text>
                    </template>
                    <template #description>
                      <a-typography-text type="secondary" :style="{ fontSize: '12px' }">{{ item.desc }}</a-typography-text>
                    </template>
                  </a-list-item-meta>
                  <template #extra>
                    <a-switch v-model:checked="form[item.key]" />
                  </template>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </a-space>
      </a-col>

      <!-- ===== Right: 关联点位 + 数据质量预览 ===== -->
      <a-col :xs="24" :lg="10">
        <a-space direction="vertical" :size="16" style="width:100%">
          <a-card title="关联点位" :body-style="{ padding: '16px 0 0' }">
            <template #extra>
              <a-space :size="8">
                <a-tag color="blue" :bordered="false">{{ pointData.length }} 个点位</a-tag>
                <a-button type="link" size="small">
                  <template #icon><PlusOutlined /></template>
                  添加点位
                </a-button>
              </a-space>
            </template>

            <a-alert
              show-icon
              type="info"
              message="点位管理能够确保标签数据的来源透明可追溯。"
              :style="{ margin: '0 24px 16px', borderRadius: '6px' }"
            />

            <a-table
              :columns="pointColumns"
              :data-source="pointData"
              :pagination="false"
              :row-key="r => r.id"
              size="middle"
              class="content-table"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <a-space :size="10">
                    <a-avatar
                      shape="square"
                      :size="28"
                      :style="{ background: 'rgba(17, 56, 224, 0.08)', color: '#1138e0' }"
                    >
                      <template #icon><EnvironmentOutlined /></template>
                    </a-avatar>
                    <a-typography-text strong :style="{ fontSize: '13px' }">{{ record.name }}</a-typography-text>
                  </a-space>
                </template>
                <template v-else-if="column.key === 'field'">
                  <a-typography-text code :style="{ fontSize: '11px' }">{{ record.field }}</a-typography-text>
                </template>
                <template v-else-if="column.key === 'mapType'">
                  <a-tag :color="record.mapType === '直接映射' ? 'blue' : 'orange'" :bordered="false">
                    {{ record.mapType }}
                  </a-tag>
                </template>
                <template v-else-if="column.key === 'status'">
                  <a-badge
                    :status="record.status === '已校验' ? 'success' : 'warning'"
                    :text="record.status"
                  />
                </template>
                <template v-else-if="column.key === 'action'">
                  <a-button type="link" size="small" danger class="row-actions" @click="removePoint(record.id)">移除</a-button>
                </template>
              </template>
            </a-table>
          </a-card>

          <a-card title="数据质量预览" :body-style="{ padding: '20px' }">
            <a-row :gutter="12">
              <a-col :span="8">
                <a-statistic
                  title="已配置点位"
                  :value="pointData.length"
                  :value-style="{ fontSize: '26px', fontWeight: 600, color: '#1138e0', letterSpacing: '-0.02em' }"
                />
              </a-col>
              <a-col :span="8">
                <a-statistic
                  title="已校验"
                  :value="verifiedCount"
                  :value-style="{ fontSize: '26px', fontWeight: 600, color: '#52c41a', letterSpacing: '-0.02em' }"
                />
              </a-col>
              <a-col :span="8">
                <a-statistic
                  title="待校验"
                  :value="pendingCount"
                  :value-style="{ fontSize: '26px', fontWeight: 600, color: '#faad14', letterSpacing: '-0.02em' }"
                />
              </a-col>
            </a-row>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  CheckOutlined,
  PlusOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  AlertOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()
const formRef = ref()
const submitting = ref(false)

const form = ref({
  name: '',
  enId: '',
  category: undefined,
  cycle: '按天',
  desc: '',
  mask: true,
  monitor: false,
  exportMask: false,
})

const rules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 2, max: 40, message: '长度应在 2-40 个字符之间', trigger: 'blur' },
  ],
  enId: [
    { required: true, message: '请输入英文标识', trigger: 'blur' },
    { pattern: /^[A-Z][A-Z0-9_]*$/, message: '仅允许大写字母、数字、下划线，且以字母开头', trigger: 'blur' },
  ],
  category: [{ required: true, message: '请选择标签分类', trigger: 'change' }],
}

const categoryOptions = [
  { label: '人口基础', value: '人口基础' },
  { label: '法人单位', value: '法人单位' },
  { label: '空间地理', value: '空间地理' },
  { label: '电子证照', value: '电子证照' },
  { label: '资产资源', value: '资产资源' },
  { label: '社会信用', value: '社会信用' },
]

const governanceRules = [
  { key: 'mask',       title: '数据脱敏',     desc: '对身份证、手机号等敏感字段自动掩码处理',     icon: SafetyCertificateOutlined },
  { key: 'monitor',    title: '异常数据监控', desc: '字段波动率超过 15% 时触发治理告警',          icon: AlertOutlined },
  { key: 'exportMask', title: '导出脱敏',     desc: '对外导出数据中的敏感字段执行脱敏',           icon: EyeInvisibleOutlined },
]

const pointData = ref([
  { id: 1, name: '身份标识码', field: 't_population_base.id_num', mapType: '直接映射', status: '已校验' },
  { id: 2, name: '居住地址',   field: 't_address_lib.full_text',  mapType: '清洗转换', status: '待校验' },
  { id: 3, name: '联系方式',   field: 't_population_base.mobile', mapType: '直接映射', status: '已校验' },
])

const pointColumns = [
  { key: 'name',    title: '点位名称', width: 130 },
  { key: 'field',   title: '物理字段' },
  { key: 'mapType', title: '映射',     width: 90 },
  { key: 'status',  title: '状态',     width: 90 },
  { key: 'action',  title: '',         width: 64, align: 'right' },
]

const verifiedCount = computed(() => pointData.value.filter(p => p.status === '已校验').length)
const pendingCount = computed(() => pointData.value.filter(p => p.status === '待校验').length)

const removePoint = (id) => {
  pointData.value = pointData.value.filter(p => p.id !== id)
}

const steps = [
  { title: '提交审核', description: '由数据治理组复核命名规范与重复性' },
  { title: '点位校验', description: '检查关联物理字段可达性与映射规则' },
  { title: '发布上线', description: '通过后进入标签编目，对外可见' },
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

/* Mono input for 英文标识 */
.mono-input :deep(input) {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  letter-spacing: 0.02em;
}

/* Governance rule list */
.rule-item {
  padding: 14px 24px !important;
}

/* Content table tweaks */
.content-table :deep(.ant-table-thead > tr > th) {
  font-size: 12px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.015);
}

:global(.dark) .content-table :deep(.ant-table-thead > tr > th) {
  background: rgba(255, 255, 255, 0.025);
}

.content-table :deep(.ant-table-tbody > tr > td) {
  padding-top: 14px;
  padding-bottom: 14px;
}

.content-table :deep(.ant-table-tbody > tr) .row-actions {
  opacity: 0;
  transition: opacity 0.15s;
}

.content-table :deep(.ant-table-tbody > tr:hover) .row-actions {
  opacity: 1;
}

/* Statistic title */
:deep(.ant-statistic-title) {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.65;
  margin-bottom: 6px;
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
