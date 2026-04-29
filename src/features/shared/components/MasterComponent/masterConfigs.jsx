// ─────────────────────────────────────────────────────────────────────────────
// masterConfigs.js — Real-world config examples
//
// Each config is a plain JS object passed to <MasterComponent config={…} />.
// These cover the Student and Employee models as concrete examples.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { formatDate } from '../../../../utils/utils'

// ─────────────────────────────────────────────────────────────────────────────
// STUDENTS
// ─────────────────────────────────────────────────────────────────────────────

export const studentsConfig = {
  apiPath:    '/api/students',
  entityName: 'Student',

  // ── List ──────────────────────────────────────────────────────────────────
  searchPlaceholder: 'Search by name, USID, phone…',
  defaultOrderBy: 'created_at:desc',
  pageSize: 15,
  emptyMessage: 'No students registered yet. Add your first student.',

  columns: [
    {
      key:      'usid',
      label:    'USID',
      sortable: true,
      width:    '120px',
      render:   (val) => (
        <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
          {val}
        </span>
      ),
    },
    { key: 'name',        label: 'First Name', sortable: true },
    { key: 'lastname',    label: 'Last Name',  sortable: true },
    { key: 'father_name', label: 'Father',     sortable: false },
    { key: 'phone_1',     label: 'Phone' },
    { key: 'gender.name', label: 'Gender' },
    {
      key:    'created_at',
      label:  'Registered',
      sortable: true,
      render: (val) => <span className="text-muted-foreground text-xs">{formatDate(val)}</span>,
    },
  ],

  filters: [
    {
      key:   'gender_id',
      label: 'Gender',
      fetchOptions: {
        url:      '/api/genders',
        valueKey: 'id',
        labelKey: 'name',
      },
    },
  ],

  // ── Form ──────────────────────────────────────────────────────────────────
  formSections: [
    {
      title:   'Personal Information',
      keys:    ['name', 'lastname', 'father_name', 'age', 'gender_id'],
      columns: 2,
    },
    {
      title:   'Contact',
      keys:    ['phone_1', 'phone_2', 'responsible', 'home_address'],
      columns: 2,
    },
    {
      title:   'Account',
      keys:    ['password', 'image', 'note'],
      columns: 2,
    },
  ],

  fields: [
    {
      key:         'name',
      label:       'First Name',
      type:        'text',
      required:    true,
      placeholder: 'e.g. Ahmed',
    },
    {
      key:         'lastname',
      label:       'Last Name',
      type:        'text',
      required:    true,
      placeholder: 'e.g. Al-Rashid',
    },
    {
      key:         'father_name',
      label:       'Father\'s Name',
      type:        'text',
      placeholder: 'e.g. Mohammed',
    },
    {
      key:      'age',
      label:    'Age',
      type:     'number',
      min:      5,
      max:      100,
    },
    {
      key:   'gender_id',
      label: 'Gender',
      type:  'select',
      fetchOptions: {
        url:      '/api/genders',
        valueKey: 'id',
        labelKey: 'name',
      },
    },
    {
      key:         'phone_1',
      label:       'Primary Phone',
      type:        'tel',
      placeholder: '+966 5X XXX XXXX',
    },
    {
      key:         'phone_2',
      label:       'Secondary Phone',
      type:        'tel',
      placeholder: 'Optional',
    },
    {
      key:         'responsible',
      label:       'Responsible Person',
      type:        'text',
      placeholder: 'Guardian or emergency contact name',
    },
    {
      key:         'home_address',
      label:       'Home Address',
      type:        'textarea',
      rows:        2,
      fullWidth:   true,
      placeholder: 'Full residential address',
    },
    {
      key:        'password',
      label:      'Password',
      type:       'password',
      createOnly: true,           // only shown in New mode
      required:   true,
      placeholder: 'Initial login password',
      hint:       'Must be at least 8 characters.',
      validate:   (val) => val && val.length < 8 ? 'Password must be at least 8 characters' : null,
    },
    {
      key:       'image',
      label:     'Profile Photo',
      type:      'file',
      accept:    'image/*',
      fullWidth: false,
    },
    {
      key:       'note',
      label:     'Internal Note',
      type:      'textarea',
      rows:      2,
      fullWidth: true,
      placeholder: 'Visible to staff only',
    },
  ],

  // Custom label shown in the "Editing:" badge in the tab bar
  getRecordLabel: (r) => `${r.name} ${r.lastname} (${r.usid})`,

  allowDelete: true,

  // Callbacks
  onCreated: (record) => console.log('[students] Created:', record?.usid),
  onUpdated: (record) => console.log('[students] Updated:', record?.id),
  onDeleted: ()       => console.log('[students] Deleted'),
}


// ─────────────────────────────────────────────────────────────────────────────
// EMPLOYEES
// ─────────────────────────────────────────────────────────────────────────────

export const employeesConfig = {
  apiPath:    '/api/employees',
  entityName: 'Employee',

  searchPlaceholder: 'Search by name, email, phone…',
  defaultOrderBy: 'name:asc',
  pageSize: 15,
  emptyMessage: 'No employees added yet.',

  columns: [
    { key: 'name',         label: 'First Name',  sortable: true },
    { key: 'lastname',     label: 'Last Name',   sortable: true },
    { key: 'email',        label: 'Email',       sortable: true },
    { key: 'phone_number', label: 'Phone' },
    { key: 'role.name',    label: 'Role' },
    { key: 'gender.name',  label: 'Gender' },
    {
      key:   'salary',
      label: 'Salary',
      align: 'right',
      render: (val) => val ? (
        <span className="font-mono text-sm">{Number(val).toLocaleString()}</span>
      ) : <span className="text-muted-foreground opacity-40">—</span>,
    },
  ],

  filters: [
    {
      key:   'role_id',
      label: 'Role',
      fetchOptions: {
        url:      '/api/roles',
        valueKey: 'id',
        labelKey: 'name',
      },
    },
    {
      key:   'gender_id',
      label: 'Gender',
      fetchOptions: {
        url:      '/api/genders',
        valueKey: 'id',
        labelKey: 'name',
      },
    },
  ],

  formSections: [
    {
      title:   'Personal',
      keys:    ['name', 'lastname', 'age', 'gender_id'],
      columns: 2,
    },
    {
      title:   'Contact & Account',
      keys:    ['email', 'phone_number', 'password'],
      columns: 2,
    },
    {
      title:   'Role & Compensation',
      keys:    ['role_id', 'salary'],
      columns: 2,
    },
    {
      title:   'Profile',
      keys:    ['bio', 'image'],
      columns: 2,
    },
  ],

  fields: [
    {
      key:         'name',
      label:       'First Name',
      type:        'text',
      required:    true,
      placeholder: 'e.g. Sarah',
    },
    {
      key:         'lastname',
      label:       'Last Name',
      type:        'text',
      required:    true,
      placeholder: 'e.g. Johnson',
    },
    {
      key:  'age',
      label: 'Age',
      type: 'number',
      min:  18,
      max:  100,
    },
    {
      key:   'gender_id',
      label: 'Gender',
      type:  'select',
      fetchOptions: {
        url:      '/api/genders',
        valueKey: 'id',
        labelKey: 'name',
      },
    },
    {
      key:         'email',
      label:       'Email Address',
      type:        'email',
      required:    true,
      placeholder: 'sarah@academy.com',
    },
    {
      key:         'phone_number',
      label:       'Phone Number',
      type:        'tel',
      placeholder: '+966 5X XXX XXXX',
    },
    {
      key:        'password',
      label:      'Password',
      type:       'password',
      createOnly: true,
      required:   true,
      placeholder: 'Initial password',
      validate:   (val) => val && val.length < 8 ? 'Minimum 8 characters' : null,
    },
    {
      key:   'role_id',
      label: 'Role',
      type:  'select',
      fetchOptions: {
        url:      '/api/roles',
        valueKey: 'id',
        labelKey: 'name',
      },
    },
    {
      key:         'salary',
      label:       'Salary',
      type:        'number',
      min:         0,
      step:        0.01,
      placeholder: '0.00',
    },
    {
      key:       'bio',
      label:     'Bio',
      type:      'textarea',
      rows:      3,
      fullWidth: true,
      placeholder: 'Short professional biography',
    },
    {
      key:    'image',
      label:  'Profile Photo',
      type:   'file',
      accept: 'image/*',
    },
  ],

  getRecordLabel: (r) => `${r.name} ${r.lastname}`,

  allowDelete: true,
  onCreated: (r) => console.log('[employees] Created:', r?.email),
  onUpdated: (r) => console.log('[employees] Updated:', r?.id),
}


// ─────────────────────────────────────────────────────────────────────────────
// CYCLES  (simpler example — minimal config)
// ─────────────────────────────────────────────────────────────────────────────

export const cyclesConfig = {
  apiPath:    '/api/cycles',
  entityName: 'Cycle',

  searchPlaceholder: 'Search cycles…',
  pageSize: 20,

  columns: [
    { key: 'id',       label: 'ID',       width: '60px', sortable: true },
    { key: 'name',     label: 'Name',     sortable: true },
    { key: 'duration', label: 'Duration (days)' },
    { key: 'quantity', label: 'Max Students' },
  ],

  fields: [
    { key: 'name',     label: 'Cycle Name', type: 'text',   required: true, placeholder: 'e.g. Cycle 12 — Spring 2026' },
    { key: 'duration', label: 'Duration (days)', type: 'number', min: 1 },
    { key: 'quantity', label: 'Max Students',    type: 'number', min: 1 },
  ],
}
// Note: the curriculumConfig is defined in CurriculumPage.jsx since it has more complex logic and callbacks.

export const curriculumConfig = {
  apiPath: '/api/curriculum',
  entityName: 'Curriculum',
  searchPlaceholder: 'Search by curriculum name…',
  defaultOrderBy: 'created_at:desc',
  pageSize: 15,
  emptyMessage: 'No curricula defined yet. Create a new curriculum plan.',
  columns: [
    { key: 'id', label: 'ID', width: '70px', sortable: true },
    { key: 'name', label: 'Curriculum Name', sortable: true },
    {
      key: 'cycle.name',
      label: 'Cycle',
      sortable: true,
      render: (val) => <span className="font-medium text-primary-600">{val || '—'}</span>,
    },
    {
      key: 'class.name',
      label: 'Class / Scope',
      sortable: false,
      render: (val, row) =>
        row.class_id ? <span>{val}</span> : <span className="text-muted-foreground italic">Cycle‑level template</span>,
    },
    {
      key: 'employee.name',
      label: 'Responsible',
      sortable: false,
      render: (val) => (val ? <span>{val}</span> : <span className="text-muted-foreground">—</span>),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (val) => <span className="text-muted-foreground text-xs">{formatDate(val)}</span>,
    },
  ],
  filters: [
    {
      key: 'cycle_id',
      label: 'Cycle',
      fetchOptions: { url: '/api/cycles', valueKey: 'id', labelKey: 'name' },
    },
    {
      key: 'class_id',
      label: 'Class',
      fetchOptions: { url: '/api/classes', valueKey: 'id', labelKey: 'name', params: { limit: 0 } },
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
  formSections: [
    { title: 'General Information', keys: ['name', 'cycle_id', 'class_id', 'employee_id'], columns: 2 },
  ],
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
      fetchOptions: { url: '/api/cycles', valueKey: 'id', labelKey: 'name' },
      placeholder: 'Select a cycle…',
    },
    {
      key: 'class_id',
      label: 'Class (optional)',
      type: 'select',
      required: false,
      fetchOptions: { url: '/api/classes', valueKey: 'id', labelKey: 'name', params: { limit: 0 } },
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
  getRecordLabel: (record) => record.name,
  allowDelete: true,
  onCreated: (record) => console.log('[Curriculum] Created:', record?.name),
  onUpdated: (record) => console.log('[Curriculum] Updated:', record?.id),
  onDeleted: () => console.log('[Curriculum] Deleted'),
};

// ────────────────────────────────────────────────────────────────
// auditLogConfig.js
// ────────────────────────────────────────────────────────────────

export const auditLogConfig = {
  apiPath:    '/api/audit-logs',
  entityName: 'Audit Entry',

  // ── List ────────────────────────────────────────────────
  searchable:        true,
  searchPlaceholder: 'Search by entity type or action…',   // limited by backend searchFields
  defaultOrderBy:    'timestamp:desc',                     // matches backend orderBy
  pageSize:          25,
  emptyMessage:      'No audit entries found.',

  columns: [
    {
      key:       'timestamp',
      label:     'Timestamp',
      sortable:  true,
      width:     '180px',
      render:    (val) => (
        <span className="text-muted-foreground text-xs whitespace-nowrap">
          {new Date(val).toLocaleString('en-GB', { 
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
        </span>
      ),
    },
    {
      key:      'actor',                        // nested object from include
      label:    'Actor',
      sortable: false,                          // Prisma sort on relation is complex; keep false
      render:   (val) => (
        <span className="font-medium text-sm">
          {val ? `${val.name} ${val.lastname ?? ''}`.trim() : 'System'}
        </span>
      ),
    },
    {
      key:      'action',
      label:    'Action',
      sortable: true,
      width:    '100px',
      render:   (val) => {
        const colors = {
          CREATE:  'bg-green-100 text-green-800',
          UPDATE:  'bg-blue-100 text-blue-800',
          DELETE:  'bg-red-100 text-red-800',
          RESTORE: 'bg-purple-100 text-purple-800',
        }
        return (
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${colors[val] || 'bg-gray-100 text-gray-800'}`}>
            {val}
          </span>
        )
      },
    },
    {
      key:      'entity_type',
      label:    'Entity',
      sortable: true,
      width:    '140px',
      render:   (val) => (
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{val}</span>
      ),
    },
    {
      key:      'entity_id',
      label:    'Entity ID',
      sortable: true,
      width:    '100px',
      render:   (val) => (
        <span className="font-mono text-xs">{val}</span>
      ),
    },
    {
      key:      'changes',                      // not a real field – we'll craft it from old/new
      label:    'Changes',
      sortable: false,
      render:   (_, row) => {
        if (row.action === 'CREATE') {
          return <span className="text-green-700 text-xs font-medium">Created</span>
        }
        if (row.action === 'DELETE') {
          return <span className="text-red-700 text-xs font-medium">Deleted</span>
        }
        if (!row.new_value && !row.old_value) {
          return <span className="text-muted-foreground opacity-40">—</span>
        }
        // Show brief summary: number of changed fields
        const newObj = row.new_value ?? {}
        const oldObj = row.old_value ?? {}
        const changedKeys = Object.keys(newObj).filter(k => newObj[k] !== oldObj[k])
        const count = changedKeys.length
        if (count === 0) return <span className="text-muted-foreground opacity-40">No changes</span>
        return (
          <span className="text-xs bg-muted px-2 py-0.5 rounded">
            {count} field{count !== 1 ? 's' : ''} changed
          </span>
        )
      },
    },
  ],

  filters: [
    {
      key:     'action',
      label:   'Action',
      options: [
        { value: 'CREATE',  label: 'Create' },
        { value: 'UPDATE',  label: 'Update' },
        { value: 'DELETE',  label: 'Delete' },
        { value: 'RESTORE', label: 'Restore' },
      ],
    },
    {
      key:     'entity_type',
      label:   'Entity Type',
      // Keep static; add more as you add auditable entities
      options: [
        { value: 'student',      label: 'Student' },
        { value: 'payment',      label: 'Payment' },
        { value: 'exam_session', label: 'Exam Session' },
        { value: 'employee',     label: 'Employee' },
      ],
    },
    // Actor filter using fetchOptions – note the label key function
    {
      key:   'actor_name',
      label: 'Actor',
      fetchOptions: {
        url:      '/api/employees',
        valueKey: 'id',
        labelKey: (emp) => `${emp.name} ${emp.lastname ?? ''}`.trim(),
      },
    },
  ],

  // ── Read‑only permissions ──────────────────────────────
  permissions: {
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  hideActions: true,
  allowDelete: false,
}