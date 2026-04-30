import React from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { colors, courseGrowth, overallMix, weeklyAttendance } from '../data/dashboardData'

function useChartTheme(isDark) {
  return {
    axis: isDark ? '#CBD5E1' : '#64748B',
    grid: isDark ? 'rgba(148, 163, 184, 0.16)' : '#E5E7EB',
    tooltipBg: isDark ? '#0F172A' : '#FFFFFF',
    tooltipBorder: isDark ? '#334155' : '#E5E7EB',
    tooltipText: isDark ? '#E2E8F0' : '#0F172A',
  }
}

export function ChartTooltip({ isDark }) {
  const theme = useChartTheme(isDark)
  return (
    <Tooltip
      cursor={{ fill: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(37, 99, 235, 0.06)' }}
      contentStyle={{
        background: theme.tooltipBg,
        border: `1px solid ${theme.tooltipBorder}`,
        borderRadius: 12,
        color: theme.tooltipText,
        boxShadow: 'none',
      }}
      labelStyle={{ color: theme.tooltipText, fontWeight: 700 }}
      itemStyle={{ color: theme.tooltipText }}
    />
  )
}

function MiniLine({ isDark }) {
  const theme = useChartTheme(isDark)
  return (
    <div className="h-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weeklyAttendance} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid stroke={theme.grid} vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 11 }} />
          <YAxis hide />
          <ChartTooltip isDark={isDark} />
          <Line type="monotone" dataKey="students" stroke={colors.blue} strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="absent" stroke={colors.red} strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function MiniBars({ isDark }) {
  const theme = useChartTheme(isDark)
  return (
    <div className="h-28">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={courseGrowth} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid stroke={theme.grid} vertical={false} />
          <XAxis dataKey="course" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 10 }} />
          <YAxis hide />
          <ChartTooltip isDark={isDark} />
          <Bar dataKey="newStudents" radius={[8, 8, 0, 0]} fill={colors.violet} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function MiniPie({ isDark }) {
  return (
    <div className="h-28">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip isDark={isDark} />
          <Pie data={overallMix} dataKey="value" innerRadius={28} outerRadius={48} paddingAngle={4} stroke="none">
            {overallMix.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SectionPreviewChart({ section, isDark }) {
  if (section.title.includes('Course')) return <MiniBars isDark={isDark} />
  if (section.title.includes('Overall')) return <MiniPie isDark={isDark} />
  return <MiniLine isDark={isDark} />
}

export function WeeklyAttendanceArea({ isDark }) {
  const theme = useChartTheme(isDark)
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={weeklyAttendance} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={theme.grid} vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
          <ChartTooltip isDark={isDark} />
          <Area type="monotone" dataKey="students" stroke={colors.blue} fill={colors.blueSoft} fillOpacity={0.25} strokeWidth={3} />
          <Area type="monotone" dataKey="absent" stroke={colors.red} fill={colors.red} fillOpacity={0.08} strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
