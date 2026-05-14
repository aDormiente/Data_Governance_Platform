import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'theme'

const readSaved = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'light'
  } catch (e) {
    return 'light'
  }
}

const writeSaved = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch (e) {}
}

export const useThemeStore = defineStore('theme', () => {
  const mode = ref(readSaved())

  const apply = () => {
    const html = document.documentElement
    if (mode.value === 'dark') html.classList.add('dark')
    else html.classList.remove('dark')
    writeSaved(mode.value)
  }

  const toggle = () => {
    mode.value = mode.value === 'light' ? 'dark' : 'light'
    apply()
  }

  const set = (next) => {
    mode.value = next === 'dark' ? 'dark' : 'light'
    apply()
  }

  apply()

  return { mode, toggle, set }
})
