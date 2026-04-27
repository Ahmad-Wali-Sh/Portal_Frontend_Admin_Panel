import React from 'react'
import MasterComponent from '../shared/components/MasterComponent/MasterComponent'
import { useThemeStore } from '../shared/store/useThemeStore'

export default function ClassesPage() {
  const { isDark } = useThemeStore()

  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString()
  }

  const classesConfig = {
    apiPath: '/api/classes',
    entityName: 'Class',

    // ── List ─────────────────────────────────────────────
    searchPlaceholder: 'Search by cycle, teacher, location…',
    defaultOrderBy: 'start_date:desc',
    pageSize: 15,
    emptyMessage: 'No classes found. Create your first class.',

    columns: [
      {
        key: 'cycle',
        label: 'Cycle',
        sortable: true,
        render: (val) => val?.name || '-',
      },
      {
        key: 'employee',
        label: 'Teacher',
        sortable: true,
        render: (val) => val?.name || '-',
      },
      {
        key: 'location',
        label: 'Location',
        sortable: true,
        render: (val) => val?.name || '-',
      },

      {
        key: 'start_date',
        label: 'Start Date',
        render: (val) => (
          <span className="text-xs text-muted-foreground">
            {formatDate(val)}
          </span>
        ),
      },
      {
        key: 'end_date',
        label: 'End Date',
        render: (val) => (
          <span className="text-xs text-muted-foreground">
            {formatDate(val)}
          </span>
        ),
      },
      {
        key: 'time_start',
        label: 'Time',
        render: (_, row) => (
          <span className="text-xs">
            {row.time_start} → {row.time_end}
          </span>
        ),
      },
    ],

    filters: [
      {
        key: 'cycle_id',
        label: 'Cycle',
        fetchOptions: {
          url: '/api/cycles',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
      {
        key: 'employee_id',
        label: 'Teacher',
        fetchOptions: {
          url: '/api/employees',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
      {
        key: 'location_id',
        label: 'Location',
        fetchOptions: {
          url: '/api/locations',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
    ],

    // ── Form ─────────────────────────────────────────────
    formSections: [
      {
        title: 'Basic Information',
        keys: ['cycle_id', 'employee_id', 'location_id'],
        columns: 2,
      },
      {
        title: 'Schedule',
        keys: ['start_date', 'end_date', 'time_start', 'time_end'],
        columns: 2,
      },
      {
        title: 'Payment',
        keys: ['installments', 'installments_price'],
        columns: 2,
      },
    ],

    fields: [
      {
        key: 'cycle_id',
        label: 'Cycle',
        type: 'select',
        required: true,
        fetchOptions: {
          url: '/api/cycles',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
      {
        key: 'employee_id',
        label: 'Teacher',
        type: 'select',
        required: true,
        fetchOptions: {
          url: '/api/employees',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
      {
        key: 'location_id',
        label: 'Location',
        type: 'select',
        required: true,
        fetchOptions: {
          url: '/api/locations',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
      {
        key: 'start_date',
        label: 'Start Date',
        type: 'date',
        required: true,
      },
      {
        key: 'end_date',
        label: 'End Date',
        type: 'date',
        required: true,
      },
      {
        key: 'time_start',
        label: 'Start Time',
        type: 'time',
        required: true,
      },
      {
        key: 'time_end',
        label: 'End Time',
        type: 'time',
        required: true,
      },
      {
        key: 'installments',
        label: 'Installments',
        type: 'number',
        min: 1,
      },
      {
        key: 'installments_price',
        label: 'Installment Price',
        type: 'number',
        step: 0.01,
      },
    ],

    getRecordLabel: (r) =>
      `${r.cycle?.name || ''} - ${r.employee?.name || ''}`,

    allowDelete: true,

    onCreated: (record) => console.log('[classes] Created:', record?.id),
    onUpdated: (record) => console.log('[classes] Updated:', record?.id),
    onDeleted: () => console.log('[classes] Deleted'),
  }

  return (
    <MasterComponent
      config={classesConfig}
      isDark={isDark}
      title="Classes"
      subtitle="Manage and schedule all classes."
    />
  )
}