// ─────────────────────────────────────────────────────────────────────────────
// CertificatePage.jsx
//
// Main orchestrator page for the Certificates feature.
// Workflow:
//   1. Admin selects a finished class from the ClassSelector
//   2. CertificatePreview loads students + grades for that class
//   3. Admin selects students and clicks "Generate & Download ZIP"
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react'
import { Award, ChevronRight, ArrowLeft } from 'lucide-react'
import { cn } from '../../../utils/utils'
import { useThemeStore } from '../../shared/store/useThemeStore'
import ClassSelector from '../components/ClassSelector'
import CertificatePreview from '../components/CertificatePreview'
import api from '../../../utils/api'

export default function CertificatePage() {
  const { isDark } = useThemeStore()
  const [selectedClass, setSelectedClass] = useState(null)
  const [orgInfo, setOrgInfo]             = useState({ name: '', manager: '' })

  // ── Fetch organization info on mount ────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    async function fetchOrgInfo() {
      try {
        const res = await api.get('/api/general', { params: { limit: 1 } })
        const data = res.data?.data
        // API returns array (getAll) — take the first record
        const record = Array.isArray(data) ? data[0] : data
        if (!cancelled && record) {
          setOrgInfo({
            name: record.name || '',
            manager: record.manager || '',
          })
        }
      } catch {
        // Non-critical — certificates will work without org info
      }
    }

    fetchOrgInfo()
    return () => { cancelled = true }
  }, [])

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSelectClass = useCallback((cls) => {
    setSelectedClass(cls)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedClass(null)
  }, [])

  return (
    <div className="space-y-0 animate-scale-in">
      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className={cn(
            'flex items-center justify-center w-10 h-10 rounded-lg',
            isDark ? 'bg-primary/20' : 'bg-primary-50'
          )}>
            <Award size={20} className="text-primary" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className={cn(
              'text-2xl font-extrabold tracking-tight',
              isDark ? 'text-white' : 'text-foreground'
            )}>
              Certificates
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Generate completion certificates for students in finished classes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Step indicator ─────────────────────────────────────────────── */}
      <div className={cn(
        'flex items-center gap-2 px-4 py-3 rounded-t-lg border border-b-0',
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-border'
      )}>
        <StepIndicator
          number={1}
          label="Select Class"
          active={!selectedClass}
          completed={!!selectedClass}
          isDark={isDark}
        />
        <ChevronRight size={14} className="text-muted-foreground" />
        <StepIndicator
          number={2}
          label="Review & Generate"
          active={!!selectedClass}
          completed={false}
          isDark={isDark}
        />

        {/* Class context badge */}
        {selectedClass && (
          <div className="ml-auto flex items-center gap-2">
            <span className={cn(
              'text-xs font-medium px-3 py-1.5 rounded-md',
              isDark ? 'bg-primary/10 text-primary-300' : 'bg-primary-50 text-primary-700'
            )}>
              {selectedClass.cycle?.name || `Class #${selectedClass.id}`}
            </span>
            <button
              onClick={handleBack}
              className={cn(
                'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md',
                'border-2 transition-all duration-200 hover:scale-105',
                isDark
                  ? 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                  : 'border-border text-gray-600 hover:border-gray-300 hover:text-foreground'
              )}
            >
              <ArrowLeft size={12} />
              Change
            </button>
          </div>
        )}
      </div>

      {/* ── Content area ───────────────────────────────────────────────── */}
      <div className={cn(
        'rounded-b-lg border border-t-0 p-6',
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-border'
      )}>
        {selectedClass ? (
          <CertificatePreview
            selectedClass={selectedClass}
            orgInfo={orgInfo}
            isDark={isDark}
          />
        ) : (
          <ClassSelector
            isDark={isDark}
            onSelect={handleSelectClass}
            selectedClassId={null}
          />
        )}
      </div>
    </div>
  )
}


// ── Step indicator sub-component ──────────────────────────────────────────────

function StepIndicator({ number, label, active, completed, isDark }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn(
        'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all duration-200',
        completed
          ? 'bg-primary text-white'
          : active
            ? isDark
              ? 'bg-primary/20 text-primary-300 border-2 border-primary'
              : 'bg-primary-50 text-primary border-2 border-primary'
            : isDark
              ? 'bg-gray-800 text-gray-500 border-2 border-gray-700'
              : 'bg-muted text-muted-foreground border-2 border-border'
      )}>
        {completed ? '✓' : number}
      </span>
      <span className={cn(
        'text-xs font-semibold transition-colors duration-200',
        active || completed
          ? isDark ? 'text-white' : 'text-foreground'
          : 'text-muted-foreground'
      )}>
        {label}
      </span>
    </div>
  )
}
