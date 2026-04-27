// ─────────────────────────────────────────────────────────────────────────────
// CurriculumPage.jsx
// 
// Manages Curriculum entities (cycle‑level templates or class‑specific plans).
// Uses MasterComponent exactly like EmployeesPage.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import MasterComponent from '../shared/components/MasterComponent/MasterComponent';
import { useThemeStore } from '../shared/store/useThemeStore';
import { formatDate } from '../../utils/utils';

export default function CurriculumPage() {
  const { isDark } = useThemeStore();

  const curriculumConfig = {
    // ── Base ────────────────────────────────────────────────────────────────
    apiPath: '/api/curriculums',
    entityName: 'Curriculum',

    // ── List options ────────────────────────────────────────────────────────
    searchPlaceholder: 'Search by curriculum name…',
    defaultOrderBy: 'created_at:desc',
    pageSize: 15,
    emptyMessage: 'No curricula defined yet. Create a new curriculum plan.',

    // ── Columns ────────────────────────────────────────────────────────────
    columns: [
      { key: 'id', label: 'ID', width: '70px', sortable: true },
      { key: 'name', label: 'Curriculum Name', sortable: true },
      {
        key: 'cycle.name',
        label: 'Cycle',
        sortable: true,
        render: (val) => (
          <span className="font-medium text-primary-600">{val || '—'}</span>
        ),
      },
      {
        key: 'class.name',
        label: 'Class / Scope',
        sortable: false,
        render: (val, row) =>
          row.class_id ? (
            <span>{val}</span>
          ) : (
            <span className="text-muted-foreground italic">Cycle‑level template</span>
          ),
      },
      {
        key: 'employee.name',
        label: 'Responsible',
        sortable: false,
        render: (val) =>
          val ? <span>{val}</span> : <span className="text-muted-foreground">—</span>,
      },
      {
        key: 'created_at',
        label: 'Created',
        sortable: true,
        render: (val) => <span className="text-muted-foreground text-xs">{formatDate(val)}</span>,
      },
    ],

    // ── Filters (dropdowns) ─────────────────────────────────────────────────
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
        key: 'class_id',
        label: 'Class',
        fetchOptions: {
          url: '/api/classes',
          valueKey: 'id',
          labelKey: 'name',
          params: { limit: 0 }, // fetch all
        },
      },
      {
        key: 'employee_id',
        label: 'Responsible Employee',
        fetchOptions: {
          url: '/api/employees',
          valueKey: 'id',
          labelKey: (emp) => `${emp.name} ${emp.lastname || ''}`.trim(),
        },
      },
    ],

    // ── Form layout (grouped into sections) ─────────────────────────────────
    formSections: [
      {
        title: 'General Information',
        keys: ['name', 'cycle_id', 'class_id', 'employee_id'],
        columns: 2,
      },
      // You can add more sections later (e.g., "Description" if your table had it)
    ],

    // ── Field definitions ───────────────────────────────────────────────────
    fields: [
      {
        key: 'name',
        label: 'Curriculum Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Business English – Cycle 12',
        hint: 'A descriptive name for this curriculum plan.',
      },
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
        placeholder: 'Select a cycle…',
      },
      {
        key: 'class_id',
        label: 'Class (optional)',
        type: 'select',
        required: false,
        fetchOptions: {
          url: '/api/classes',
          valueKey: 'id',
          labelKey: 'name',
          params: { limit: 0 },
        },
        placeholder: 'Leave empty for cycle‑level template',
        hint: 'If empty, this curriculum applies to the whole cycle. Otherwise, it overrides for a specific class.',
      },
      {
        key: 'employee_id',
        label: 'Responsible Employee',
        type: 'select',
        required: true,
        fetchOptions: {
          url: '/api/employees',
          valueKey: 'id',
          labelKey: (emp) => `${emp.name} ${emp.lastname || ''}`.trim(),
        },
        placeholder: 'Assign a curriculum coordinator…',
      },
    ],

    // ── Helper to show the label in "Editing: …" badge ──────────────────────
    getRecordLabel: (record) => record.name,

    // ── Behaviour ───────────────────────────────────────────────────────────
    allowDelete: true,

    // ── Optional callbacks ──────────────────────────────────────────────────
    onCreated: (record) => console.log('[Curriculum] Created:', record?.name),
    onUpdated: (record) => console.log('[Curriculum] Updated:', record?.id),
    onDeleted: () => console.log('[Curriculum] Deleted'),
  };

  return (
    <MasterComponent
      config={curriculumConfig}
      isDark={isDark}
      title="Curriculum Management"
      subtitle="Define curriculum plans (cycle‑level or class‑specific) and assign responsible employees."
    />
  );
}