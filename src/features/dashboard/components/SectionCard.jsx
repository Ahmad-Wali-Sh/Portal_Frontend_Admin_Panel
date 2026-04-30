import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '../../../utils/utils'
import { toneClasses } from '../data/dashboardData'
import DashboardCard from './DashboardCard'
import { SectionPreviewChart } from './DashboardCharts'

export default function SectionCard({ section, isDark }) {
  const Icon = section.icon
  const tone = toneClasses[section.tone]

  return (
    <DashboardCard isDark={isDark} className="flex h-full flex-col gap-5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={cn('grid size-12 place-items-center rounded-2xl', tone.icon)}>
            <Icon size={22} />
          </span>
          <div>
            <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-gray-950')}>{section.title}</h2>
            <p className={cn('mt-1 text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>{section.label}</p>
          </div>
        </div>
        <span className={cn('rounded-full border px-3 py-1 text-sm font-black', tone.badge)}>{section.value}</span>
      </div>

      <p className={cn('text-sm leading-6', isDark ? 'text-gray-300' : 'text-gray-600')}>{section.description}</p>

      <SectionPreviewChart section={section} isDark={isDark} />

      <div className="grid gap-2">
        {section.children.map((child) => (
          <Link
            key={child.path}
            to={child.path}
            className={cn(
              'flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-semibold transition',
              isDark
                ? 'border-gray-800 bg-gray-950/40 text-gray-200 hover:border-primary-700 hover:text-primary-300'
                : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700'
            )}
          >
            {child.label}
            <ArrowRight size={15} />
          </Link>
        ))}
      </div>

      <Link
        to={section.path}
        className={cn(
          'mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition',
          section.tone === 'blue' && 'bg-primary-600 text-white hover:bg-primary-700',
          section.tone === 'green' && 'bg-secondary-600 text-white hover:bg-secondary-700',
          section.tone === 'violet' && 'bg-violet-600 text-white hover:bg-violet-700',
          section.tone === 'amber' && 'bg-accent-500 text-white hover:bg-accent-600'
        )}
      >
        {section.action}
        <ArrowRight size={16} />
      </Link>
    </DashboardCard>
  )
}
