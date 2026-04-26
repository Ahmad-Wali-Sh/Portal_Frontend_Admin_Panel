import {
  LayoutDashboard,
  BookOpen,
  RefreshCcw,
  Users,
  CalendarDays,
  UserCheck,
  ClipboardList,
  BarChart2,
  Award,
  GraduationCap,
  Briefcase,
  UserCog,
  ShieldCheck,
  FileText,
  Bell,
  Settings,
  HelpCircle,
} from 'lucide-react'

/**
 * navConfig
 *
 * Each group has a label and an array of items.
 * Each item: { label, path, icon: LucideComponent, badge? }
 *
 * badge: number | string — renders a small counter on the nav item
 */
export const navConfig = [
  {
    group: null, // no group label — top-level
    items: [
      { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    ],
  },
  {
    group: 'Courses',
    items: [
      { label: 'Cycles',    path: '/cycles',   icon: RefreshCcw },
      { label: 'Classes',   path: '/classes',  icon: CalendarDays },
      { label: 'Subjects',  path: '/subjects', icon: BookOpen },
    ],
  },
  {
    group: 'Students',
    items: [
      { label: 'Students',    path: '/students',    icon: GraduationCap },
      { label: 'Attendance',  path: '/attendance',  icon: UserCheck },
      { label: 'Scores',      path: '/scores',      icon: BarChart2 },
      { label: 'Exams',       path: '/exams',       icon: ClipboardList },
      { label: 'Certificates',path: '/certificates',icon: Award },
    ],
  },
  {
    group: 'HR',
    items: [
      { label: 'Employees',   path: '/employees',   icon: Briefcase },
      { label: 'Roles',       path: '/roles',       icon: UserCog },
      { label: 'Permissions', path: '/permissions', icon: ShieldCheck },
    ],
  },
  {
    group: 'Content',
    items: [
      { label: 'Curriculum',  path: '/curriculum',  icon: FileText },
      { label: 'Resources',   path: '/resources',   icon: BookOpen },
      { label: 'Announcements',path:'/announcements',icon: Bell },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Audit Log',   path: '/audit',       icon: ShieldCheck },
      { label: 'Settings',    path: '/settings',    icon: Settings },
    ],
  },
]