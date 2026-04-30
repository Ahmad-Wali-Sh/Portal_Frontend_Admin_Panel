import React from 'react'
import { CalendarDays } from 'lucide-react'
import { cn } from '../../../utils/utils'
import { quickStats, toneClasses } from '../data/dashboardData'

export default function OverviewHero({ isDark }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border p-6 md:p-8',
        isDark
          ? 'border-gray-800 bg-gray-900'
          : 'border-primary-100 bg-linear-to-br from-white via-primary-50 to-secondary-50'
      )}
    >
      <div className="relative z-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-primary-700">
            <CalendarDays size={14} />
            Today academy overview
          </div>
          <h1 className={cn('max-w-3xl text-3xl font-black tracking-tight md:text-4xl', isDark ? 'text-white' : 'text-gray-950')}>
            Dashboard Center
          </h1>
          <p className={cn('mt-3 max-w-2xl text-sm leading-6 md:text-base', isDark ? 'text-gray-300' : 'text-gray-600')}>
            This page now stays clean: it shows small examples only. Use the buttons to open the full teacher, student, course, and overall dashboard pages.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((item) => {
            const Icon = item.icon
            const tone = toneClasses[item.tone]
            return (
              <div
                key={item.label}
                className={cn(
                  'rounded-2xl border p-4',
                  isDark ? 'border-gray-800 bg-gray-950/50' : 'border-white bg-white/80'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn('grid size-8 place-items-center rounded-xl', tone.icon)}>
                    <Icon size={16} />
                  </span>
                  <span className={cn('text-xs font-semibold', isDark ? 'text-gray-300' : 'text-gray-500')}>{item.label}</span>
                </div>
                <p className={cn('mt-3 text-2xl font-black', isDark ? 'text-white' : 'text-gray-950')}>{item.value}</p>
                <p className={cn('mt-1 text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>{item.helper}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
