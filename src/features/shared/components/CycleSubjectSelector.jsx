// ─────────────────────────────────────────────────────────────────────────────
// CycleSubjectSelector.jsx — Custom component for selecting subjects for a cycle
//
// Features:
//   - Fetches all subjects from /api/subjects
//   - Searchable dropdown
//   - Tag/chip display for selected subjects
//   - Animated add/remove
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { X, Search, Loader2, BookOpen, Check } from 'lucide-react'
import { cn } from '../../../utils/utils'
import api from '../../../utils/api'

// ── Subject Tag Component ─────────────────────────────────────────────────────

function SubjectTag({ subject, onRemove, isDark, index }) {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-amber-500',
    'from-red-500 to-rose-500',
    'from-indigo-500 to-violet-500',
  ]
  const colorClass = colors[index % colors.length]

  return (
    <div
      className={cn(
        'group flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium',
        'bg-gradient-to-r shadow-sm hover:shadow-md transition-all duration-200',
        'animate-in fade-in zoom-in-95 slide-in-from-bottom-2',
        colorClass
      )}
      style={{ animationDuration: '200ms' }}
    >
      <BookOpen size={14} className="opacity-80" />
      <span className="truncate max-w-[150px]">{subject.name}</span>
      <button
        type="button"
        onClick={() => onRemove(subject.id)}
        className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={14} className="opacity-80 group-hover:opacity-100" />
      </button>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function CycleSubjectSelector({
  value = [], // array of selected subject IDs
  onChange,
  error,
  isDark = false,
  disabled = false,
}) {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  // Convert value (IDs) to selected subjects
  const selectedSubjects = subjects.filter((s) => value?.includes(s.id))

  // Filter available subjects (not already selected, match search)
  const availableSubjects = subjects.filter((s) => {
    if (value?.includes(s.id)) return false
    if (!searchQuery.trim()) return true
    return s.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Fetch all subjects on mount
  useEffect(() => {
    setLoading(true)
    api
      .get('/api/subjects', { params: { limit: 0 } })
      .then((res) => {
        const data = res.data?.data ?? res.data ?? []
        setSubjects(data)
      })
      .catch((err) => {
        console.error('[CycleSubjectSelector] Failed to fetch subjects:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && availableSubjects.length > 0) {
        e.preventDefault()
        const firstSubject = availableSubjects[0]
        handleAdd(firstSubject.id)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    },
    [availableSubjects]
  )

  // Add subject
  const handleAdd = (subjectId) => {
    const newValue = [...(value ?? []), subjectId]
    onChange?.(newValue)
    setSearchQuery('')
    inputRef.current?.focus()
  }

  // Remove subject
  const handleRemove = (subjectId) => {
    const newValue = (value ?? []).filter((id) => id !== subjectId)
    onChange?.(newValue)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected Subjects Tags */}
      <div className="flex flex-wrap gap-2 mb-3 min-h-[36px]">
        {selectedSubjects.length === 0 && !disabled && (
          <span className="text-sm text-muted-foreground/60 italic">
            No subjects selected. Search and add subjects below.
          </span>
        )}
        {selectedSubjects.map((subject, index) => (
          <SubjectTag
            key={subject.id}
            subject={subject}
            onRemove={handleRemove}
            isDark={isDark}
            index={index}
          />
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-2.5 rounded-md border-2 transition-all duration-200',
            isDark
              ? 'bg-gray-800 border-gray-700 focus-within:border-primary'
              : 'bg-muted border-transparent focus-within:border-primary focus-within:bg-white',
            error && 'border-destructive',
            disabled && 'opacity-60 cursor-not-allowed',
            isOpen && (isDark ? 'border-primary' : 'border-primary ring-2 ring-primary/20')
          )}
        >
          <Search
            size={18}
            className={cn(
              'transition-colors duration-200',
              isOpen ? 'text-primary' : 'text-muted-foreground'
            )}
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            disabled={disabled || loading}
            placeholder={loading ? 'Loading subjects...' : 'Search subjects...'}
            className={cn(
              'flex-1 bg-transparent outline-none text-sm',
              isDark ? 'text-gray-100 placeholder-gray-500' : 'text-foreground placeholder-gray-400'
            )}
          />
          {loading && <Loader2 size={16} className="animate-spin text-muted-foreground" />}
        </div>

        {/* Dropdown Results */}
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-md shadow-lg border',
              'animate-in fade-in zoom-in-95 slide-in-from-top-2',
              isDark
                ? 'bg-gray-800 border-gray-700 shadow-black/30'
                : 'bg-white border-border shadow-lg'
            )}
            style={{ animationDuration: '150ms' }}
          >
            {availableSubjects.length === 0 ? (
              <div
                className={cn(
                  'px-4 py-3 text-sm text-center',
                  isDark ? 'text-gray-400' : 'text-muted-foreground'
                )}
              >
                {searchQuery ? 'No matching subjects found' : 'All subjects selected'}
              </div>
            ) : (
              <div className="py-1">
                {availableSubjects.slice(0, 8).map((subject) => (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => handleAdd(subject.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150',
                      isDark
                        ? 'hover:bg-gray-700 text-gray-200'
                        : 'hover:bg-muted text-foreground'
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-md flex items-center justify-center',
                        isDark ? 'bg-gray-700' : 'bg-primary-50'
                      )}
                    >
                      <BookOpen
                        size={16}
                        className={isDark ? 'text-primary-300' : 'text-primary'}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{subject.name}</span>
                      {subject.duration && (
                        <span
                          className={cn(
                            'ml-2 text-xs',
                            isDark ? 'text-gray-400' : 'text-muted-foreground'
                          )}
                        >
                          {subject.duration} hrs
                        </span>
                      )}
                    </div>
                    <Check size={16} className="opacity-0 text-primary" />
                  </button>
                ))}
                {availableSubjects.length > 8 && (
                  <div
                    className={cn(
                      'px-4 py-2 text-xs text-center border-t',
                      isDark
                        ? 'text-gray-500 border-gray-700'
                        : 'text-muted-foreground border-border'
                    )}
                  >
                    +{availableSubjects.length - 8} more subjects
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
          {error}
        </p>
      )}

      {/* Hint */}
      <p className="mt-1.5 text-[11px] text-muted-foreground">
        Press Enter to add the first matching subject, or click to select.
      </p>
    </div>
  )
}
