// ─────────────────────────────────────────────────────────────────────────────
// ClassSelector.jsx — Pick a finished class for certificate generation
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo } from 'react'
import {
  Loader2,
  AlertCircle,
  CalendarDays,
  Users,
  MapPin,
  CheckCircle2,
  Search,
  X,
} from 'lucide-react'
import { cn, formatDate } from '../../../utils/utils'
import api from '../../../utils/api'

export default function ClassSelector({ isDark, onSelect, selectedClassId }) {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [search, setSearch]   = useState('')

  useEffect(() => {
    let cancelled = false
    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        const res = await api.get('/api/classes', { params: { limit: 0 } })
        if (!cancelled) setClasses(res.data?.data ?? [])
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetch()
    return () => { cancelled = true }
  }, [])

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  // Only finished classes, sorted by end_date desc
  const finishedClasses = useMemo(() => {
    let list = classes.filter((c) => c.end_date?.slice(0, 10) < today)

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((c) => {
        const cycleName = c.cycle?.name?.toLowerCase() || ''
        const teacher = `${c.employee?.name || ''} ${c.employee?.lastname || ''}`.toLowerCase()
        const loc = c.location?.name?.toLowerCase() || ''
        return cycleName.includes(q) || teacher.includes(q) || loc.includes(q)
      })
    }

    return list.sort((a, b) => new Date(b.end_date) - new Date(a.end_date))
  }, [classes, search, today])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={22} className="animate-spin text-muted-foreground" />
        <span className="ml-3 text-sm text-muted-foreground">Loading classes…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn(
        'flex items-center gap-2 px-4 py-3 rounded-md text-sm',
        isDark ? 'bg-red-950/40 text-red-400' : 'bg-red-50 text-red-700'
      )}>
        <AlertCircle size={15} /> {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by cycle, teacher, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              'w-full pl-9 pr-9 py-2.5 rounded-md text-sm border-2 outline-none transition-all duration-200',
              isDark
                ? 'bg-gray-800 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-primary'
                : 'bg-muted text-foreground placeholder-gray-400 border-transparent focus:border-primary focus:bg-white'
            )}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <span className="ml-auto text-xs text-muted-foreground">
          {finishedClasses.length} finished class{finishedClasses.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {/* Empty */}
      {finishedClasses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">
            {search ? 'No classes match your search.' : 'No finished classes yet.'}
          </p>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {finishedClasses.map((cls) => (
          <button
            key={cls.id}
            onClick={() => onSelect(cls)}
            className={cn(
              'group text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-[1.02]',
              cls.id === selectedClassId
                ? 'border-primary bg-primary-50'
                : isDark
                  ? 'border-gray-700 bg-gray-800/60 hover:border-gray-500'
                  : 'border-border bg-white hover:border-gray-300'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="badge badge-green text-[10px]">
                <CheckCircle2 size={10} className="mr-1" /> Finished
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">#{cls.id}</span>
            </div>

            <h4 className={cn('font-bold text-sm truncate mb-2', isDark ? 'text-white' : 'text-foreground')}>
              {cls.cycle?.name || `Class #${cls.id}`}
            </h4>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays size={12} />
                <span>{formatDate(cls.start_date, 'short')} — {formatDate(cls.end_date, 'short')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users size={12} />
                <span>{cls.employee ? `${cls.employee.name} ${cls.employee.lastname}` : '—'}</span>
              </div>
              {cls.location && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  <span>{cls.location.name}</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
