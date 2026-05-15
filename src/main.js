import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import router from './router'
import App from './App.vue'
import { useThemeStore } from './stores/theme'

import 'ant-design-vue/dist/reset.css'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(Antd)
app.use(router)

useThemeStore()

app.mount('#app')
