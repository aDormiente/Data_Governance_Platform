<template>
  <div class="pb-24">
    <div class="flex items-center gap-3 text-on-surface-variant font-mono text-[11px] tracking-wider mb-3">
      <span class="text-primary">»</span>
      <span class="cursor-pointer hover:text-primary transition-colors">标签管理</span>
      <span class="opacity-40">/</span>
      <span class="text-on-surface">新建</span>
    </div>
    <h1 class="font-display text-[30px] font-semibold tracking-tight text-on-surface leading-[1.05]">新建标签</h1>
    <p class="text-[13px] text-on-surface-variant mt-2 max-w-2xl">通过定义基本属性与物理映射规则来创建新的治理标签。</p>

    <div class="mt-8 grid grid-cols-12 gap-6">
      <div class="col-span-12 lg:col-span-5 flex flex-col gap-6">
        <div class="bg-surface-container-lowest rounded-xl shadow-sm p-6 bento-shadow">
          <div class="flex items-center gap-2 mb-6">
            <span class="w-1 h-5 bg-primary rounded-full"></span>
            <span class="text-xs font-black tracking-widest text-primary uppercase">01 基本信息</span>
          </div>

          <div class="space-y-5">
            <div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                标签名称 <span class="text-tertiary">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="输入标签名称 (如: 常住人口)"
                class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>

            <div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                英文标识 <span class="text-tertiary">*</span>
              </label>
              <input
                v-model="form.enId"
                type="text"
                placeholder="如: LABEL_RESIDENT_POP"
                class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/50 font-mono tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                style="font-family: 'JetBrains Mono', 'Fira Mono', 'Courier New', monospace"
              />
            </div>

            <div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">标签分类</label>
              <div class="relative">
                <select
                  v-model="form.category"
                  class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 pr-10 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all appearance-none"
                >
                  <option value="" disabled>请选择分类</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style="font-size: 18px">expand_more</span>
              </div>
            </div>

            <div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-2">更新周期</label>
              <div class="flex gap-2">
                <button
                  v-for="cycle in cycles"
                  :key="cycle"
                  @click="updateCycle = cycle"
                  :class="[
                    'flex-1 py-2 rounded-lg text-sm font-medium border transition-all',
                    updateCycle === cycle
                      ? 'bg-primary text-on-primary border-primary shadow-sm shadow-primary/20'
                      : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:border-primary/30 hover:text-primary'
                  ]"
                >{{ cycle }}</button>
              </div>
            </div>

            <div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">标签描述</label>
              <textarea
                v-model="form.desc"
                rows="4"
                placeholder="描述该标签的业务含义及应用场景..."
                class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div class="my-6 border-t border-surface-container-low"></div>

          <div>
            <label class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-3">标签热度预测</label>
            <div class="bg-primary-fixed rounded-xl p-4 flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-primary" style="font-size: 18px; font-variation-settings: 'FILL' 1">trending_up</span>
              </div>
              <div>
                <p class="text-xs font-bold text-on-primary-fixed-variant mb-0.5">智能预测结果</p>
                <p class="text-sm text-on-primary-fixed-variant/80 leading-relaxed">基于元数据关联度，该标签创建后属于「高频」级别</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-surface-container-lowest rounded-xl shadow-sm p-6 bento-shadow">
          <div class="flex items-center gap-2 mb-5">
            <span class="w-1 h-5 bg-tertiary rounded-full"></span>
            <span class="text-xs font-black tracking-widest text-on-surface-variant uppercase">治理规则设置 (可选)</span>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="border border-outline-variant/20 rounded-xl p-4 bg-surface hover:border-primary/20 transition-colors">
              <div class="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center mb-3">
                <span class="material-symbols-outlined text-on-secondary-container" style="font-size: 18px">security</span>
              </div>
              <p class="text-sm font-bold text-on-surface mb-1.5">数据脱敏规则</p>
              <p class="text-[11px] text-on-surface-variant leading-relaxed mb-4">自动对身份证、手机号等敏感信息进行掩码处理</p>
              <button class="w-full py-1.5 text-xs font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">配置规则</button>
            </div>

            <div class="border border-outline-variant/20 rounded-xl p-4 bg-surface hover:border-primary/20 transition-colors">
              <div class="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center mb-3">
                <span class="material-symbols-outlined text-on-tertiary-fixed-variant" style="font-size: 18px">monitor_heart</span>
              </div>
              <p class="text-sm font-bold text-on-surface mb-1.5">异常数据监控</p>
              <p class="text-[11px] text-on-surface-variant leading-relaxed mb-4">当点位字段波动率超过 15% 时触发治理告警</p>
              <div class="flex items-center gap-2">
                <button
                  @click="monitorEnabled = !monitorEnabled"
                  :class="[
                    'relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    monitorEnabled ? 'bg-primary' : 'bg-outline-variant/40'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-surface-container-lowest shadow ring-0 transition duration-200 ease-in-out',
                      monitorEnabled ? 'translate-x-4' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
                <span class="text-[11px] font-medium text-on-surface-variant">开启监控</span>
              </div>
            </div>
          </div>

          <div class="mt-4 border border-outline-variant/20 rounded-xl p-4 bg-surface">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center">
                  <span class="material-symbols-outlined text-on-secondary-container" style="font-size: 18px">security</span>
                </div>
                <div>
                  <p class="text-sm font-bold text-on-surface">字段脱敏开关</p>
                  <p class="text-[11px] text-on-surface-variant">对导出数据中的敏感字段自动执行脱敏</p>
                </div>
              </div>
              <button
                @click="maskEnabled = !maskEnabled"
                :class="[
                  'relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                  maskEnabled ? 'bg-primary' : 'bg-outline-variant/40'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-surface-container-lowest shadow ring-0 transition duration-200 ease-in-out',
                    maskEnabled ? 'translate-x-4' : 'translate-x-0'
                  ]"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-7">
        <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden bento-shadow">
          <div class="px-6 py-5 border-b border-surface-container-low bg-surface-container-low/20 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <h3 class="font-bold text-on-surface">下属点位管理</h3>
              <span class="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">{{ pointData.length }}个点位</span>
            </div>
            <button class="px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-medium text-xs flex items-center gap-1.5 shadow shadow-primary/20 hover:opacity-90 transition-all">
              <span class="material-symbols-outlined" style="font-size: 14px">add</span>
              添加关联点位
            </button>
          </div>

          <div class="px-6 py-3 border-b border-surface-container-low bg-primary-fixed/40">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" style="font-size: 15px">info</span>
              <p class="text-xs text-on-primary-fixed-variant">点位管理能够确保标签数据的来源透明可追溯</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface-container-low/30">
                  <th class="px-5 py-3.5 text-[10px] font-black text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low whitespace-nowrap">点位名称</th>
                  <th class="px-5 py-3.5 text-[10px] font-black text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low whitespace-nowrap">物理表/字段</th>
                  <th class="px-5 py-3.5 text-[10px] font-black text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low whitespace-nowrap">映射</th>
                  <th class="px-5 py-3.5 text-[10px] font-black text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low whitespace-nowrap">类型</th>
                  <th class="px-5 py-3.5 text-[10px] font-black text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low whitespace-nowrap">状态</th>
                  <th class="px-5 py-3.5 text-[10px] font-black text-on-surface-variant uppercase tracking-wider border-b border-surface-container-low whitespace-nowrap text-right">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container-low">
                <tr
                  v-for="point in pointData"
                  :key="point.id"
                  class="hover:bg-surface-container-low/30 transition-colors group"
                >
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-primary" style="font-size: 13px; font-variation-settings: 'FILL' 1">location_on</span>
                      </div>
                      <span class="text-sm font-semibold text-on-surface whitespace-nowrap">{{ point.name }}</span>
                    </div>
                  </td>
                  <td class="px-5 py-4">
                    <span class="text-xs font-mono text-on-surface-variant bg-surface-container-low px-2 py-1 rounded whitespace-nowrap" style="font-family: 'JetBrains Mono', 'Fira Mono', 'Courier New', monospace">{{ point.table }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap',
                        point.mapType === '直接映射'
                          ? 'bg-primary-fixed text-on-primary-fixed-variant'
                          : 'bg-warning-container text-on-warning-container'
                      ]"
                    >{{ point.mapType }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <span class="text-xs font-mono text-on-surface-variant whitespace-nowrap" style="font-family: 'JetBrains Mono', 'Fira Mono', 'Courier New', monospace">{{ point.colType }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <span
                      :class="[
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap',
                        point.status === '已校验'
                          ? 'bg-success-container text-on-success-container'
                          : 'bg-warning-container text-on-warning-container'
                      ]"
                    >
                      <span
                        :class="[
                          'w-1.5 h-1.5 rounded-full',
                          point.status === '已校验' ? 'bg-success' : 'bg-warning'
                        ]"
                      ></span>
                      {{ point.status }}
                    </span>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button
                      @click="removePoint(point.id)"
                      class="text-xs font-medium text-on-surface-variant hover:text-tertiary transition-colors px-2 py-1 rounded hover:bg-tertiary-fixed"
                    >移除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-6 py-4 border-t border-surface-container-low bg-surface-container-low/10 flex items-center gap-2">
            <span class="material-symbols-outlined text-on-surface-variant" style="font-size: 15px">table_chart</span>
            <p class="text-xs text-on-surface-variant">当前已添加 <span class="font-bold text-primary">{{ pointData.length }}</span> 个物理映射点位</p>
          </div>
        </div>

        <div class="mt-6 bg-surface-container-lowest rounded-xl shadow-sm p-6 bento-shadow">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-1 h-5 bg-primary rounded-full"></span>
            <span class="text-xs font-black tracking-widest text-on-surface-variant uppercase">数据质量预览</span>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-surface-container-low rounded-xl p-4 text-center">
              <p class="text-2xl font-black text-primary">{{ pointData.length }}</p>
              <p class="text-[11px] text-on-surface-variant mt-1">已配置点位</p>
            </div>
            <div class="bg-surface-container-low rounded-xl p-4 text-center">
              <p class="text-2xl font-black text-on-success-container">{{ pointData.filter(p => p.status === '已校验').length }}</p>
              <p class="text-[11px] text-on-surface-variant mt-1">已校验点位</p>
            </div>
            <div class="bg-surface-container-low rounded-xl p-4 text-center">
              <p class="text-2xl font-black text-on-warning-container">{{ pointData.filter(p => p.status === '待校验').length }}</p>
              <p class="text-[11px] text-on-surface-variant mt-1">待校验点位</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 left-64 right-0 z-40 bg-surface-container-lowest border-t border-outline-variant px-8 py-4 flex items-center justify-between">
      <p class="text-[10px] text-on-surface-variant/60 font-mono tracking-wide">
        政务数据标准化体系 V4.2 · 密级：内部公开 · ID: TAG_GEN_002931_BETA
      </p>
      <div class="flex items-center gap-3">
        <button
          @click="router.push('/tag-management')"
          class="px-5 py-2 border border-outline-variant text-on-surface-variant text-sm hover:border-primary hover:text-primary transition-colors"
        >取消</button>
        <button
          :disabled="!form.name || !form.enId"
          :class="[
            'px-6 py-2 text-sm font-bold transition-all flex items-center gap-2',
            form.name && form.enId
              ? 'bg-primary text-on-primary hover:opacity-90'
              : 'bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed'
          ]"
        >
          <span class="material-symbols-outlined" style="font-size: 15px">check_circle</span>
          确认创建
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({ name: '', enId: '', category: '', desc: '' })
const updateCycle = ref('按天')
const maskEnabled = ref(false)
const monitorEnabled = ref(false)

const cycles = ['按天', '按周', '按月']
const categories = ['政务/人口数据', '城市治理/交通', '社会管理/民生', '产业发展/市场监管']

const pointData = ref([
  { id: 1, name: '身份标识码', table: 't_population_base.id_num', mapType: '直接映射', colType: 'ID_CARD_NUM', status: '已校验' },
  { id: 2, name: '居住地址', table: 't_address_lib.full_text', mapType: '清洗转换', colType: 'RESIDENT_ADDR', status: '待校验' },
  { id: 3, name: '联系方式', table: 't_population_base.mobile', mapType: '直接映射', colType: 'PHONE_CONTACT', status: '已校验' },
])

const removePoint = (id) => {
  pointData.value = pointData.value.filter(p => p.id !== id)
}
</script>
