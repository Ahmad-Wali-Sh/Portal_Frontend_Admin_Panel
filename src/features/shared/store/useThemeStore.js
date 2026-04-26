import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * useThemeStore
 * Persists dark/light mode preference to localStorage.
 * Applies the "dark" class to <html> so Tailwind dark: variants work.
 */
export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,

      toggleTheme: () =>
        set((state) => {
          const next = !state.isDark
          if (next) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { isDark: next }
        }),

      /** Call once on app boot to sync HTML class with stored value */
      initTheme: () =>
        set((state) => {
          if (state.isDark) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return {}
        }),
    }),
    {
      name: 'portal-theme', // localStorage key
    }
  )
)