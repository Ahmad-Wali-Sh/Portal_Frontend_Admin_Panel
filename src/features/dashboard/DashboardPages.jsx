import React from 'react'
import { Link } from 'react-router'
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
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  LineChart as LineChartIcon,
  School,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react'
import { useThemeStore } from '../shared/store/useThemeStore'
import { cn } from '../../utils/utils'

const colors = {
  blue: '#2563EB',
  blueSoft: '#93C5FD',
  green: '#059669',
  greenSoft: '#A7F3D0',
  amber: '#D97706',
  red: '#DC2626',
  violet: '#7C3AED',
  slate: '#64748B',
}

const weeklyAttendance = [
  { day: 'Sat', teachers: 31, students: 945, absent: 84, late: 22 },
  { day: 'Sun', teachers: 33, students: 982, absent: 71, late: 19 },
  { day: 'Mon', teachers: 36, students: 1034, absent: 59, late: 14 },
  { day: 'Tue', teachers: 34, students: 998, absent: 66, late: 18 },
  { day: 'Wed', teachers: 37, students: 1072, absent: 51, late: 12 },
  { day: 'Thu', teachers: 32, students: 1016, absent: 73, late: 21 },
]

const studentRisk = [
  { name: 'Cycle 08', dropped: 8, downgrade: 14, absent: 29 },
  { name: 'Cycle 09', dropped: 5, downgrade: 19, absent: 22 },
  { name: 'Cycle 10', dropped: 11, downgrade: 12, absent: 31 },
  { name: 'Cycle 11', dropped: 4, downgrade: 9, absent: 17 },
  { name: 'Cycle 12', dropped: 7, downgrade: 15, absent: 25 },
]

const courseGrowth = [
  { course: 'English A1', newStudents: 42, total: 260, absent: 18 },
  { course: 'IELTS Prep', newStudents: 29, total: 182, absent: 12 },
  { course: 'Computer Basics', newStudents: 37, total: 214, absent: 21 },
  { course: 'Business English', newStudents: 18, total: 126, absent: 8 },
  { course: 'Kids Program', newStudents: 51, total: 311, absent: 27 },
]

const teacherRows = [
  { name: 'Farid Salehi', className: 'IELTS Prep', status: 'Present', time: '08:02', coverage: '4 classes' },
  { name: 'Nadia Azimi', className: 'English A1', status: 'Present', time: '08:10', coverage: '5 classes' },
  { name: 'Haroon Malik', className: 'Computer Basics', status: 'Late', time: '08:28', coverage: '3 classes' },
  { name: 'Leila Noor', className: 'Kids Program', status: 'Present', time: '07:55', coverage: '4 classes' },
  { name: 'Samira Wali', className: 'Business English', status: 'Absent', time: '—', coverage: '2 classes' },
]

const topStudents = [
  { name: 'Sara Ahmadi', course: 'IELTS Prep', score: 98, attendance: '100%', change: '+4%' },
  { name: 'Omid Rahimi', course: 'English A1', score: 96, attendance: '98%', change: '+3%' },
  { name: 'Mina Karimi', course: 'Business English', score: 95, attendance: '97%', change: '+2%' },
  { name: 'Ali Noori', course: 'Computer Basics', score: 94, attendance: '99%', change: '+5%' },
  { name: 'Zahra Sediqi', course: 'Kids Program', score: 93, attendance: '96%', change: '+1%' },
]

const droppedStudents = [
  { name: 'Cycle 10', students: 11, reason: 'low attendance', action: 'Call parents' },
  { name: 'Cycle 08', students: 8, reason: 'payment delay', action: 'Admin follow-up' },
  { name: 'Cycle 12', students: 7, reason: 'schedule conflict', action: 'Move class' },
  { name: 'Cycle 09', students: 5, reason: 'low progress', action: 'Teacher review' },
]

const downgradeStudents = [
  { name: 'Cycle 09', students: 19, reason: 'exam drop', action: 'Extra practice' },
  { name: 'Cycle 12', students: 15, reason: 'homework missing', action: 'Weekly check' },
  { name: 'Cycle 08', students: 14, reason: 'speaking weak', action: 'Speaking lab' },
  { name: 'Cycle 10', students: 12, reason: 'quiz scores', action: 'Retake quiz' },
]

const absentStudents = [
  { name: 'Cycle 10', absent: 31, percent: '9.8%', action: 'Urgent follow-up' },
  { name: 'Cycle 08', absent: 29, percent: '8.4%', action: 'Message students' },
  { name: 'Cycle 12', absent: 25, percent: '7.9%', action: 'Teacher report' },
  { name: 'Cycle 09', absent: 22, percent: '7.1%', action: 'Call parents' },
]

const overallMix = [
  { name: 'Students', value: 1248, color: colors.blue },
  { name: 'Teachers', value: 38, color: colors.green },
  { name: 'Courses', value: 24, color: colors.violet },
]

const overviewLinks = {
  teachers: [
    { label: 'Attendance Teacher', path: '/dashboard/teachers/attendance', icon: UserCheck, stat: '82%', helper: 'checked in today' },
  ],
  students: [
    { label: 'Student dropped', path: '/dashboard/students/dropped', icon: TrendingDown, stat: '35', helper: 'risk students' },
    { label: 'Student downgrade scores', path: '/dashboard/students/downgrade-scores', icon: BarChart3, stat: '69', helper: 'score drops' },
    { label: 'Top students', path: '/dashboard/students/top-students', icon: Award, stat: '95.8%', helper: 'top avg score' },
    { label: 'Overall absent', path: '/dashboard/students/overall-absent', icon: AlertTriangle, stat: '7.8%', helper: 'absence rate' },
  ],
  courses: [
    { label: 'Student new', path: '/dashboard/courses/new-students', icon: Users, stat: '84', helper: 'new this month' },
    { label: 'Overall students', path: '/dashboard/courses/overall-students', icon: GraduationCap, stat: '1,248', helper: 'in courses' },
    { label: 'Overall absent', path: '/dashboard/courses/overall-absent', icon: AlertTriangle, stat: '86', helper: 'course absences' },
  ],
  overall: [
    { label: 'Student', path: '/dashboard/overall/students', icon: GraduationCap, stat: '1,248', helper: 'active students' },
    { label: 'Teacher', path: '/dashboard/overall/teachers', icon: UserCheck, stat: '38', helper: 'active teachers' },
    { label: 'Course', path: '/dashboard/overall/courses', icon: BookOpen, stat: '24', helper: 'running courses' },
  ],
}

const detailConfigs = {
  teacherAttendance: {
    back: '/dashboard/teachers',
    title: 'Attendance Teacher',
    subtitle: 'Monitor teacher check-ins, late arrivals, absent staff, and daily class coverage.',
    icon: UserCheck,
    tone: 'blue',
    stats: [
      { label: 'Present teachers', value: '31', helper: 'out of 38', icon: CheckCircle2, tone: 'green' },
      { label: 'Late teachers', value: '2', helper: 'today', icon: Clock3, tone: 'amber' },
      { label: 'Absent teachers', value: '5', helper: 'need replacement', icon: AlertTriangle, tone: 'red' },
      { label: 'Coverage', value: '91%', helper: 'classes covered', icon: TrendingUp, tone: 'blue' },
    ],
    chartType: 'teacherAttendance',
    tableTitle: 'Teacher attendance list',
    columns: ['Teacher', 'Class', 'Status', 'Time', 'Coverage'],
    rows: teacherRows.map((x) => [x.name, x.className, x.status, x.time, x.coverage]),
  },
  studentDropped: {
    back: '/dashboard/students',
    title: 'Student dropped',
    subtitle: 'See which cycles have the highest dropped-student risk and what action is needed.',
    icon: TrendingDown,
    tone: 'red',
    stats: [
      { label: 'Dropped risk', value: '35', helper: 'students', icon: TrendingDown, tone: 'red' },
      { label: 'Highest cycle', value: 'C10', helper: '11 students', icon: AlertTriangle, tone: 'amber' },
      { label: 'Recovered', value: '9', helper: 'this week', icon: CheckCircle2, tone: 'green' },
      { label: 'Need calls', value: '18', helper: 'parents/students', icon: Users, tone: 'blue' },
    ],
    chartType: 'studentDropped',
    tableTitle: 'Dropped student risk by cycle',
    columns: ['Cycle', 'Students', 'Main reason', 'Next action'],
    rows: droppedStudents.map((x) => [x.name, x.students, x.reason, x.action]),
  },
  downgradeScores: {
    back: '/dashboard/students',
    title: 'Student downgrade scores',
    subtitle: 'Track cycles where student scores are falling and identify the reason early.',
    icon: BarChart3,
    tone: 'amber',
    stats: [
      { label: 'Downgrade cases', value: '69', helper: 'students', icon: BarChart3, tone: 'amber' },
      { label: 'Avg score drop', value: '-8.4%', helper: 'last exam', icon: TrendingDown, tone: 'red' },
      { label: 'Improving', value: '24', helper: 'students', icon: TrendingUp, tone: 'green' },
      { label: 'Need practice', value: '41', helper: 'this week', icon: BookOpen, tone: 'blue' },
    ],
    chartType: 'downgradeScores',
    tableTitle: 'Downgrade score details',
    columns: ['Cycle', 'Students', 'Main reason', 'Next action'],
    rows: downgradeStudents.map((x) => [x.name, x.students, x.reason, x.action]),
  },
  topStudents: {
    back: '/dashboard/students',
    title: 'Top students',
    subtitle: 'Best students by score, attendance, and recent improvement.',
    icon: Award,
    tone: 'green',
    stats: [
      { label: 'Top average', value: '95.8%', helper: 'top 20', icon: Award, tone: 'green' },
      { label: 'Perfect attendance', value: '11', helper: 'students', icon: CheckCircle2, tone: 'blue' },
      { label: 'Best score', value: '98%', helper: 'Sara Ahmadi', icon: TrendingUp, tone: 'green' },
      { label: 'Improved most', value: '+5%', helper: 'Ali Noori', icon: LineChartIcon, tone: 'violet' },
    ],
    chartType: 'topStudents',
    tableTitle: 'Top student ranking',
    columns: ['Student', 'Course', 'Score', 'Attendance', 'Change'],
    rows: topStudents.map((x) => [x.name, x.course, `${x.score}%`, x.attendance, x.change]),
  },
  studentAbsent: {
    back: '/dashboard/students',
    title: 'Students overall absent',
    subtitle: 'Understand absence by cycle and where follow-up is needed first.',
    icon: AlertTriangle,
    tone: 'red',
    stats: [
      { label: 'Absent rate', value: '7.8%', helper: 'today', icon: AlertTriangle, tone: 'red' },
      { label: 'Absent students', value: '86', helper: 'today', icon: Users, tone: 'amber' },
      { label: 'Improvement', value: '-1.4%', helper: 'vs last week', icon: TrendingUp, tone: 'green' },
      { label: 'Critical cycles', value: '2', helper: 'need call', icon: Clock3, tone: 'blue' },
    ],
    chartType: 'studentAbsent',
    tableTitle: 'Student absence by cycle',
    columns: ['Cycle', 'Absent', 'Percent', 'Next action'],
    rows: absentStudents.map((x) => [x.name, x.absent, x.percent, x.action]),
  },
  courseNewStudents: {
    back: '/dashboard/courses',
    title: 'Course student new',
    subtitle: 'New students by course, useful for capacity and teacher planning.',
    icon: Users,
    tone: 'blue',
    stats: [
      { label: 'New students', value: '84', helper: 'this month', icon: Users, tone: 'blue' },
      { label: 'Best course', value: 'Kids', helper: '51 new', icon: TrendingUp, tone: 'green' },
      { label: 'Open seats', value: '126', helper: 'all courses', icon: BookOpen, tone: 'violet' },
      { label: 'Need teacher', value: '3', helper: 'classes', icon: UserCheck, tone: 'amber' },
    ],
    chartType: 'courseNewStudents',
    tableTitle: 'New students by course',
    columns: ['Course', 'New students', 'Total students', 'Absent'],
    rows: courseGrowth.map((x) => [x.course, x.newStudents, x.total, x.absent]),
  },
  courseOverallStudents: {
    back: '/dashboard/courses',
    title: 'Course overall students',
    subtitle: 'Total number of students in every course and current course load.',
    icon: GraduationCap,
    tone: 'green',
    stats: [
      { label: 'Total students', value: '1,248', helper: 'all courses', icon: GraduationCap, tone: 'green' },
      { label: 'Largest course', value: '311', helper: 'Kids Program', icon: Users, tone: 'blue' },
      { label: 'Avg per course', value: '52', helper: 'students', icon: BookOpen, tone: 'violet' },
      { label: 'Growth', value: '+12.5%', helper: 'this month', icon: TrendingUp, tone: 'green' },
    ],
    chartType: 'courseOverallStudents',
    tableTitle: 'Overall students per course',
    columns: ['Course', 'Total students', 'New students', 'Absent'],
    rows: courseGrowth.map((x) => [x.course, x.total, x.newStudents, x.absent]),
  },
  courseAbsent: {
    back: '/dashboard/courses',
    title: 'Course overall absent',
    subtitle: 'Course-level absence to help managers decide where to follow up.',
    icon: AlertTriangle,
    tone: 'red',
    stats: [
      { label: 'Course absences', value: '86', helper: 'today', icon: AlertTriangle, tone: 'red' },
      { label: 'Highest absent', value: '27', helper: 'Kids Program', icon: TrendingDown, tone: 'amber' },
      { label: 'Best course', value: '6.3%', helper: 'Business English', icon: CheckCircle2, tone: 'green' },
      { label: 'Need action', value: '2', helper: 'courses', icon: Clock3, tone: 'blue' },
    ],
    chartType: 'courseAbsent',
    tableTitle: 'Absent students by course',
    columns: ['Course', 'Absent', 'Total students', 'New students'],
    rows: courseGrowth.map((x) => [x.course, x.absent, x.total, x.newStudents]),
  },
  overallStudents: {
    back: '/dashboard/overall',
    title: 'Overall student dashboard',
    subtitle: 'Total student status across all cycles, courses, scores, and attendance.',
    icon: GraduationCap,
    tone: 'blue',
    stats: [
      { label: 'Total students', value: '1,248', helper: 'active', icon: GraduationCap, tone: 'blue' },
      { label: 'New students', value: '84', helper: 'this month', icon: Users, tone: 'green' },
      { label: 'At risk', value: '35', helper: 'dropped risk', icon: AlertTriangle, tone: 'red' },
      { label: 'Attendance', value: '92.2%', helper: 'overall', icon: CheckCircle2, tone: 'green' },
    ],
    chartType: 'overallStudents',
    tableTitle: 'Student health summary',
    columns: ['Metric', 'Value', 'Status', 'Action'],
    rows: [
      ['Active students', '1,248', 'Healthy', 'Keep tracking'],
      ['New students', '84', 'Growing', 'Prepare seats'],
      ['Dropped risk', '35', 'Warning', 'Follow up'],
      ['Downgrade scores', '69', 'Warning', 'Extra practice'],
    ],
  },
  overallTeachers: {
    back: '/dashboard/overall',
    title: 'Overall teacher dashboard',
    subtitle: 'Teacher status, class coverage, attendance, and late/absent patterns.',
    icon: UserCheck,
    tone: 'green',
    stats: [
      { label: 'Active teachers', value: '38', helper: 'total', icon: UserCheck, tone: 'green' },
      { label: 'Checked in', value: '31', helper: 'today', icon: CheckCircle2, tone: 'blue' },
      { label: 'Late', value: '2', helper: 'today', icon: Clock3, tone: 'amber' },
      { label: 'Absent', value: '5', helper: 'need cover', icon: AlertTriangle, tone: 'red' },
    ],
    chartType: 'overallTeachers',
    tableTitle: 'Teacher summary',
    columns: ['Metric', 'Value', 'Status', 'Action'],
    rows: [
      ['Total teachers', '38', 'Stable', 'No action'],
      ['Present today', '31', 'Good', 'Monitor'],
      ['Late today', '2', 'Warning', 'Confirm reason'],
      ['Absent today', '5', 'Needs cover', 'Assign replacement'],
    ],
  },
  overallCourses: {
    back: '/dashboard/overall',
    title: 'Overall course dashboard',
    subtitle: 'Course count, student capacity, absence, and course growth in one view.',
    icon: BookOpen,
    tone: 'violet',
    stats: [
      { label: 'Running courses', value: '24', helper: 'active', icon: BookOpen, tone: 'violet' },
      { label: 'New students', value: '84', helper: 'this month', icon: Users, tone: 'blue' },
      { label: 'Course absence', value: '86', helper: 'today', icon: AlertTriangle, tone: 'red' },
      { label: 'Growth', value: '+4', helper: 'new courses', icon: TrendingUp, tone: 'green' },
    ],
    chartType: 'overallCourses',
    tableTitle: 'Course summary',
    columns: ['Course', 'Total students', 'New students', 'Absent'],
    rows: courseGrowth.map((x) => [x.course, x.total, x.newStudents, x.absent]),
  },
}

const toneClasses = {
  blue: {
    soft: 'bg-primary-50 text-primary-700 border-primary-100',
    icon: 'bg-primary-600 text-white',
    button: 'bg-primary-600 text-white hover:bg-primary-700',
  },
  green: {
    soft: 'bg-secondary-50 text-secondary-700 border-secondary-100',
    icon: 'bg-secondary-600 text-white',
    button: 'bg-secondary-600 text-white hover:bg-secondary-700',
  },
  amber: {
    soft: 'bg-accent-50 text-accent-700 border-accent-100',
    icon: 'bg-accent-500 text-white',
    button: 'bg-accent-500 text-white hover:bg-accent-600',
  },
  violet: {
    soft: 'bg-violet-50 text-violet-700 border-violet-100',
    icon: 'bg-violet-600 text-white',
    button: 'bg-violet-600 text-white hover:bg-violet-700',
  },
  red: {
    soft: 'bg-red-50 text-red-700 border-red-100',
    icon: 'bg-red-500 text-white',
    button: 'bg-red-600 text-white hover:bg-red-700',
  },
}

function chartTheme(isDark) {
  return {
    axis: isDark ? '#CBD5E1' : '#64748B',
    grid: isDark ? 'rgba(148, 163, 184, 0.16)' : '#E5E7EB',
    tooltipBg: isDark ? '#0F172A' : '#FFFFFF',
    tooltipBorder: isDark ? '#334155' : '#E5E7EB',
    tooltipText: isDark ? '#E2E8F0' : '#0F172A',
  }
}

function Card({ children, className, isDark }) {
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

function CustomTooltip({ isDark }) {
  const theme = chartTheme(isDark)
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

function PageHero({ title, subtitle, icon: Icon, tone = 'blue', back = '/' }) {
  const { isDark } = useThemeStore()
  const toneData = toneClasses[tone] || toneClasses.blue

  return (
    <div className={cn('rounded-3xl border p-6 md:p-8', isDark ? 'border-gray-800 bg-gray-900' : 'border-primary-100 bg-linear-to-br from-white via-primary-50 to-secondary-50')}>
      <Link to={back} className={cn('mb-5 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition', isDark ? 'border-gray-800 bg-gray-950/40 text-gray-200 hover:text-primary-300' : 'border-white bg-white/80 text-gray-700 hover:text-primary-700')}>
        <ArrowLeft size={16} /> Back
      </Link>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4">
          <span className={cn('grid size-14 place-items-center rounded-2xl', toneData.icon)}><Icon size={26} /></span>
          <div>
            <h1 className={cn('text-3xl font-black tracking-tight md:text-4xl', isDark ? 'text-white' : 'text-gray-950')}>{title}</h1>
            <p className={cn('mt-3 max-w-3xl text-sm leading-6 md:text-base', isDark ? 'text-gray-300' : 'text-gray-600')}>{subtitle}</p>
          </div>
        </div>
        <div className={cn('rounded-2xl border px-4 py-3 text-sm font-bold', toneData.soft)}>Light-mode ready UI</div>
      </div>
    </div>
  )
}

function StatCard({ stat, isDark }) {
  const Icon = stat.icon
  const toneData = toneClasses[stat.tone] || toneClasses.blue

  return (
    <Card isDark={isDark} className="p-4">
      <div className="flex items-center justify-between gap-3">
        <span className={cn('grid size-11 place-items-center rounded-2xl', toneData.icon)}><Icon size={20} /></span>
        <span className={cn('rounded-full border px-2.5 py-1 text-xs font-bold', toneData.soft)}>{stat.helper}</span>
      </div>
      <p className={cn('mt-5 text-3xl font-black', isDark ? 'text-white' : 'text-gray-950')}>{stat.value}</p>
      <p className={cn('mt-1 text-sm font-semibold', isDark ? 'text-gray-300' : 'text-gray-600')}>{stat.label}</p>
    </Card>
  )
}

function StatsGrid({ stats, isDark }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => <StatCard key={stat.label} stat={stat} isDark={isDark} />)}
    </div>
  )
}

function LinkCard({ link, isDark }) {
  const Icon = link.icon
  return (
    <Link
      to={link.path}
      className={cn(
        'group rounded-2xl border p-5 transition hover:-translate-y-0.5',
        isDark
          ? 'border-gray-800 bg-gray-900/75 hover:border-primary-700'
          : 'border-border bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)] hover:border-primary-200 hover:bg-primary-50/40'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-700"><Icon size={22} /></span>
        <ArrowRight className={cn('transition group-hover:translate-x-1', isDark ? 'text-gray-500' : 'text-gray-400')} size={18} />
      </div>
      <h3 className={cn('mt-4 text-lg font-black', isDark ? 'text-white' : 'text-gray-950')}>{link.label}</h3>
      <p className="mt-2 text-2xl font-black text-primary-600">{link.stat}</p>
      <p className={cn('mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>{link.helper}</p>
    </Link>
  )
}

function OverviewPage({ type, title, subtitle, icon: Icon, tone = 'blue', stats, chart, back = '/' }) {
  const { isDark } = useThemeStore()
  const links = overviewLinks[type]

  return (
    <div className="space-y-6">
      <PageHero title={title} subtitle={subtitle} icon={Icon} tone={tone} back={back} />
      <StatsGrid stats={stats} isDark={isDark} />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card isDark={isDark}>
          <div className="mb-5">
            <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-gray-950')}>Dashboard preview</h2>
            <p className={cn('mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Open a detail page for the full table and chart.</p>
          </div>
          {chart}
        </Card>
        <Card isDark={isDark}>
          <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-gray-950')}>Pages inside this dashboard</h2>
          <div className="mt-4 grid gap-3">
            {links.map((link) => <LinkCard key={link.path} link={link} isDark={isDark} />)}
          </div>
        </Card>
      </div>
    </div>
  )
}

function TeacherChart({ isDark }) {
  const theme = chartTheme(isDark)
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyAttendance} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={theme.grid} vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
          <CustomTooltip isDark={isDark} />
          <Bar dataKey="teachers" name="Present teachers" fill={colors.green} radius={[8, 8, 0, 0]} />
          <Bar dataKey="late" name="Late" fill={colors.amber} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function StudentChart({ isDark }) {
  const theme = chartTheme(isDark)
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={studentRisk} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={theme.grid} vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
          <CustomTooltip isDark={isDark} />
          <Bar dataKey="dropped" fill={colors.red} radius={[8, 8, 0, 0]} />
          <Bar dataKey="downgrade" fill={colors.amber} radius={[8, 8, 0, 0]} />
          <Bar dataKey="absent" fill={colors.blue} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function CourseChart({ isDark }) {
  const theme = chartTheme(isDark)
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={courseGrowth} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={theme.grid} vertical={false} />
          <XAxis dataKey="course" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 11 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
          <CustomTooltip isDark={isDark} />
          <Area type="monotone" dataKey="total" stroke={colors.violet} fill={colors.violet} fillOpacity={0.18} strokeWidth={3} />
          <Area type="monotone" dataKey="newStudents" stroke={colors.green} fill={colors.greenSoft} fillOpacity={0.28} strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function OverallChart({ isDark }) {
  return (
    <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <CustomTooltip isDark={isDark} />
            <Pie data={overallMix} dataKey="value" innerRadius={60} outerRadius={96} paddingAngle={4} stroke="none">
              {overallMix.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {overallMix.map((entry) => (
          <div key={entry.name} className={cn('rounded-2xl border p-4', isDark ? 'border-gray-800 bg-gray-950/40' : 'border-gray-100 bg-gray-50')}>
            <div className="flex items-center justify-between">
              <span className={cn('text-sm font-bold', isDark ? 'text-gray-300' : 'text-gray-600')}>{entry.name}</span>
              <span className="text-2xl font-black" style={{ color: entry.color }}>{entry.value.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DetailChart({ type, isDark }) {
  const theme = chartTheme(isDark)

  if (type === 'teacherAttendance' || type === 'overallTeachers') return <TeacherChart isDark={isDark} />
  if (type === 'studentDropped') {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={studentRisk} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <CustomTooltip isDark={isDark} />
            <Bar dataKey="dropped" fill={colors.red} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  if (type === 'downgradeScores') {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={studentRisk} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <CustomTooltip isDark={isDark} />
            <Line type="monotone" dataKey="downgrade" stroke={colors.amber} strokeWidth={4} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
  if (type === 'topStudents') {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topStudents} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <CustomTooltip isDark={isDark} />
            <Bar dataKey="score" fill={colors.green} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  if (type === 'studentAbsent' || type === 'courseAbsent') {
    const data = type === 'courseAbsent' ? courseGrowth : studentRisk
    const xKey = type === 'courseAbsent' ? 'course' : 'name'
    const barKey = type === 'courseAbsent' ? 'absent' : 'absent'
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} vertical={false} />
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <CustomTooltip isDark={isDark} />
            <Area type="monotone" dataKey={barKey} stroke={colors.red} fill={colors.red} fillOpacity={0.16} strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
  if (type === 'courseNewStudents' || type === 'courseOverallStudents' || type === 'overallCourses') return <CourseChart isDark={isDark} />
  if (type === 'overallStudents') return <StudentChart isDark={isDark} />

  return <OverallChart isDark={isDark} />
}

function DataTable({ config, isDark }) {
  return (
    <Card isDark={isDark}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-gray-950')}>{config.tableTitle}</h2>
          <p className={cn('mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Mock data now. Later you can connect this page to backend APIs.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <thead>
            <tr className={cn(isDark ? 'border-b border-gray-800 text-gray-400' : 'border-b border-gray-100 text-gray-500')}>
              {config.columns.map((column) => <th key={column} className="px-3 py-3 font-bold">{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {config.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={cn('border-b last:border-b-0', isDark ? 'border-gray-800' : 'border-gray-100')}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className={cn('px-3 py-4 font-semibold', cellIndex === 0 ? (isDark ? 'text-white' : 'text-gray-950') : (isDark ? 'text-gray-300' : 'text-gray-600'))}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function DetailPage({ configKey }) {
  const { isDark } = useThemeStore()
  const config = detailConfigs[configKey]

  return (
    <div className="space-y-6">
      <PageHero title={config.title} subtitle={config.subtitle} icon={config.icon} tone={config.tone} back={config.back} />
      <StatsGrid stats={config.stats} isDark={isDark} />
      <Card isDark={isDark}>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className={cn('text-lg font-black', isDark ? 'text-white' : 'text-gray-950')}>Analytics chart</h2>
            <p className={cn('mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Clear visual report for this page.</p>
          </div>
        </div>
        <DetailChart type={config.chartType} isDark={isDark} />
      </Card>
      <DataTable config={config} isDark={isDark} />
    </div>
  )
}

export function TeachersDashboardPage() {
  const { isDark } = useThemeStore()
  return (
    <OverviewPage
      type="teachers"
      title="Teachers Dashboard"
      subtitle="A clean teacher dashboard focused on attendance, class coverage, late arrivals, and absent teachers."
      icon={UserCheck}
      tone="blue"
      stats={detailConfigs.teacherAttendance.stats}
      chart={<TeacherChart isDark={isDark} />}
    />
  )
}

export function StudentsDashboardPage() {
  const { isDark } = useThemeStore()
  return (
    <OverviewPage
      type="students"
      title="Students Dashboard"
      subtitle="Student health dashboard with dropped students, downgrade scores, top students, and overall absence."
      icon={GraduationCap}
      tone="green"
      stats={detailConfigs.overallStudents.stats}
      chart={<StudentChart isDark={isDark} />}
    />
  )
}

export function CoursesDashboardPage() {
  const { isDark } = useThemeStore()
  return (
    <OverviewPage
      type="courses"
      title="Course Dashboard"
      subtitle="Course-level dashboard for new students, total students, course absence, and capacity planning."
      icon={BookOpen}
      tone="violet"
      stats={detailConfigs.overallCourses.stats}
      chart={<CourseChart isDark={isDark} />}
    />
  )
}

export function OverallDashboardPage() {
  const { isDark } = useThemeStore()
  return (
    <OverviewPage
      type="overall"
      title="Overall Dashboard"
      subtitle="One high-level dashboard for students, teachers, and courses across the full academy system."
      icon={School}
      tone="amber"
      stats={[
        { label: 'Students', value: '1,248', helper: 'active', icon: GraduationCap, tone: 'blue' },
        { label: 'Teachers', value: '38', helper: 'active', icon: UserCheck, tone: 'green' },
        { label: 'Courses', value: '24', helper: 'running', icon: BookOpen, tone: 'violet' },
        { label: 'Health', value: '92.2%', helper: 'attendance', icon: CheckCircle2, tone: 'green' },
      ]}
      chart={<OverallChart isDark={isDark} />}
    />
  )
}

export const TeacherAttendancePage = () => <DetailPage configKey="teacherAttendance" />
export const StudentDroppedPage = () => <DetailPage configKey="studentDropped" />
export const StudentDowngradeScoresPage = () => <DetailPage configKey="downgradeScores" />
export const TopStudentsPage = () => <DetailPage configKey="topStudents" />
export const StudentOverallAbsentPage = () => <DetailPage configKey="studentAbsent" />
export const CourseNewStudentsPage = () => <DetailPage configKey="courseNewStudents" />
export const CourseOverallStudentsPage = () => <DetailPage configKey="courseOverallStudents" />
export const CourseOverallAbsentPage = () => <DetailPage configKey="courseAbsent" />
export const OverallStudentsPage = () => <DetailPage configKey="overallStudents" />
export const OverallTeachersPage = () => <DetailPage configKey="overallTeachers" />
export const OverallCoursesPage = () => <DetailPage configKey="overallCourses" />
