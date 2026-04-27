 
import React, { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Users,
  Briefcase,
  Loader2,
  CalendarDays,
  Pencil,
  Lock,
} from 'lucide-react'
import { useThemeStore } from '../shared/store/useThemeStore'
import api from '../../utils/api'
import { cn } from '../../utils/utils'
 
// ── Sample data — shown when not authenticated ────────────────────────────────
const SAMPLE_EMPLOYEE = {
  name:         'Ahmad',
  lastname:     'Rahimi',
  email:        'ahmad.rahimi@portal.com',
  phone_number: '+93 700 123 456',
  gender:       { name: 'Male' },
  role:         { name: 'Teacher' },
  created_at:   '2024-09-01T00:00:00.000Z',
  image:        null,
}
 
// ── JWT decoder ───────────────────────────────────────────────────────────────
function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}
 
// ─────────────────────────────────────────────────────────────────────────────
// InfoRow — flat muted block, icon in solid primary square
// ─────────────────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, isDark, animClass }) {
  return (
    <div
      className={cn(
        'group flex items-center gap-4 px-5 py-4 rounded-lg',
        'transition-all duration-200 hover:scale-[1.02] cursor-default',
        animClass,
        isDark ? 'bg-gray-800' : 'bg-muted',
      )}
    >
      <div className="flex items-center justify-center w-10 h-10 transition-transform duration-200 rounded-md bg-primary shrink-0 group-hover:scale-110">
        <Icon size={17} strokeWidth={2.5} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-label mb-0.5', isDark ? 'text-gray-500' : 'text-muted-foreground')}>
          {label}
        </p>
        <p
          className={cn(
            'text-sm font-semibold truncate',
            isDark ? 'text-gray-100' : 'text-foreground',
            !value && 'opacity-40 italic',
          )}
        >
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────────────────────
// ProfileView
// ─────────────────────────────────────────────────────────────────────────────
function ProfileView({ employee, isSample, isDark }) {
  const initials = `${employee.name?.[0] ?? ''}${employee.lastname?.[0] ?? ''}`.toUpperCase()
  const fullName  = `${employee.name} ${employee.lastname}`
  const since     = employee.created_at
    ? new Date(employee.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : '—'
 
  // ── TODO: implement these handlers when backend endpoints are ready ─────────
  // Edit Info  → PATCH /api/employees/:id  { name, lastname, phone_number, ... }
  // Change Pwd → POST  /api/auth/change-password  { currentPassword, newPassword }
  const handleEditInfo     = () => { /* TODO */ }
  const handleChangePassword = () => { /* TODO */ }
 
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
 
      {/* ══════════════════════════════════════════════════════════════════════
          HERO BLOCK — solid primary, geometric decoration
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative p-8 overflow-hidden rounded-lg bg-primary">
 
        {/* Geometric background shapes */}
        <div className="w-48 h-48 geo-circle bg-white/5 -top-12 -right-12" />
        <div className="w-24 h-24 geo-circle bg-white/5 bottom-4 right-32" />
        <div className="w-16 h-16 geo-square bg-white/5 top-6 right-20" />
 
        {/* Sample mode banner */}
        {isSample && (
          <div className="inline-flex items-center gap-2 bg-accent text-gray-900 rounded-md px-3 py-1.5 mb-6">
            <span className="text-label">Preview mode</span>
            <span className="text-xs font-medium">— log in to see your real profile</span>
          </div>
        )}
 
        {/* Avatar + name */}
        <div className="flex items-center gap-6">
          {employee.image ? (
            <img
              src={employee.image}
              alt={fullName}
              className="object-cover w-20 h-20 rounded-lg shrink-0"
            />
          ) : (
            <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-white/20 shrink-0">
              <span className="text-2xl text-white text-display">{initials}</span>
            </div>
          )}
 
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl text-white truncate text-display">{fullName}</h1>
 
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {employee.role?.name && (
                <span className="bg-white text-primary rounded-md px-3 py-0.5 text-label">
                  {employee.role.name}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
                <CalendarDays size={12} strokeWidth={2} />
                Since {since}
              </span>
            </div>
          </div>
        </div>
      </div>
 
      {/* ══════════════════════════════════════════════════════════════════════
          INFO SECTION — white block with info rows + action buttons
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          'rounded-lg mt-3 p-6',
          isDark ? 'bg-gray-900' : 'bg-background',
        )}
      >
        {/* Section header row — label + Edit Info button */}
        <div className="flex items-center justify-between mb-4">
          <p className={cn('text-label', isDark ? 'text-gray-500' : 'text-muted-foreground')}>
            Personal Information
          </p>
 
          {/* Edit Info button — outline style per CLAUDE.md */}
          {!isSample && (
            <button
              onClick={handleEditInfo}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold',
                'border-2 transition-all duration-200 hover:scale-[1.02]',
                isDark
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-primary text-primary hover:bg-primary hover:text-white',
              )}
            >
              <Pencil size={14} strokeWidth={2.5} />
              Edit Info
            </button>
          )}
        </div>
 
        {/* Info rows — staggered fade in */}
        <div className="space-y-2">
          <InfoRow icon={User}      label="First Name"    value={employee.name}         isDark={isDark} animClass="animate-fade-in stagger-1" />
          <InfoRow icon={User}      label="Last Name"     value={employee.lastname}      isDark={isDark} animClass="animate-fade-in stagger-2" />
          <InfoRow icon={Mail}      label="Email Address" value={employee.email}         isDark={isDark} animClass="animate-fade-in stagger-3" />
          <InfoRow icon={Phone}     label="Phone Number"  value={employee.phone_number}  isDark={isDark} animClass="animate-fade-in stagger-4" />
          <InfoRow icon={Users}     label="Gender"        value={employee.gender?.name}  isDark={isDark} animClass="animate-fade-in stagger-5" />
          <InfoRow icon={Briefcase} label="Role"          value={employee.role?.name}    isDark={isDark} animClass="animate-fade-in stagger-5" />
        </div>
      </div>
 
      {/* ══════════════════════════════════════════════════════════════════════
          SECURITY SECTION — flat secondary block, change password button
      ══════════════════════════════════════════════════════════════════════ */}
      {!isSample && (
        <div
          className={cn(
            'rounded-lg mt-3 p-6',
            isDark ? 'bg-gray-900' : 'bg-background',
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={cn('text-label mb-1', isDark ? 'text-gray-500' : 'text-muted-foreground')}>
                Security
              </p>
              <p className={cn('text-sm font-medium', isDark ? 'text-gray-300' : 'text-foreground')}>
                Password
              </p>
              <p className={cn('text-xs mt-0.5', isDark ? 'text-gray-500' : 'text-muted-foreground')}>
                Last changed: unknown
              </p>
            </div>
 
            {/* Change Password button — solid primary per CLAUDE.md */}
            <button
              onClick={handleChangePassword}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold text-white',
                'bg-primary hover:bg-primary-600 transition-all duration-200 hover:scale-[1.02]',
              )}
            >
              <Lock size={14} strokeWidth={2.5} />
              Change Password
            </button>
          </div>
        </div>
      )}
 
      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER NOTICE — flat muted block
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          'flex items-center gap-3 mt-3 px-5 py-3 rounded-lg',
          isDark ? 'bg-gray-800' : 'bg-muted',
        )}
      >
        <ShieldCheck size={15} strokeWidth={2} className="shrink-0 text-primary" />
        <p className={cn('text-xs font-medium', isDark ? 'text-gray-400' : 'text-muted-foreground')}>
          {isSample
            ? 'Log in to see your real profile information.'
            : 'Contact your administrator for role or email changes.'}
        </p>
      </div>
 
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────────────────────
// ProfilePage — data fetching shell
// ─────────────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { isDark } = useThemeStore()
 
  const [employee, setEmployee] = useState(null)
  const [isSample, setIsSample] = useState(false)
  const [loading, setLoading]   = useState(true)
 
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('portal_token')
 
        if (!token) {
          setEmployee(SAMPLE_EMPLOYEE)
          setIsSample(true)
          setLoading(false)
          return
        }
 
        const decoded    = decodeJwt(token)
        const employeeId = decoded?.id ?? decoded?.sub
 
        if (!employeeId) {
          setEmployee(SAMPLE_EMPLOYEE)
          setIsSample(true)
          setLoading(false)
          return
        }
 
        // routeConfig eager-loads: { role: true, gender: true }
        const res = await api.get(`/api/employees/${employeeId}`)
        setEmployee(res.data?.data ?? res.data)
        setIsSample(false)
      } catch {
        setEmployee(SAMPLE_EMPLOYEE)
        setIsSample(true)
      } finally {
        setLoading(false)
      }
    }
 
    fetchProfile()
  }, [])
 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} strokeWidth={2} className="animate-spin text-primary" />
          <p className={cn('text-sm font-medium', isDark ? 'text-gray-400' : 'text-muted-foreground')}>
            Loading profile…
          </p>
        </div>
      </div>
    )
  }
 
  return <ProfileView employee={employee} isSample={isSample} isDark={isDark} />
}
 