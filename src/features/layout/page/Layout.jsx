import React, { useEffect } from 'react'
import { cn } from '../../../utils/utils'
import { useThemeStore } from '../../shared/store/useThemeStore'
import LayoutSidebar from '../components/LayoutSidebar'
import LayoutHeader from '../components/LayoutHeader'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ── Sidebar collapsed state — persisted separately ────────────────────────────
const useSidebarStore = create(
  persist(
    (set) => ({
      collapsed: false,
      toggle: () => set((s) => ({ collapsed: !s.collapsed })),
    }),
    { name: 'portal-sidebar' }
  )
)

/**
 * Layout
 *
 * Wraps every protected page with:
 *   - LayoutSidebar (left, fixed)
 *   - LayoutHeader  (top, fixed, offset by sidebar width)
 *   - main content area (scrollable, offset by both)
 *
 * Usage:
 *   <Layout>
 *     <YourPageContent />
 *   </Layout>
 */
export default function Layout({ children }) {
  const { isDark, toggleTheme, initTheme } = useThemeStore()
  const { collapsed, toggle } = useSidebarStore()

  // Sync HTML class on first mount
  useEffect(() => {
    initTheme()
  }, [initTheme])

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-300',
        isDark ? 'bg-gray-950' : 'bg-muted'
      )}
    >
      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <LayoutSidebar collapsed={collapsed} isDark={isDark} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <LayoutHeader
        collapsed={collapsed}
        onToggle={toggle}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* ── Main content area ──────────────────────────────────────────── */}
      <main
        className={cn(
          'transition-all duration-300 pt-16', // offset for fixed header
          collapsed ? 'pl-16' : 'pl-[240px]'   // offset for fixed sidebar
        )}
      >
        {/* Inner content wrapper */}
        <div
          className={cn(
            'min-h-[calc(100vh-4rem)] p-6',
            isDark ? 'text-gray-100' : 'text-foreground'
          )}
        >
          <div className="max-w-[1400px] mx-auto animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}