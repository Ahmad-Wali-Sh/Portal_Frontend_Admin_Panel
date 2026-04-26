import React from 'react'
import MasterComponent from '../shared/components/MasterComponent/MasterComponent'
import { useThemeStore } from '../shared/store/useThemeStore'
import { formatDate, formatDateTime } from '../../utils/utils'

const cycleStatusOptions = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

function pickValue(record, ...keys) {
  for (const key of keys) {
    if (record?.[key] !== undefined && record?.[key] !== null && record?.[key] !== '') {
      return record[key]
    }
  }
  return null
}
function toDateInputValue(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 10)
}

function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return ''

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return ''
  }

  const msPerDay = 24 * 60 * 60 * 1000
  return Math.floor((end - start) / msPerDay) + 1
}

function renderStatusBadge(status) {
  const normalized = String(status ?? '').toLowerCase()
  const className =
    normalized === 'active'
      ? 'badge-green'
      : normalized === 'upcoming'
      ? 'badge-blue'
      : normalized === 'completed'
      ? 'badge-amber'
      : 'badge'

  return (
    <span className={`badge ${className}`.trim()}>
      {normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : '—'}
    </span>
  )
}

export default function CyclesPage() {
  const { isDark } = useThemeStore()

  const cyclesConfig = {
    apiPath: '/api/cycles',
    entityName: 'Cycle',
    rowClassName: 'group cursor-pointer hover:!bg-transparent dark:hover:!bg-transparent',
    // Force black hover text per request (local to Cycles page).
    headerCellClassName: 'hover:!text-black',
    cellClassName: 'transition-colors duration-150 group-hover:!text-black',


    searchPlaceholder: 'Search by cycle name, status, or date…',
    defaultOrderBy: 'createdAt:desc',
    pageSize: 15,
    emptyMessage: 'No cycles added yet. Create your first cycle to get started.',

    columns: [
      { key: 'name', label: 'Cycle Name', sortable: true },
      {
        key: 'startDate',
        label: 'Start Date',
        sortable: true,
        render: (val, row) => <span>{formatDate(val ?? row.start_date)}</span>,
      },
      {
        key: 'endDate',
        label: 'End Date',
        sortable: true,
        render: (val, row) => <span>{formatDate(val ?? row.end_date)}</span>,
      },
      {
        key: 'duration',
        label: 'Duration',
        sortable: true,
        render: (val) => <span>{val ? `${val} day${val === 1 ? '' : 's'}` : '—'}</span>,
      },
      {
        key: 'maxStudents',
        label: 'Max Students',
        sortable: true,
        render: (val, row) => <span>{val ?? row.quantity ?? '—'}</span>,
      },
      {
        key: 'enrollmentDeadline',
        label: 'Enrollment Deadline',
        sortable: true,
        render: (val, row) => <span>{formatDate(val ?? row.enrollment_deadline)}</span>,
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (val) => renderStatusBadge(val),
      },
      {
        key: 'updatedAt',
        label: 'Updated',
        sortable: true,
        render: (val, row) => <span className="text-muted-foreground text-xs">{formatDateTime(val ?? row.updated_at)}</span>,
      },
      {
        key: 'createdAt',
        label: 'Created',
        sortable: true,
        render: (val, row) => <span className="text-muted-foreground text-xs">{formatDateTime(val ?? row.created_at)}</span>,
      },
    ],

    formSections: [
      {
        title: 'Schedule',
        keys: ['name', 'status', 'startDate', 'endDate', 'duration', 'enrollmentDeadline', 'maxStudents'],
        columns: 2,
      },
      {
        title: 'Details',
        keys: ['description', 'internalNote'],
        columns: 2,
      },
      {
        title: 'System Info',
        keys: ['createdAt', 'updatedAt'],
        columns: 2,
      },
    ],

    fields: [
      {
        key: 'name',
        label: 'Cycle Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Cycle 12 - Spring 2026',
      },
      {
        key: 'startDate',
        label: 'Start Date',
        type: 'date',
        required: true,
      },
      {
        key: 'endDate',
        label: 'End Date',
        type: 'date',
        required: true,
        validate: (val, values) => {
          if (!val || !values.startDate) return null
          return new Date(val) < new Date(values.startDate)
            ? 'End Date must be on or after Start Date'
            : null
        },
      },
      {
        key: 'duration',
        label: 'Duration (days)',
        type: 'number',
        min: 1,
        readOnly: true,
        hint: 'Calculated automatically from Start Date and End Date.',
      },
      {
        key: 'maxStudents',
        label: 'Max Students',
        type: 'number',
        required: true,
        min: 1,
        placeholder: 'e.g. 30',
      },
      {
        key: 'enrollmentDeadline',
        label: 'Enrollment Deadline',
        type: 'date',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        options: cycleStatusOptions,
        defaultValue: 'upcoming',
      },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
        rows: 4,
        fullWidth: true,
        placeholder: 'Public summary for this cycle',
      },
      {
        key: 'internalNote',
        label: 'Internal Note',
        type: 'textarea',
        rows: 3,
        fullWidth: true,
        placeholder: 'Optional notes about this cycle',
      },
      {
        key: 'createdAt',
        label: 'Created At',
        type: 'text',
        readOnly: true,
        hint: 'Set automatically by the system.',
      },
      {
        key: 'updatedAt',
        label: 'Updated At',
        type: 'text',
        readOnly: true,
        hint: 'Updated automatically whenever this cycle changes.',
      },
    ],

    deriveValues: (nextValues) => ({
      ...nextValues,
      duration: calculateDuration(nextValues.startDate, nextValues.endDate),
    }),

    mapRecordToValues: (record, values) => ({
      ...values,
      startDate: toDateInputValue(pickValue(record, 'startDate', 'start_date')),
      endDate: toDateInputValue(pickValue(record, 'endDate', 'end_date')),
      enrollmentDeadline: toDateInputValue(pickValue(record, 'enrollmentDeadline', 'enrollment_deadline')),
      duration: pickValue(record, 'duration') ?? calculateDuration(
        pickValue(record, 'startDate', 'start_date'),
        pickValue(record, 'endDate', 'end_date')
      ),
      maxStudents: pickValue(record, 'maxStudents', 'max_students', 'quantity') ?? '',
      status: pickValue(record, 'status') ?? 'upcoming',
      description: pickValue(record, 'description') ?? '',
      internalNote: pickValue(record, 'internalNote', 'internal_note', 'note') ?? '',
      createdAt: pickValue(record, 'createdAt', 'created_at')
        ? formatDateTime(pickValue(record, 'createdAt', 'created_at'))
        : '',
      updatedAt: pickValue(record, 'updatedAt', 'updated_at')
        ? formatDateTime(pickValue(record, 'updatedAt', 'updated_at'))
        : '',
    }),

    transformPayload: (payload) => ({
      name: payload.name,
      startDate: payload.startDate,
      endDate: payload.endDate,
      duration: calculateDuration(payload.startDate, payload.endDate),
      quantity: payload.maxStudents,
      enrollmentDeadline: payload.enrollmentDeadline,
      status: payload.status,
      description: payload.description || null,
      note: payload.internalNote || null,
    }),

    getRecordLabel: (record) => record?.name ?? `Cycle #${record?.id}`,

    allowDelete: true,

    onCreated: (record) => console.log('[cycles] Created:', record?.id),
    onUpdated: (record) => console.log('[cycles] Updated:', record?.id),
    onDeleted: () => console.log('[cycles] Deleted'),
  }

  return (
    <MasterComponent
      config={cyclesConfig}
      isDark={isDark}
      title="Cycles"
      subtitle="Create, update, and organize academic cycles."
    />
  )
}
