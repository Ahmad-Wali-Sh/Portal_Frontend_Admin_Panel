// ─────────────────────────────────────────────────────────────────────────────
// StudentsPage.jsx  — example of MasterComponent in use
//
// This is the complete Students page.
// All CRUD, search, filter, pagination is handled by MasterComponent.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import MasterComponent from '../shared/components/MasterComponent/MasterComponent'
import { useThemeStore } from '../shared/store/useThemeStore'
import { formatDate } from '../../utils/utils'

export default function StudentsPage() {
  const { isDark } = useThemeStore()


  const studentsConfig = {
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
      { key: 'name',        label: 'Full Name', sortable: true },
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
  

  return (
    <MasterComponent
      config={studentsConfig}
      isDark={isDark}
      title="Students"
      subtitle="Register, search, and manage all enrolled students."
    />
  )
}
