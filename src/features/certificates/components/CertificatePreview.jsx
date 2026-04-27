// ─────────────────────────────────────────────────────────────────────────────
// CertificatePreview.jsx — Student list + generate certificates
// Only students who passed all subjects are selectable.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Loader2,
  AlertCircle,
  Download,
  CheckSquare,
  Square,
  CheckCircle2,
  XCircle,
  MinusCircle,
  FileText,
} from 'lucide-react'
import { cn, formatDate } from '../../../utils/utils'
import api from '../../../utils/api'
import { generateCertificatesZip, downloadBlob } from './generateCertificates'

export default function CertificatePreview({ selectedClass, orgInfo, isDark }) {
  const [enrollments, setEnrollments] = useState([])
  const [subjects, setSubjects]       = useState([])
  const [gradesMap, setGradesMap]     = useState(new Map())
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [selected, setSelected]       = useState(new Set())
  const [generating, setGenerating]   = useState(false)
  const [progress, setProgress]       = useState({ current: 0, total: 0 })

  const classId = selectedClass?.id
  const cycleId = selectedClass?.cycle_id || selectedClass?.cycle?.id

  // ── Check if a student passed (all subjects passed) ─────────────────────────
  const isPassed = useCallback((enrollmentId) => {
    const grades = gradesMap.get(enrollmentId) || []
    if (grades.length === 0) return false
    return grades.every((g) => g.passed === true)
  }, [gradesMap])

  // ── Fetch data ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!classId) return
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const enrollRes = await api.get('/api/student-classes', {
          params: { class_id: classId, limit: 0 },
        })
        const enrollData = enrollRes.data?.data ?? []

        let subjectData = []
        if (cycleId) {
          const csRes = await api.get('/api/cycle-subjects', {
            params: { cycle_id: cycleId, limit: 0 },
          })
          subjectData = (csRes.data?.data ?? []).map((cs) => cs.subject).filter(Boolean)
        }

        const newGradesMap = new Map()
        for (const e of enrollData) {
          try {
            const gRes = await api.get('/api/subject-grades', {
              params: { student_class_id: e.id, limit: 0 },
            })
            newGradesMap.set(e.id, gRes.data?.data ?? [])
          } catch {
            newGradesMap.set(e.id, [])
          }
        }

        if (cancelled) return
        setEnrollments(enrollData)
        setSubjects(subjectData)
        setGradesMap(newGradesMap)

        // Auto-select only passed students
        const passedIds = new Set()
        for (const e of enrollData) {
          const grades = newGradesMap.get(e.id) || []
          if (grades.length > 0 && grades.every((g) => g.passed === true)) {
            passedIds.add(e.id)
          }
        }
        setSelected(passedIds)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [classId, cycleId])

  // ── Selection (only passed students) ────────────────────────────────────────
  const passedEnrollments = useMemo(
    () => enrollments.filter((e) => isPassed(e.id)),
    [enrollments, isPassed]
  )

  const toggleOne = useCallback((enrollmentId) => {
    if (!isPassed(enrollmentId)) return
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(enrollmentId)) next.delete(enrollmentId)
      else next.add(enrollmentId)
      return next
    })
  }, [isPassed])

  const toggleAll = useCallback(() => {
    if (selected.size === passedEnrollments.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(passedEnrollments.map((e) => e.id)))
    }
  }, [selected.size, passedEnrollments])

  // ── Generate ────────────────────────────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    if (selected.size === 0) return
    setGenerating(true)
    setProgress({ current: 0, total: selected.size })

    try {
      const selectedEnrollments = enrollments.filter((e) => selected.has(e.id))
      const subjectNames = subjects.map((s) => s.name).filter(Boolean)

      const zipBlob = await generateCertificatesZip({
        students: selectedEnrollments,
        orgInfo,
        classInfo: selectedClass,
        subjectNames,
        gradesMap,
        onProgress: (c, t) => setProgress({ current: c, total: t }),
      })

      const name = selectedClass.cycle?.name?.replace(/[^a-zA-Z0-9_-]/g, '_') || 'certificates'
      downloadBlob(zipBlob, `${name}_certificates.zip`)
    } catch (err) {
      setError(`Generation failed: ${err.message}`)
    } finally {
      setGenerating(false)
      setProgress({ current: 0, total: 0 })
    }
  }, [selected, enrollments, orgInfo, selectedClass, subjects, gradesMap])

  // ── States ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={22} className="animate-spin text-muted-foreground" />
        <span className="ml-3 text-sm text-muted-foreground">Loading students & grades…</span>
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

  if (enrollments.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText size={32} className="mx-auto text-muted-foreground opacity-40 mb-3" />
        <p className="text-sm text-muted-foreground">No students enrolled in this class.</p>
      </div>
    )
  }

  const allChecked  = selected.size === passedEnrollments.length && passedEnrollments.length > 0
  const someChecked = selected.size > 0 && !allChecked

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        <StatBadge label="Total" value={enrollments.length} color="blue" isDark={isDark} />
        <StatBadge label="Passed" value={passedEnrollments.length} color="green" isDark={isDark} />
        <StatBadge label="Not Passed" value={enrollments.length - passedEnrollments.length} color="gray" isDark={isDark} />
        <StatBadge label="Selected" value={selected.size} color="blue" isDark={isDark} />
      </div>

      {/* Table */}
      <div className={cn('rounded-lg overflow-hidden border', isDark ? 'border-gray-800' : 'border-border')}>
        <div className="overflow-x-auto">
          <table className={cn('data-table', isDark && 'data-table-dark')}>
            <thead>
              <tr>
                <th className="w-10">
                  <button onClick={toggleAll} className="text-muted-foreground hover:text-primary transition-colors">
                    {allChecked ? <CheckSquare size={16} /> : someChecked ? <MinusCircle size={16} /> : <Square size={16} />}
                  </button>
                </th>
                <th>USID</th>
                <th>STUDENT NAME</th>
                <th>GRADES</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => {
                const student = enrollment.student
                const passed = isPassed(enrollment.id)
                const isChecked = selected.has(enrollment.id)
                const grades = gradesMap.get(enrollment.id) || []

                return (
                  <tr
                    key={enrollment.id}
                    onClick={() => toggleOne(enrollment.id)}
                    className={cn(
                      'transition-colors',
                      passed ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
                      isChecked && (isDark ? 'bg-primary/5' : 'bg-primary-50/50')
                    )}
                  >
                    <td>
                      {passed ? (
                        <span className={isChecked ? 'text-primary' : 'text-muted-foreground'}>
                          {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                        </span>
                      ) : (
                        <span className="text-muted-foreground opacity-40"><Square size={16} /></span>
                      )}
                    </td>
                    <td>
                      <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                        {student?.usid || '—'}
                      </span>
                    </td>
                    <td>
                      <span className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-foreground')}>
                        {student?.name} {student?.lastname}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs text-muted-foreground">{grades.length} / {subjects.length}</span>
                    </td>
                    <td>
                      {passed ? (
                        <span className="badge badge-green text-[10px]"><CheckCircle2 size={10} /> Passed</span>
                      ) : grades.length === 0 ? (
                        <span className="badge badge-gray text-[10px]"><MinusCircle size={10} /> No grades</span>
                      ) : (
                        <span className="badge badge-red text-[10px]"><XCircle size={10} /> Not passed</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate button */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {selected.size} student{selected.size !== 1 ? 's' : ''} selected
        </p>
        <button
          onClick={handleGenerate}
          disabled={selected.size === 0 || generating}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold',
            'transition-all duration-200 hover:scale-105',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
            'bg-primary text-white hover:bg-primary-600'
          )}
        >
          {generating
            ? <><Loader2 size={16} className="animate-spin" /> Generating… {progress.current}/{progress.total}</>
            : <><Download size={16} /> Generate & Download ZIP</>}
        </button>
      </div>

      {/* Progress bar */}
      {generating && progress.total > 0 && (
        <div className={cn('rounded-md overflow-hidden h-2', isDark ? 'bg-gray-800' : 'bg-muted')}>
          <div className="h-full bg-primary transition-all duration-300 rounded-md" style={{ width: `${(progress.current / progress.total) * 100}%` }} />
        </div>
      )}
    </div>
  )
}

function StatBadge({ label, value, color, isDark }) {
  const map = {
    blue:  isDark ? 'bg-primary/15 text-primary-300 border-primary/30'  : 'bg-primary-50 text-primary-700 border-primary-200',
    green: isDark ? 'bg-green-900/30 text-green-400 border-green-800'   : 'bg-green-50 text-green-700 border-green-200',
    gray:  isDark ? 'bg-gray-800 text-gray-400 border-gray-700'         : 'bg-muted text-muted-foreground border-border',
  }
  return (
    <div className={cn('flex items-center gap-2 px-3 py-2 rounded-md border text-xs font-medium', map[color])}>
      <span className="font-bold text-base">{value}</span> {label}
    </div>
  )
}
