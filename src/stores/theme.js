import { defineStore } from 'pinia'
import { ref, nextTick } from 'vue'

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

  const commit = (next) => {
    mode.value = next === 'dark' ? 'dark' : 'light'
    apply()
  }

  const supportsViewTransitions = () =>
    typeof document !== 'undefined' && typeof document.startViewTransition === 'function'

  const set = (next, event) => {
    const target = next === 'dark' ? 'dark' : 'light'
    if (mode.value === target) return

    if (!supportsViewTransitions()) {
      commit(target)
      return
    }

    // Click point — fall back to bottom-left where the toggle lives
    const x = event?.clientX ?? 100
    const y = event?.clientY ?? window.innerHeight - 100
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(async () => {
      commit(target)
      await nextTick()
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  const toggle = (event) => set(mode.value === 'light' ? 'dark' : 'light', event)

  apply()

  return { mode, toggle, set }
})
