import React from 'react'
import { cn } from '../../../utils/utils'

export default function DashboardCard({ children, className, isDark }) {
  return (
    <section
      className={cn(
        'rounded-2xl border p-5 transition-all duration-200',
        isDark
          ? 'border-gray-800 bg-gray-900/75 text-gray-100'
          : 'border-border bg-white text-foreground shadow-[0_20px_50px_rgba(15,23,42,0.04)]',
        className
      )}
    >
      {children}
    </section>
  )
}
