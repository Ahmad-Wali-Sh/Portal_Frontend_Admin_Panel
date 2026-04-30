import React from 'react'
import OverviewHero from './components/OverviewHero'
import SectionCard from './components/SectionCard'
import SnapshotTable from './components/SnapshotTable'
import { pageSections } from './data/dashboardData'
import { useThemeStore } from '../shared/store/useThemeStore'

export default function DashboardPage() {
  const { isDark } = useThemeStore()

  return (
    <div className="space-y-6">
      <OverviewHero isDark={isDark} />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pageSections.map((section) => (
          <SectionCard key={section.title} section={section} isDark={isDark} />
        ))}
      </div>

      <SnapshotTable isDark={isDark} />
    </div>
  )
}
