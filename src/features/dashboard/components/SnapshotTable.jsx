import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '../../../utils/utils'
import { topStudents } from '../data/dashboardData'
import DashboardCard from './DashboardCard'
import { WeeklyAttendanceArea } from './DashboardCharts'

export default function SnapshotTable({ isDark }) {
  return (
    <DashboardCard isDark={isDark}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-gray-950')}>Small dashboard example</h2>
          <p className={cn('mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Only a quick sample here. Open the full pages for deep analytics.</p>
        </div>
        <span className="rounded-full bg-secondary-50 px-3 py-1 text-xs font-bold text-secondary-700">Live mock data</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <WeeklyAttendanceArea isDark={isDark} />

        <div className="space-y-3">
          {topStudents.map((student, index) => (
            <div
              key={student.name}
              className={cn(
                'flex items-center justify-between rounded-2xl border p-4',
                isDark ? 'border-gray-800 bg-gray-950/40' : 'border-gray-100 bg-gray-50'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-50 text-sm font-black text-accent-700">#{index + 1}</span>
                <div>
                  <p className={cn('font-bold', isDark ? 'text-white' : 'text-gray-950')}>{student.name}</p>
                  <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>{student.course}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-secondary-600">{student.score}%</p>
                <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>{student.attendance}</p>
              </div>
            </div>
          ))}
          <Link to="/dashboard/students/top-students" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm font-bold text-primary-700 hover:bg-primary-100">
            View top students page <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </DashboardCard>
  )
}
