// ─────────────────────────────────────────────────────────────────────────────
// CyclePage.jsx — Cycles management page
//
// Uses MasterComponent with inline config for full CRUD functionality.
// Cycle model: name, duration, quantity, cycleSubjects[]
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import MasterComponent from '../shared/components/MasterComponent/MasterComponent'
import { useThemeStore } from '../shared/store/useThemeStore'
import CycleSubjectSelector from '../shared/components/CycleSubjectSelector'

export default function CyclePage() {
  const { isDark } = useThemeStore()

  // ── Subjects Cell Renderer ─────────────────────────────────────────────────
  const SubjectsCell = ({ subjects }) => {
    if (!subjects || subjects.length === 0) {
      return <span className="text-muted-foreground opacity-40 italic">No subjects</span>
    }

    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-purple-100 text-purple-700',
      'bg-green-100 text-green-700',
      'bg-orange-100 text-orange-700',
      'bg-red-100 text-red-700',
      'bg-indigo-100 text-indigo-700',
    ]

    const displaySubjects = subjects.slice(0, 3)
    const remaining = subjects.length - 3

    return (
      <div className="flex flex-wrap gap-1">
        {displaySubjects.map((cs, idx) => (
          <span
            key={cs.subject?.id ?? idx}
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[idx % colors.length]}`}
          >
            {cs.subject?.name ?? 'Unknown'}
          </span>
        ))}
        {remaining > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
            +{remaining}
          </span>
        )}
      </div>
    )
  }

  // ── Custom Field Wrapper for Subject Selector ─────────────────────────────
  const SubjectSelectorField = ({ value, onChange, error, isDark }) => (
    <CycleSubjectSelector
      value={value}
      onChange={onChange}
      error={error}
      isDark={isDark}
    />
  )

  // ── Cycle Config ──────────────────────────────────────────────────────────
  const cyclesConfig = {
    apiPath: '/api/cycles',
    entityName: 'Cycle',

    // ── List ────────────────────────────────────────────────────────────────
    searchPlaceholder: 'Search by cycle name…',
    defaultOrderBy: 'name:asc',
    pageSize: 15,
    emptyMessage: 'No cycles created yet. Create your first cycle.',

    columns: [
      {
        key: 'id',
        label: 'ID',
        sortable: true,
        width: '60px',
        render: (val) => (
          <span className="text-xs font-mono text-muted-foreground">#{val}</span>
        ),
      },
      {
        key: 'name',
        label: 'Cycle Name',
        sortable: true,
        render: (val) => (
          <span className="font-semibold text-sm">{val}</span>
        ),
      },
      {
        key: 'duration',
        label: 'Duration (days)',
        align: 'right',
        render: (val) =>
          val !== null && val !== undefined ? (
            <span className="text-sm font-mono">{val}</span>
          ) : (
            <span className="text-muted-foreground opacity-40">—</span>
          ),
      },
      {
        key: 'quantity',
        label: 'Max Students',
        align: 'right',
        render: (val) =>
          val !== null && val !== undefined ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-primary-50 text-primary-700">
              {val}
            </span>
          ) : (
            <span className="text-muted-foreground opacity-40">—</span>
          ),
      },
      {
        key: 'cycleSubjects',
        label: 'Subjects',
        render: (val) => <SubjectsCell subjects={val} />,
      },
    ],

    // ── Form ────────────────────────────────────────────────────────────────
    formSections: [
      {
        title: 'Cycle Information',
        keys: ['name', 'duration', 'quantity'],
        columns: 3,
      },
      {
        title: 'Subjects',
        keys: ['subject_ids'],
        columns: 1,
      },
    ],

    fields: [
      {
        key: 'name',
        label: 'Cycle Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Full Stack Development 2026',
        validate: (val) =>
          val && val.trim().length < 2 ? 'Name must be at least 2 characters' : null,
      },
      {
        key: 'duration',
        label: 'Duration (days)',
        type: 'number',
        min: 1,
        max: 365,
        placeholder: 'e.g. 90',
        hint: 'Total duration of the cycle in days.',
      },
      {
        key: 'quantity',
        label: 'Max Students',
        type: 'number',
        min: 1,
        max: 1000,
        placeholder: 'e.g. 25',
        hint: 'Maximum number of students allowed.',
      },
      {
        key: 'subject_ids',
        label: 'Subjects',
        type: 'custom',
        component: SubjectSelectorField,
        fullWidth: true,
        hint: 'Select the subjects that will be taught in this cycle.',
      },
    ],

    // Transform record for editing (extract subject_ids from cycleSubjects)
    transformRecord: (record) => {
      if (!record) return null
      return {
        ...record,
        subject_ids: record.cycleSubjects?.map((cs) => cs.subject_id) ?? [],
      }
    },

    // Transform payload before sending
    transformPayload: (payload, mode) => {
      const { subject_ids, ...cycleData } = payload
      return {
        ...cycleData,
        subject_ids: subject_ids ?? [],
      }
    },

    getRecordLabel: (record) => record?.name ?? 'Unknown Cycle',

    allowDelete: true,

    onCreated: (record) => console.log('[cycles] Created:', record?.name),
    onUpdated: (record) => console.log('[cycles] Updated:', record?.id),
    onDeleted: () => console.log('[cycles] Deleted'),
  }

  return (
    <MasterComponent
      config={cyclesConfig}
      isDark={isDark}
      title="Cycles"
      subtitle="Create and manage educational cycles. Assign subjects and configure duration."
    />
  )
}
