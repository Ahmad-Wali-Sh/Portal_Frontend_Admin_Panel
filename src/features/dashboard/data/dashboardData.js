import {
  Award,
  BarChart3,
  BookOpen,
  GraduationCap,
  School,
  TrendingDown,
  UserCheck,
  Users,
} from 'lucide-react'

export const colors = {
  blue: '#2563EB',
  blueSoft: '#93C5FD',
  green: '#059669',
  greenSoft: '#A7F3D0',
  amber: '#D97706',
  red: '#DC2626',
  violet: '#7C3AED',
  slate: '#64748B',
}

export const weeklyAttendance = [
  { day: 'Sat', teachers: 31, students: 945, absent: 84 },
  { day: 'Sun', teachers: 33, students: 982, absent: 71 },
  { day: 'Mon', teachers: 36, students: 1034, absent: 59 },
  { day: 'Tue', teachers: 34, students: 998, absent: 66 },
  { day: 'Wed', teachers: 37, students: 1072, absent: 51 },
  { day: 'Thu', teachers: 32, students: 1016, absent: 73 },
]

export const courseGrowth = [
  { course: 'English A1', newStudents: 42, total: 260, absent: 18 },
  { course: 'IELTS Prep', newStudents: 29, total: 182, absent: 12 },
  { course: 'Computer Basics', newStudents: 37, total: 214, absent: 21 },
  { course: 'Business English', newStudents: 18, total: 126, absent: 8 },
  { course: 'Kids Program', newStudents: 51, total: 311, absent: 27 },
]

export const overallMix = [
  { name: 'Students', value: 1248, color: colors.blue },
  { name: 'Teachers', value: 38, color: colors.green },
  { name: 'Courses', value: 24, color: colors.violet },
]

export const topStudents = [
  { name: 'Sara Ahmadi', course: 'IELTS Prep', score: 98, attendance: '100%' },
  { name: 'Omid Rahimi', course: 'English A1', score: 96, attendance: '98%' },
  { name: 'Mina Karimi', course: 'Business English', score: 95, attendance: '97%' },
]

export const pageSections = [
  {
    title: 'Teachers Dashboard',
    description: 'Teacher attendance, late check-ins, class coverage, and daily staff status.',
    path: '/dashboard/teachers',
    icon: UserCheck,
    tone: 'blue',
    value: '31 / 38',
    label: 'teachers checked in today',
    action: 'Open teachers dashboard',
    children: [{ label: 'Attendance Teacher', path: '/dashboard/teachers/attendance' }],
  },
  {
    title: 'Students Dashboard',
    description: 'Dropped students, downgrade scores, top students, and overall absence.',
    path: '/dashboard/students',
    icon: GraduationCap,
    tone: 'green',
    value: '1,248',
    label: 'active students',
    action: 'Open students dashboard',
    children: [
      { label: 'Student dropped', path: '/dashboard/students/dropped' },
      { label: 'Student downgrade scores', path: '/dashboard/students/downgrade-scores' },
      { label: 'Top students', path: '/dashboard/students/top-students' },
      { label: 'Overall absent', path: '/dashboard/students/overall-absent' },
    ],
  },
  {
    title: 'Course Dashboard',
    description: 'New students per course, total students, course absence, and capacity view.',
    path: '/dashboard/courses',
    icon: BookOpen,
    tone: 'violet',
    value: '24',
    label: 'running courses',
    action: 'Open course dashboard',
    children: [
      { label: 'Student new', path: '/dashboard/courses/new-students' },
      { label: 'Overall students', path: '/dashboard/courses/overall-students' },
      { label: 'Overall absent', path: '/dashboard/courses/overall-absent' },
    ],
  },
  {
    title: 'Overall Dashboard',
    description: 'One clean place for academy totals: students, teachers, and courses.',
    path: '/dashboard/overall',
    icon: School,
    tone: 'amber',
    value: '92.2%',
    label: 'overall attendance health',
    action: 'Open overall dashboard',
    children: [
      { label: 'Student', path: '/dashboard/overall/students' },
      { label: 'Teacher', path: '/dashboard/overall/teachers' },
      { label: 'Course', path: '/dashboard/overall/courses' },
    ],
  },
]

export const quickStats = [
  { label: 'New students', value: '84', icon: Users, tone: 'blue', helper: '+12.5% this month' },
  { label: 'Dropped students', value: '35', icon: TrendingDown, tone: 'red', helper: 'Need follow-up' },
  { label: 'Downgrade scores', value: '69', icon: BarChart3, tone: 'amber', helper: 'Most in Cycle 09' },
  { label: 'Top avg score', value: '95.8%', icon: Award, tone: 'green', helper: 'Best 20 students' },
]

export const toneClasses = {
  blue: {
    soft: 'bg-primary-50 text-primary-700 border-primary-100',
    icon: 'bg-primary-600 text-white',
    badge: 'bg-primary-50 text-primary-700 border-primary-100',
    text: 'text-primary-700',
  },
  green: {
    soft: 'bg-secondary-50 text-secondary-700 border-secondary-100',
    icon: 'bg-secondary-600 text-white',
    badge: 'bg-secondary-50 text-secondary-700 border-secondary-100',
    text: 'text-secondary-700',
  },
  amber: {
    soft: 'bg-accent-50 text-accent-700 border-accent-100',
    icon: 'bg-accent-500 text-white',
    badge: 'bg-accent-50 text-accent-700 border-accent-100',
    text: 'text-accent-700',
  },
  violet: {
    soft: 'bg-violet-50 text-violet-700 border-violet-100',
    icon: 'bg-violet-600 text-white',
    badge: 'bg-violet-50 text-violet-700 border-violet-100',
    text: 'text-violet-700',
  },
  red: {
    soft: 'bg-red-50 text-red-700 border-red-100',
    icon: 'bg-red-500 text-white',
    badge: 'bg-red-50 text-red-700 border-red-100',
    text: 'text-red-700',
  },
}
